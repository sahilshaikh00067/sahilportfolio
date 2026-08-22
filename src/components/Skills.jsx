import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { useState, useRef } from "react"

import {
    FaPython, FaReact, FaHtml5, FaCss3Alt,
    FaJs, FaNodeJs, FaGitAlt, FaWordpress, FaGithub
} from "react-icons/fa"

import {
    SiDjango, SiRedux, SiTailwindcss,
    SiMysql, SiPostman, SiNextdotjs
} from "react-icons/si"

/* ─── Data ────────────────────────────────────────────────────── */
const skills = [
    { name: "Python",      icon: <FaPython />,      color: "#3b82f6", level: 85, cat: "Backend"  },
    { name: "Django",      icon: <SiDjango />,      color: "#22c55e", level: 80, cat: "Backend"  },
    { name: "JavaScript",  icon: <FaJs />,           color: "#facc15", level: 78, cat: "Frontend" },
    { name: "React.js",    icon: <FaReact />,        color: "#60a5fa", level: 82, cat: "Frontend" },
    { name: "Next.js",     icon: <SiNextdotjs />,    color: "#e2e8f0", level: 65, cat: "Frontend" },
    { name: "Node.js",     icon: <FaNodeJs />,       color: "#4ade80", level: 60, cat: "Backend"  },
    { name: "Redux",       icon: <SiRedux />,        color: "#a78bfa", level: 70, cat: "Frontend" },
    { name: "HTML5",       icon: <FaHtml5 />,        color: "#f97316", level: 92, cat: "Frontend" },
    { name: "CSS3",        icon: <FaCss3Alt />,      color: "#38bdf8", level: 88, cat: "Frontend" },
    { name: "Tailwind CSS",icon: <SiTailwindcss />,  color: "#06b6d4", level: 90, cat: "Frontend" },
    { name: "MySQL",       icon: <SiMysql />,        color: "#fb923c", level: 72, cat: "Database" },
    { name: "WordPress",   icon: <FaWordpress />,    color: "#818cf8", level: 65, cat: "CMS"      },
    { name: "Postman",     icon: <SiPostman />,      color: "#ef4444", level: 75, cat: "Tools"    },
    { name: "GitHub",      icon: <FaGithub />,       color: "#d1d5db", level: 80, cat: "Tools"    },
]

const CATS = ["All", "Frontend", "Backend", "Database", "Tools", "CMS"]

/* ─── Animated Progress Bar ───────────────────────────────────── */
function ProgressBar({ level, color, visible }) {
    return (
        <div className="w-full h-1 bg-white/8 rounded-full overflow-hidden mt-3">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: visible ? `${level}%` : 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
            />
        </div>
    )
}

/* ─── Skill Card ──────────────────────────────────────────────── */
function SkillCard({ skill, index }) {
    const [hovered, setHovered] = useState(false)
    const ref = useRef(null)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            layout
        >
            <Tilt
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                scale={1.04}
                transitionSpeed={1800}
                glareEnable
                glareMaxOpacity={0.08}
                glareColor={skill.color}
            >
                <motion.div
                    onHoverStart={() => setHovered(true)}
                    onHoverEnd={() => setHovered(false)}
                    whileHover={{ y: -4 }}
                    className="relative group p-6 rounded-2xl overflow-hidden cursor-default
                               border border-white/8 bg-white/4 backdrop-blur-xl
                               transition-all duration-400"
                    style={{
                        boxShadow: hovered ? `0 8px 40px ${skill.color}25` : "none",
                        borderColor: hovered ? `${skill.color}45` : "rgba(255,255,255,0.08)",
                    }}
                >
                    {/* top accent line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: index * 0.045 + 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                        style={{ background: `linear-gradient(90deg, ${skill.color}, transparent)` }}
                    />

                    {/* radial glow on hover */}
                    <motion.div
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{
                            background: `radial-gradient(circle at 40% 40%, ${skill.color}14, transparent 70%)`,
                        }}
                    />

                    {/* category tag */}
                    <span
                        className="absolute top-3 right-3 text-[9px] px-2 py-0.5 rounded-full font-semibold tracking-wider uppercase border"
                        style={{
                            color: skill.color,
                            borderColor: `${skill.color}35`,
                            background: `${skill.color}12`,
                        }}
                    >
                        {skill.cat}
                    </span>

                    {/* icon */}
                    <motion.div
                        animate={hovered
                            ? { scale: 1.2, rotate: [0, -8, 8, 0] }
                            : { scale: 1, rotate: 0 }
                        }
                        transition={{ duration: 0.4 }}
                        className="text-4xl mb-4 w-fit"
                        style={{
                            color: skill.color,
                            filter: hovered ? `drop-shadow(0 0 12px ${skill.color}80)` : "none",
                        }}
                    >
                        {skill.icon}
                    </motion.div>

                    {/* name */}
                    <p className="text-white font-semibold text-sm mb-1">{skill.name}</p>

                    {/* level text */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-[11px]">Proficiency</span>
                        <motion.span
                            animate={{ color: hovered ? skill.color : "#6b7280" }}
                            className="text-[11px] font-bold tabular-nums"
                        >
                            {skill.level}%
                        </motion.span>
                    </div>

                    {/* progress bar */}
                    <ProgressBar level={skill.level} color={skill.color} visible={hovered} />
                </motion.div>
            </Tilt>
        </motion.div>
    )
}

/* ─── Filter Pill ─────────────────────────────────────────────── */
function FilterPill({ label, active, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide
                       border transition-all duration-300 overflow-hidden"
            style={{
                borderColor: active ? "#a855f7" : "rgba(255,255,255,0.1)",
                background: active ? "rgba(168,85,247,0.18)" : "rgba(255,255,255,0.04)",
                color: active ? "#c084fc" : "#6b7280",
            }}
        >
            {active && (
                <motion.span
                    layoutId="pill-bg"
                    className="absolute inset-0 rounded-full bg-purple-500/15"
                />
            )}
            <span className="relative z-10">{label}</span>
        </motion.button>
    )
}

/* ─── Main ────────────────────────────────────────────────────── */
export default function Skills() {
    const [activeFilter, setActiveFilter] = useState("All")

    const filtered = activeFilter === "All"
        ? skills
        : skills.filter((s) => s.cat === activeFilter)

    return (
        <section
            id="skills"
            className="relative py-28 md:py-36 px-6 bg-[#020617] overflow-hidden"
        >
            {/* aurora blobs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
                transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
                className="absolute w-[600px] h-[600px] bg-purple-600/12 blur-[150px]
                           -top-60 -left-60 rounded-full pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.15, 1], x: [0, -40, 0] }}
                transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
                className="absolute w-[600px] h-[600px] bg-blue-600/12 blur-[150px]
                           -bottom-60 -right-60 rounded-full pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
                className="absolute w-[400px] h-[400px] bg-pink-600/8 blur-[120px]
                           top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            />

            {/* grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{
                    backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                    backgroundSize: "50px 50px",
                }}
            />

            <div className="relative max-w-6xl mx-auto">

                {/* ── Heading ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <motion.span
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4
                                   border border-purple-500/30 bg-purple-500/10 text-purple-400
                                   text-xs tracking-widest uppercase font-medium"
                    >
                        <motion.span
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1.6 }}
                            className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"
                        />
                        Arsenal
                    </motion.span>

                    <h2 className="text-4xl md:text-5xl font-black">
                        <span className="text-white">Technical </span>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Skills
                        </span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-gray-500 mt-4 text-sm max-w-md mx-auto leading-relaxed"
                    >
                        Tools and technologies I wield to bring ideas to life.
                    </motion.p>
 
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mt-5 mx-auto h-px w-28 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                    />
                </motion.div>

                {/* ── Filter pills ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {CATS.map((cat) => (
                        <FilterPill
                            key={cat}
                            label={cat}
                            active={activeFilter === cat}
                            onClick={() => setActiveFilter(cat)}
                        />
                    ))}
                </motion.div>

                {/* ── Grid ── */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                    {filtered.map((skill, i) => (
                        <SkillCard key={skill.name} skill={skill} index={i} />
                    ))}
                </motion.div>

                {/* ── Bottom note ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-6 py-4 rounded-2xl
                                    border border-white/8 bg-white/4 backdrop-blur-md">
                        <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2.5 }}
                            className="text-xl"
                        >
                            ⚡
                        </motion.span>
                        <p className="text-gray-400 text-sm text-center">
                            Pursuing{" "}
                            <span className="text-white font-semibold">Python Full Stack Development</span>{" "}
                            at{" "}
                            <span className="text-purple-400 font-semibold">TryCatch Classes, Borivali West</span>
                            {" "}— building real-world scalable applications every day.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}