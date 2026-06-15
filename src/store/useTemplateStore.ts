import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import templatesData from '../data/templates.json'
import categoriesData from '../data/categories.json'
import type { Template, Category, RiskNote, UpdateLog } from '../types'

interface TemplateState {
  templates: Template[]
  categories: Category[]
  loading: boolean
  error: string | null
  searchQuery: string
  isInitialized: boolean
  loadData: (force?: boolean) => void
  getTemplateById: (id: string) => Template | undefined
  getTemplatesByCategory: (categoryId: string) => Template[]
  searchTemplates: (query: string) => Template[]
  addRiskNote: (templateId: string, note: Omit<RiskNote, 'id' | 'createdAt'>) => void
  addUpdateLog: (templateId: string, log: Omit<UpdateLog, 'id' | 'createdAt'>) => void
  incrementDownload: (templateId: string) => void
}

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      templates: [],
      categories: [],
      loading: false,
      error: null,
      searchQuery: '',
      isInitialized: false,

      loadData: (force = false) => {
        const { templates, categories, isInitialized } = get()
        
        if (!force && isInitialized && templates.length > 0 && categories.length > 0) {
          return
        }

        set({ loading: true, error: null })
        try {
          if (force || templates.length === 0) {
            set({
              templates: templatesData as Template[],
            })
          }
          if (force || categories.length === 0) {
            set({
              categories: categoriesData as Category[],
            })
          }
          set({
            loading: false,
            isInitialized: true,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : '加载数据失败',
            loading: false,
            isInitialized: true,
          })
        }
      },

      getTemplateById: (id: string) => {
        return get().templates.find((t) => t.id === id)
      },

      getTemplatesByCategory: (categoryId: string) => {
        return get().templates.filter((t) => t.categoryId === categoryId)
      },

      searchTemplates: (query: string) => {
        set({ searchQuery: query })
        if (!query.trim()) {
          return get().templates
        }
        const lowerQuery = query.toLowerCase()
        return get().templates.filter(
          (t) =>
            t.name.toLowerCase().includes(lowerQuery) ||
            t.description.toLowerCase().includes(lowerQuery)
        )
      },

      addRiskNote: (templateId: string, note: Omit<RiskNote, 'id' | 'createdAt'>) => {
        set((state) => ({
          templates: state.templates.map((t) => {
            if (t.id === templateId) {
              const newNote: RiskNote = {
                ...note,
                id: `note-${Date.now()}`,
                createdAt: new Date().toISOString(),
              }
              return {
                ...t,
                riskNotes: [...t.riskNotes, newNote],
                riskLevel: note.level,
              }
            }
            return t
          }),
        }))
      },

      addUpdateLog: (templateId: string, log: Omit<UpdateLog, 'id' | 'createdAt'>) => {
        set((state) => ({
          templates: state.templates.map((t) => {
            if (t.id === templateId) {
              const newLog: UpdateLog = {
                ...log,
                id: `log-${Date.now()}`,
                createdAt: new Date().toISOString(),
              }
              return {
                ...t,
                updateLogs: [...t.updateLogs, newLog],
              }
            }
            return t
          }),
        }))
      },

      incrementDownload: (templateId: string) => {
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === templateId
              ? { ...t, downloadCount: t.downloadCount + 1 }
              : t
          ),
        }))
      },
    }),
    {
      name: 'template-store',
      partialize: (state) => ({
        templates: state.templates,
        categories: state.categories,
        isInitialized: state.isInitialized,
      }),
    }
  )
)
