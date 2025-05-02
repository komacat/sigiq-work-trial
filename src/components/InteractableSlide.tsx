'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import type { InteractableElement } from '@/lib/types'
import emitter from '@/utils/emitter'
import Workspace from './Workspace'
import { notesContext } from '@/context/notesContext'

function InteractableSlide({ children }: { children: React.ReactNode }) {
    const context = useContext(notesContext)

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
        <div className="iterms-center flex w-full max-w-full flex-grow flex-row justify-center">
            <div
                ref={container}
                className="iterms-center m-4 flex w-[80%] justify-center rounded-xl bg-white p-8"
            >
                {children}
            </div>
            {context.notes && (
                <div className="m-4 w-[30%] rounded-xl bg-white p-8">
                    <Workspace />
                </div>
            )}
        </div>
    )
}

export default InteractableSlide
