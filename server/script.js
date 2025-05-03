import { speech_1 } from './audio.js'

export const script = [
    {
        interaction: 'audio',
        payload: {
            chunk: speech_1,
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
        isLast: false,
    },
    {
        interaction: 'highlight',
        payload: {
            elementId: 'problemText',
            highlight: 'Two radii OA and OB form a 60° angle in a circle.',
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
