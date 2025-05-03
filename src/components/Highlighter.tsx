"use client"

import { useEffect, useRef } from "react";

function Highlighter({ children }: { children: React.ReactNode}) {
    const ref = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        console.log(ref.current?.textContent)
        if (ref.current) {
          ref.current.style.backgroundColor = 'yellow';
        }
      }, []);

    if (!children) {
        return children
    }

    const elementText = ref.current?.textContent
    if (!elementText) {
        return children
    }
    // const regexp = new RegExp(highlight, 'g')
    // const matches = elementText.match(regexp)
    // const parts = elementText.split(new RegExp(`${highlight.replace()}`, 'g'))

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
    return <div ref={ref}>{children}</div>
}
export default Highlighter

