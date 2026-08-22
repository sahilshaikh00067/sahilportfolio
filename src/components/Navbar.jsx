import { Link } from "react-scroll"
import { motion } from "framer-motion"
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

export default function Navbar() {

    const [open, setOpen] = useState(false)

    const navLinks = [
        { label: "Home", to: "home" },
        { label: "About", to: "about" },
        { label: "Education", to: "education" },
        { label: "Skills", to: "skills" },
        { label: "Projects", to: "projects" },
        { label: "Services", to: "services" },
        { label: "Testimonials", to: "testimonials" },
        { label: "Contact", to: "contact" }
    ]

    return (

        <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">

            {/* animated glow */}
            <div className="absolute inset-0 -z-10 opacity-30
bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-2xl"></div>

            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 md:px-8 py-4">

                {/* Logo */}
                <motion.h1
                    whileHover={{ rotateX: 10, rotateY: -10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="
text-lg sm:text-xl md:text-2xl font-bold tracking-wide
bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500
bg-clip-text text-transparent
cursor-pointer
"
                >
                    Md.Sahil
                </motion.h1>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8 text-gray-300 font-medium">

                    {navLinks.map((item, i) => (

                        <motion.div
                            key={i}
                            whileHover={{ y: -3 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >

                            <Link
                                to={item.to}
                                smooth={true}
                                duration={500}
                                offset={-80}
                                spy={true}
                                activeClass="text-white"
                                className="cursor-pointer relative group hover:text-white transition text-sm lg:text-base whitespace-nowrap"
                            >

                                {item.label}

                                <span className="absolute -bottom-1 left-0 h-[2px] w-0
bg-gradient-to-r from-purple-500 to-pink-500
transition-all duration-300 group-hover:w-full"></span>

                            </Link>

                        </motion.div>

                    ))}

                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-3 lg:gap-4">

                    <a
                        href="/resume.pdf"
                        download
                        className="
px-5 py-2 rounded-lg
border border-purple-500 text-purple-400
hover:bg-purple-500 hover:text-white
transition duration-300
"
                    >
                        Resume
                    </a>

                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                    >

                        <Link
                            to="contact"
                            smooth={true}
                            duration={500}
                            offset={-80}
                            className="
px-6 py-2 rounded-lg
bg-gradient-to-r from-purple-500 to-pink-500
hover:shadow-lg hover:shadow-purple-500/30
transition duration-300 text-white cursor-pointer
"
                        >

                            Hire Me

                        </Link>

                    </motion.div>

                </div>

                {/* Mobile Menu Button */}
                <div
                    className="md:hidden text-white text-xl cursor-pointer"
                    onClick={() => setOpen(!open)}
                >

                    {open ? <FaTimes /> : <FaBars />}

                </div>

            </div>

            {/* Mobile Menu */}
            {open && (

                <motion.div
                    initial={{ opacity: 0, y: -30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 max-h-[80vh] overflow-y-auto scrollbar-hide"
                >

                    <div className="flex flex-col items-center py-6 gap-6 w-full px-6">

                        {navLinks.map((item, i) => (

                            <Link
                                key={i}
                                to={item.to}
                                smooth={true}
                                duration={500}
                                offset={-70}
                                onClick={() => setOpen(false)}
                                className="text-gray-300 hover:text-white transition text-lg"
                            >

                                {item.label}

                            </Link>

                        ))}

                        {/* Mobile Resume */}
                        <a
                            href="/resume.pdf"
                            download
                            className="
px-5 py-2 rounded-lg
border border-purple-500 text-purple-400
hover:bg-purple-500 hover:text-white
transition duration-300
w-full text-center
"
                        >
                            Resume
                        </a>

                        {/* Mobile Hire Me */}
                        <Link
                            to="contact"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            onClick={() => setOpen(false)}
                            className="
px-6 py-2 rounded-lg
bg-gradient-to-r from-purple-500 to-pink-500
hover:shadow-lg hover:shadow-purple-500/30
transition duration-300 text-white cursor-pointer
w-full text-center
"
                        >

                            Hire Me

                        </Link>

                    </div>

                </motion.div>

            )}

        </nav>

    )

}