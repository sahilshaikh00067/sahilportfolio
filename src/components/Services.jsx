import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"
import {
    FaReact, FaServer, FaShoppingCart, FaWhatsapp, FaPalette, FaRocket, FaArrowRight,
} from "react-icons/fa"

const SERVICES = [
    {
        icon: <FaReact />,
        title: "Frontend Development",
        desc: "Pixel-perfect, animated React interfaces built with Tailwind CSS and Framer Motion — fast, responsive, and production-ready.",
        color: "#60a5fa",
    },
    {
        icon: <FaServer />,
        title: "Full-Stack Web Apps",
        desc: "Django REST APIs paired with React frontends — auth, dashboards, and business logic deployed on Vercel + Render.",
        color: "#22c55e",
    },
    {
        icon: <FaRocket />,
        title: "SaaS Platform Builds",
        desc: "End-to-end SaaS products — campaign engines, admin panels, credit systems, and background job processing.",
        color: "#a855f7",
    },
    {
        icon: <FaShoppingCart />,
        title: "E-Commerce Solutions",
        desc: "Storefronts with cart, wishlist, and checkout flows tuned for conversion and built to scale with real traffic.",
        color: "#f59e0b",
    },
    {
        icon: <FaWhatsapp />,
        title: "Messaging Integrations",
        desc: "WhatsApp, SMS, and voice campaign systems — bulk sending, reporting, and provider integrations done right.",
        color: "#34d399",
    },
    {
        icon: <FaPalette />,
        title: "Premium UI/UX",
        desc: "Glassmorphism, 3D interactions, and cinematic motion design that make a product feel expensive and alive.",
        color: "#ec4899",
    },
]

function ServiceCard({ s, i }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
        >
            <Tilt
                tiltMaxAngleX={9}
                tiltMaxAngleY={9}
                scale={1.02}
                transitionSpeed={1600}
                glareEnable
                glareMaxOpacity={0.09}
                glareColor={s.color}
                className="h-full"
            >
                <div className="group relative h-full p-8 rounded-3xl border border-white/8 bg-white/4
                                 backdrop-blur-sm overflow-hidden transition-all duration-500
                                 hover:border-white/20">

                    {/* number */}
                    <span className="absolute top-6 right-7 text-5xl font-black text-white/5
                                      group-hover:text-white/10 transition-colors duration-500 select-none">
                        {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* animated hover glow bg */}
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 20% 10%, ${s.color}22, transparent 65%)` }}
                    />

                    {/* icon */}
                    <div
                        className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6
                                   border border-white/10 group-hover:scale-110 transition-transform duration-400"
                        style={{
                            color: s.color,
                            background: `${s.color}14`,
                            boxShadow: `0 0 0px ${s.color}00`,
                        }}
                    >
                        {s.icon}
                    </div>

                    <h3 className="relative z-10 text-xl font-bold text-white mb-3">{s.title}</h3>
                    <p className="relative z-10 text-gray-500 text-sm leading-7 mb-6">{s.desc}</p>

                    {/* animated arrow */}
                    <motion.div
                        className="relative z-10 flex items-center gap-2 text-sm font-semibold"
                        style={{ color: s.color }}
                    >
                        <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-400">
                            Learn more
                        </span>
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.4 }}
                        >
                            <FaArrowRight />
                        </motion.span>
                    </motion.div>
                </div>
            </Tilt>
        </motion.div>
    )
}

export default function Services() {
    return (
        <section id="services" className="relative py-28 md:py-36 px-6 bg-[#020617] overflow-hidden">
            <div className="absolute w-[450px] h-[450px] bg-pink-600/10 blur-[150px] top-10 left-1/2 -translate-x-1/2 rounded-full pointer-events-none" />

            <div className="relative max-w-6xl mx-auto flex flex-col gap-14">
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
                        What I Do
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                        <span className="text-white">Services built for </span>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            real products
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((s, i) => (
                        <ServiceCard key={s.title} s={s} i={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}