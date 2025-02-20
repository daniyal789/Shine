<template>
  <div class="flex flex-row gap-8 items-center justify-between min-h-screen bg-gray-100 px-8">
    <!-- Left: Joint Movement Control -->
    <div class="w-1/2 max-w-lg">
      <h1 class="text-2xl font-semibold mb-4">Joint Movement Control</h1>

      <!-- Loop through jointSettings array and create a slider with editable value -->
      <div 
        v-for="(joint, index) in jointSettings" 
        :key="index" 
        class="mb-4 fade-in"
      >
        <div class="flex items-center space-x-4">
          <label :for="'joint' + index" class="block text-gray-700 font-medium">
            Joint {{ index + 1 }}:
          </label>

          <!-- Editable input box for joint value -->
          <input 
            type="number" 
            v-model.number="joint.value" 
            :min="joint.min" 
            :max="joint.max" 
            class="border border-gray-300 rounded px-2 py-1 w-20 text-center"
          />
        </div>

        <!-- Slider for joint movement -->
        <input 
          type="range" 
          :id="'joint' + index" 
          v-model="joint.value" 
          :min="joint.min" 
          :max="joint.max" 
          class="block w-full accent-blue-500 mt-2"
        />
      </div>

      <!-- Button to send joint data -->
      <button 
        @click="sendJointData"
        :disabled="loading"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-50 fade-in"
      >
        {{ loading ? "Sending..." : "Set" }}
      </button>

      <!-- Response message -->
      <p v-if="responseMessage" class="mt-2 text-green-600">{{ responseMessage }}</p>
    </div>

    <!-- Right: 3D Model Display -->
    <div id="canvas-container" class="w-1/2 h-screen"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, shallowRef, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Joint Settings
const jointSettings = ref([
  { value: 0, min: -360, max: 360 },
  { value: 0, min: -95, max: 95 },
  { value: 0, min: -160, max: 160 },
  { value: 0, min: -360, max: 360 },
  { value: 0, min: -160, max: 160 },
  { value: 0, min: -360, max: 360 }
]);

const loading = ref(false);
const responseMessage = ref("");
const API_URL = "http://192.168.29.105:3000/increase_joint/";

// 3D Model Variables
const camera = shallowRef(null);
const scene = new THREE.Scene();
const renderer = shallowRef(null);
const controls = shallowRef(null);
const robot = shallowRef(null);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);

// Send Joint Data
const sendJointData = async () => {
  loading.value = true;
  responseMessage.value = "";

  const jointData = jointSettings.value.map((joint, index) => ({
    joint: index + 1,
    value: Number(joint.value),
  }));

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ joints: jointData }),
    });

    if (!response.ok) throw new Error(`Failed (Status: ${response.status})`);
    const result = await response.json();
    responseMessage.value = result.message || "Data sent successfully!";
  } catch (error) {
    console.error("Error:", error);
    responseMessage.value = "Error: " + error.message;
  } finally {
    loading.value = false;
  }
};

// Load 3D Model & Enable OrbitControls
onMounted(() => {
  // Camera setup
  camera.value = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.value.position.set(0, 1.5, 5);

  // Renderer setup
  renderer.value = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.value.setSize(window.innerWidth / 2, window.innerHeight);
  document.querySelector("#canvas-container").appendChild(renderer.value.domElement);

  // Controls setup
  controls.value = new OrbitControls(camera.value, renderer.value.domElement);
  controls.value.enableDamping = true;
  controls.value.dampingFactor = 0.05;
  controls.value.screenSpacePanning = false;
  controls.value.minDistance = 1;
  controls.value.maxDistance = 10;

  // Load 3D Model
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  loader.setDRACOLoader(dracoLoader);

  loader.load("/robot_arm.glb", (gltf) => {
    const model = gltf.scene;
    model.scale.set(4, 4, 4);
    model.position.set(0, -2, 0);
    scene.add(model);
    robot.value = model;
  });

  scene.add(ambientLight);
  scene.add(directionalLight);

  const animate = () => {
    requestAnimationFrame(animate);
    controls.value.update();
    renderer.value.render(scene, camera.value);
  };

  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.value.aspect = window.innerWidth / window.innerHeight;
    camera.value.updateProjectionMatrix();
    renderer.value.setSize(window.innerWidth / 2, window.innerHeight);
  });
});

// Watch for joint changes
watch(jointSettings, () => {
  if (robot.value) {
    jointSettings.value.forEach((joint, index) => {
      const jointObject = robot.value.children[index];
      if (jointObject) jointObject.rotation.z = THREE.MathUtils.degToRad(joint.value);
    });
  }
}, { deep: true });
</script>

<style>
/* Simple fade-in animation */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
