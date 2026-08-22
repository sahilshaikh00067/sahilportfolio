import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import {
    FaGithub,
    FaLinkedin,
    FaReact,
    FaPython,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt
} from "react-icons/fa"
import { SiDjango } from "react-icons/si"
import { useEffect, useRef, useState } from "react"

/* ─── Particle Canvas ─────────────────────────────────────────── */
function ParticleCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        let animId
        let W, H
        const particles = []

        const resize = () => {
            W = canvas.width = window.innerWidth
            H = canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener("resize", resize)

        for (let i = 0; i < 120; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: Math.random() * 1.5 + 0.3,
                dx: (Math.random() - 0.5) * 0.3,
                dy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random() * 0.6 + 0.2,
            })
        }

        const draw = () => {
            ctx.clearRect(0, 0, W, H)
            particles.forEach((p) => {
                p.x += p.dx
                p.y += p.dy
                if (p.x < 0) p.x = W
                if (p.x > W) p.x = 0
                if (p.y < 0) p.y = H
                if (p.y > H) p.y = 0

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(168,85,247,${p.alpha})`
                ctx.fill()
            })
            animId = requestAnimationFrame(draw)
        }
        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-0"
        />
    )
}

/* ─── Scramble Text Hook ──────────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%"
function useScramble(target, trigger) {
    const [display, setDisplay] = useState(target)
    const frame = useRef(0)
    const raf = useRef(null)

    useEffect(() => {
        if (!trigger) return
        let iteration = 0
        const totalFrames = 20
        const run = () => {
            setDisplay(
                target
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " "
                        if (i < iteration) return target[i]
                        return CHARS[Math.floor(Math.random() * CHARS.length)]
                    })
                    .join("")
            )
            if (iteration < target.length) {
                iteration += 0.4
                raf.current = requestAnimationFrame(run)
            } else {
                setDisplay(target)
            }
        }
        run()
        return () => cancelAnimationFrame(raf.current)
    }, [trigger, target])

    return display
}

/* ─── Magnetic Button ─────────────────────────────────────────── */
function MagneticButton({ children, className, href }) {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const sx = useSpring(x, { stiffness: 200, damping: 15 })
    const sy = useSpring(y, { stiffness: 200, damping: 15 })

    const onMove = (e) => {
        const rect = ref.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        x.set((e.clientX - cx) * 0.35)
        y.set((e.clientY - cy) * 0.35)
    }
    const onLeave = () => { x.set(0); y.set(0) }

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ x: sx, y: sy }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={className}
        >
            {children}
        </motion.a>
    )
}

/* ─── Floating Tech Icon ──────────────────────────────────────── */
function FloatingIcon({ icon, color, className, duration = 5, rotates = false }) {
    return (
        <motion.div
            animate={
                rotates
                    ? { rotate: 360 }
                    : { y: [0, -22, 0], rotate: [0, 8, -8, 0] }
            }
            transition={
                rotates
                    ? { repeat: Infinity, duration, ease: "linear" }
                    : { repeat: Infinity, duration, ease: "easeInOut" }
            }
            whileHover={{ scale: 1.4, filter: "blur(0px)" }}
            className={`hidden md:block absolute text-5xl drop-shadow-lg cursor-pointer ${className}`}
            style={{ color, filter: `drop-shadow(0 0 12px ${color}80)` }}
        >
            {icon}
            {/* glow ring on hover */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileHover={{ opacity: 1, scale: 2 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-full blur-xl"
                style={{ background: `${color}30` }}
            />
        </motion.div>
    )
}

/* ─── Typewriter ──────────────────────────────────────────────── */
const ROLES = [
    "Python Full-Stack Developer",
    "React Architect",
    "Django Backend Engineer",
    "UI/UX Craftsman",
]
function Typewriter() {
    const [roleIdx, setRoleIdx] = useState(0)
    const [text, setText] = useState("")
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const target = ROLES[roleIdx]
        let timeout

        if (!deleting && text === target) {
            timeout = setTimeout(() => setDeleting(true), 1800)
        } else if (deleting && text === "") {
            setDeleting(false)
            setRoleIdx((i) => (i + 1) % ROLES.length)
        } else {
            timeout = setTimeout(() => {
                setText((t) =>
                    deleting ? t.slice(0, -1) : target.slice(0, t.length + 1)
                )
            }, deleting ? 40 : 80)
        }

        return () => clearTimeout(timeout)
    }, [text, deleting, roleIdx])

    return (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {text}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block ml-0.5 text-purple-400"
            >|</motion.span>
        </span>
    )
}

/* ─── Stat Counter ────────────────────────────────────────────── */
function StatCard({ value, label, delay }) {
    const [count, setCount] = useState(0)
    const [visible, setVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true) },
            { threshold: 0.3 }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    useEffect(() => {
        if (!visible) return
        const end = parseInt(value)
        let start = 0
        const duration = 1500
        const step = Math.ceil(duration / end)
        const timer = setInterval(() => {
            start += 1
            setCount(start)
            if (start >= end) clearInterval(timer)
        }, step)
        return () => clearInterval(timer)
    }, [visible, value])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            className="flex flex-col items-center gap-1 px-6 py-4 rounded-2xl
                       bg-white/5 border border-white/10 backdrop-blur-md
                       hover:border-purple-500/40 hover:bg-white/8 transition-all duration-300"
        >
            <span className="text-2xl md:text-3xl font-bold text-white">
                {count}{value.includes("+") ? "+" : ""}
            </span>
            <span className="text-xs text-gray-400 text-center">{label}</span>
        </motion.div>
    )
}

/* ─── Aurora Blobs ────────────────────────────────────────────── */
function AuroraBlobs() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <motion.div
                animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.9, 1] }}
                transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
                className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full
                           bg-purple-600/20 blur-[120px]"
            />
            <motion.div
                animate={{ x: [0, -60, 80, 0], y: [0, 80, -40, 0], scale: [1, 0.8, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
                className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full
                           bg-blue-600/20 blur-[120px]"
            />
            <motion.div
                animate={{ x: [0, 40, -80, 0], y: [0, -40, 60, 0] }}
                transition={{ repeat: Infinity, duration: 26, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                           w-[400px] h-[400px] rounded-full bg-pink-600/10 blur-[100px]"
            />
        </div>
    )
}

/* ─── Main Hero ───────────────────────────────────────────────── */
export default function Hero() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)
    const springX = useSpring(cursorX, { stiffness: 80, damping: 20 })
    const springY = useSpring(cursorY, { stiffness: 80, damping: 20 })
    const [scrambleTrigger, setScrambleTrigger] = useState(false)
    const scrambled = useScramble("Md. Sahil", scrambleTrigger)

    useEffect(() => {
        // trigger scramble once after mount
        const t = setTimeout(() => setScrambleTrigger(true), 800)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        const move = (e) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }
        window.addEventListener("mousemove", move)
        return () => window.removeEventListener("mousemove", move)
    }, [])

    /* stagger container */
    const container = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.12, delayChildren: 0.2 },
        },
    }
    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    }

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center
                       px-6 overflow-hidden bg-[#020617] text-white"
        >
            {/* ── cursor spotlight ── */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="pointer-events-none fixed z-50 w-[500px] h-[500px]
                           -translate-x-1/2 -translate-y-1/2
                           bg-purple-500/8 blur-[140px] rounded-full"
            />

            {/* ── aurora blobs ── */}
            <AuroraBlobs />

            {/* ── particles ── */}
            <ParticleCanvas />

            {/* ── 3D perspective grid ── */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 2 }}
                    className="w-full h-[140%]
                        bg-[linear-gradient(#a855f715_1px,transparent_1px),linear-gradient(90deg,#a855f715_1px,transparent_1px)]
                        bg-[size:60px_60px]
                        [transform:perspective(900px)_rotateX(55deg)]
                        origin-top"
                />
            </div>

            {/* ── horizontal scan line ── */}
            <motion.div
                initial={{ top: "-2%" }}
                animate={{ top: "102%" }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear", repeatDelay: 3 }}
                className="pointer-events-none absolute left-0 right-0 h-px z-20
                           bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"
            />

            {/* ── floating tech icons ── */}
            <FloatingIcon icon={<FaReact />}   color="#60a5fa" className="left-10 top-36"  duration={20} rotates />
            <FloatingIcon icon={<FaPython />}   color="#facc15" className="right-10 top-28" duration={5} />
            <FloatingIcon icon={<FaNodeJs />}   color="#4ade80" className="right-28 bottom-40" duration={6.5} />
            <FloatingIcon icon={<FaHtml5 />}    color="#f97316" className="left-28 bottom-36" duration={4.5} />
            <FloatingIcon icon={<FaCss3Alt />}  color="#38bdf8" className="right-16 bottom-24" duration={5.5} />
            <FloatingIcon icon={<SiDjango />}   color="#22c55e" className="left-16 top-24"  duration={7} />

            {/* ── main content ── */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative z-10 text-center max-w-4xl w-full flex flex-col items-center gap-6"
            >
                {/* eyebrow badge */}
                <motion.div variants={item}>
                    <motion.span
                        animate={{ boxShadow: ["0 0 0px #a855f700", "0 0 20px #a855f760", "0 0 0px #a855f700"] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                                   border border-purple-500/40 bg-purple-500/10 text-purple-300
                                   text-xs md:text-sm tracking-widest uppercase font-medium"
                    >
                        <motion.span
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-2 h-2 rounded-full bg-purple-400 inline-block"
                        />
                        Available for Work
                    </motion.span>
                </motion.div>

                {/* main heading with scramble */}
                <motion.div variants={item}>
                    <motion.h1
                        onHoverStart={() => setScrambleTrigger(false)}
                        onHoverEnd={() => setScrambleTrigger(true)}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tight leading-none select-none"
                    >
                        {/* scramble layer */}
                        <span className="bg-gradient-to-br from-white via-purple-200 to-pink-300 bg-clip-text text-transparent">
                            {scrambled}
                        </span>
                    </motion.h1>

                    {/* underline shimmer */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-2 h-1 w-full rounded-full origin-left
                                   bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                    />
                </motion.div>

                {/* typewriter role */}
                <motion.p variants={item} className="text-lg md:text-2xl font-light text-gray-400 h-8">
                    <Typewriter />
                </motion.p>

                {/* description */}
                <motion.p
                    variants={item}
                    className="text-gray-500 max-w-xl text-sm md:text-base leading-relaxed"
                >
                    Crafting high-performance web applications with clean architecture,
                    modern React frontends, and robust Django backends.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    variants={item}
                    className="flex justify-center gap-4 flex-wrap mt-2"
                >
                    <MagneticButton
                        href="https://github.com/sahilshaikh00067"
                        className="group relative flex items-center gap-2 px-7 py-3 rounded-xl
                                   bg-white/5 backdrop-blur-md border border-white/10
                                   text-sm font-medium overflow-hidden
                                   hover:border-purple-500/50 transition-all duration-300"
                    >
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <FaGithub className="relative z-10 text-lg" />
                        <span className="relative z-10">GitHub</span>
                    </MagneticButton>

                    <MagneticButton
                        href="https://www.linkedin.com/in/md-sahil-01a126389/"
                        className="group relative flex items-center gap-2 px-7 py-3 rounded-xl
                                   bg-white/5 backdrop-blur-md border border-white/10
                                   text-sm font-medium overflow-hidden
                                   hover:border-blue-500/50 transition-all duration-300"
                    >
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <FaLinkedin className="relative z-10 text-lg" />
                        <span className="relative z-10">LinkedIn</span>
                    </MagneticButton>

                    <MagneticButton
                        href="https://wa.me/918381845350"
                        className="group relative flex items-center gap-2 px-8 py-3 rounded-xl
                                   text-sm font-semibold overflow-hidden
                                   bg-gradient-to-r from-purple-600 to-pink-600
                                   shadow-lg shadow-purple-600/30
                                   hover:shadow-purple-500/50 hover:shadow-xl transition-all duration-300"
                    >
                        {/* animated border */}
                        <motion.span
                            className="absolute inset-0 rounded-xl"
                            animate={{
                                background: [
                                    "linear-gradient(0deg,#a855f7,#ec4899)",
                                    "linear-gradient(180deg,#a855f7,#ec4899)",
                                    "linear-gradient(360deg,#a855f7,#ec4899)",
                                ],
                            }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        />
                        <span className="relative z-10">Hire Me 🚀</span>
                    </MagneticButton>
                </motion.div>

                {/* stat cards */}
                <motion.div
                    variants={item}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 w-full max-w-2xl"
                >
                    <StatCard value="3+"  label="Years Experience" delay={0.8} />
                    <StatCard value="50+" label="Projects Built"   delay={0.9} />
                    <StatCard value="40+" label="Happy Clients"    delay={1.0} />
                    <StatCard value="5+"  label="Tech Stacks"      delay={1.1} />
                </motion.div>

                {/* scroll indicator */}
                <motion.div
                    variants={item}
                    className="flex flex-col items-center gap-2 mt-6"
                >
                    <span className="text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-px h-10 bg-gradient-to-b from-purple-500 to-transparent"
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}