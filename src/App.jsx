import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import Loader from "./components/Loader"
import ScrollProgress from "./components/ScrollProgress"
import CursorGlow from "./components/CursorGlow"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Education from "./components/Education"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Services from "./components/Services"
import Testimonials from "./components/Testimonials"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import WhatsappButton from "./components/WhatsappButton"

export default function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // simulate initial premium loader — swap for a real asset-preload check if needed
        const t = setTimeout(() => setLoading(false), 1800)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        // lock scroll while the loader is up so content doesn't jump under it
        document.body.style.overflow = loading ? "hidden" : "auto"
    }, [loading])

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && (
                    <motion.div
                        key="loader"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Loader />
                    </motion.div>
                )}
            </AnimatePresence>

            {!loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-[#020617]"
                >
                    <ScrollProgress />
                    <CursorGlow />
                    <Navbar />

                    <main>
                        <Hero />
                        <About />
                        <Education />
                        <Skills />
                        <Projects />
                        <Services />
                        <Testimonials />
                        <Contact />
                    </main>

                    <Footer />
                    <WhatsappButton />
                </motion.div>
            )}
        </>
    )
}