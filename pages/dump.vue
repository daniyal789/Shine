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
      <div class=" flex flex-row gap-8 items-center justify-between min-h-screen bg-gray-100 px-8">
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
    
        <!-- Animation Placeholder (Right Side) -->
        <div class="w-1/2 h-full flex items-center justify-center animation-container">
          <p class="text-gray-500 text-lg">[Animation Goes Here]</p>
        </div>
      </div>
    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue';
    
    // Define joint settings with different min/max values
    const jointSettings = ref([
      { value: 0, min: -360, max: 360 },  // Joint 1
      { value: 0, min: -95, max: 95 },    // Joint 2
      { value: 0, min: -160, max: 160 },  // Joint 3
      { value: 0, min: -360, max: 360 },  // Joint 4
      { value: 0, min: -160, max: 160 },  // Joint 5
      { value: 0, min: -360, max: 360 }   // Joint 6
    ]);
    
    const loading = ref(false);
    const responseMessage = ref("");
    const API_URL = "http://192.168.29.105:3000/increase_joint/";
    
    const sendJointData = async () => {
      loading.value = true;
      responseMessage.value = "";
    
      // Prepare data as JSON
      const jointData = jointSettings.value.map((joint, index) => ({
        joint: index + 1,
        value: Number(joint.value),
      }));
    
      console.log("Sending joint data:", JSON.stringify({ joints: jointData }, null, 2));
    
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ joints: jointData }),
        });
    
        if (!response.ok) {
          throw new Error(`Failed to send joint data (Status: ${response.status})`);
        }
    
        const result = await response.json();
        responseMessage.value = result.message || "Data sent successfully!";
      } catch (error) {
        console.error("Error sending data:", error);
        responseMessage.value = "Error: " + error.message;
      } finally {
        loading.value = false;
      }
    };
    
    // Animation when page loads
    onMounted(() => {
      setTimeout(() => {
        document.querySelectorAll(".fade-in").forEach(el => {
          el.classList.add("opacity-100");
        });
      }, 200);
    });
    </script>
    
    <style scoped>
    /* Fade-in animation */
    .fade-in {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    }
    
    .opacity-100 {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Placeholder for future animations */
    .animation-container {
      background: linear-gradient(135deg, rgba(0, 0, 255, 0.1), rgba(0, 0, 255, 0.05));
      border-radius: 12px;
      height: 80vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    </style>
    