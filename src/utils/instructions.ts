import { Point } from '@/lib/types'

export async function pointTo(elementId: string) {
    // small break inbetween this event to simulate tutor thinking
    await new Promise((r) => setTimeout(r, 1000))

    const element = document.getElementById(elementId)
    if (!element) {
        throw new Error('Element not found')
    }

    const elementBox = element?.getBoundingClientRect()
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
    const cursorBox = cursor.getBoundingClientRect()
    if (!cursorBox) {
        throw new Error('Cursor bounding box not found')
    }
    console.log('cursorBox', cursorBox)
    const src: Point = {
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
export async function playAudio(base64String: string, mimeType: string) {
    console.log('playing')
    const audio = document.createElement('audio')
    audio.src = `data:${mimeType};base64,${base64String}`
    console.log(audio.src)

    return new Promise<void>(async (resolve) => {
        audio.addEventListener('ended', function () {
            console.log('Audio playback completed.')
            resolve()
        })

        audio.play()
    })
}

export async function highlight(text: string, elementId: string) {
    const element = document.getElementById(elementId)
    if (!element) {
        throw new Error('Element not found')
    }
    let elementHTML = element.innerHTML
    const elementText = element.textContent
    console.log(elementText)

    if (!elementText) {
        throw new Error('No text to highlight in element')
    }

    const start = elementText.indexOf(text)
    const end = start + text.length

    // this approach doesn't really work in react....

    elementHTML = elementHTML.substring(0, start) +
        '<span className="bg-gray-200">' + 
        elementHTML.substring(start, end - start + 1) +
        '</span>' +
        elementHTML.substring(end + 1);
    element.innerHTML = elementHTML;
    console.log("new element html: ", elementHTML)

}