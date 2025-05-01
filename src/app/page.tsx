import InteractableSlide from '@/components/InteractableSlide'
import Navigation from '@/components/Navigation'
import Websocket from '@/components/Websocket'
import ThemeContextProvider from '@/context/themeContext'

export default function Home() {
    return (
        <ThemeContextProvider>
        <main className="flex h-full flex-col bg-gray-100">
            <InteractableSlide>
                <div className="h-full w-full">
                    <h1 className="text-2xl font-bold">slide 1</h1>
                    <img
                        id="placeholder-image"
                        data-role="interactable"
                        data-type="image"
                        src="https://placehold.co/600x400"
                        className="w-full"
                    />
                    <p id="main-text" data-role="interactable" data-type="text">
                        Lorem ipsum dolor sit amet. Et velit corrupti hic maxime omnis ut quos iure
                        33 amet ipsam cum consectetur quia. Eos sunt dolore sed aliquid odit qui
                        modi aspernatur non fugit aliquid qui repellat voluptatem. Quo magni iusto
                        est galisum dolor qui deserunt voluptatem ut laudantium dolor cum enim quam
                        et earum facere. Est quasi veniam et consequatur blanditiis in tempora
                        perspiciatis aut ullam aliquam. Rem earum consequatur ad tenetur
                        voluptatibus est atque debitis? Et cumque vero ea nobis impedit est
                        reiciendis omnis. Eos laudantium vero et laboriosam quisquam ea animi
                        facilis a dolores deleniti qui enim iusto est quia commodi qui debitis
                        voluptatem. Qui explicabo consequuntur qui omnis numquam aut laboriosam
                        minima et molestiae enim. Nam perspiciatis modi ad iusto officia et totam
                        dignissimos aut omnis illo vel optio dolore ut totam libero id culpa vitae.
                        Vel vitae quia non commodi voluptas ut neque sequi et assumenda doloremque.
                    </p>
                </div>
            </InteractableSlide>
            <Websocket />
            <Navigation />
        </main>
        </ThemeContextProvider>
    )
}
