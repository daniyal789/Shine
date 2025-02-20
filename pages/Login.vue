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
    <div class="auth-container max-md:m-8 p-8 max-w-md bg-[#d9b99b] my-5 mx-auto">
        <!-- <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet"> -->

      <h1 class="text-4xl font-bold mb-4 text-center" v-if="isSignUp">Sign Up</h1>
      <h1 class="text-4xl font-bold mb-4 text-center" v-else>Login</h1>
  
      <form @submit.prevent="handleSubmit">
        <div v-if="isSignUp">
          <div class="mb-4">
            <label for="name" class="block text-sm  font-medium text-gray-700">Name</label>
            <input type="text" id="name" v-model="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"/>
          </div>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"/>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"/>
        </div>
        <div class="flex justify-center">
        <button type="submit" class="btn-primary font-medium text-white bg-gray-800 p-1 rounded-md  text-2xl w-auto mt-4"> {{ isSignUp ? 'Sign Up' : 'Login' }} </button>
      </div>
      </form>
  
      <p class="mt-4 text-center">
        {{ isSignUp ? 'Already have an account?' : 'Don\'t have an account?' }}
        <button @click="toggleForm" class="text-blue-500 underline">
          {{ isSignUp ? 'Login' : 'Sign Up' }}
        </button>
      </p>
    </div>
  </template>
<script setup>


const isSignUp = ref(true)
const name = ref('')
const email = ref('')
const password = ref('')

const toggleForm = () => {
  isSignUp.value = !isSignUp.value
  name.value = ''
  email.value = ''
  password.value = ''
}

const handleSubmit = () => {
  if (isSignUp.value) {
    alert(`Signing up with name: ${name.value}, email: ${email.value}, and password: ${password.value}`)
  } else {
    alert(`Logging in with email: ${email.value} and password: ${password.value}`)
  }
}
</script>
<script>
export default {
  layout: 'auth'
}
</script>

<style scoped>
.auth-container {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button {
  cursor: pointer;
}
</style>

  
  