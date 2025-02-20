
<!-- import Circle_control from '../pages/Circle_control.vue' -->

<!-- import Joint_move from './Joint_move.vue' -->
<!-- <template>
    <nav class="bg-white shadow-md py-4">
      <div class="container mx-auto flex justify-between items-center px-6">
    
        <a href="/" class="text-2xl font-bold text-gray-900 flex items-center">
          <img src="assets/download-removebg-preview.png" alt="Logo" class="h-10 mr-2">
          
        </a>
  
      
        <ul class="flex space-x-6 text-gray-700 font-medium">
          <li><a href="/" class="hover:text-blue-600">Home</a></li>
          <li><a href="/products" class="hover:text-blue-600">Products</a></li>
          <li><a href="/control" class="hover:text-blue-600">Control</a></li>
          <li><a href="/login" class="hover:text-blue-600">Login</a></li>
        </ul>
      </div>
    </nav>
  </template>
   -->
   <template>
    <nav class="w-full bg-white p-4 shadow-md">
      <div class="max-w-screen-xl mx-auto flex justify-between h-16 items-center">
        <a href="/" class="text-2xl font-bold">
          <img src="assets/download-removebg-preview.png" alt="Logo" class="h-15">
        </a>
        <ul class="flex space-x-6 relative">
          <li><a href="/" class="hover:text-gray-500 text-black">Home</a></li>
          <li><a href="/products" class="hover:text-gray-500 text-black">Products</a></li>
  
          <!-- Dropdown Menu for "Control" -->
          <li class="relative group">
            <a href="#" class="hover:text-gray-500 text-black inline-block">Control</a>
            <ul class="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <li><NuxtLink to="/joint-move" class="hover:text-gray-500 block px-4 py-2 hover:bg-gray-200 text-black">Joints movement</NuxtLink></li>
              <li><NuxtLink to="/Circle_Control" class="hover:text-gray-500 block px-4 py-2 hover:bg-gray-200 text-black">Controller</NuxtLink></li>
              <li><NuxtLink to="/" class="hover:text-gray-500 block px-4 py-2 hover:bg-gray-200 text-black">AGV movement</NuxtLink></li>
             
            </ul>
          </li>
          <li><NuxtLink to="/Login" class="hover:text-gray-500 text-black">Login</NuxtLink></li>
        </ul>
      </div>
    </nav>
  </template>
  
  <style scoped>
  /* Additional scoped styles if needed */
  </style>
  