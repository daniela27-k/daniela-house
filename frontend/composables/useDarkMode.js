export const useDarkMode = () => {
  const oscuro = useState('darkMode', () => {
    if (process.client) {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  const toggleDarkMode = () => {
    oscuro.value = !oscuro.value
    if (process.client) {
      localStorage.setItem('darkMode', oscuro.value)
    }
  }

  return { oscuro, toggleDarkMode }
}