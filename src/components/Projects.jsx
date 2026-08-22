import { motion, AnimatePresence } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { FaGithub, FaArrowUpRightFromSquare, FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { useEffect, useRef, useState, useCallback } from "react"
import { projects } from "../data/projects"

const AUTOPLAY_MS = 5500

/* ─── Progress dial (project number + ring) ───────────────────── */
function SlideCounter({ index, total }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-black text-white tabular-nums">
                {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm text-gray-600">/ {String(total).padStart(2, "0")}</span>
        </div>
    )
}

/* ─── Single showcase slide ────────────────────────────────────── */
function ProjectSlide({ project, direction }) {
    return (
        <motion.div
            key={project.title}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 80 : -80, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction > 0 ? -80 : 80, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
            {/* ── image / tilt preview ── */}
            <Tilt
                tiltMaxAngleX={7}
                tiltMaxAngleY={7}
                scale={1.02}
                transitionSpeed={1800}
                glareEnable
                glareMaxOpacity={0.1}
                glareColor="#a855f7"
            >
                <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
                    {/* animated border glow */}
                    <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-purple-500/40 via-transparent to-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* gradient wash */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />

                    {/* category chip */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold
                                      tracking-widest uppercase border border-purple-400/40
                                      bg-purple-500/15 text-purple-300 backdrop-blur-md">
                        {project.category}
                    </span>
                </div>
            </Tilt>

            {/* ── glass info panel ── */}
            <div className="flex flex-col gap-5">
                <SlideCounter index={projects.findIndex(p => p.title === project.title)} total={projects.length} />

                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                    {project.title}
                </h3>

                <p className="text-gray-400 text-sm md:text-base leading-7 max-w-xl">
                    {project.description}
                </p>

                {/* tech stack */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="px-3 py-1 rounded-full text-xs font-medium border border-white/10
                                       bg-white/5 text-gray-300"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mt-2">
                    {project.link && project.link !== "#" && (
                        <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                                       bg-gradient-to-r from-purple-600 to-pink-600 text-white
                                       shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 transition-shadow"
                        >
                            Live Preview <FaArrowUpRightFromSquare className="text-xs" />
                        </motion.a>
                    )}
                    <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium
                                   border border-white/10 bg-white/5 hover:border-purple-500/40
                                   hover:bg-white/8 transition-all duration-300"
                    >
                        <FaGithub /> Code
                    </motion.a>
                </div>
            </div>
        </motion.div>
    )
}

/* ─── Main Projects ────────────────────────────────────────────── */
export default function Projects() {
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [paused, setPaused] = useState(false)
    const wheelLock = useRef(false)
    const dragStartX = useRef(0)

    const total = projects.length

    const go = useCallback((dir) => {
        setDirection(dir)
        setIndex((i) => (i + dir + total) % total)
    }, [total])

    /* autoplay */
    useEffect(() => {
        if (paused) return
        const t = setInterval(() => go(1), AUTOPLAY_MS)
        return () => clearInterval(t)
    }, [paused, go])

    /* wheel support (horizontal & vertical) */
    const onWheel = (e) => {
        if (wheelLock.current) return
        if (Math.abs(e.deltaX) < 20 && Math.abs(e.deltaY) < 20) return
        wheelLock.current = true
        go(e.deltaX + e.deltaY > 0 ? 1 : -1)
        setTimeout(() => { wheelLock.current = false }, 500)
    }

    /* drag / swipe support */
    const onDragEnd = (e, info) => {
        if (info.offset.x < -80) go(1)
        else if (info.offset.x > 80) go(-1)
    }

    return (
        <section
            id="projects"
            className="relative py-28 md:py-36 px-6 bg-[#020617] overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* ambient glow */}
            <div className="absolute w-[500px] h-[500px] bg-purple-600/12 blur-[150px] top-0 right-0 rounded-full pointer-events-none" />
            <div className="absolute w-[500px] h-[500px] bg-blue-600/12 blur-[150px] bottom-0 left-0 rounded-full pointer-events-none" />

            <div className="relative max-w-6xl mx-auto flex flex-col gap-14">

                {/* heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                                      border border-purple-500/30 bg-purple-500/10 text-purple-400
                                      text-xs tracking-widest uppercase mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse inline-block" />
                        Selected Work
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                        <span className="text-white">Projects I've </span>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            shipped
                        </span>
                    </h2>
                </motion.div>

                {/* draggable slide stage */}
                <div
                    className="relative touch-pan-y"
                    onWheel={onWheel}
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.15}
                        onDragStart={(e) => { dragStartX.current = e.clientX }}
                        onDragEnd={onDragEnd}
                        className="cursor-grab active:cursor-grabbing"
                    >
                        <AnimatePresence mode="wait" custom={direction}>
                            <ProjectSlide
                                key={projects[index].title}
                                project={projects[index]}
                                direction={direction}
                            />
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* controls row */}
                <div className="flex items-center justify-between gap-6 flex-wrap">
                    {/* progress bar */}
                    <div className="flex-1 min-w-[140px] h-1 rounded-full bg-white/8 overflow-hidden">
                        <motion.div
                            key={index}
                            initial={{ width: "0%" }}
                            animate={{ width: paused ? undefined : "100%" }}
                            transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        />
                    </div>

                    {/* dots */}
                    <div className="hidden sm:flex items-center gap-1.5">
                        {projects.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === index ? "w-6 bg-purple-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                                }`}
                                aria-label={`Go to project ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* prev/next */}
                    <div className="flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => go(-1)}
                            className="w-11 h-11 rounded-full border border-white/10 bg-white/5
                                       flex items-center justify-center text-gray-300
                                       hover:border-purple-500/40 hover:text-white transition-all duration-300"
                            aria-label="Previous project"
                        >
                            <FaChevronLeft />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => go(1)}
                            className="w-11 h-11 rounded-full border border-white/10 bg-white/5
                                       flex items-center justify-center text-gray-300
                                       hover:border-purple-500/40 hover:text-white transition-all duration-300"
                            aria-label="Next project"
                        >
                            <FaChevronRight />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    )
}