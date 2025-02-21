<!-- <template>
    <div class="login-page p-8 max-w-md mx-auto">
      <h1 class="text-2xl mb-4 text-center">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"/>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"/>
        </div>
        <button type="submit" class="btn-primary w-full mt-4">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const password = ref('')
  
  const login = () => {
    alert(`Logging in with email: ${email.value} and password: ${password.value}`)
  }
  </script> -->
  
  <!-- <style scoped>
  .btn-primary {
    @apply bg-blue-500 text-white px-4 py-2 rounded;
  }
  </style> -->

  <template>
    <div class="flex h-screen">
      <!-- Left Section -->
      <div id="canvas-container" class="w-1/2 h-screen bg-gray-200 "></div>
  
      <!-- Right Section (Auth Form) -->
      <div class="w-1/2 flex items-center justify-center text-green-700 p-8">
        <div class="auth-container max-w-md w-full">
          <h1 class="text-4xl font-bold my-4 text-center">
            {{ isSignUp ? 'Sign Up' : 'Login' }}
          </h1>
  
          <form @submit.prevent="handleSubmit">
            <div v-if="isSignUp">
              <div class="mb-4">
                <label for="name" class="block text-sm mx-4 font-medium text-gray-700">Name</label>
                <input type="text" id="name" v-model="name"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"/>
              </div>
            </div>
            
            <div class="mb-4">
              <label for="email" class="block text-sm mx-4 font-medium text-gray-700">Email</label>
              <input type="email" id="email" v-model="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"/>
            </div>
            
            <div class="mb-4">
              <label for="password" class="block text-sm mx-4 font-medium text-gray-700">Password</label>
              <input type="password" id="password" v-model="password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"/>
            </div>
            
            <div class="flex justify-center">
              <button type="submit" class="btn-primary font-medium text-green-700  p-2 rounded-md text-2xl w-cover m-2">
                {{ isSignUp ? 'Register' : 'Login' }}
              </button>
            </div>
          </form>
  
          <p class="m-4 text-center">
            {{ isSignUp ? 'Already have an account?' : 'Don\'t have an account?' }}
            <button @click="toggleForm" class="text-green-700  underline">
              {{ isSignUp ? 'Login' : 'Sign Up' }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </template>
  

  
  <script setup>
  import { ref, onMounted, shallowRef } from "vue";
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
  import URDFLoader from "urdf-loader";
  
  const camera = shallowRef(null);
  const scene = new THREE.Scene();
  const renderer = shallowRef(null);
  const controls = shallowRef(null);
  const robot = shallowRef(null);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(5, 5, 5);
  
  onMounted(() => {
    camera.value = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.value.position.set(0, 1.5, 5);
  
    renderer.value = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.value.setSize(window.innerWidth / 2, window.innerHeight);
    document.querySelector("#canvas-container").appendChild(renderer.value.domElement);
  
    controls.value = new OrbitControls(camera.value, renderer.value.domElement);
    controls.value.enableDamping = true;
  
    // Load the Robot Model
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
  });
  
  // Login Form Logic
  const isSignUp = ref(true);
  const name = ref("");
  const email = ref("");
  const password = ref("");
  
  const toggleForm = () => {
    isSignUp.value = !isSignUp.value;
    name.value = "";
    email.value = "";
    password.value = "";
  };
  
  const handleSubmit = () => {
    if (isSignUp.value) {
      alert(`Signing up with name: ${name.value}, email: ${email.value}, and password: ${password.value}`);
    } else {
      alert(`Logging in with email: ${email.value} and password: ${password.value}`);
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  button {
    cursor: pointer;
  }
  .input-field {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border-radius: 4px;
    border: 1px solid #ccc;
    transition: border 0.2s ease-in-out;
  }
  .input-field:focus {
    border-color: #007bff;
    outline: none;
  }
  .btn-primary {
    background-color: #1e3a8a;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 18px;
  }
  </style>
  