import InteractableSlide from '@/components/InteractableSlide'
import Navigation from '@/components/Navigation'
import StateContextProvider from '@/context/stateContext'
import ThemeContextProvider from '@/context/themeContext'

export default function Home() {
    return (
        <StateContextProvider>
            <main className="flex h-full flex-col bg-gray-100">
                <InteractableSlide>
                    <div className="h-full w-full">
                        <h1 className="text-2xl font-bold">slide 1</h1>
                        <svg width="250" height="250" className="m-4 p-4">
                            <title>Diagram of a circle</title>
                            <circle
                                id="circle"
                                cx="100"
                                cy="100"
                                r="100"
                                stroke="black"
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
                                stroke="red"
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
                                stroke="red"
                                strokeWidth="2"
                                data-role="interactable"
                                data-type="shape"
                            />
                        </svg>
                        <p id="main-question" data-role="interactable" data-type="text">
                            Two radii OA and OB form a 60° angle in a circle. The radius length is 5
                            cm.
                        </p>
                        <p id="sub-question-1" data-role="interactable" data-type="text">
                            a) Find the length of arc AB.
                        </p>
                        <p id="sub-question-2" data-role="interactable" data-type="text">
                            b) What fraction of the circle’s circumference does arc AB represent?
                        </p>
                    </div>
                </InteractableSlide>
                <Navigation />
            </main>
        </StateContextProvider>
    )
}
