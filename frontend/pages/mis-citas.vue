<template>
  <div class="min-h-screen transition-colors duration-300" :class="oscuro ? 'bg-gray-900' : 'bg-pink-50'">

    <!-- Navbar -->
    <nav class="shadow-sm px-8 py-4 flex justify-between items-center transition-colors duration-300" :class="oscuro ? 'bg-gray-800' : 'bg-white'">
      <NuxtLink to="/" class="text-2xl font-bold text-pink-400">Daniela House</NuxtLink>
      <div class="flex items-center gap-4">
        <button @click="oscuro = !oscuro"
          class="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md transition"
          :class="oscuro ? 'bg-gray-700 text-yellow-300' : 'bg-pink-100 text-gray-700'">
          {{ oscuro ? '💡' : '🌙' }}
        </button>
        <NuxtLink to="/citas" class="text-pink-400 hover:text-pink-600 font-medium">Nueva cita</NuxtLink>
        <button @click="cerrarSesion" class="text-pink-400 hover:text-pink-600 font-medium">
          Cerrar sesión
        </button>
      </div>
    </nav>

    <div class="max-w-4xl mx-auto py-10 px-6">

      <h2 class="text-3xl font-bold text-pink-400 text-center mb-2">Mis Citas 💗</h2>
      <p class="text-center mb-10" :class="oscuro ? 'text-gray-400' : 'text-pink-300'">Aquí puedes ver todas tus citas agendadas</p>

      <!-- Sin citas -->
      <div v-if="citas.length === 0" class="rounded-3xl shadow p-16 text-center transition-colors duration-300" :class="oscuro ? 'bg-gray-800' : 'bg-white'">
        <div class="text-6xl mb-4">💅</div>
        <p class="text-lg mb-6" :class="oscuro ? 'text-gray-400' : 'text-pink-300'">No tienes citas agendadas aún</p>
        <NuxtLink to="/citas"
          class="bg-pink-400 hover:bg-pink-500 text-white px-8 py-3 rounded-xl font-bold transition">
          Agendar mi primera cita ✨
        </NuxtLink>
      </div>

      <!-- Lista de citas -->
      <div v-else class="space-y-4">
        <div v-for="cita in citas" :key="cita.id"
          class="rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-300"
          :class="oscuro ? 'bg-gray-800' : 'bg-white'">

          <div class="flex items-center gap-4">
            <div class="text-4xl">💅</div>
            <div>
              <h3 class="font-bold text-lg" :class="oscuro ? 'text-white' : 'text-gray-800'">{{ cita.nombre_servicio }}</h3>
              <p class="text-sm" :class="oscuro ? 'text-gray-400' : 'text-gray-500'">{{ formatFecha(cita.fecha) }} — {{ cita.hora }}</p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <span :class="estadoClase(cita.estado)" class="px-4 py-2 rounded-full text-sm font-medium">
              {{ cita.estado }}
            </span>
            <button
              v-if="cita.estado === 'pendiente'"
              @click="cancelarCita(cita.id)"
              class="text-red-300 hover:text-red-500 text-sm font-medium">
              Cancelar
            </button>
          </div>

        </div>

        <div class="text-center mt-8">
          <NuxtLink to="/citas"
            class="bg-pink-400 hover:bg-pink-500 text-white px-8 py-3 rounded-xl font-bold transition">
            Agendar nueva cita ✨
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const { oscuro } = useDarkMode()

const citas = ref([])

const cargarCitas = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:3001/api/citas/mis-citas', {
      headers: { 'authorization': token }
    })
    citas.value = await res.json()
  } catch (e) {
    console.log('Error cargando citas')
  }
}

const cancelarCita = async (id) => {
  try {
    const token = localStorage.getItem('token')
    await fetch(`http://localhost:3001/api/citas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify({ estado: 'cancelada' })
    })
    await cargarCitas()
  } catch (e) {
    console.log('Error cancelando cita')
  }
}

const formatFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

const estadoClase = (estado) => {
  if (estado === 'confirmada') return 'bg-green-100 text-green-600'
  if (estado === 'cancelada') return 'bg-red-100 text-red-400'
  return 'bg-yellow-100 text-yellow-600'
}

const cerrarSesion = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  navigateTo('/login')
}

onMounted(() => cargarCitas())
</script>