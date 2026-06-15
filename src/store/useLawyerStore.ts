import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import lawyersData from '../data/lawyers.json'
import type { Lawyer } from '../types'

interface LawyerState {
  currentLawyer: Lawyer | null
  isLoggedIn: boolean
  login: (licenseNumber: string) => boolean
  logout: () => void
}

export const useLawyerStore = create<LawyerState>()(
  persist(
    (set) => ({
      currentLawyer: null,
      isLoggedIn: false,

      login: (licenseNumber: string) => {
        const lawyer = (lawyersData as Lawyer[]).find(
          (l) => l.licenseNumber === licenseNumber
        )
        if (lawyer) {
          set({
            currentLawyer: lawyer,
            isLoggedIn: true,
          })
          return true
        }
        return false
      },

      logout: () => {
        set({
          currentLawyer: null,
          isLoggedIn: false,
        })
      },
    }),
    {
      name: 'lawyer-store',
      partialize: (state) => ({
        currentLawyer: state.currentLawyer,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
)
