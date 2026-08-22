import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa"

export default function Contact() {

    return (

        <section
            id="contact"
            className="relative py-32 px-6 bg-[#020617] overflow-hidden text-center"
        >

            {/* glow background */}

            <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[180px] -top-40 -left-40 animate-pulse"></div>
            <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[180px] -bottom-40 -right-40 animate-pulse"></div>


            <div className="relative max-w-4xl mx-auto">


                {/* heading */}

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="
text-4xl md:text-5xl font-bold mb-10
bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500
bg-clip-text text-transparent
"
                >

                    Let's Work Together

                </motion.h2>


                <p className="text-gray-400 mb-12 max-w-2xl mx-auto leading-8">

                    I'm always open to discussing new projects,
                    creative ideas, or opportunities to be part of your vision.
                    Feel free to reach out anytime.

                </p>


                {/* contact info */}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row justify-center gap-12 text-gray-300 mb-12"
                >

                    <div>
                        <p className="text-gray-500 text-sm">Location</p>
                        <p className="text-lg">Kandivali West, Mumbai</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Phone</p>
                        <p className="text-lg">+91 8381845350</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <p className="text-lg">shaikhsahil03801@gmail.com</p>
                    </div>

                </motion.div>


                {/* buttons */}

<div className="flex flex-wrap justify-center gap-6">

    {/* Send Email */}
    <motion.a
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.95 }}
        href="mailto:shaikhsahil03801@gmail.com?subject=Hello%20Sahil&body=I%20want%20to%20connect%20with%20you"
        className="
flex items-center gap-2
px-7 py-3 rounded-lg
bg-gradient-to-r from-purple-500 to-pink-500
text-white
shadow-lg shadow-purple-500/30
"
    >

        <FaEnvelope />

        Send Email

    </motion.a>


    {/* WhatsApp */}
    <motion.a
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.95 }}
        href="https://wa.me/918381845350"
        target="_blank"
        rel="noopener noreferrer"
        className="
flex items-center gap-2
px-7 py-3 rounded-lg
border border-white/10
hover:bg-white/10
transition
"
    >

        <FaWhatsapp />

        WhatsApp

    </motion.a>

</div>


                {/* social icons */}

<motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="flex justify-center gap-8 mt-16 text-3xl text-gray-400"
>

    {/* Github */}
    <a
        href="https://github.com/sahilshaikh00067"
        target="_blank"
        rel="noopener noreferrer"
        className="
hover:text-white
hover:scale-125
transition duration-300
"
    >
        <FaGithub />
    </a>

    {/* LinkedIn */}
    <a
        href="https://www.linkedin.com/in/md-sahil-01a126389/"
        target="_blank"
        rel="noopener noreferrer"
        className="
hover:text-blue-500
hover:scale-125
transition duration-300
"
    >
        <FaLinkedin />
    </a>

    {/* WhatsApp */}
    <a
        href="https://wa.me/918381845350"
        target="_blank"
        rel="noopener noreferrer"
        className="
hover:text-green-400
hover:scale-125
transition duration-300
"
    >
        <FaWhatsapp />
    </a>

</motion.div>

            </div>

        </section>

    )

}