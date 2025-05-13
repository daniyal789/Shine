<template>
  <div class="flex flex-row gap-8 items-stretch  bg-gray-100 p-10 ">
  <div class="w-3/5 flex space-x-4">
  <div class="w-1/2 p-4 border rounded-lg shadow-md">
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

      <!-- ✅ Shows the current fetched joint value -->
      <p class="text-gray-600 mt-1">
Current: {{ joint.currentValue !== undefined ? joint.currentValue.toFixed(2) : '0' }}
</p>

      </div>
      
      <button @click="sendJointData" :disabled="loading" class="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-50 fade-in">
      {{ loading ? "Sending..." : "Set" }}
      </button>

      <button @click="fetchCurrentState" :disabled="fetching" class="bg-green-600 text-white mx-3 px-6 py-2 rounded-lg mt-4 hover:bg-green-700 disabled:opacity-50 fade-in">
      {{ fetching ? "Fetching..." : "Current State" }}
      </button>

      <p v-if="responseMessage" class="mt-2 text-green-600">{{ responseMessage }}</p>
  </div>       
      <!-- ✅ Additional Controls (20%) -->
      <div class="w-1/2 p-4 border rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-2">Extra Controls</h2>
      <div class="flex flex-col space-y-4">

      <!-- ✅ Toggle Button for Enabling Stream -->
      <label class="flex items-center space-x-2 cursor-pointer">
    <input type="checkbox" v-model="toggleState" class="hidden" @change="toggleStream" />
    <span
      class="w-10 h-5 bg-gray-300 rounded-full flex items-center transition duration-300"
      :class="{ 'bg-green-400': toggleState }"
    >
      <span
        class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"
        :class="{ 'translate-x-5': toggleState }"
      ></span>
    </span>
    <span class="text-gray-700">Enable Mode</span>
  </label>

  <!-- ✅ Video Streaming -->
  <div v-if="streaming" class="w-full flex justify-center">
    <video ref="videoElement" autoplay playsinline class="mt-4 w-full max-w-lg rounded-lg shadow"></video>
  </div>


<!-- CheckBox -->
<label class="flex items-center space-x-2">
  <input type="checkbox" v-model="checkboxState" class="w-5 h-5 text-blue-600">
  <span class="text-gray-700">Option 1</span>
</label>

<!-- Buttons -->
<div class="flex space-x-2">
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" @click="sendJointData">
    Send Data
  </button>
  <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition" @click="resetJoints">
    Reset
  </button>
</div>

</div>
</div>
  </div>
  <!-- ✅ Right Section (40%) -->
  <div class="w-2/5 p-4 border  bg-gradient-to-br from-blue-100 to-blue-300 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-2">Robot Simulation</h2>
      <div id="canvas-container" class="h-4/6   flex items-center justify-center">
          <!-- <p class="text-gray-500">[3D Simulation Placeholder]</p> -->
      </div>
      </div>
            <!-- Toast container -->
<div class="fixed top-5 right-5 flex flex-col space-y-2 z-50">
  <transition-group name="toast" tag="div">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="bg-yellow-400 text-gray-900 font-medium px-4 py-2 rounded-md shadow-lg ring-1 ring-yellow-500/50"
    >
      {{ toast.message }}
    </div>
  </transition-group>
</div>
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

const checkboxState = ref(false);
const loading = ref(false);
const fetching = ref(false);
const responseMessage = ref("");
const config = useRuntimeConfig();  // ✅ Get runtime config
const API_URL = config.public.API_URL;  // ✅ Get API URL from .env
const CURRENT_STATE_URL = config.public.CURRENT_STATE_URL;  // ✅ Get Current State URL
const STREAM_URL = config.public.STREAM_URL;

const camera = shallowRef(null);
const scene = new THREE.Scene();
const renderer = shallowRef(null);
const controls = shallowRef(null);
const robot = shallowRef(null);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);


// ✅ WebRTC Video Streaming Setup
const toggleState = ref(false);
const streaming = ref(false);
const videoElement = ref(null);
let peerConnection;

// const config = useRuntimeConfig();
// const STREAM_URL = config.public.STREAM_URL;

// ✅ Start WebRTC Streaming
const startWebRTCStream = async () => {
try {
console.log("Starting WebRTC Stream...");

let config = {
sdpSemantics: "unified-plan",
iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
};

peerConnection = new RTCPeerConnection(config);
peerConnection.addTransceiver("video", { direction: "recvonly" });

peerConnection.ontrack = (event) => {
console.log("Received video track!");
if (videoElement.value) {
  videoElement.value.srcObject = event.streams[0];
}
};

const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);

await new Promise((resolve) => {
if (peerConnection.iceGatheringState === "complete") {
  resolve();
} else {
  peerConnection.addEventListener("icegatheringstatechange", function checkState() {
    if (peerConnection.iceGatheringState === "complete") {
      peerConnection.removeEventListener("icegatheringstatechange", checkState);
      resolve();
    }
  });
}
});

// ✅ Send offer to server
const response = await fetch(STREAM_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
  sdp: peerConnection.localDescription.sdp,
  type: peerConnection.localDescription.type,
}),
});

if (!response.ok) {
throw new Error(`Failed to start WebRTC stream (Status: ${response.status})`);
}

const answer = await response.json();
console.log("Received WebRTC Answer:", answer);

if (answer.sdp) {
await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
streaming.value = true;
} else {
throw new Error("Invalid SDP response");
}
} catch (error) {
console.error("Error starting WebRTC stream:", error);
toggleState.value = false;
}
};

// ✅ Stop WebRTC Streaming
const stopWebRTCStream = () => {
console.log("Stopping WebRTC Stream...");
if (peerConnection) {
peerConnection.close();
peerConnection = null;
}
streaming.value = false;
};

// ✅ Toggle Stream Handling
const toggleStream = async () => {
if (toggleState.value) {
await startWebRTCStream();
} else {
stopWebRTCStream();
}
};


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

  // ✅ Convert joint values to a list format
  const jointData = {
      joint_angles: jointSettings.value.map(joint => Number(joint.value)) // ✅ Ensure values are numbers
  };

  console.log("Sending Joint Data:", jointData);

  try {
      const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jointData), // ✅ Send as { joint_angles: [...] }
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
      console.log("Fetched Joint Values:", result); // Debugging
      console.log(result)
      if (Array.isArray(result.joint_angles)) {
          // ✅ Directly update currentValue for each joint based on array index
          result.joint_angles.forEach((angle, index) => {
      if (jointSettings.value[index]) {
          jointSettings.value[index].currentValue = angle; // Update the `currentValue`
          jointSettings.value[index].value = angle; // Update the slider value
      }
  });

          await nextTick(); // Ensure UI updates before rendering changes

          jointSettings.value.forEach((_, index) => updateSimulation(index));
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
  camera.value.position.set(5, 1.5, 10);
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

  // Add Grid Plane
  const gridSize = 10;
  const gridDivisions = 20;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x444444, 0x222222);
  gridHelper.position.y = -2.5;
  scene.add(gridHelper);

  // Add Semi-Transparent Floor
  const floorGeometry = new THREE.PlaneGeometry(gridSize, gridSize);
  const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x222222,
  transparent: true,
  opacity: 0.3,
  side: THREE.DoubleSide
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2.51;
  scene.add(floor);

  scene.add(ambientLight);
  scene.add(directionalLight);

  const animate = () => {
      requestAnimationFrame(animate);
      controls.value.update();
      renderer.value.render(scene, camera.value);
  };
  animate();
  // ─── SSE Toasts ─────────────────────────────────────────────────────────
const SSE_URL = "http://192.168.29.22:8000/robot_state/stream";
const es = new EventSource(SSE_URL);

// Show a popup for every piece of data we receive
es.addEventListener("message", e => {
showToast(e.data);
console.log("Received SSE message:", e);
});

onBeforeUnmount(() => {
es.close();
});
});

// ─── Toast State & Helpers ────────────────────────────────────────────────
const toasts = ref([]);
let nextToastId = 1;
function showToast(message, duration = 4000) {
const id = nextToastId++;
toasts.value.push({ id, message });
setTimeout(() => {
toasts.value = toasts.value.filter(t => t.id !== id);
}, duration);
}

</script>

