import { motion, useScroll } from "framer-motion"

export default function ScrollProgress(){

const { scrollYProgress } = useScroll()

return(

<div className="fixed top-0 left-0 right-0 z-[9999]">

{/* glow background */}

<div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500 blur-xl opacity-40"></div>

{/* main progress bar */}

<motion.div
style={{scaleX:scrollYProgress}}
className="relative h-[4px] bg-gradient-to-r from-purple-500 to-pink-500 origin-left shadow-[0_0_20px_rgba(34,211,238,0.9)]"
/>

{/* animated shine */}

<motion.div
animate={{x:["-100%","100%"]}}
transition={{repeat:Infinity,duration:2,ease:"linear"}}
className="absolute top-0 left-0 w-[30%] h-[4px] bg-white/40 blur-md"
/>

</div>

)

}