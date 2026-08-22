import { motion } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa"

export default function WhatsappButton() {

    return (

        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="fixed bottom-8 right-8 z-50 group"
        >

            {/* ripple rings */}

            <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping"></span>
            <span className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-pulse"></span>

            {/* main button */}

            <motion.a
                href="https://wa.me/918381845350"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="
relative
flex items-center justify-center
w-16 h-16
rounded-full
bg-gradient-to-br from-green-400 to-green-600
text-white text-3xl
shadow-xl shadow-green-500/50
transition
"
            >

                <FaWhatsapp />

            </motion.a>

            {/* tooltip */}

            <div
                className="
absolute right-20 top-1/2 -translate-y-1/2
opacity-0 group-hover:opacity-100
translate-x-4 group-hover:translate-x-0
transition duration-300
bg-white/10 backdrop-blur-lg
border border-white/20
text-white text-sm
px-4 py-2 rounded-lg
whitespace-nowrap
"
            >

                Chat with me

            </div>

        </motion.div>

    )

}