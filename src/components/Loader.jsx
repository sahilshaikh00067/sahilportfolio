import { motion } from "framer-motion"

export default function Loader(){

return(

<div className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center z-50 overflow-hidden">

{/* background glow */}

<div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[180px] animate-pulse"></div>


{/* rotating ring */}

<motion.div
animate={{ rotate:360 }}
transition={{ repeat:Infinity, duration:6, ease:"linear" }}
className="
absolute
w-40 h-40
rounded-full
border border-purple-500/30
"
/>


{/* neon loader */}

<motion.div
animate={{ rotate:360 }}
transition={{ repeat:Infinity, duration:1.5, ease:"linear" }}
className="
w-20 h-20
rounded-full
border-4
border-purple-500
border-t-transparent
shadow-lg shadow-purple-500/40
"
/>


{/* animated text */}

<motion.h2
initial={{opacity:0}}
animate={{opacity:1}}
transition={{duration:1}}
className="
mt-10
text-2xl
font-bold
bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500
bg-clip-text text-transparent
tracking-widest
"
>

Loading Portfolio

</motion.h2>


{/* loading dots */}

<div className="flex gap-2 mt-4">

<motion.span
animate={{y:[0,-8,0]}}
transition={{repeat:Infinity,duration:0.6}}
className="w-2 h-2 bg-purple-400 rounded-full"
/>

<motion.span
animate={{y:[0,-8,0]}}
transition={{repeat:Infinity,duration:0.6,delay:0.2}}
className="w-2 h-2 bg-pink-400 rounded-full"
/>

<motion.span
animate={{y:[0,-8,0]}}
transition={{repeat:Infinity,duration:0.6,delay:0.4}}
className="w-2 h-2 bg-blue-400 rounded-full"
/>

</div>

</div>

)

}