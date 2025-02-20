<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white text-gray-500">
    <h1 class="text-3xl font-bold mb-6 text-green-500">Custom Game Controller</h1>

    <div class="flex gap-12 items-center">
      <!-- Left Circular Buttons -->
      <div class="relative w-48 h-48 bg-gray-800 border-4 border-green-500 rounded-full flex items-center justify-center shadow-lg">
        <button @click="handleButtonClick('Up-Left')" class="absolute top-3 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white p-3 rounded-full border-2 border-green-500 shadow-md hover:bg-green-600">▲</button>
        <button @click="handleButtonClick('Down-Left')" class="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white p-3 rounded-full border-2 border-green-500 shadow-md hover:bg-green-600">▼</button>
        <button @click="handleButtonClick('Left-Left')" class="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full border-2 border-green-500 shadow-md hover:bg-green-600">◀</button>
        <button @click="handleButtonClick('Right-Left')" class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full border-2 border-green-500 shadow-md hover:bg-green-600">▶</button>
      </div>

      <!-- Central Buttons (Two Columns, Now Centered) -->
      <div class="grid grid-cols-2 gap-4 min-w-[10rem] text-center">
        <button @click="handleButtonClick('Top Left')" class="bg-green-600 h-12 text-white px-6 py-3 rounded-lg border-2 border-gray-400 shadow-md hover:bg-green-700">X</button>
        <button @click="handleButtonClick('Top Right')" class="bg-green-600 h-12 text-white px-6 py-3 rounded-lg border-2 border-gray-400 shadow-md hover:bg-green-700">O</button>
        <button @click="handleButtonClick('Bottom Left')" class="bg-green-600 h-12 text-white px-6 py-3 rounded-lg border-2 border-gray-400 shadow-md hover:bg-green-700">□</button>
        <button @click="handleButtonClick('Bottom Right')" class="bg-green-600 h-12 text-white px-6 py-3 rounded-lg border-2 border-gray-400 shadow-md hover:bg-green-700">△</button>
      </div>

      <!-- Right Circular Buttons -->
      <div class="relative w-48 h-48 bg-gray-800 border-4 border-green-500 rounded-full flex items-center justify-center shadow-lg">
        <button @click="handleButtonClick('Up-Right')" class="absolute top-3 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white p-3 rounded-full border-2 border-green-500 shadow-md hover:bg-green-600">▲</button>
        <button @click="handleButtonClick('Down-Right')" class="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white p-3 rounded-full border-2 border-green-500 shadow-md hover:bg-green-600">▼</button>
        <button @click="handleButtonClick('Left-Right')" class="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full border-2 border-green-500 shadow-md hover:bg-green-600">◀</button>
        <button @click="handleButtonClick('Right-Right')" class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full border-2 border-green-500 shadow-md hover:bg-green-600">▶</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const handleButtonClick = (button) => {
  console.log(`Button Pressed: ${button}`);
};
</script>

<style scoped>
/* Optional custom styling */
</style>
