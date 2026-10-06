import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { useEffect, useRef, useState } from "react"

/* ─── Animated Counter ────────────────────────────────────────── */
function Counter({ target, suffix = "" }) {
    const [count, setCount] = useState(0)
    const [visible, setVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true) },
            { threshold: 0.5 }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    useEffect(() => {
        if (!visible) return
        const end = parseInt(target)
        let current = 0
        const duration = 1400
        const stepTime = Math.max(Math.floor(duration / end), 20)
        const timer = setInterval(() => {
            current += 1
            setCount(current)
            if (current >= end) clearInterval(timer)
        }, stepTime)
        return () => clearInterval(timer)
    }, [visible, target])

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    )
}

/* ─── Skill Badge ─────────────────────────────────────────────── */
const SKILL_COLORS = {
    "Python":      { from: "#3b82f6", to: "#06b6d4" },
    "Django":      { from: "#22c55e", to: "#16a34a" },
    "React.js":    { from: "#60a5fa", to: "#a78bfa" },
    "Next.js":     { from: "#e2e8f0", to: "#94a3b8" },
    "REST API":    { from: "#f59e0b", to: "#ef4444" },
    "Html5":       { from: "#f97316", to: "#ef4444" },
    "Tailwind CSS":{ from: "#06b6d4", to: "#3b82f6" },
    "Redux":       { from: "#a855f7", to: "#7c3aed" },
    "MySql":       { from: "#fb923c", to: "#f59e0b" },
    "CSS3":        { from: "#38bdf8", to: "#818cf8" },
}

function SkillBadge({ skill, index }) {
    const colors = SKILL_COLORS[skill] || { from: "#a855f7", to: "#ec4899" }

    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.12, y: -3 }}
            className="relative group px-4 py-2 rounded-xl text-sm font-medium cursor-default overflow-hidden border border-white/10"
            style={{
                background: "rgba(255,255,255,0.04)",
            }}
        >
            {/* gradient fill on hover */}
            <motion.span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{
                    background: `linear-gradient(135deg, ${colors.from}25, ${colors.to}25)`,
                    borderColor: `${colors.from}60`,
                }}
            />
            {/* dot */}
            <span
                className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
            />
            <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">
                {skill}
            </span>
        </motion.span>
    )
}

/* ─── Stat Card ───────────────────────────────────────────────── */
function StatCard({ value, suffix, label, icon, delay, color }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.04 }}
            className="relative group flex flex-col items-center gap-1 py-5 px-4 rounded-2xl
                       border border-white/8 bg-white/4 backdrop-blur-sm overflow-hidden
                       hover:border-white/20 transition-all duration-400 cursor-default"
        >
            {/* shimmer sweep on hover */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, ${color}18, transparent)`,
                }}
            />
            <span className="text-2xl mb-1">{icon}</span>
            <h3 className="text-2xl md:text-3xl font-black" style={{ color }}>
                <Counter target={value} suffix={suffix} />
            </h3>
            <p className="text-gray-500 text-xs text-center">{label}</p>
        </motion.div>
    )
}

/* ─── Glowing Image Card ──────────────────────────────────────── */
function ImageCard() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const glowX = useSpring(useTransform(mouseX, [-160, 160], [-40, 40]), { stiffness: 100, damping: 20 })
    const glowY = useSpring(useTransform(mouseY, [-160, 160], [-40, 40]), { stiffness: 100, damping: 20 })

    return (
        <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="flex justify-center"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                mouseX.set(e.clientX - rect.left - rect.width / 2)
                mouseY.set(e.clientY - rect.top - rect.height / 2)
            }}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
        >
            <Tilt
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                scale={1.04}
                transitionSpeed={1800}
                glareEnable={true}
                glareMaxOpacity={0.12}
                glareColor="#a855f7"
                className="w-[280px] sm:w-[320px] md:w-[340px]"
            >
                <div className="relative w-[280px] sm:w-[320px] md:w-[340px] rounded-3xl overflow-hidden">

                    {/* animated gradient border */}
                    <motion.div
                        animate={{
                            background: [
                                "linear-gradient(0deg, #a855f7, #3b82f6, #ec4899)",
                                "linear-gradient(120deg, #ec4899, #a855f7, #3b82f6)",
                                "linear-gradient(240deg, #3b82f6, #ec4899, #a855f7)",
                                "linear-gradient(360deg, #a855f7, #3b82f6, #ec4899)",
                            ],
                        }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="absolute inset-0 rounded-3xl p-[2px] z-0"
                    >
                        <div className="w-full h-full rounded-3xl bg-[#020617]" />
                    </motion.div>

                    {/* inner card */}
                    <div className="relative z-10 m-[5px] rounded-3xl overflow-hidden
                                    bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-xl">

                        <img
                            src="/sahil.jpeg"
                            alt="Md. Sahil"
                            className="w-full object-cover aspect-square"
                        />

                        {/* gradient overlay bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3
                                        bg-gradient-to-t from-[#020617] to-transparent" />

                        {/* name tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="absolute bottom-1 left-4 right-4"
                        >
                            <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-xl px-4 py-3">
                                <p className="text-white font-bold text-sm">Md. Sahil</p>
                                <p className="text-purple-400 text-xs">Python Full-Stack Developer</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* corner glow dot */}
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-3 -right-3 w-6 h-6 rounded-full
                                   bg-purple-500 blur-sm z-20"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="absolute -bottom-3 -left-3 w-5 h-5 rounded-full
                                   bg-blue-500 blur-sm z-20"
                    />
                </div>
            </Tilt>
        </motion.div>
    )
}

/* ─── Section Heading ─────────────────────────────────────────── */
function SectionHeading() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
        >
            {/* eyebrow */}
            <motion.span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                           border border-purple-500/30 bg-purple-500/10 text-purple-400
                           text-xs tracking-widest uppercase mb-4"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse inline-block" />
                About Me
            </motion.span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                <span className="text-white">Building the </span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Web of Tomorrow
                </span>
            </h2>

            {/* animated underline */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="mt-3 h-px w-24 origin-left bg-gradient-to-r from-purple-500 to-transparent"
            />
        </motion.div>
    )
}

/* ─── Main About ──────────────────────────────────────────────── */
const SKILLS = ["Python", "Django", "React.js", "Next.js", "REST API", "Html5", "Tailwind CSS", "Redux", "MySql", "CSS3"]

const STATS = [
    { value: "40", suffix: "+", label: "Projects Shipped",  icon: "🚀", color: "#a855f7", delay: 0.1 },
    { value: "1",  suffix: "+", label: "Years of Learning", icon: "📚", color: "#3b82f6", delay: 0.2 },
    { value: "5",  suffix: "+", label: "Tech Stacks",       icon: "⚙️", color: "#ec4899", delay: 0.3 },
    { value: "100",suffix: "%", label: "Passion",           icon: "🔥", color: "#f59e0b", delay: 0.4 },
]

export default function About() {
    return (
        <section
            id="about"
            className="relative py-28 md:py-36 px-6 overflow-hidden bg-[#020617]"
        >
            {/* background blobs */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
                transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
                className="absolute w-[500px] h-[500px] bg-purple-600/15 blur-[140px] -top-40 -left-40 rounded-full pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], x: [0, -40, 0] }}
                transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
                className="absolute w-[500px] h-[500px] bg-blue-600/15 blur-[140px] -bottom-40 -right-40 rounded-full pointer-events-none"
            />

            {/* subtle grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                 style={{
                     backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                     backgroundSize: "50px 50px",
                 }}
            />

            <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">

                {/* ── Left: Image ── */}
                <ImageCard />

                {/* ── Right: Content ── */}
                <div className="flex flex-col gap-8">

                    <SectionHeading />

                    {/* bio text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <p className="text-gray-400 leading-8 text-base md:text-lg">
                            Hello, I'm{" "}
                            <span className="text-white font-semibold relative inline-block">
                                Md. Sahil
                                <motion.span
                                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-purple-500 to-pink-500"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    viewport={{ once: true }}
                                />
                            </span>
                            , a passionate{" "}
                            <span className="text-purple-400 font-medium">Python Full-Stack Developer</span>{" "}
                            from Mumbai. I specialize in building modern web applications using{" "}
                            <span className="text-white font-medium">Python</span>,{" "}
                            <span className="text-white font-medium">Django</span>,{" "}
                            <span className="text-white font-medium">React.js</span>, and cutting-edge UI frameworks.
                        </p>

                        <p className="text-gray-500 leading-8 text-sm md:text-base">
                            I enjoy solving complex problems with clean architecture and modern technology.
                            My goal is to deliver products that combine performance, scalability, and elegant design —
                            every pixel intentional, every line purposeful.
                        </p>
                    </motion.div>

                    {/* skill badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2"
                    >
                        {SKILLS.map((skill, i) => (
                            <SkillBadge key={skill} skill={skill} index={i} />
                        ))}
                    </motion.div>

                    {/* stat cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {STATS.map((s) => (
                            <StatCard key={s.label} {...s} />
                        ))}
                    </div>

                    {/* CTA row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex gap-3 flex-wrap"
                    >
                        <motion.a
                            href="/resumess.pdf"
                            download
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                                       bg-gradient-to-r from-purple-600 to-pink-600
                                       shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50
                                       hover:shadow-xl transition-shadow duration-300"
                        >
                            📄 Download CV
                        </motion.a>

                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium
                                       bg-white/5 border border-white/10 backdrop-blur-sm
                                       hover:border-purple-500/40 hover:bg-white/8 transition-all duration-300"
                        >
                            💬 Let's Talk
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}