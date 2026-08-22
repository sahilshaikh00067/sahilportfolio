import { motion, useScroll, useTransform } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { FaGraduationCap, FaCode, FaFlask } from "react-icons/fa"
import { useRef, useState } from "react"

/* ─── Data ────────────────────────────────────────────────────── */
const education = [
    {
        title: "Bachelor's Degree (Ongoing)",
        institute: "Sailee Degree College",
        location: "Borivali, Mumbai University",
        year: "2025 – Present",
        tag: "University",
        icon: <FaGraduationCap />,
        color: "#a855f7",
        glow: "#a855f730",
        description:
            "Currently pursuing my undergraduate degree while simultaneously learning Python Full Stack Development. My focus is on software engineering, building scalable web applications, and mastering modern technologies like React, Django, REST APIs and UI development.",
        badges: ["Software Engineering", "Web Apps", "React", "Django"],
    },
    {
        title: "Higher Secondary Education (11th & 12th)",
        institute: "Shri T.P. Bhatia Junior College of Science",
        location: "Mumbai, Maharashtra",
        year: "Completed",
        tag: "Science Stream",
        icon: <FaFlask />,
        color: "#3b82f6",
        glow: "#3b82f630",
        description:
            "Completed Higher Secondary Education in Science stream with a strong foundation in mathematics, logical thinking and analytical problem solving — the spark that ignited my programming journey.",
        badges: ["Mathematics", "Physics", "Logic", "Problem Solving"],
    },
    {
        title: "Python Full Stack Development",
        institute: "TryCatch Classes",
        location: "Borivali West, Mumbai",
        year: "2024 – Present",
        tag: "Bootcamp",
        icon: <FaCode />,
        color: "#ec4899",
        glow: "#ec489930",
        description:
            "Learning modern full-stack development including Python, Django, React.js, REST APIs, database design, UI engineering, and building real-world production-ready web applications from scratch.",
        badges: ["Python", "Django", "React.js", "REST API", "Databases"],
    },
]

/* ─── Badge ───────────────────────────────────────────────────── */
function Badge({ text, color }) {
    return (
        <span
            className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
            style={{
                color,
                borderColor: `${color}40`,
                background: `${color}12`,
            }}
        >
            {text}
        </span>
    )
}

/* ─── Timeline Node ───────────────────────────────────────────── */
function TimelineNode({ color, icon, isLast }) {
    return (
        <div className="relative flex flex-col items-center">
            {/* pulsing outer ring */}
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute w-10 h-10 rounded-full"
                style={{ background: `${color}30` }}
            />
            {/* icon circle */}
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-base shadow-xl"
                style={{
                    background: `linear-gradient(135deg, ${color}, ${color}aa)`,
                    boxShadow: `0 0 20px ${color}60`,
                }}
            >
                {icon}
            </motion.div>
            {/* connecting line */}
            {!isLast && (
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="w-px flex-1 mt-3 origin-top"
                    style={{
                        background: `linear-gradient(to bottom, ${color}60, transparent)`,
                        minHeight: "60px",
                    }}
                />
            )}
        </div>
    )
}

/* ─── Education Card ──────────────────────────────────────────── */
function EduCard({ item, index }) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="flex-1 pb-14 last:pb-0"
        >
            <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                scale={1.02}
                transitionSpeed={2000}
                glareEnable
                glareMaxOpacity={0.06}
                glareColor={item.color}
            >
                <motion.div
                    onHoverStart={() => setHovered(true)}
                    onHoverEnd={() => setHovered(false)}
                    className="relative rounded-2xl overflow-hidden border border-white/8
                               bg-white/4 backdrop-blur-xl transition-all duration-500 cursor-default"
                    style={{
                        boxShadow: hovered ? `0 0 40px ${item.color}25` : "none",
                        borderColor: hovered ? `${item.color}40` : "rgba(255,255,255,0.08)",
                    }}
                >
                    {/* top accent bar */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                        style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                    />

                    {/* hover glow bg */}
                    <motion.div
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 30% 30%, ${item.color}10, transparent 70%)` }}
                    />

                    <div className="relative z-10 p-7 md:p-8">
                        {/* top row */}
                        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                            <div>
                                {/* tag pill */}
                                <span
                                    className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold
                                               tracking-widest uppercase mb-3 border"
                                    style={{
                                        color: item.color,
                                        borderColor: `${item.color}40`,
                                        background: `${item.color}15`,
                                    }}
                                >
                                    {item.tag}
                                </span>
                                <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
                                    {item.title}
                                </h3>
                            </div>

                            {/* year chip */}
                            <motion.span
                                whileHover={{ scale: 1.08 }}
                                className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium
                                           bg-white/6 border border-white/10 text-gray-300 whitespace-nowrap"
                            >
                                🗓 {item.year}
                            </motion.span>
                        </div>

                        {/* institute + location */}
                        <p className="text-white/80 font-medium text-sm mb-0.5">{item.institute}</p>
                        <p className="text-gray-500 text-xs mb-5 flex items-center gap-1">
                            <span style={{ color: item.color }}>📍</span> {item.location}
                        </p>

                        {/* divider */}
                        <div className="h-px bg-white/6 mb-5" />

                        {/* description */}
                        <p className="text-gray-400 text-sm leading-7">{item.description}</p>

                        {/* badges */}
                        <div className="flex flex-wrap gap-2 mt-5">
                            {item.badges.map((b) => (
                                <Badge key={b} text={b} color={item.color} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Tilt>
        </motion.div>
    )
}

/* ─── Main Section ────────────────────────────────────────────── */
export default function Education() {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

    return (
        <section
            id="education"
            ref={sectionRef}
            className="relative py-28 md:py-36 px-6 bg-[#020617] overflow-hidden"
        >
            {/* parallax aurora */}
            <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
                    className="absolute w-[600px] h-[600px] bg-purple-600/15 blur-[160px] -top-60 -left-60 rounded-full"
                />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], x: [0, -40, 0] }}
                    transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
                    className="absolute w-[600px] h-[600px] bg-blue-600/15 blur-[160px] -bottom-60 -right-60 rounded-full"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
                    className="absolute w-[400px] h-[400px] bg-pink-600/10 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                />
            </motion.div>

            {/* grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{
                    backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                    backgroundSize: "50px 50px",
                }}
            />

            <div className="relative max-w-5xl mx-auto">

                {/* ── Heading ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.span
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4
                                   border border-purple-500/30 bg-purple-500/10 text-purple-400
                                   text-xs tracking-widest uppercase font-medium"
                    >
                        <motion.span
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ repeat: Infinity, duration: 1.6 }}
                            className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"
                        />
                        My Journey
                    </motion.span>

                    <h2 className="text-4xl md:text-5xl font-black leading-tight">
                        <span className="text-white">Education &amp; </span>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Learning Path
                        </span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-gray-500 mt-4 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
                    >
                        Every milestone that shaped who I am as a developer — from classroom to codebase.
                    </motion.p>

                    {/* decorative line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mt-6 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent origin-center"
                    />
                </motion.div>

                {/* ── Timeline ── */}
                <div className="space-y-0">
                    {education.map((item, i) => (
                        <div key={i} className="flex gap-6 md:gap-10">
                            {/* left: node + line */}
                            <TimelineNode
                                color={item.color}
                                icon={item.icon}
                                isLast={i === education.length - 1}
                            />
                            {/* right: card */}
                            <EduCard item={item} index={i} />
                        </div>
                    ))}
                </div>

                {/* ── Bottom decoration ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-20 flex justify-center"
                >
                    <div className="flex items-center gap-3 px-6 py-4 rounded-2xl
                                    border border-white/8 bg-white/4 backdrop-blur-md">
                        <motion.span
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-2xl"
                        >
                            🎓
                        </motion.span>
                        <p className="text-gray-400 text-sm">
                            Always learning, always building —{" "}
                            <span className="text-purple-400 font-medium">the journey continues.</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}