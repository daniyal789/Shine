<!-- for joint move.vue 
<template>
    <div class="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <div class=" max-w-screen-lg mx-auto px-4">
      <h1 class="text-2xl font-semibold mb-4">Joint Movement Control</h1> -->

      <!-- Loop through jointSettings array and create a slider with editable value -->
      <!-- <div v-for="(joint, index) in jointSettings" :key="index" class="mb-4">
        <div class="flex items-center space-x-4">
          <label :for="'joint' + index" class="block text-gray-700 font-medium">
            Joint {{ index + 1 }}:
          </label> -->

          <!-- Editable input box for joint value -->
          <!-- <input 
            type="number" 
            v-model.number="joint.value" 
            :min="joint.min" 
            :max="joint.max" 
            class="border border-gray-300 rounded px-2 py-1 w-20 text-center"
          />
        </div> -->

        <!-- Slider for joint movement -->
        <!-- <input 
          type="range" 
          :id="'joint' + index" 
          v-model="joint.value" 
          :min="joint.min" 
          :max="joint.max" 
          class="block w-full accent-blue-500 mt-2"
        />
      </div> -->

      <!-- Button to send joint data -->
      <!-- <button 
        @click="sendJointData"
        :disabled="loading"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? "Sending..." : "Set" }}
      </button> -->

      <!-- Response message -->
      <!-- <p v-if="responseMessage" class="mt-2 text-green-600">{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'; -->

<!-- // Define joint settings with different min/max values -->
<!-- const jointSettings = ref([
  { value: 0, min: -360, max: 360 },  // Joint 1
  { value: 0, min: -95, max: 95 },    // Joint 2
  { value: 0, min: -160, max: 160 },  // Joint 3
  { value: 0, min: -360, max: 360 },  // Joint 4
  { value: 0, min: -160, max: 160 },  // Joint 5
  { value: 0, min: -360, max: 360 }   // Joint 6
]);

const loading = ref(false);
const responseMessage = ref("");
const API_URL = "http://192.168.29.7:3000/increase_joint/"; // Ensure this is the correct API endpoint

const sendJointData = async () => {
  loading.value = true;
  responseMessage.value = ""; -->

  <!-- // Prepare data as JSON -->
  <!-- 
  
  
  
  
  
  
  -->
  <!-- }
};
</script> -->






<!-- home.vue dump

<template>
    <section class="py-10 bg-gray-100">
      <h2 class="text-center text-3xl font-bold text-gray-800 mb-6">Our Solutions</h2>
      
      <div class="flex  justify-between  gap-1 mx-auto">
        <div v-for="(item, index) in solutions" :key="index" class="w-full sm:w-1/2 lg:w-1/4 bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
          <img :src="item.image" :alt="item.title" class="w-20 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-700">{{ item.title }}</h3>
          <p class="text-gray-500 mt-2">{{ item.description }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        solutions: [
          { title: "Robotic Arm", image: "/download.jpg", description: "Automated precision handling." },
          { title: "AGV", image: "/images/agv.png", description: "Autonomous guided vehicles for logistics." },
          { title: "Vision System", image: "/images/vision-system.png", description: "Advanced machine vision for quality control." },
          { title: "Troubleshoot & Maintenance", image: "/images/maintenance.png", description: "AI-driven diagnostics and repair guidance." }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  
  </style>
   -->

   <!-- <template></template> -->


   <!-- {
    "name": "raas-frontend2",
    "version": "1.0.0",
    "private": true,
    "scripts": {
      "dev": "nuxi dev",
      "build": "nuxt build",
      "start": "nuxt start",
      "generate": "nuxt generate"
    },
    "dependencies": {
      "consola": "^3.4.0",
      "core-js": "^3.25.3",
      "nitropack": "^2.10.1",
      "nuxt": "^3.15.4",
      "ufo": "^1.5.4",
      "vue": "^3.5.13"
    },
    "devDependencies": {
      "@nuxtjs/tailwindcss": "^6.13.1",
      "@vue/compiler-sfc": "^3.5.13",
      "autoprefixer": "^10.4.20",
      "postcss": "^8.5.1"
    }
  }
   -->
   <!-- import math
   import threading
   from fastapi import FastAPI
   from fastapi.middleware.cors import CORSMiddleware
   from typing import List, Dict
   import rclpy
   from rclpy.node import Node
   from std_msgs.msg import Float64MultiArray  # Publishing joint angles as an array
   from arm_move_moveit import pub_servo_twist, attach_box, detach_box  # Imported functions from arm_move_moveit
    
   # Create FastAPI app
   app = FastAPI()
    
   # Enable CORS (Allows requests from UI)
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # Allow requests from any origin
       allow_credentials=True,
       allow_methods=["*"],  # Allow all HTTP methods
       allow_headers=["*"],  # Allow all headers
   )
    
   # Initialize ROS2 Node
   rclpy.init()
    
   class JointAnglePublisher(Node):
       def __init__(self):
           super().__init__('joint_angle_publisher')
           self.publisher = self.create_publisher(Float64MultiArray, '/desired_joint_angles', 10)
           self.joint_positions = [0.0] * 6  # Initial joint angles
    
       def send_joint_angles(self, joint_data):
           """Receive joint angles from UI, convert to radians, and publish to ROS2"""
           for joint in joint_data:
               index = int(joint["joint"]) - 1  # Convert 1-based UI index to 0-based list index
               if 0 <= index < len(self.joint_positions):
                   self.joint_positions[index] = math.radians(float(joint["value"]))  # Convert degrees to radians
    
           # Publish new joint positions
           msg = Float64MultiArray()
           msg.data = self.joint_positions
           self.publisher.publish(msg)
           self.get_logger().info(f'Published joint angles: {self.joint_positions}')
    
   # Create ROS2 node instance
   node = JointAnglePublisher()
    
   @app.post("/increase_joint/")
   async def increase_joint(joint_data: Dict[str, List[Dict[str, float]]]):
       """
       API endpoint to update joint angles.
       Expects JSON: {"joints": [{"joint": 1, "value": 30}, {"joint": 2, "value": -45}, ...]}
       """
       joints = joint_data.get("joints", [])
       node.send_joint_angles(joints)
       return {"message": "Joint angles sent to ROS2", "new_angles": joints}
    
   @app.post("/cartesian_move/")
   async def cartesian_move(pose_data: Dict[str, float]):
       """
       API endpoint for Cartesian movement.
       JSON format: {"x": 0.5, "y": 0.2, "z": 0.1, "roll": 0, "pitch": 0, "yaw": 0}
       """
       twist = [pose_data["x"], pose_data["y"], pose_data["z"], pose_data["roll"], pose_data["pitch"], pose_data["yaw"]]
       print(twist)
       pub_servo_twist(twist)  # Call function from arm_move_moveit
       return {"message": "Cartesian pose sent", "pose": pose_data}
    
   @app.post("/attach/")
   async def attach():
       """API endpoint to activate the suction gripper."""
       attach_box("model")  # Call function from arm_move_moveit
       return {"message": "Box attached successfully"}
    
   @app.post("/detach/")
   async def detach():
       """API endpoint to deactivate the suction gripper."""
       detach_box("model")  # Call function from arm_move_moveit
       return {"message": "Box detached successfully"}
    
   # Run ROS2 spin in a separate thread
   threading.Thread(target=rclpy.spin, args=(node,), daemon=True).start()
     -->
    



     <template>
      <div class="flex flex-row gap-8 items-stretch h-screen bg-gray-100 p-10 ">
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
          <input type="checkbox" v-model="toggleState" class="hidden" @change="toggleStream">
          <span class="w-10 h-5 bg-gray-300 rounded-full flex items-center transition duration-300"
                  :class="{ 'bg-green-400': toggleState }">
              <span class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"
                  :class="{ 'translate-x-5': toggleState }"></span>
          </span>
          <span class="text-gray-700">Enable Mode</span>
          </label>

          <!-- ✅ Live Video Feed using <img> -->
          <div v-if="streaming" class="w-full flex justify-center">
          <img :src="STREAM_URL" alt="Live Stream" class="mt-4 w-full max-w-lg rounded-lg shadow">
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


  const toggleState = ref(false);
const streaming = ref(false);
// const STREAM_URL = "http://192.168.137.66:8000/video_feed"; // Backend URL

const toggleStream = () => {
console.log("Toggle clicked. Current state:", toggleState.value);

if (toggleState.value) {
  console.log("Starting stream from:", STREAM_URL);
  streaming.value = true;
} else {
  stopStream();
}
};

const stopStream = () => {
console.log("Stopping video stream...");
streaming.value = false;
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
  });
  </script>
