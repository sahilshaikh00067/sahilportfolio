import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CursorGlow(){

const [position,setPosition]=useState({x:0,y:0})
const [hover,setHover]=useState(false)
const [enabled,setEnabled]=useState(true)

useEffect(()=>{
    // skip the custom cursor on touch devices — there's no mouse to track
    const isTouch = window.matchMedia("(hover: none)").matches
    if (isTouch) setEnabled(false)
},[])

useEffect(()=>{

if(!enabled) return

const moveCursor=(e)=>{
setPosition({x:e.clientX,y:e.clientY})
}

const addHover=(e)=>{
if(e.target.closest && e.target.closest("a,button")) setHover(true)
}

const removeHover=(e)=>{
if(e.target.closest && e.target.closest("a,button")) setHover(false)
}

window.addEventListener("mousemove",moveCursor)
// event delegation instead of querying a,button once —
// keeps working even as new links/buttons mount later (sliders, modals, etc.)
document.addEventListener("mouseover",addHover)
document.addEventListener("mouseout",removeHover)

return ()=>{
window.removeEventListener("mousemove",moveCursor)
document.removeEventListener("mouseover",addHover)
document.removeEventListener("mouseout",removeHover)
}

},[enabled])

if(!enabled) return null

return(

<>

{/* 🔴 OUTER RING */}
<motion.div
animate={{
x:position.x-25,
y:position.y-25,
scale:hover?1.6:1
}}
transition={{type:"spring",stiffness:200,damping:20}}
className="
fixed w-12 h-12 rounded-full
border border-pink-300
pointer-events-none z-[9999]
opacity-40 blur-[1px]
"
/>


{/* ⚪ INNER DOT */}
<motion.div
animate={{
x:position.x-6,
y:position.y-6,
scale:hover?1.4:1
}}
transition={{type:"spring",stiffness:500,damping:28}}
className="
fixed w-3 h-3 rounded-full
bg-white
pointer-events-none z-[9999]
mix-blend-difference
shadow-[0_0_12px_rgba(255,0,0,0.9)]
"
/>


{/* 🔥 RED AURA */}
<motion.div
animate={{
x:position.x-60,
y:position.y-60
}}
transition={{duration:0.2}}
className="
fixed w-32 h-32 rounded-full
bg-pink-500
opacity-10
blur-3xl
pointer-events-none z-[9998]
"
/>

</>

)

}