import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaDownload,
  FaArrowRight,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "Home", to: "home" },
    { label: "About", to: "about" },
    { label: "Education", to: "education" },
    { label: "Skills", to: "skills" },
    { label: "Projects", to: "projects" },
    { label: "Services", to: "services" },
    { label: "Testimonials", to: "testimonials" },
    { label: "Contact", to: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav
        className={`
          fixed top-0 left-0 w-full z-[100]
          transition-all duration-500
          ${
            scrolled
              ? "py-2 bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-purple-500/5"
              : "py-3 sm:py-4 bg-black/30 backdrop-blur-xl border-b border-transparent"
          }
        `}
      >
        {/* Animated background glow */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-20 left-1/4 w-72 h-32 bg-purple-600/20 blur-[100px] rounded-full animate-pulse" />

          <div className="absolute -top-20 right-1/4 w-72 h-32 bg-pink-600/20 blur-[100px] rounded-full animate-pulse" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between gap-3">
            {/* ================= LOGO ================= */}

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 18,
              }}
              className="relative shrink-0 cursor-pointer"
            >
              <Link
                to="home"
                smooth={true}
                duration={700}
                offset={-80}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Logo Icon */}

                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-[1px] shadow-lg shadow-purple-500/20">
                    <div className="w-full h-full rounded-xl bg-black/90 flex items-center justify-center">
                      <span className="text-sm sm:text-base font-black text-white">
                        S
                      </span>
                    </div>
                  </div>

                  {/* Logo Text */}

                  <div className="leading-none">
                    <h1 className="text-base sm:text-lg lg:text-xl font-black tracking-tight bg-gradient-to-r from-purple-300 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      Md.Sahil
                    </h1>

                    <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-gray-500 mt-1">
                      Portfolio
                    </span>
                  </div>
                </div>
              </Link>

              {/* Logo glow */}

              <div className="absolute inset-0 -z-10 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition" />
            </motion.div>

            {/* ================= DESKTOP NAVIGATION ================= */}

            <div className="hidden xl:flex items-center">
              <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-white/[0.035] border border-white/[0.06] backdrop-blur-xl">
                {navLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    smooth={true}
                    duration={650}
                    offset={-85}
                    spy={true}
                    activeClass="!text-white"
                    className="
                      relative px-3 py-2
                      text-[13px] font-medium
                      text-gray-400
                      cursor-pointer
                      rounded-xl
                      transition-all duration-300
                      hover:text-white
                      hover:bg-white/[0.07]
                      whitespace-nowrap
                    "
                  >
                    {item.label}

                    {/* Active indicator */}

                    <span className="absolute left-1/2 bottom-1 w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>

            {/* ================= TABLET NAV ================= */}

            <div className="hidden lg:flex xl:hidden items-center gap-1">
              {navLinks.slice(0, 5).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  smooth={true}
                  duration={650}
                  offset={-85}
                  spy={true}
                  activeClass="text-white"
                  className="
                    px-2 py-2
                    text-xs
                    text-gray-400
                    hover:text-white
                    cursor-pointer
                    transition
                    whitespace-nowrap
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* ================= DESKTOP BUTTONS ================= */}

            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {/* Resume */}

              <motion.a
                href="/resumess.pdf"
                download
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="
                  hidden 2xl:flex
                  items-center gap-2
                  px-4 py-2.5
                  rounded-xl
                  border border-white/10
                  bg-white/[0.03]
                  text-sm font-medium text-gray-200
                  hover:bg-white/[0.08]
                  hover:border-purple-400/40
                  hover:text-white
                  transition-all duration-300
                "
              >
                <FaDownload className="text-xs text-purple-400" />

                Resume
              </motion.a>

              {/* Hire Me */}

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="contact"
                  smooth={true}
                  duration={650}
                  offset={-85}
                  className="
                    relative overflow-hidden
                    flex items-center gap-2
                    px-4 lg:px-5 py-2.5
                    rounded-xl
                    bg-gradient-to-r
                    from-purple-600
                    via-pink-500
                    to-purple-600
                    bg-[length:200%_100%]
                    text-sm font-semibold
                    text-white
                    cursor-pointer
                    shadow-lg shadow-purple-500/20
                    hover:bg-[position:100%_0]
                    hover:shadow-purple-500/40
                    transition-all duration-500
                  "
                >
                  <span>Hire Me</span>

                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* ================= MOBILE MENU BUTTON ================= */}

            <motion.button
              type="button"
              onClick={() => setOpen(!open)}
              whileTap={{ scale: 0.9 }}
              className="
                lg:hidden
                relative
                w-10 h-10 sm:w-11 sm:h-11
                flex items-center justify-center
                rounded-xl
                border border-white/10
                bg-white/[0.05]
                text-white
                hover:border-purple-400/50
                hover:bg-purple-500/10
                transition-all duration-300
                cursor-pointer
              "
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <FaTimes className="text-lg" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <FaBars className="text-base" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE / TABLET MENU ================= */}

      <AnimatePresence>
        {open && (
          <>
            {/* Dark Overlay */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="
                fixed inset-0 z-[90]
                bg-black/70
                backdrop-blur-sm
                lg:hidden
              "
            />

            {/* Menu Panel */}

            <motion.div
              initial={{
                opacity: 0,
                y: -30,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -30,
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
              className="
                fixed
                top-[68px] sm:top-[76px]
                left-3 right-3
                sm:left-6 sm:right-6
                z-[95]
                lg:hidden
                max-h-[calc(100vh-90px)]
                overflow-y-auto
                rounded-3xl
                border border-white/10
                bg-[#080808]/95
                backdrop-blur-2xl
                shadow-2xl
                shadow-black/50
              "
            >
              {/* Glow */}

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-purple-600/15 blur-[70px] pointer-events-none" />

              <div className="relative p-4 sm:p-6">
                {/* Menu Header */}

                <div className="flex items-center justify-between px-2 pb-4 border-b border-white/[0.07]">
                  <div>
                    <p className="text-white font-semibold">
                      Navigation
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Explore my portfolio
                    </p>
                  </div>

                  <span className="text-[10px] px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300">
                    MENU
                  </span>
                </div>

                {/* Navigation Links */}

                <div className="grid grid-cols-2 gap-2 py-5">
                  {navLinks.map((item, index) => (
                    <motion.div
                      key={item.to}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.04,
                      }}
                    >
                      <Link
                        to={item.to}
                        smooth={true}
                        duration={650}
                        offset={-80}
                        spy={true}
                        onClick={() => setOpen(false)}
                        className="
                          group
                          flex items-center justify-between
                          w-full
                          px-4 py-3.5
                          rounded-2xl
                          border border-white/[0.06]
                          bg-white/[0.025]
                          text-sm text-gray-300
                          cursor-pointer
                          transition-all duration-300
                          hover:bg-white/[0.07]
                          hover:border-purple-400/30
                          hover:text-white
                          hover:-translate-y-0.5
                        "
                      >
                        <span>{item.label}</span>

                        <span
                          className="
                            text-purple-400
                            opacity-0
                            -translate-x-2
                            group-hover:opacity-100
                            group-hover:translate-x-0
                            transition-all duration-300
                          "
                        >
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Action Buttons */}

                <div className="flex flex-col sm:flex-row gap-3 pt-5">
                  <motion.a
                    href="/resumess.pdf"
                    download
                    whileTap={{ scale: 0.97 }}
                    className="
                      flex items-center justify-center gap-2
                      flex-1
                      px-5 py-3.5
                      rounded-2xl
                      border border-white/10
                      bg-white/[0.04]
                      text-sm font-medium
                      text-gray-200
                      hover:bg-white/[0.08]
                      hover:border-purple-400/40
                      hover:text-white
                      transition-all
                    "
                  >
                    <FaDownload className="text-purple-400 text-xs" />

                    Download Resume
                  </motion.a>

                  <motion.div
                    whileTap={{ scale: 0.97 }}
                    className="flex-1"
                  >
                    <Link
                      to="contact"
                      smooth={true}
                      duration={650}
                      offset={-80}
                      onClick={() => setOpen(false)}
                      className="
                        flex items-center justify-center gap-2
                        w-full
                        px-5 py-3.5
                        rounded-2xl
                        bg-gradient-to-r
                        from-purple-600
                        via-pink-500
                        to-purple-600
                        bg-[length:200%_100%]
                        text-sm font-semibold
                        text-white
                        cursor-pointer
                        shadow-lg shadow-purple-500/25
                        hover:bg-[position:100%_0]
                        hover:shadow-purple-500/40
                        transition-all duration-500
                      "
                    >
                      Let's Work Together

                      <FaArrowRight className="text-xs" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}