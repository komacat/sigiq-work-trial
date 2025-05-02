const speech_1 = require('./audio')

const script = [
    {
        interaction: 'audio',
        payload: {
            chunk: Object.values(speech_1)[0].toString(),
            mimeType: 'audio/webm',
            transcription: "This is an example transcription for the tutor's voice message",
        },
        isLast: true,
    },
    {
        interaction: 'point',
        payload: {
            elementId: 'circle',
        },
        isLast: true,
    },
    {
        interaction: 'point',
        payload: {
            elementId: 'problemText',
        },
        isLast: true,
    },
    {
        interaction: 'point',
        payload: {
            elementId: 'subQuestion1',
        },
        isLast: false,
    },
    {
        interaction: 'point',
        payload: {
            elementId: 'subQuestion2',
        },
        isLast: true,
    },
]

module.exports = {
    script,
}
