import { motion, AnimatePresence } from "framer-motion"
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa"
import { useEffect, useState, useCallback } from "react"

/* Replace with real client quotes when you have them, bhai */
const TESTIMONIALS = [
    {
        quote: "Sahil turned our clinic's outdated site into something that actually feels premium. Booking enquiries went up within the first week of launch.",
        name: "Dr. R. Papalkar",
        role: "Founder, Papalkar Gastrocare",
    },
    {
        quote: "Fast, communicative, and the UI quality was way above what we expected for the budget. The dashboard he built is still running without issues.",
        name: "Client",
        role: "SaaS Communication Platform",
    },
    {
        quote: "We asked for something that didn't look like a template — that's exactly what we got. The animations feel intentional, not decorative.",
        name: "Client",
        role: "E-Commerce Brand",
    },
]

const AUTOPLAY_MS = 6000

export default function Testimonials() {
    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)
    const total = TESTIMONIALS.length

    const go = useCallback((dir) => {
        setIndex((i) => (i + dir + total) % total)
    }, [total])

    useEffect(() => {
        if (paused) return
        const t = setInterval(() => go(1), AUTOPLAY_MS)
        return () => clearInterval(t)
    }, [paused, go])

    const current = TESTIMONIALS[index]

    return (
        <section
            id="testimonials"
            className="relative py-28 md:py-36 px-6 bg-[#020617] overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[150px] -top-40 right-0 rounded-full pointer-events-none" />
            <div className="absolute w-[500px] h-[500px] bg-purple-600/10 blur-[150px] -bottom-40 left-0 rounded-full pointer-events-none" />

            <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-10 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                                      border border-purple-500/30 bg-purple-500/10 text-purple-400
                                      text-xs tracking-widest uppercase mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse inline-block" />
                        Client Words
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                        <span className="text-white">What people </span>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            say
                        </span>
                    </h2>
                </motion.div>

                {/* quote card */}
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, info) => {
                        if (info.offset.x < -60) go(1)
                        else if (info.offset.x > 60) go(-1)
                    }}
                    className="relative w-full p-10 md:p-14 rounded-3xl border border-white/8
                               bg-white/4 backdrop-blur-xl cursor-grab active:cursor-grabbing overflow-hidden"
                >
                    <FaQuoteLeft className="text-4xl text-purple-500/25 mx-auto mb-6" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <p className="text-lg md:text-2xl text-gray-200 font-medium leading-relaxed mb-8">
                                “{current.quote}”
                            </p>

                            <div className="flex justify-center gap-1 mb-4 text-amber-400 text-sm">
                                {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} />)}
                            </div>

                            <p className="text-white font-semibold">{current.name}</p>
                            <p className="text-gray-500 text-sm">{current.role}</p>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* controls */}
                <div className="flex items-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => go(-1)}
                        className="w-10 h-10 rounded-full border border-white/10 bg-white/5
                                   flex items-center justify-center text-gray-300 hover:text-white
                                   hover:border-purple-500/40 transition-all duration-300"
                        aria-label="Previous testimonial"
                    >
                        <FaChevronLeft className="text-xs" />
                    </motion.button>

                    <div className="flex items-center gap-1.5">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === index ? "w-6 bg-purple-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                                }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => go(1)}
                        className="w-10 h-10 rounded-full border border-white/10 bg-white/5
                                   flex items-center justify-center text-gray-300 hover:text-white
                                   hover:border-purple-500/40 transition-all duration-300"
                        aria-label="Next testimonial"
                    >
                        <FaChevronRight className="text-xs" />
                    </motion.button>
                </div>
            </div>
        </section>
    )
}