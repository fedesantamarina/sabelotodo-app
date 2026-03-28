import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

export const useAppStore = create(
  devtools(
    persist(
      (set) => ({
        // Language
        lang: 'en',
        toggleLang: () => set((s) => ({ lang: s.lang === 'en' ? 'es' : 'en' })),

        // Active section for nav highlighting
        activeSection: 'hero',
        setActiveSection: (section) => set({ activeSection: section }),

        // Mobile menu
        menuOpen: false,
        setMenuOpen: (open) => set({ menuOpen: open }),
        toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),

        // FAQ accordion
        openFaq: null,
        toggleFaq: (id) => set((s) => ({ openFaq: s.openFaq === id ? null : id })),

        // Modal
        modalOpen: false,
        setModalOpen: (open) => set({ modalOpen: open }),
      }),
      {
        name: 'sabelotodo-store',
        partialize: (state) => ({ lang: state.lang }),
      }
    ),
    { name: 'SabelotodoStore' }
  )
)
