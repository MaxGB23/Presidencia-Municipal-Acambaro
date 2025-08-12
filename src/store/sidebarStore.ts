// store/sidebarStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  isOpen: boolean
  isHovered: boolean
  toggleSidebar: () => void
  setIsOpen: (value: boolean) => void
  setIsHovered: (value: boolean) => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: false,
      isHovered: false,
      toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
      setIsOpen: (value) => set({ isOpen: value }),
      setIsHovered: (value) => set({ isHovered: value }),
    }),
    { name: 'sidebar-storage' }
  )
)
