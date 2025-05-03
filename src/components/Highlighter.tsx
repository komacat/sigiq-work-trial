import React from 'react'

function Highlighter({ children, highlight }: { children: React.ReactNode; highlight: string }) {
    if (!children || !highlight) {
        return children
    }
    console.log(children)
    // const regexp = new RegExp(highlight, 'g')
    // const matches = children.match(regexp)

    // const parts = children.split(new RegExp(`${highlight.replace()}`, 'g'))

    // for (let i = 0; i < parts.length; i++) {
    //     if (i !== parts.length - 1) {
    //         let match = matches[i]
    //         while (parts[i + 1] === '') {
    //             match += matches[++i]
    //         }

    //         parts[i] = (
    //             <React.Fragment key={i}>
    //                 {parts[i]}
    //                 <span className="highlighted">{match}</span>
    //             </React.Fragment>
    //         )
    //     }
    // }
    // console.log(matches, parts)

    // return <div className="highlighter">{parts}</div>
    return <></>
}
export default Highlighter
