<template>
  <div class="relative">
    <!-- Main Flex Container -->
    <div class="flex flex-row gap-8 items-stretch bg-gray-100 p-10">
      <!-- Left Section (60%) -->
      <div class="w-3/5 flex space-x-4">
        <!-- Joint Movement Control -->
        <div class="w-1/2 p-4 border rounded-lg shadow-md">
          <h1 class="text-2xl font-semibold mb-4">Joint Movement Control</h1>

          <div v-for="(joint, index) in jointSettings" :key="index" class="mb-4 fade-in">
            <div class="flex items-center space-x-4">
              <label :for="'joint' + index" class="block text-gray-700 font-medium">
                Joint {{ index + 1 }}:
              </label>
              <input
                type="number"
                v-model.number="joint.value"
                :min="joint.min"
                :max="joint.max"
                class="border border-gray-300 rounded px-2 py-1 w-20 text-center"
                @input="updateSimulation(index)"
              />
            </div>

            <input
              type="range"
              :id="'joint' + index"
              v-model="joint.value"
              :min="joint.min"
              :max="joint.max"
              class="block w-full accent-blue-500 mt-2"
              @input="updateSimulation(index)"
            />

            <p class="text-gray-600 mt-1">
              Current: {{ joint.currentValue !== undefined ? joint.currentValue.toFixed(2) : '0' }}
            </p>
          </div>

          <button
            @click="sendJointData"
            :disabled="loading"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-50 fade-in"
          >
            {{ loading ? "Sending..." : "Set" }}
          </button>

          <button
            @click="fetchCurrentState"
            :disabled="fetching"
            class="bg-green-600 text-white mx-3 px-6 py-2 rounded-lg mt-4 hover:bg-green-700 disabled:opacity-50 fade-in"
          >
            {{ fetching ? "Fetching..." : "Current State" }}
          </button>

          <p v-if="responseMessage" class="mt-2 text-green-600">{{ responseMessage }}</p>
        </div>

        <!-- Extra Controls -->
        <div class="w-1/2 p-4 border rounded-lg shadow-md">
          <h2 class="text-lg font-semibold mb-2">Extra Controls</h2>

          <div class="flex flex-col space-y-4">
            <!-- Toggle Button -->
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

            <!-- Video Stream -->
            <div v-if="streaming" class="w-full flex justify-center">
              <video ref="videoElement" autoplay playsinline class="mt-4 w-full max-w-lg rounded-lg shadow"></video>
            </div>

            <!-- Checkbox -->
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="checkboxState" class="w-5 h-5 text-blue-600" />
              <span class="text-gray-700">Option 1</span>
            </label>

            <!-- Buttons -->
            <div class="flex space-x-2">
              <button
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                @click="sendJointData"
              >
                Send Data
              </button>
              <button
                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                @click="resetJoints"
              >
                Reset
              </button>
              <button
                class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                @click="triggerEmergency"
              >
                Emergency
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Section: 3D Simulation -->
      <div class="w-2/5 p-4 border bg-gradient-to-br from-blue-100 to-blue-300 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold mb-2">Robot Simulation</h2>
        <div id="canvas-container" class="h-4/6 flex items-center justify-center">
          <!-- 3D Simulation Canvas Mount Point -->
        </div>
      </div>
    </div>

 <!-- Toast Popup -->
<transition name="fade">
  <div
    v-if="normalPopup.show"
    class="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4 z-40"
  >
    <span>{{ normalPopup.message }}</span>
    <button @click="normalPopup.show = false" class="text-gray-500 hover:text-gray-700">✕</button>
  </div>
</transition>


<!-- Emergency / Recovery Modal -->
<transition name="fade">
  <div
    v-if="showEmergencyModal"
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg w-96 shadow-lg">
      <h2 class="text-xl font-semibold mb-4">
        {{ recoverySteps.length ? 'Recovery Required' : 'Emergency!' }}
      </h2>

      <div class="space-y-4">
        <!-- No automatic recovery available -->
        <div v-if="recoverySteps.length === 0">
          <p class="text-red-600">
            Emergency state—manual intervention required.
          </p>
        </div>

        <!-- Step-by-step recovery -->
        <div v-else>
          <p class="font-medium">{{ currentStep.label }}</p>

          <!-- See More / Collapse -->
          <button
            @click="expanded = !expanded"
            class="text-blue-600 hover:underline mb-2"
          >
            {{ expanded ? 'Hide details' : 'See more' }}
          </button>
          <p
            v-show="expanded"
            class="text-gray-700 whitespace-pre-wrap"
          >
            {{ currentStep.detail }}
          </p>

          <!-- Resolve Button -->
          <button
            @click="resolveCurrentStep"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Resolve
          </button>
        </div>
      </div>
    </div>
  </div>
</transition>

  </div>
</template>


<script setup>
import { ref, computed, onMounted, onBeforeUnmount, shallowRef, nextTick } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import URDFLoader from "urdf-loader";
import { gsap } from "gsap";

const STREAM_BASE = 'http://192.168.254.13:8000';
const normalPopup        = ref({ show: false, message: "" });
const showEmergencyModal = ref(false);
const recoverySteps      = ref([]);
const currentStepIndex   = ref(0);
// const selectedOption     = ref("");
const expanded = ref(false);

// ————————————————————————————————————————————
// 1. Joint + Video + Simulation Logic (unchanged)
// ————————————————————————————————————————————
const jointSettings = ref([
  { value: 0, min: -360, max: 360, currentValue: undefined },
  { value: 0, min:  -95, max:  95, currentValue: undefined },
  { value: 0, min: -160, max: 160, currentValue: undefined },
  { value: 0, min: -360, max: 360, currentValue: undefined },
  { value: 0, min: -160, max: 160, currentValue: undefined },
  { value: 0, min: -360, max: 360, currentValue: undefined },
]);

const checkboxState   = ref(false);
const loading         = ref(false);
const fetching        = ref(false);
const responseMessage = ref("");
const config          = useRuntimeConfig();
const API_URL         = config.public.API_URL;
const CURRENT_STATE_URL = config.public.CURRENT_STATE_URL;
const STREAM_URL        = config.public.STREAM_URL;

const camera     = shallowRef(null);
const scene      = new THREE.Scene();
const renderer   = shallowRef(null);
const controls   = shallowRef(null);
const robot      = shallowRef(null);
const ambientLight     = new THREE.AmbientLight(0xffffff, 0.6);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5,5,5);

// Video streaming
const toggleState  = ref(false);
const streaming    = ref(false);
const videoElement = ref(null);
let peerConnection = null;

async function startWebRTCStream() {
  try {
    const pc = new RTCPeerConnection({
      sdpSemantics: "unified-plan",
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }]
    });
    peerConnection = pc;
    pc.addTransceiver("video", { direction: "recvonly" });
    pc.ontrack = e => { if (videoElement.value) videoElement.value.srcObject = e.streams[0] };
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await new Promise(r => {
      if (pc.iceGatheringState === "complete") return r();
      pc.addEventListener("icegatheringstatechange", function f() {
        if (pc.iceGatheringstate === "complete") {
          pc.removeEventListener("icegatheringstatechange", f);
          r();
        }
      });
    });
    const res = await fetch(STREAM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sdp: pc.localDescription.sdp, type: pc.localDescription.type })
    });
    if (!res.ok) throw new Error("Stream start failed");
    const ans = await res.json();
    await pc.setRemoteDescription(new RTCSessionDescription(ans));
    streaming.value = true;
  } catch (e) {
    console.error(e);
    toggleState.value = false;
  }
}
function stopWebRTCStream() {
  if (peerConnection) { peerConnection.close(); peerConnection = null; }
  streaming.value = false;
}
function toggleStream() {
  if (toggleState.value) startWebRTCStream();
  else stopWebRTCStream();
}

function updateSimulation(i) {
  if (!robot.value) return;
  const jointObj = robot.value.joints?.[`joint_${i+1}`];
  if (!jointObj) return;
  gsap.to(jointObj, {
    duration: 0.5, ease: "power2.out",
    onUpdate: () => {
      jointObj.setJointValue(
        THREE.MathUtils.degToRad(jointSettings.value[i].value)
      );
    }
  });
}

async function sendJointData() {
  loading.value = true;
  responseMessage.value = "";
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ joint_angles: jointSettings.value.map(j=>+j.value) })
    });
    if (!res.ok) throw new Error("Failed");
    const j = await res.json();
    responseMessage.value = j.message||"Data sent!";
  } catch(e) {
    responseMessage.value = "Error: "+e.message;
  } finally { loading.value = false; }
}

async function fetchCurrentState() {
  fetching.value = true;
  responseMessage.value = "";
  try {
    const res = await fetch(CURRENT_STATE_URL);
    if (!res.ok) throw new Error("Failed");
    const j = await res.json();
    if (Array.isArray(j.joint_angles)) {
      j.joint_angles.forEach((a,idx)=> {
        jointSettings.value[idx].currentValue = a;
        jointSettings.value[idx].value = a;
      });
      await nextTick();
      jointSettings.value.forEach((_,i)=>updateSimulation(i));
    }
    responseMessage.value = "State updated!";
  } catch(e) {
    responseMessage.value = "Error: "+e.message;
  } finally { fetching.value = false; }
}

const currentStep = computed(() =>
  recoverySteps.value[currentStepIndex.value] || { state:'', label: '', detail: '' }
)

// Map state keys to your stop‐API endpoints
const stopApiMap = {
  RECOVERY_SUCTION: `${STREAM_BASE}/process/stop_suction/`,
  SINK:    `${STREAM_BASE}/process/sink/`,
}

// Helper: fetch the first message from the recovery SSE and parse it
function fetchRecoveryListViaSSE() {
  return new Promise((resolve) => {
    const recEs = new EventSource(`${STREAM_BASE}/robot_state/recovery/`)
    recEs.onmessage = (e) => {
      let pyList = e.data.trim()                    // e.g. "['SUCTION','SINK']"
      try {
        // Convert Python quotes → JSON quotes
        const jsonList = pyList.replace(/'/g, '"')
        const arr = JSON.parse(jsonList)
        recEs.close()
        resolve(Array.isArray(arr) ? arr : [])
      } catch {
        recEs.close()
        resolve([])
      }
    }
    recEs.onerror = () => {
      recEs.close()
      resolve([])
    }
  })
}

// Begin the recovery modal flow
async function beginRecoveryFlow() {
  console.log('▶ beginRecoveryFlow() called')
  showEmergencyModal.value = true
  currentStepIndex.value   = 0
  expanded.value           = false

  // 1) pull the list via your helper
  const list = await fetchRecoveryListViaSSE()
  console.log('Fetched recovery list:', list)

  // 2) build your steps
  recoverySteps.value = list.map(state => ({
    state,
    label: state.charAt(0).toUpperCase() + state.slice(1),
    detail: `Full instructions for ${state}…`
  }))

  // 3) if empty, fallback to toast
  if (recoverySteps.value.length === 0) {
    showEmergencyModal.value      = false
    normalPopup.value.message     = '⚠️ EMERGENCY—no automatic recovery available!'
    normalPopup.value.show        = true
  }
}

// Resolve the current step, then re-run beginRecoveryFlow
async function resolveCurrentStep() {
  const step = currentStep.value
  if (!step.state) return

  // 1) Call its stop‐API
  await fetch(stopApiMap[step.state], { method: 'POST' }).catch(console.error)

  // 2) Give the backend a brief moment to update
  await new Promise(resolve => setTimeout(resolve, 500))

  // 3) Advance index + reset “see more”
  currentStepIndex.value++
  expanded.value = false

  // 4) Re-fetch & rebuild
  await beginRecoveryFlow()
}




// three.js initialization
onMounted(() => {
  camera.value = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.value.position.set(5,1.5,10);
  renderer.value = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.value.setSize(window.innerWidth/2, window.innerHeight);
  document.querySelector("#canvas-container").appendChild(renderer.value.domElement);
  controls.value = new OrbitControls(camera.value, renderer.value.domElement);
  controls.value.enableDamping = true;

  new URDFLoader().load("/m1013.blue.urdf", loaded => {
    loaded.scale.set(6,6,3.5);
    loaded.position.set(0,-2.5,0);
    loaded.rotation.set(-Math.PI/2,0,0);
    scene.add(loaded);
    robot.value = loaded;
    loaded.traverse(c=>{ if(c.isMesh){ c.castShadow=true; c.receiveShadow=true; } });
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


  function animate(){
    requestAnimationFrame(animate);
    controls.value.update();
    renderer.value.render(scene, camera.value);
  }
  animate();
    // --- SSE Handler ---
    console.log("▶ Setting up SSE listener");
  eventSource = new EventSource(`${STREAM_BASE}/robot_state/stream`);
  eventSource.onmessage = async (e) => {
    const raw = e.data.trim().toUpperCase();
    console.log("SSE raw data:", raw);

    if (!raw) {
      showEmergencyModal.value = false;
      normalPopup.value.show   = false;
      return;
    }
    if (raw === "EMERGENCY_STOP") {
      console.log("→ Detected EMERGENCY");
      normalPopup.value.show = false;
      await beginRecoveryFlow();
    } 
    else if (raw === "SAFE_OFF" || raw === "SAFEOFF") {
      console.log("→ Detected SAFE_OFF");
      showEmergencyModal.value       = false;
      normalPopup.value.message      = "✅ System is now safe.";
      normalPopup.value.show         = true;
    } 
    else {
      console.log("→ Detected other state:", raw);
      showEmergencyModal.value       = false;
      normalPopup.value.message      = raw;
      normalPopup.value.show         = true;
    }
  };
  eventSource.onerror = err => {
    console.error("SSE error:", err);
    eventSource.close();
  };
});

let eventSource = null;

onBeforeUnmount(() => {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
});
</script>