import { Point } from '@/lib/types'

export async function pointTo(elementId: string) {
    console.log('point to', elementId)

    let element = document.getElementById(elementId)
    if (!element) {
        throw new Error('Element not found')
    }

    let elementBox = element?.getBoundingClientRect()
    if (!elementBox) {
        throw new Error('Element bounding box not found')
    }

    const cursor = document.createElement('img')
    cursor.setAttribute('id', 'cursor')
    cursor.src = 'cursor.svg'

    if (!document.getElementById('cursor')) {
        document.body.appendChild(cursor)
    }
    // starting point
    let cursorBox = cursor.getBoundingClientRect()
    if (!cursorBox) {
        throw new Error('Cursor bounding box not found')
    }
    console.log('cursorBox', cursorBox)
    let src: Point = {
        x: cursorBox.left || 0,
        y: cursorBox.top || 0,
    }
    const dst: Point = {
        x: elementBox.left + elementBox.width / 2 || 0,
        y: elementBox.top + elementBox.height / 2 || 0,
    }
    console.log('src', src)
    console.log('dst', dst)
    await moveTo(cursor, src, dst)
}

async function moveTo(element: HTMLElement, src: Point, dst: Point) {
    const duration = 1000
    const startTime = performance.now()
    return new Promise<void>((resolve) => {
        function animate(time: number) {
            const elapsed = time - startTime
            const progress = Math.min(elapsed / duration, 1)
            const x = (dst.x - src.x) * progress
            const y = (dst.y - src.y) * progress
            element.style.transform = `translate(${x}px, ${y}px)`
            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                setTimeout(() => {
                    element.remove()
                    resolve()
                }, 1000)
            }
        }
        requestAnimationFrame(animate)
    })
}

// audio is encoded in base64
export async function playAudio(audio: string) {
    console.log('playing :')
}
