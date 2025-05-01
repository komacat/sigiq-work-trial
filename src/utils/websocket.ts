import { Instruction } from "@/lib/types";
import emitter from "./emitter";
import { pointTo } from "./instructions";

export function connect() {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = function() {
      ws.send("client-connected");
    };
  
    ws.onmessage = (event) => {
        console.log('event: ', event.data)
        const data = JSON.parse(event.data)
        if (data.interaction === 'point') {
            emitter.emit('point', data)
        }
    }

    emitter.on('state', (data) => {
        console.log('Current <InteractableSlide> State:', data)
    })
    emitter.on('state', (data) => {
        console.log('Current <InteractableSlide> State:', data)
    })
    
    emitter.on('point', async (event) => {
        const i = event as Instruction
        await pointTo(i.payload.elementId)
        emitter.emit('tutor-done')
    })
    
    
    emitter.on('tutor-done', () => {
        console.log("tutor-done")
        ws.send("tutor-done")
    })
    
    emitter.on('client-done', () => {
        console.log('client is done, giving control to server')
        console.log('client-done')
        ws.send("client-done")
    })
  
    ws.onclose = function(e) {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      setTimeout(function() {
        connect();
      }, 1000);
    };
  
    ws.onerror = function(err: Event) {
      console.error('Socket encountered error: ', err, 'Closing socket');
      ws.close();
    };
  }

  export default connect