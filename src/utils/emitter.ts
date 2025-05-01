import mitt from 'mitt'

const emitter = mitt()

emitter.on('state', (data) => {
    console.log('Current <InteractableSlide> State:', data)
})

export default emitter
