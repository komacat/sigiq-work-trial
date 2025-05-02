export type InteractableElement = {
    id: string
    value: string
    type: 'text' | 'image' | 'shape'
    selected?: boolean
    actions: string[]
}

export type Interaction = {
    interaction: 'point' | 'highlight' | 'speech' | 'audio'
    payload: {
        elementId?: string | null
        chunk?: string | null
        highlight?: string | null
        transcription?: string | null
    }
    isLast: boolean
}

export type Point = {
    x: number
    y: number
}

export type ThemeContext = {
    theme: string
    toggleTheme: () => void
}

export type StateContext = {
    state: string
    setState: (arg0: string) => void
}
