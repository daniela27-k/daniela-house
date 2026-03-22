<template>
  <div :class="oscuro ? 'bg-gray-900' : 'bg-white'" class="min-h-screen font-sans transition-colors duration-300">

    <!-- Navbar -->
    <nav :class="oscuro ? 'bg-gray-800' : 'bg-white'" class="shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50 transition-colors duration-300">
      <h1 class="text-2xl font-bold text-pink-400 tracking-widest"> DANIELA HOUSE</h1>
      

      <!-- Menú escritorio -->
      <div class="hidden md:flex space-x-6 font-medium" :class="oscuro ? 'text-gray-300' : 'text-gray-600'">
        <a href="#inicio" class="hover:text-pink-400">Inicio</a>
        <a href="#servicios" class="hover:text-pink-400">Servicios</a>
        <a href="#nosotros" class="hover:text-pink-400">Conócenos</a>
        <a href="#contacto" class="hover:text-pink-400">Contacto</a>
      </div>

      <div class="flex items-center gap-3">
    
        <NuxtLink to="/login"
          class="hidden md:block bg-pink-400 hover:bg-pink-500 text-white px-5 py-2 rounded-xl font-medium transition">
          Reserva aquí
        </NuxtLink>

        <!-- Botón hamburguesa -->
        <button @click="menuAbierto = !menuAbierto" class="md:hidden text-pink-400 text-3xl">
          ☰
        </button>
      </div>
    </nav>

    <!-- Menú celular -->
    <div v-if="menuAbierto" :class="oscuro ? 'bg-gray-800' : 'bg-white'" class="md:hidden shadow-md px-8 py-6 space-y-4 sticky top-16 z-40">
      <a href="#inicio" @click="menuAbierto = false" class="block hover:text-pink-400 font-medium" :class="oscuro ? 'text-gray-300' : 'text-gray-600'">Inicio</a>
      <a href="#servicios" @click="menuAbierto = false" class="block hover:text-pink-400 font-medium" :class="oscuro ? 'text-gray-300' : 'text-gray-600'">Servicios</a>
      <a href="#nosotros" @click="menuAbierto = false" class="block hover:text-pink-400 font-medium" :class="oscuro ? 'text-gray-300' : 'text-gray-600'">Conócenos</a>
      <a href="#contacto" @click="menuAbierto = false" class="block hover:text-pink-400 font-medium" :class="oscuro ? 'text-gray-300' : 'text-gray-600'">Contacto</a>
      <NuxtLink to="/login" class="block bg-pink-400 hover:bg-pink-500 text-white px-5 py-2 rounded-xl font-medium transition text-center">
        Reserva aquí
      </NuxtLink>
    </div>

    <!-- Hero -->
    <section id="inicio" class="flex flex-col md:flex-row items-center justify-between px-10 py-20 max-w-6xl mx-auto">
      <div class="md:w-1/2 text-center md:text-left">
        <p class="text-pink-400 font-semibold tracking-widest text-sm mb-3">BIENVENIDA A DANIELA HOUSE</p>
        <h2 class="text-5xl font-bold leading-tight mb-6" :class="oscuro ? 'text-white' : 'text-gray-800'">
        <br />MUJERES CON <span class="text-black-400">ESTILO</span>
        </h2>
        <p class="text-lg mb-8" :class="oscuro ? 'text-gray-400' : 'text-gray-500'">
          Agenda tu sesión con nuestras expertas y luce unas uñas perfectas.
          ¡Elige tu servicio y prepárate para brillar!
        </p>
        <div class="flex gap-4 justify-center md:justify-start">
          <NuxtLink to="/registro"
            class="bg-pink-400 hover:bg-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-bold transition">
            ¡Reserva Aquí! ✨
          </NuxtLink>
          <a href="#servicios"
            class="border-2 px-8 py-4 rounded-2xl text-lg font-bold transition"
            :class="oscuro ? 'border-gray-400 text-gray-300 hover:bg-gray-800' : 'border-gray-800 text-gray-800 hover:bg-gray-100'">
            Nuestros Servicios
          </a>
        </div>
      </div>

      <div class="md:w-1/2 mt-10 md:mt-0 grid grid-cols-2 gap-4">
        <div class="rounded-3xl h-48 overflow-hidden">
          <img src="/img/negras.jpg" alt="Uñas 1" class="w-full h-full object-cover" />
        </div>
        <div class="rounded-3xl h-48 overflow-hidden">
          <img src="/img/azul.jpg" alt="Uñas 2" class="w-full h-full object-cover" />
        </div>
        <div class="rounded-3xl h-48 overflow-hidden">
          <img src="/img/amarillas.jpg" alt="Uñas 3" class="w-full h-full object-cover" />
        </div>
        <div class="rounded-3xl h-48 overflow-hidden">
          <img src="/img/rojas.jpg" alt="Uñas 4" class="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    <!-- Nosotros -->
    <section id="nosotros" class="py-20 px-10 transition-colors duration-300" :class="oscuro ? 'bg-gray-800' : 'bg-pink-50'">
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-3xl font-bold mb-6" :class="oscuro ? 'text-white' : 'text-gray-800'">¿Cómo lo Hacemos?</h3>
        <p class="text-lg leading-relaxed" :class="oscuro ? 'text-gray-400' : 'text-gray-500'">
          En Daniela House brindamos una experiencia única que garantiza la satisfacción de nuestras clientas,
          creando un espacio moderno y acogedor que las invita a regresar. Priorizamos la bioseguridad con
          altos estándares de calidad y productos de primera. Tu belleza es nuestra pasión 💗
        </p>
      </div>
    </section>

    <!-- Servicios -->
    <section id="servicios" class="py-20 px-10 transition-colors duration-300" :class="oscuro ? 'bg-gray-900' : 'bg-white'">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-3xl font-bold text-center mb-12" :class="oscuro ? 'text-white' : 'text-gray-800'">Nuestros Servicios</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div v-for="servicio in servicios" :key="servicio.nombre"
            class="rounded-2xl p-8 text-center hover:shadow-lg transition"
            :class="oscuro ? 'bg-gray-800' : 'bg-pink-50'">
            <div class="text-5xl mb-4">{{ servicio.emoji }}</div>
            <h4 class="font-bold text-xl mb-3" :class="oscuro ? 'text-white' : 'text-gray-800'">{{ servicio.nombre }}</h4>
            <p class="text-sm" :class="oscuro ? 'text-gray-400' : 'text-gray-500'">{{ servicio.descripcion }}</p>
            <NuxtLink to="/registro" class="mt-4 inline-block text-pink-400 font-medium hover:underline">Reservar →</NuxtLink>
          </div>

        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer id="contacto" class="py-16 px-10 transition-colors duration-300" :class="oscuro ? 'bg-gray-950' : 'bg-gray-800'">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h4 class="text-xl font-bold mb-4 text-pink-400"> Daniela House</h4>
          <ul class="space-y-2 text-gray-300">
            <li><a href="#inicio" class="hover:text-pink-400">Inicio</a></li>
            <li><a href="#servicios" class="hover:text-pink-400">Servicios</a></li>
            <li><NuxtLink to="/registro" class="hover:text-pink-400">Reserva Ahora</NuxtLink></li>
            <li><a href="#nosotros" class="hover:text-pink-400">Conócenos</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-xl font-bold mb-4 text-pink-400">Contáctanos</h4>
          <ul class="space-y-2 text-gray-300">
            <li>📧 danielahouse27@gmail.com</li>
            <li>📞 Tel: 300 233 09 30</li>
            <li>📍 Tu ciudad, Monteria</li>
          </ul>
        </div>
        <div>
          <h4 class="text-xl font-bold mb-4 text-pink-400">Síguenos</h4>
          <div class="flex space-x-4 text-gray-300">
            <a href="#" class="hover:text-pink-400 text-lg">📘 Facebook</a>
            <a href="#" class="hover:text-pink-400 text-lg">📸 Instagram</a>
          </div>
        </div>
      </div>
      <div class="text-center text-gray-400 mt-10 text-sm">
        Copyright © 2025. Daniela House. Todos los derechos reservados.
      </div>
    </footer>

  </div>
</template>

<script setup>
const { oscuro } = useDarkMode()
const menuAbierto = ref(false)

const servicios = [
  { nombre: 'Manicure', descripcion: 'Amplia variedad de estilos. Le damos forma, estilo y color a tus ideas.' },
  { nombre: 'Pedicure', descripcion: 'Renovación y cuidado de tus pies, tratamientos que los mantendrán hidratados.' },
  { nombre: 'Nail Art', descripcion: 'Arte en tus uñas con diseños personalizados y creativos únicos para ti.' },
  { nombre: 'manicura Masculina', descripcion: 'Enfocada en la higiene, el corte, el limado y la hidratación para lograr un aspecto limpio, natural y profesional' },
  { nombre: 'Uñas Dipping', descripcion: 'Diseños únicos y duraderos para lucir siempre perfecta en cualquier ocasión.' },
  { nombre: 'Pedicure Masculina', descripcion: 'Simplemente cuidado de pies, enfocado en la higiene y comodidad. ' },
]
</script>