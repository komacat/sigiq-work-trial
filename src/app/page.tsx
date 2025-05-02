'use client'
import InteractableSlide from '@/components/InteractableSlide'
import Navigation from '@/components/Navigation'
import StateContextProvider from '@/context/stateContext'
import Websocket from '@/components/Websocket'
import NoteContextProvider from '@/context/notesContext'
import { themeContext } from '@/context/themeContext'
import { useContext } from 'react'

export default function Home() {
    const { theme } = useContext(themeContext)
    return (
        <StateContextProvider>
            <Websocket />
            <main
                data-theme={theme}
                className="flex h-full w-full flex-col items-center justify-center bg-gray-100 dark:bg-slate-900 dark:text-white"
            >
                <NoteContextProvider>
                    <InteractableSlide>
                        <div>
                            <h1 className="text-4xl font-bold">Problem 1</h1>
                            <svg id="diagramCanvas" width="250" height="250" className="m-4 p-4">
                                <title>Diagram of a circle</title>
                                <circle
                                    id="circle"
                                    cx="100"
                                    cy="100"
                                    r="100"
                                    stroke="gray"
                                    fill="none"
                                    data-role="interactable"
                                    data-type="shape"
                                />
                                <line
                                    id="OA"
                                    x1="100"
                                    y1="100"
                                    x2="200"
                                    y2="100"
                                    stroke="pink"
                                    strokeWidth="2"
                                    data-role="interactable"
                                    data-type="shape"
                                />
                                <line
                                    id="OB"
                                    x1="100"
                                    y1="100"
                                    x2="60"
                                    y2="10"
                                    stroke="pink"
                                    strokeWidth="2"
                                    data-role="interactable"
                                    data-type="shape"
                                />
                            </svg>
                            <p
                                id="problemText"
                                data-role="interactable"
                                data-type="text"
                                className="p-2 text-2xl"
                            >
                                Two radii OA and OB form a 60° angle in a circle. The radius length
                                is 5 cm.
                            </p>
                            <ol type="a" className="pl-4">
                                <li id="subQuestion1" data-role="interactable" data-type="text" className="text-2xl">
                                    a) Find the length of arc AB.
                                </li>
                                <li id="subQuestion2" data-role="interactable" data-type="text" className="text-2xl">
                                    b) What fraction of the circle’s circumference does arc AB
                                    represent?
                                </li>
                            </ol>
                        </div>
                    </InteractableSlide>
                    <Navigation />
                </NoteContextProvider>
            </main>
        </StateContextProvider>
    )
}
