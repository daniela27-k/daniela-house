export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem('token')
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

    if (!token) {
      return navigateTo('/login')
    }

    if (to.path.startsWith('/admin') && usuario.rol !== 'admin') {
      return navigateTo('/citas')
    }
  }
})