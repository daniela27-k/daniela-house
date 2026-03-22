<template>
  <div class="min-h-screen flex items-center justify-center transition-colors duration-300" :class="oscuro ? 'bg-gray-900' : 'bg-pink-50'">
    <div class="rounded-3xl shadow-lg p-10 w-full max-w-md transition-colors duration-300" :class="oscuro ? 'bg-gray-800' : 'bg-white'">

      <!-- Logo -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-black-400"> Daniela House</h1>
        <p class="mt-2" :class="oscuro ? 'text-gray-400' : 'text-black-300'">Crea tu cuenta</p>
      </div>

      <!-- Formulario -->
      <div class="space-y-5">
        <div>
          <label class="block font-medium mb-1 text-black-400">Nombre completo</label>
          <input
            v-model="nombre"
            type="text"
            placeholder="Tu nombre"
            class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors duration-300"
            :class="oscuro ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-pink-200 text-gray-600'"
          />
        </div>

        <div>
          <label class="block font-medium mb-1 text-black-400">Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            placeholder="tu@correo.com"
            class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors duration-300"
            :class="oscuro ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-pink-200 text-gray-600'"
          />
        </div>

        <div>
          <label class="block font-medium mb-1 text-black-400">Contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors duration-300"
            :class="oscuro ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-pink-200 text-gray-600'"
          />
        </div>

        <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>
        <p v-if="exito" class="text-green-400 text-sm text-center">{{ exito }}</p>

        <button
          @click="registrarse"
          class="w-full bg-pink-400 hover:bg-black-500 text-white font-bold py-3 rounded-xl transition">
          Crear cuenta
        </button>

        <p class="text-center text-sm" :class="oscuro ? 'text-gray-400' : 'text-black-300'">
          ¿Ya tienes cuenta?
          <NuxtLink to="/login" class="text-pink-400 font-medium hover:underline">
            Inicia sesión
          </NuxtLink>
        </p>

       <button
  @click="irInicio"
  class="w-full border-2 border-pink-300 text-pink-400 hover:bg-pink-50 font-bold py-3 rounded-xl transition">
  ← Volver a la página principal
</button>

      </div>
    </div>
  </div>
</template>

<script setup>
const { oscuro } = useDarkMode()

const nombre = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const exito = ref('')

const irInicio = () => {
  window.location.href = '/'
}

const registrarse = async () => {
  if (!nombre.value || !email.value || !password.value) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  try {
    const res = await fetch('http://localhost:3001/api/auth/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: nombre.value,
        email: email.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (!res.ok) {
      error.value = data.error || 'Error al registrarse'
      return
    }

    exito.value = '¡Cuenta creada exitosamente! Redirigiendo...'
    setTimeout(() => navigateTo('/login'), 2000)

  } catch (e) {
    error.value = 'No se pudo conectar con el servidor'
  }
}
</script>