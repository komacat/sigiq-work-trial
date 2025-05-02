const speech_1 = require('./audio')

const script = [
    {
        interaction: 'audio',
        payload: {
            chunk: speech_1,
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
            elementId: 'main-question',
        },
        isLast: true,
    },
    {
        interaction: 'point',
        payload: {
            elementId: 'sub-question-1',
        },
        isLast: false,
    },
    {
        interaction: 'point',
        payload: {
            elementId: 'sub-question-2',
        },
        isLast: true,
    },
]

module.exports = {
    script
}