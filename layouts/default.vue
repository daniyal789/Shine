<!-- layouts/default.vue -->
<!-- <template>
    <div class="flex flex-col h-screen">
      <header class="bg-gray-900 text-white p-4">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl font-bold">Robot as a Service</h1>
        </div>
      </header>
  
      <main class="flex-1">
        <slot />
      </main>
  
      <footer class="bg-gray-900 text-white p-4">
        <div class="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 AlphaShine Inc.</p>
        </div>
      </footer>
    </div>
  </template> -->

<template>
  <div>
    <Header />
    <NuxtPage />
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
  
