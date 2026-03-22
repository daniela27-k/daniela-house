<template>
  <div class="min-h-screen transition-colors duration-300" :class="oscuro ? 'bg-gray-900' : 'bg-pink-50'">

    <!-- Navbar -->
    <nav class="shadow-sm px-8 py-4 flex justify-between items-center transition-colors duration-300" :class="oscuro ? 'bg-gray-800' : 'bg-white'">
      <h1 class="text-2xl font-bold text-black-500"> Daniela House - Admin</h1>
      <div class="flex items-center gap-4">
        <button @click="cerrarSesion" class="text-black-400 hover:text-pink-600 font-medium">
          Cerrar sesión
        </button>
      </div>
    </nav>

    <div class="max-w-6xl mx-auto py-10 px-6">

      <!-- Bienvenida -->
      <div class="rounded-3xl shadow p-8 mb-8 text-center transition-colors duration-300" :class="oscuro ? 'bg-gray-800' : 'bg-white'">
        <h2 class="text-3xl font-bold text-black-400 mb-2">¡Bienvenida, Daniela! 👑</h2>
        <p :class="oscuro ? 'text-gray-400' : 'text-black-300'">Aquí puedes gestionar todas las citas de tu negocio</p>
      </div>

      <!-- Tarjetas resumen -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div class="rounded-2xl shadow p-6 text-center transition-colors duration-300" :class="oscuro ? 'bg-gray-800' : 'bg-white'">
          <div class="text-4xl mb-2">📋</div>
          <h3 class="text-2xl font-bold text-black-400">{{ totalCitas }}</h3>
          <p :class="oscuro ? 'text-gray-400' : 'text-black-300'">Total citas</p>
        </div>
        <div class="rounded-2xl shadow p-6 text-center transition-colors duration-300" :class="oscuro ? 'bg-gray-800' : 'bg-white'">
          <div class="text-4xl mb-2">⏳</div>
          <h3 class="text-2xl font-bold text-black-400">{{ citasPendientes }}</h3>
          <p :class="oscuro ? 'text-gray-400' : 'text-black-300'">Pendientes</p>
        </div>
        <div class="rounded-2xl shadow p-6 text-center transition-colors duration-300" :class="oscuro ? 'bg-gray-800' : 'bg-white'">
          <div class="text-4xl mb-2">✅</div>
          <h3 class="text-2xl font-bold text-black-400">{{ citasConfirmadas }}</h3>
          <p :class="oscuro ? 'text-gray-400' : 'text-black-300'">Confirmadas</p>
        </div>
      </div>

      <!-- Tabla de citas -->
      <div class="rounded-3xl shadow p-8 transition-colors duration-300" :class="oscuro ? 'bg-gray-800' : 'bg-white'">
        <h3 class="text-xl font-bold text-black-400 mb-6">Citas agendadas</h3>

        <div v-if="citas.length === 0" class="text-center py-10" :class="oscuro ? 'text-gray-400' : 'text-black-300'">
          No hay citas agendadas aún 💗
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b" :class="oscuro ? 'border-gray-700' : 'border-pink-100'">
                <th class="text-pink-400 pb-3 pr-4">Cliente</th>
                <th class="text-pink-400 pb-3 pr-4">Servicio</th>
                <th class="text-pink-400 pb-3 pr-4">Fecha</th>
                <th class="text-pink-400 pb-3 pr-4">Hora</th>
                <th class="text-pink-400 pb-3 pr-4">Estado</th>
                <th class="text-pink-400 pb-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cita in citas" :key="cita.id"
                class="border-b transition-colors duration-300"
                :class="oscuro ? 'border-gray-700 hover:bg-gray-700' : 'border-pink-50 hover:bg-pink-50'">
                <td class="py-3 pr-4" :class="oscuro ? 'text-gray-300' : 'text-gray-600'">{{ cita.nombre_usuario }}</td>
                <td class="py-3 pr-4" :class="oscuro ? 'text-gray-300' : 'text-gray-600'">{{ cita.nombre_servicio }}</td>
                <td class="py-3 pr-4" :class="oscuro ? 'text-gray-300' : 'text-gray-600'">{{ formatFecha(cita.fecha) }}</td>
                <td class="py-3 pr-4" :class="oscuro ? 'text-gray-300' : 'text-gray-600'">{{ cita.hora }}</td>
                <td class="py-3 pr-4">
                  <span :class="estadoClase(cita.estado)" class="px-3 py-1 rounded-full text-sm font-medium">
                    {{ cita.estado }}
                  </span>
                </td>
                <td class="py-3 flex gap-2">
                  <button
                    v-if="cita.estado === 'pendiente'"
                    @click="cambiarEstado(cita.id, 'confirmada')"
                    class="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded-lg text-sm transition">
                    Confirmar
                  </button>
                  <button
                    v-if="cita.estado !== 'cancelada'"
                    @click="cambiarEstado(cita.id, 'cancelada')"
                    class="bg-red-300 hover:bg-red-400 text-white px-3 py-1 rounded-lg text-sm transition">
                    Cancelar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { oscuro } = useDarkMode()

const citas = ref([])

const totalCitas = computed(() => citas.value.length)
const citasPendientes = computed(() => citas.value.filter(c => c.estado === 'pendiente').length)
const citasConfirmadas = computed(() => citas.value.filter(c => c.estado === 'confirmada').length)

const cargarCitas = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('daniela-house-production.up.railway.app/api/citas', {
      headers: { 'authorization': token }
    })
    citas.value = await res.json()
  } catch (e) {
    console.log('Error cargando citas')
  }
}

const cambiarEstado = async (id, estado) => {
  try {
    const token = localStorage.getItem('token')
    await fetch(`daniela-house-production.up.railway.app/api/citas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify({ estado })
    })
    await cargarCitas()
  } catch (e) {
    console.log('Error actualizando cita')
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