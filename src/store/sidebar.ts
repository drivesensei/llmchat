import { signal } from '@preact/signals-react'

export const sidebarOpen = signal(false)

export const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
