<template>
    <div class="flex flex-row gap-8 items-center justify-between min-h-screen bg-gray-100 px-56">
      <div class="w-1/2 max-w-lg">
        <h1 class="text-2xl font-semibold mb-4">Joint Movement Control</h1>
        <div v-for="(joint, index) in jointSettings" :key="index" class="mb-4 fade-in">
          <div class="flex items-center space-x-4">
            <label :for="'joint' + index" class="block text-gray-700 font-medium">
              Joint {{ index + 1 }}:
            </label>
            <input type="number" v-model.number="joint.value" :min="joint.min" :max="joint.max" 
              class="border border-gray-300 rounded px-2 py-1 w-20 text-center" 
              @input="updateSimulation(index)" />
          </div>
          <input type="range" :id="'joint' + index" v-model="joint.value" :min="joint.min" :max="joint.max"
            class="block w-full accent-blue-500 mt-2" @input="updateSimulation(index)" />

          <!-- Show the current fetched joint value below -->
          <p class="text-gray-600 mt-1">Current: {{ joint.currentValue !== undefined ? joint.currentValue : 'N/A' }}</p>
        </div>
        
        <button @click="sendJointData" :disabled="loading" class="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-50 fade-in">
          {{ loading ? "Sending..." : "Set" }}
        </button>

        <button @click="fetchCurrentState" :disabled="fetching" class="bg-green-600 text-white mx-3 px-6 py-2 rounded-lg mt-4 hover:bg-green-700 disabled:opacity-50 fade-in">
          {{ fetching ? "Fetching..." : "Current State" }}
        </button>

        <p v-if="responseMessage" class="mt-2 text-green-600">{{ responseMessage }}</p>
      </div>
      <div id="canvas-container" class="w-1/2 h-screen"></div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, shallowRef, nextTick } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import URDFLoader from "urdf-loader";
import { gsap } from "gsap"; 

const jointSettings = ref([
    { value: 0, min: -360, max: 360, currentValue: undefined },
    { value: 0, min: -95, max: 95, currentValue: undefined },
    { value: 0, min: -160, max: 160, currentValue: undefined },
    { value: 0, min: -360, max: 360, currentValue: undefined },
    { value: 0, min: -160, max: 160, currentValue: undefined },
    { value: 0, min: -360, max: 360, currentValue: undefined }
]);

const loading = ref(false);
const fetching = ref(false);
const responseMessage = ref("");
const API_URL = "http://192.168.137.51:3000/Joint_angle/";
const CURRENT_STATE_URL = "http://192.168.29.104:3000/get_joint_positions";

const camera = shallowRef(null);
const scene = new THREE.Scene();
const renderer = shallowRef(null);
const controls = shallowRef(null);
const robot = shallowRef(null);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);

const updateSimulation = (index) => {
    if (robot.value) {
        const jointObj = robot.value.joints?.[`joint_${index + 1}`];
        if (jointObj) {
            gsap.to(jointObj, {
                duration: 0.5,
                ease: "power2.out",
                onUpdate: () => {
                    jointObj.setJointValue(THREE.MathUtils.degToRad(jointSettings.value[index].value));
                }
            });
        }
    }
};

const sendJointData = async () => {
    loading.value = true;
    responseMessage.value = "";
    const jointData = jointSettings.value.map((joint, index) => ({ joint: index + 1, value: Number(joint.value) }));

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

const fetchCurrentState = async () => {
    fetching.value = true;
    responseMessage.value = "";

    try {
        const response = await fetch(CURRENT_STATE_URL);
        if (!response.ok) throw new Error(`Failed to fetch state (Status: ${response.status})`);

        const result = await response.json();
        console.log("Fetched Joint Values:", result.joints); // Debugging

        if (Array.isArray(result.joints)) {
            // ✅ Update current values for each joint
            jointSettings.value.forEach((joint, i) => {
                joint.currentValue = result.joints[i] ?? joint.currentValue;
            });

            await nextTick(); // Ensure UI updates before running simulations
        }

        responseMessage.value = "Current state updated!";
    } catch (error) {
        console.error("Error:", error);
        responseMessage.value = "Error: " + error.message;
    } finally {
        fetching.value = false;
    }
};

onMounted(() => {
    camera.value = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.value.position.set(0, 1.5, 5);
    renderer.value = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.value.setSize(window.innerWidth / 2, window.innerHeight);
    document.querySelector("#canvas-container").appendChild(renderer.value.domElement);
    controls.value = new OrbitControls(camera.value, renderer.value.domElement);
    controls.value.enableDamping = true;

    const loader = new URDFLoader();
    loader.load("/m1013.blue.urdf", (loadedRobot) => {
        loadedRobot.scale.set(6, 6, 3.5);
        loadedRobot.position.set(0, -2.5, 0);
        loadedRobot.rotation.set(-Math.PI / 2, 0, 0);
        scene.add(loadedRobot);
        robot.value = loadedRobot;

        loadedRobot.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    });

    scene.add(ambientLight);
    scene.add(directionalLight);

    const animate = () => {
        requestAnimationFrame(animate);
        controls.value.update();
        renderer.value.render(scene, camera.value);
    };
    animate();
});
</script>
