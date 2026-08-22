import { motion } from "framer-motion"
import { Link } from "react-scroll"
import { FaGithub, FaLinkedin, FaWhatsapp, FaArrowUp } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="relative bg-[#020617] border-t border-white/8 px-6 pt-16 pb-8 overflow-hidden">
            <div className="absolute w-[400px] h-[400px] bg-purple-600/8 blur-[140px] bottom-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none" />

            <div className="relative max-w-6xl mx-auto flex flex-col gap-10">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

                    {/* logo + statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500
                                       bg-clip-text text-transparent mb-2">
                            Md. Sahil
                        </h3>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                            Crafting high-performance web applications with clean architecture
                            and premium design.
                        </p>
                    </motion.div>

                    {/* social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                    >
                        {[
                            { icon: <FaGithub />, href: "https://github.com/sahilshaikh00067", hover: "hover:text-white" },
                            { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/md-sahil-01a126389/", hover: "hover:text-blue-400" },
                            { icon: <FaWhatsapp />, href: "https://wa.me/918381845350", hover: "hover:text-green-400" },
                        ].map((s, i) => (
                            <motion.a
                                key={i}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -4, scale: 1.15 }}
                                className={`w-11 h-11 rounded-xl border border-white/10 bg-white/5
                                            flex items-center justify-center text-gray-400 text-lg
                                            transition-colors duration-300 ${s.hover}`}
                            >
                                {s.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                <div className="h-px bg-white/8" />

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-xs">
                        © {new Date().getFullYear()} Md. Sahil. All rights reserved.
                    </p>

                    {/* back to top */}
                    <Link to="home" smooth={true} duration={600}>
                        <motion.button
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.92 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium
                                       border border-white/10 bg-white/5 text-gray-400
                                       hover:border-purple-500/40 hover:text-white transition-all duration-300"
                        >
                            Back to top <FaArrowUp className="text-[10px]" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </footer>
    )
}