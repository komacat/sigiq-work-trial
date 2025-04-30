# Design

## WebSocket buffering & reconnect handling

- useWebsocket to handle automatic reconnect on error
- received data will be in a buffer

## How your component discovers and serialises interactables

- data-role="interactable", data-type="text|shape|image" as HTML attribute
- traverse react children and search for attributes
- for every element with data-role="interactiable" ...
  Interactable {
  type: text | shape | image
  value: string
  selected?: bool
  actions: ( point, highlight, setValue )
  }
- send to backend a JSON Interactable[]

## State management / internal event bus

1. mock backend sends JSON to client through websocket
   - interaction: POINT
   - payload {...}
2. case POINT:
   - use event emitter to start the animation for POINT
   - ex. emitter.on('POINT', handlePoint(src, dest)) : should the tutor pointer remain at last dest until next POINT and update (src = dest, dest = newDest) or have src be the same location every time and be removed from screen once control goes back to client

## Your choice of DOM vs React updates

- 

# InteractableSlide Component Checklist

- Expect elements annotated with data-role="interactable", data-type="text|shape|image",
  etc as HTML attributes or React vars.
- On mount, parse the DOM/SVG and emit the serialized slide descrip-
  tion upstream (via a callback, context, or event emitter).
- Provide an imperative API (or React ref) so parent components can call
  pointTo(id) or highlight(id).
- Keep the component self-contained so that changing the question means only
  swapping in new HTML/JSX.

# Frontend Architecture Guidelines

- Isolate WebSocket code from presentation.
- Use an internal event bus or observable store rather than prop-drilling or
  ad-hoc polling.
- Animations (e.g. tutor cursor) should be smooth but simple—CSS transitions
  are fine.
- Strive for clear boundaries so that an LLM (or another engineer) can reason
  about the component graph.

Deliverables: 1. A mocked backend with a scripted dialog. 2. <InteractableSlide>

- one slide that interacts via POINT.
