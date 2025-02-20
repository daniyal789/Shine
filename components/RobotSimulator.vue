<!-- <template>
    <div class="w-full h-full">
      <Renderer ref="rendererRef" class="w-full h-full">
        <Camera ref="cameraRef" :position="[0, 2, 5]" />
        <Scene ref="sceneRef">
          <OrbitControls />
          <AmbientLight :intensity="0.8" />
        </Scene>
      </Renderer>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { Renderer, Scene, Camera, OrbitControls, AmbientLight } from "troisjs";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  
  const modelPath = "/robot_arm.glb";
  const sceneRef = ref(null);
  const cameraRef = ref(null);
  const rendererRef = ref(null);
  
  onMounted(() => {
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        sceneRef.value.add(gltf.scene);
        console.log("Model Loaded", gltf.scene);
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );
  });
  </script>
   -->
   <!-- <template>
    <div class="w-full h-full">
      <Renderer ref="rendererRef" class="w-full h-full">
        <Camera ref="cameraRef" :position="[0, 2, 5]" />
        <Scene ref="sceneRef">
          <OrbitControls />
          <AmbientLight :intensity="0.8" />
        </Scene>
      </Renderer>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { Renderer, Scene, Camera, OrbitControls, AmbientLight } from "troisjs";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  
  const modelPath = "/robot_arm.glb";
  const sceneRef = ref(null);
  const cameraRef = ref(null);
  const rendererRef = ref(null);
  const robotModel = ref(null);
  
  onMounted(() => {
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        robotModel.value = gltf.scene;
        sceneRef.value.add(robotModel.value);
        console.log("Model Loaded", robotModel.value);
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );
  });
  
  // Function to update joint rotations
  const updateJoints = (jointData) => {
    if (!robotModel.value) return;
  
    jointData.forEach(({ joint, value }) => {
      const jointName = `Joint_${joint}`;
      const jointObject = robotModel.value.getObjectByName(jointName);
  
      if (jointObject) {
        jointObject.rotation.z = (value * Math.PI) / 180; // Convert degrees to radians
      }
    });
  
    console.log("Updated Joint Positions:", jointData);
  };
  
  // Expose function for external calls
  defineExpose({ updateJoints });
  </script>
   -->
   <template>
    <div class="flex flex-col w-full h-full bg-gray-100">
      <!-- Control Panel -->
      <div class="flex justify-between p-4 bg-gray-800 text-white">
        <div class="flex flex-col space-y-4">
          <h2 class="text-xl font-semibold">Control Panel</h2>
          <div v-for="(joint, index) in joints" :key="index" class="flex items-center space-x-4">
            <label :for="'joint-' + index" class="text-sm">{{ joint.name }}</label>
            <input
              type="range"
              :id="'joint-' + index"
              v-model="joint.angle"
              min="-180"
              max="180"
              step="1"
              class="w-64"
              @input="updateJoint(index)"
            />
            <span>{{ joint.angle }}°</span>
          </div>
        </div>
      </div>
  
      <!-- 3D Simulation -->
      <div class="flex-1">
        <Canvas ref="canvas" class="w-full h-full">
          <Camera :position="{ x: 0, y: 2, z: 5 }" />
          <PointLight :position="{ x: 5, y: 5, z: 5 }" :intensity="1.5" />
          <AmbientLight :intensity="0.5" />
          
          <!-- Load Robot Model -->
          <GLTFModel src="/robot_arm.glb" ref="robotModel" @load="onModelLoad">
            <template v-if="modelLoaded" #default="{ scene }">
              <Group ref="robot">
                <primitive :object="scene" />
              </Group>
            </template>
          </GLTFModel>
        </Canvas>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { GLTFLoader } from 'three/examples/js/loaders/GLTFLoader.js';
  import { Canvas, Camera, PointLight, AmbientLight, GLTFModel, Group } from 'troisjs';
  
  // Define joint model data
  const joints = ref([
    { name: 'Joint 1', angle: 0 },
    { name: 'Joint 2', angle: 0 },
    { name: 'Joint 3', angle: 0 },
    { name: 'Joint 4', angle: 0 },
    { name: 'Joint 5', angle: 0 },
    { name: 'Joint 6', angle: 0 }
  ]);
  
  const modelLoaded = ref(false);
  const robot = ref(null);
  
  const onModelLoad = (gltf) => {
    if (!gltf) {
      console.error("GLTF Model failed to load.");
      return;
    }
    robot.value = gltf.scene;
    modelLoaded.value = true;
  };
  
  const updateJoint = (index) => {
    if (!robot.value) return;
  
    const jointNames = ["joint1", "joint2", "joint3", "joint4", "joint5", "joint6"];
    const joint = robot.value.getObjectByName(jointNames[index]);
  
    if (joint) {
      joint.rotation.z = joints.value[index].angle * (Math.PI / 180); // Convert angle to radians
    }
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS styling */
  .w-full {
    width: 100%;
  }
  .h-full {
    height: 100vh;
  }
  .bg-gray-100 {
    background-color: #f7fafc;
  }
  .bg-gray-800 {
    background-color: #2d3748;
  }
  </style>
  