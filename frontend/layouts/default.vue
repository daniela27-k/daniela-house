<template>
  <div :class="oscuro ? 'bg-gray-900' : 'bg-white'" class="min-h-screen transition-colors duration-300">
    
    <!-- Botón flotante modo oscuro -->
    <button @click="toggleDarkMode"
      class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg transition"
      :class="oscuro ? 'bg-gray-700 text-yellow-300' : 'bg-pink-100 text-gray-700'">
      {{ oscuro ? '💡' : '🌙' }}
    </button>

    <NuxtPage />
  </div>
</template>

<script setup>
const { oscuro, toggleDarkMode } = useDarkMode()
</script>