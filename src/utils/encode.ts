export async function audioToBase64(audioUrl: string) {
    try {
        const response = await fetch(audioUrl)
        const blob = await response.blob()
        const base64String = await new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                resolve(reader.result)
            }
            reader.onerror = reject
        })
        return base64String
    } catch (error) {
        console.error('Error converting audio to base64:', error)
        throw error
    }
}
