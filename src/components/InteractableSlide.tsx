'use client'

import { useEffect, useRef } from 'react'
import type { Instruction, InteractableElement } from '@/lib/types'
import emitter from '@/utils/emitter'
import { pointTo } from '@/utils/instructions'

function InteractableSlide({ children }: { children: React.ReactNode }) {
    let container = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const result: InteractableElement[] = []
        const interactableElements = document.querySelectorAll('[data-role="interactable"]')
        interactableElements.forEach((element) => {
            const interactableElement: InteractableElement = {
                id: element.id,
                value: element.innerHTML,
                type: element.getAttribute('data-type') as 'text' | 'image' | 'shape',
                selected: false, // change later i thinkkkwecan only select text
                actions: ['point'],
            }
            result.push(interactableElement)
        })
        // emit result to be handled by backend
        emitter.emit('state', JSON.stringify(result))
    }, [])
    return (
        <div ref={container} className="m-8 h-full bg-white p-8">
            {children}
        </div>
    )
}

export default InteractableSlide
