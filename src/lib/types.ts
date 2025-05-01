export type InteractableElement = {
    id: string
    value: string
    type: 'text' | 'image' | 'shape'
    selected?: boolean
    actions: string[]
}

export type Instruction = {
    interaction: 'point' | 'highlight'
    payload: {
        elementId: string
    }
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
