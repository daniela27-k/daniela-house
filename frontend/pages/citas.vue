<template>
  <div class="min-h-screen transition-colors duration-300" :class="oscuro ? 'bg-gray-900' : 'bg-pink-50'">

    <!-- Navbar -->
    <nav class="shadow-sm px-8 py-4 flex justify-between items-center transition-colors duration-300" :class="oscuro ? 'bg-gray-800' : 'bg-white'">
      <NuxtLink to="/" class="text-2xl font-bold text-black-400"> Daniela House</NuxtLink>
      <div class="flex items-center gap-4">
        <button @click="cerrarSesion" class="text-pink-400 hover:text-pink-600 font-medium">
          Cerrar sesión
        </button>
      </div>
    </nav>

    <div class="max-w-2xl mx-auto py-16 px-6">
      <h2 class="text-3xl font-bold text-black-400 text-center mb-2">Agenda tu cita 💗</h2>
      <p class="text-center mb-10" :class="oscuro ? 'text-gray-400' : 'text-black-300'">Elige tu servicio, fecha y hora</p>

      <div class="rounded-3xl shadow-lg p-10 space-y-6 transition-colors duration-300" :class="oscuro ? 'bg-gray-800' : 'bg-white'">

        <div>
          <label class="block font-medium mb-1 text-black-400">Tu nombre</label>
          <input
            v-model="form.nombre"
            type="text"
            placeholder="¿Cómo te llamas?"
            class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors duration-300"
            :class="oscuro ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-pink-200 text-gray-600'"
          />
        </div>

        <div>
          <label class="block font-medium mb-1 text-black-400">Servicio</label>
          <select
            v-model="form.servicio_id"
            class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors duration-300"
            :class="oscuro ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200 text-gray-600'"
          >
            <option value="">Selecciona un servicio</option>
            <option v-for="s in servicios" :key="s.id" :value="s.id">
              {{ s.nombre }}
            </option>
          </select>
        </div>

        <div>
          <label class="block font-medium mb-1 text-black-400">Fecha</label>
          <input
            v-model="form.fecha"
            type="date"
            :min="hoy"
            class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors duration-300"
            :class="oscuro ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200 text-gray-600'"
          />
        </div>

        <div>
          <label class="block font-medium mb-1 text-black-400">Hora</label>
          <select
            v-model="form.hora"
            class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors duration-300"
            :class="oscuro ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200 text-gray-600'"
          >
            <option value="">Selecciona una hora</option>
            <option v-for="h in horas" :key="h" :value="h">{{ h }}</option>
          </select>
        </div>

        <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>
        <p v-if="exito" class="text-green-400 text-sm text-center">{{ exito }}</p>

        <button
          @click="agendarCita"
          class="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 rounded-xl transition">
          Agendar cita ✨
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
const { oscuro } = useDarkMode()

const form = ref({
  nombre: '',
  servicio_id: '',
  fecha: '',
  hora: ''
})

const error = ref('')
const exito = ref('')
const hoy = new Date().toISOString().split('T')[0]

const horas = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30'
]

const servicios = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3001/api/servicios')
    servicios.value = await res.json()
  } catch (e) {
    console.log('Error cargando servicios')
  }
})

const agendarCita = async () => {
  if (!form.value.nombre || !form.value.servicio_id || !form.value.fecha || !form.value.hora) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  try {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:3001/api/citas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify(form.value)
    })

    const data = await res.json()

    if (!res.ok) {
      error.value = data.error || 'Error al agendar'
      return
    }

    exito.value = '¡Cita agendada exitosamente! 💗'
    form.value = { nombre: '', servicio_id: '', fecha: '', hora: '' }

  } catch (e) {
    error.value = 'No se pudo conectar con el servidor'
  }
}

const cerrarSesion = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  navigateTo('/login')
}
</script>