import InteractableSlide from "@/components/InteractableSlide";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
      <main className="flex flex-col">
        <InteractableSlide>
          <div className="flex flex-col items-center justify-center h-screen">
            <h1> slide 1</h1>
            <p data-attribute="interactable" data-type="text"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </div>
        </InteractableSlide>
        <Navigation />
      </main>
  );
}
