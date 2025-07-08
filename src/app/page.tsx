'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showThemeToggle, setShowThemeToggle] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profileImage, setProfileImage] = useState('/my-photo.jpeg');
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [greeting, setGreeting] = useState('नमस्ते');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarXSpring = useSpring(0, {
    stiffness: 100,
    damping: 20,
    mass: 1
  });

  useEffect(() => {
    // Set initial time
    // const updateTime = () => {
    //   const now = new Date();
    //   const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    //   setCurrentTime(now.toLocaleString('en-US', options));
    // };

    // updateTime(); // Update immediately on mount

    // Update time every minute
    // const timerId = setInterval(updateTime, 60000); // Update every 60 seconds

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Match this duration with animation duration if needed

    // Greeting rotation
    const greetings = [
      { text: 'नमस्ते', lang: 'Hindi' },
      { text: 'こんにちは', lang: 'Japanese' },
      { text: '你好', lang: 'Chinese' },
      { text: 'Hola', lang: 'Spanish' },
      { text: 'Hello', lang: 'English' },
      { text: 'Bonjour', lang: 'French' },
      { text: '안녕하세요', lang: 'Korean' },
      { text: 'Ciao', lang: 'Italian' },
      { text: 'Guten Tag', lang: 'German' },
      { text: 'Здравствуйте', lang: 'Russian' }
    ];

    let currentIndex = 0;
    const greetingInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % greetings.length;
      setGreeting(greetings[currentIndex].text);
    }, 1500); // Changed to 1.5 seconds

    sidebarXSpring.set(sidebarOpen ? 0 : -280);

    // Function to check if screen is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Using 768px as the mobile breakpoint
    };

    // Check mobile size on mount and on resize
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Add scroll listener for back to top button
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;

      // Logic to show back to top button
      if (isMobile) {
        // On mobile, show button only near the bottom (last 5%)
        setShowBackToTop(scrollPosition > totalHeight * 0.98);
      } else {
        // On desktop, show button after scrolling down 300px
        setShowBackToTop(scrollPosition > 300);
      }

      // Logic to show/hide theme toggle button
      if (isMobile) {
        // On mobile, hide button after scrolling down a small distance (e.g., 50px)
        setShowThemeToggle(scrollPosition <= totalHeight * 0.03); // Changed from 0.04 to 0.03

        // Temporary logging for debugging
        // console.log(`Mobile: ${isMobile}, Scroll Position: ${scrollPosition}, Show Theme Toggle: ${scrollPosition <= 50}`);

      } else {
        // On desktop, always show button (state is initialized to true)
        setShowThemeToggle(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(loadingTimer);
      // clearInterval(timerId); // Remove timerId cleanup
      clearInterval(greetingInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile); // Clean up resize listener
    };
  }, [sidebarOpen, sidebarXSpring, isMobile]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    setProfileImage(prevImage => prevImage === '/my-photo.jpeg' ? '/pp2.png' : '/my-photo.jpeg');
  };

  const themeStyles = {
    light: {
      background: 'bg-[#ede6d6]',
      text: 'text-black',
      textMuted: 'text-gray-700',
      textSubtle: 'text-gray-800',
      border: 'border-black/10',
      accent: 'black',
      sectionBgPrimary: 'bg-[#ede6d6]',
      sectionBgSecondary: 'bg-[#ede6d6]',
      cardBg: 'bg-[#ede6d6]',
      socialHover: 'hover:text-black',
      layout: 'flex flex-col items-center gap-16', // Minimal, centered layout
      maxWidth: 'max-w-2xl mx-auto',
      padding: 'px-4 py-12',
    },
    dark: {
      background: 'bg-[#1a1a1a]',
      text: 'text-[#e0e0e0]',
      textMuted: 'text-[#b0b0b0]',
      textSubtle: 'text-[#c0c0c0]',
      border: 'border-[#444]',
      accent: '#e0e0e0',
      sectionBgPrimary: 'bg-[#1a1a1a]',
      sectionBgSecondary: 'bg-[#1a1a1a]',
      cardBg: 'bg-[#3a3a3a]',
      socialHover: 'hover:text-white',
      layout: 'flex flex-col items-center justify-around gap-24 md:gap-32', // Casual, spread-out layout
      maxWidth: 'max-w-full',
      padding: 'px-8 py-20 md:px-16',
    }
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ede6d6]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
          style={{ transform: 'scale(2.5)' }}
        >
          <motion.h1 
            style={{ fontSize: '28px' }}
            className="font-normal text-black mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Violina Doley
          </motion.h1>
          <div className="w-44 h-0.5 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-black"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.0, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={`min-h-screen flex ${currentTheme.background} ${currentTheme.text} font-sans`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sidebar Hover Tab */}
      <motion.div
        className={`fixed top-1/2 left-0 z-50 -translate-y-1/2 ${isMobile ? 'w-6' : 'w-8'} h-24 bg-white/60 backdrop-blur-md rounded-r-2xl shadow-lg flex items-center justify-center cursor-pointer border border-black/10 hover:bg-white/80 transition-colors duration-200`}
        onMouseEnter={() => setSidebarOpen(true)}
        style={{
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
        }}
        animate={{ 
          opacity: sidebarOpen ? 0 : 1, 
          pointerEvents: sidebarOpen ? 'none' : 'auto',
          x: [0, 4, 0],
        }}
        transition={{ 
          duration: 0.3,
          x: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
            ease: "easeInOut"
          }
        }}
        whileHover={{
          scale: 1.05,
          x: 8,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
          }
        }}
      >
        <motion.span 
          className="rotate-90 text-xs font-bold tracking-widest text-gray-700 select-none"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          EXPLORE
        </motion.span>
      </motion.div>
      {/* Left Sidebar */}
      <motion.aside 
        className={`fixed top-0 left-0 h-screen overflow-y-auto border-r ${currentTheme.border} p-6 flex flex-col gap-6 text-sm z-40 ${currentTheme.background} backdrop-blur-md`}
        style={{ width: '260px', x: sidebarXSpring }}
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        {/* Profile + Namaste Caption */}
        <motion.div className="flex flex-col items-center gap-y-3 mt-4">
          <motion.div
            className="w-48 h-48 overflow-hidden cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              transition: {
                duration: 0.4,
                ease: "easeInOut"
              }
            }}
            transition={{ duration: 0.7, delay: 0.6, ease: "backOut" }}
            whileHover={{
              rotate: [0, -10, 10, -10, 0],
              transition: {
                duration: 0.4,
                ease: "easeInOut"
              }
            }}
          >
            <Image src={profileImage} alt="Profile" width={192} height={192} className="object-cover w-full h-full" />
          </motion.div>
          <motion.div 
            className={`text-sm font-medium ${currentTheme.textMuted} tracking-wider`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {greeting}
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex-1"
        >
          <motion.ul 
            className="flex flex-col gap-2 font-medium"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              'About',
              'Skills',
              'Experience',
              'Education',
              'Projects',
              'Publications',
              'Blogs'
            ].map((item) => (
              <motion.li
                key={item}
                variants={itemVariants}
                className="relative group"
              >
                <a 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className={`block py-2 px-3 rounded-lg transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 ${currentTheme.text}`}
                >
                  <span className="relative z-10">
                    {item.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        className="inline-block"
                        whileHover={{
                          scale: 1.5,
                          rotate: [0, -10, 10, -10, 0],
                          transition: {
                            duration: 0.4,
                            ease: "easeInOut"
                          }
                        }}
                        animate={{
                          scale: 1,
                          rotate: 0,
                          transition: {
                            duration: 0.4,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId={`nav-${item}`}
                  />
                </a>
              </motion.li>
            ))}
            <motion.li
              variants={itemVariants}
              className="relative group mt-4"
            >
              <motion.a
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 ${
                  theme === 'light' 
                    ? 'bg-black text-white hover:bg-black/90' 
                    : 'bg-white text-black hover:bg-white/90'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFileAlt className="text-lg" />
                <span>Download CV</span>
              </motion.a>
            </motion.li>
          </motion.ul>
        </motion.nav>
      </motion.aside>

      {/* Main Content Area */}
      <motion.main 
        className={`flex-1 overflow-y-auto ${currentTheme.background} ${currentTheme.text} font-sans flex flex-col max-w-screen-md mx-auto px-4 md:max-w-full md:px-8`}
        style={{}}
      >
        {/* Theme Toggle Button */}
        <AnimatePresence>
          {showThemeToggle && (
            <motion.button
              onClick={toggleTheme}
              className={`fixed top-4 ${isMobile ? 'right-4' : 'right-8'} z-[100] relative w-14 h-7 rounded-full p-1 transition-colors duration-300 ${
                theme === 'light' ? 'bg-white/60 backdrop-blur-md' : 'bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ position: 'fixed', right: isMobile ? '1rem' : '2rem', top: '1rem' }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
                animate={{
                  x: theme === 'light' ? 0 : 28,
                  backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a',
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
              <div className="flex justify-between items-center h-full px-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  mass: 0.5
                }
              }}
              exit={{ 
                opacity: 0, 
                y: 20, 
                scale: 0.8,
                transition: {
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }}
              onClick={() => {
                window.scrollTo({ 
                  top: 0, 
                  behavior: 'smooth'
                });
              }}
              className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg backdrop-blur-sm ${
                theme === 'light' 
                  ? 'bg-black/80 text-white hover:bg-black' 
                  : 'bg-white/80 text-black hover:bg-white'
              } transition-all duration-300`}
              whileHover={{ 
                scale: 1.1,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ y: 0 }}
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </motion.svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Professional Header Section */}
        <div className="min-h-screen px-4 md:px-8 lg:px-16 flex items-center justify-center">
          <motion.section 
            id="about"
            className={`w-full ${currentTheme.sectionBgPrimary === 'bg-[#ede6d6]' ? '' : currentTheme.sectionBgPrimary} flex flex-col justify-center items-center gap-8 max-w-4xl mx-auto pt-16`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            {/* Name and Title */}
            <motion.div className="text-center border-b border-gray-700 mb-6 pb-4 w-full">
              <motion.h1 
                className="text-3xl font-bold mb-2 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.7 }}
              >
                {"Violina Doley".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ 
                      y: -100,
                      rotate: -15,
                      scale: 1.5
                    }}
                    animate={{ 
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      opacity: 1
                    }}
                    transition={{ 
                      duration: 0.5,
                      delay: 0.5 + (index * 0.05),
                      type: "spring",
                      stiffness: 120,
                      damping: 12,
                      mass: 1
                    }}
                    whileHover={{
                      scale: 1.5,
                      rotate: [0, -10, 10, -10, 0],
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p 
                className={`text-lg font-medium tracking-wide ${currentTheme.textMuted} mb-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
              >
                Software Engineer & Developer
              </motion.p>
              <motion.div 
                className="flex justify-center gap-6 mb-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.7 }}
              >
                {[
                  { icon: <FaEnvelope />, color: '#EA4335', href: 'mailto:violinadoley24@gmail.com', label: 'Email' },
                  { icon: <FaLinkedin />, color: '#0077b5', href: 'https://www.linkedin.com/in/violinadoley/', label: 'LinkedIn' },
                  { icon: <FaTwitter />, color: '#1da1f2', href: 'https://x.com/vio_006', label: 'Twitter' },
                  { icon: <FaGithub />, color: '#333333', href: 'https://github.com/violinadoley', label: 'GitHub' },
                  { icon: <SiGooglescholar />, color: '#4285F4', href: 'https://scholar.google.com/citations?user=n_Mi8P0AAAAJ&hl=en', label: 'Scholar' },
                  { icon: <FaInstagram />, color: '#e1306c', href: 'https://www.instagram.com/violina_doley/', label: 'Instagram' }
                ].map((social, index) => {
                  // Generate random values for each icon
                  const randomDuration = 6 + Math.random() * 2; // Random duration between 6-8s
                  const randomDelay = Math.random() * 2; // Random initial delay between 0-2s
                  const randomY = 8 + Math.random() * 4; // Random Y movement between 8-12px
                  const randomRotate = 6 + Math.random() * 6; // Random rotation between 6-12 degrees
                  
                  return (
                    <motion.div
                      key={index}
                      className="relative group"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    >
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 block p-2 rounded-full transition-all duration-300 text-xl"
                        style={{
                          background: `${social.color}15`,
                          color: social.color
                        }}
                        animate={{
                          y: [0, -randomY, 0],
                          rotate: [0, randomRotate, 0],
                        }}
                        transition={{
                          duration: randomDuration,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: randomDelay
                        }}
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, -10, 10, -10, 0],
                          transition: {
                            duration: 0.4,
                            ease: "easeInOut"
                          }
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {social.icon}
                      </motion.a>
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle, ${social.color}33 0%, transparent 70%)`,
                          filter: 'blur(8px)'
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0, 0.6, 0]
                        }}
                        transition={{
                          duration: randomDuration,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: randomDelay
                        }}
                      />
                      <motion.span
                        className="absolute left-1/2 -translate-x-1/2 -bottom-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                        style={{ color: social.color }}
                      >
                        {social.label}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Professional Summary */}
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
            >
              <h2 className="text-sm font-bold mb-3 relative pb-1">
                {"About".split("").map((char) => (
                  <motion.span
                    key={char}
                    className="inline-block"
                    whileHover={{
                      scale: 1.5,
                      rotate: [0, -10, 10, -10, 0],
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut"
                      }
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gray-700"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: "100%",
                    transition: {
                      duration: 0.8,
                      ease: "easeOut",
                      delay: 1.5
                    }
                  }}
                />
              </h2>
              <motion.p 
                className={`${currentTheme.text} text-sm leading-relaxed mb-6`}
              >
                {"AI researcher and software engineer with expertise in machine learning, computer vision, and natural language processing. Proven track record in developing innovative solutions at leading technology companies. Currently focused on healthcare AI applications, working to create accessible and unbiased solutions through advanced machine learning techniques.".split("").map((char) => (
                  <motion.span
                    key={char}
                    className="inline-block"
                    whileHover={{
                      scale: 1.5,
                      rotate: [0, -10, 10, -10, 0],
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut"
                      }
                    }}
                    animate={{
                      color: theme === 'light' ? '#000' : '#e0e0e0',
                      scale: 1,
                      rotate: 0,
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.p>
              <motion.p 
                className={`${currentTheme.text} text-sm leading-relaxed mb-6`}
              >
                {"With a strong foundation in both theoretical and practical aspects of AI, I specialize in developing end-to-end solutions that bridge research and real-world applications. My work spans multiple domains, from predictive maintenance to intelligent recommendation systems, while maintaining a focus on ethical and responsible AI development. I actively contribute to the AI community through open-source projects and academic collaborations, including publications in IEEE conferences.".split("").map((char) => (
                  <motion.span
                    key={char}
                    className="inline-block"
                    whileHover={{
                      scale: 1.5,
                      rotate: [0, -10, 10, -10, 0],
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut"
                      }
                    }}
                    animate={{
                      color: theme === 'light' ? '#000' : '#e0e0e0',
                      scale: 1,
                      rotate: 0,
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.p>
              <motion.p 
                className={`${currentTheme.text} text-sm leading-relaxed mb-6`}
              >
                {"My approach combines cutting-edge research with practical implementation, ensuring that innovative AI solutions are not only technically sound but also scalable and impactful in real-world scenarios.".split("").map((char) => (
                  <motion.span
                    key={char}
                    className="inline-block"
                    whileHover={{
                      scale: 1.5,
                      rotate: [0, -10, 10, -10, 0],
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut"
                      }
                    }}
                    animate={{
                      color: theme === 'light' ? '#000' : '#e0e0e0',
                      scale: 1,
                      rotate: 0,
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>

            {/* Experience Section */}
            <div className="w-full pt-16">
              <motion.section 
                id="experience"
                className="w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-xl font-bold mb-8 relative pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {"Experience".split("").map((char) => (
                    <motion.span
                      key={char}
                      className="inline-block"
                      whileHover={{
                        scale: 1.5,
                        rotate: [0, -10, 10, -10, 0],
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gray-700"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </motion.h2>
                <div className="space-y-8">
                  {[
                    {
                      title: 'AI Research Intern',
                      company: 'Siemens',
                      period: 'Jan 2025 - Mar 2025',
                      description: 'Developing a framework leveraging graph neural networks for adaptive mesh simulations, enabling efficient and accurate simulations of complex physical systems. Enhancing simulation accuracy and scalability across domains such as fluid dynamics and structural mechanics, aiming for significant speedups in complex physical system modeling.',
                    },
                    {
                      title: 'AI Research Intern',
                      company: 'SuperKalam (YC W23)',
                      period: 'Aug 2024 - Sep 2024',
                      description: 'Worked on LLM finetuning with a focus on parameter optimization and RLHF for UPSC-specific improvements, and developed Advanced Prompt Engineering for evaluating answers across 10+ competitive subjects, creating LLM-as-a-Judge templates for automated grading.',
                    },
                    {
                      title: 'Data and AI Intern',
                      company: 'IBM India',
                      period: 'May 2024 - Jul 2024',
                      description: 'Designed a RAG chatbot for sales professionals using Langchain and OpenAI API to streamline order booking, product recommendations, and sales pitch generation. Integrated PDF and SQL for real-time customer-specific insights, including order history and promotional offers, with seamless interaction via WhatsApp for an intuitive experience.',
                    },
                    {
                      title: 'Machine Learning Research Intern',
                      company: 'Indian Institute of Technology, Hyderabad',
                      period: 'Dec 2023 - Feb 2024',
                      description: 'Implemented VirConv-L and VirConv-T models on the KITTI dataset, replicating and extending the architecture with Squeeze-and-Excitation (S&E) and Pointwise Spatial Attention blocks, achieving a 2% improvement in 3D Average Precision (AP) for VirConv-L on validation data, enhancing autonomous driving model performance.',
                    },
                    {
                      title: 'Winter Research Intern',
                      company: 'Indian Institute of Technology, Guwahati',
                      period: 'Nov 2023 - Jan 2024',
                      description: 'Implemented deep transfer learning on diverse omics datasets to reduce performance gaps among ethnic groups, advancing bias reduction in healthcare AI. Enhanced the framework using domain adaptation methodologies, achieving significant improvements for disadvantaged groups, validated by statistical analyses and synthetic data experiments.',
                    }
                  ].map((job, index) => (
                    <motion.div
                      key={`${job.title}-${job.company}-${index}`}
                      className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                          <p className={`${currentTheme.textMuted} text-sm`}>{job.company}</p>
                        </div>
                        <p className={`${currentTheme.textMuted} text-sm mt-2 md:mt-0`}>{job.period}</p>
                      </div>
                      <p className={`${currentTheme.text} text-sm leading-relaxed`}>
                        {job.description.split("").map((char) => (
                          <motion.span
                            key={char}
                            className="inline-block"
                            whileHover={{
                              scale: 1.5,
                              rotate: [0, -10, 10, -10, 0],
                              transition: {
                                duration: 0.4,
                                ease: "easeInOut"
                              }
                            }}
                            animate={{
                              color: theme === 'light' ? '#000' : '#e0e0e0',
                              scale: 1,
                              rotate: 0,
                              transition: {
                                duration: 0.4,
                                ease: "easeInOut"
                              }
                            }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Skills Section */}
            <div className="w-full pt-16">
              <motion.section 
                id="skills"
                className="w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-xl font-bold mb-8 relative pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {"Skills".split("").map((char) => (
                    <motion.span
                      key={char}
                      className="inline-block"
                      whileHover={{
                        scale: 1.5,
                        rotate: [0, -10, 10, -10, 0],
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gray-700"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </motion.h2>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="font-semibold mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Python</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">C++</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">SQL</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="font-semibold mb-3">Frameworks/Libraries</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Tensorflow</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">PyTorch</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Keras</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Scikit-learn</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Flask</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="font-semibold mb-3">Tools and Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Pandas</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">NumPy</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">AWS</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">VertexAI</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Google AI Studio</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Git</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">PostMan</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.section>
            </div>

            {/* Education Section */}
            <div className="w-full pt-16">
              <motion.section 
                id="education"
                className="w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-xl font-bold mb-8 relative pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {"Education".split("").map((char) => (
                    <motion.span
                      key={char}
                      className="inline-block"
                      whileHover={{
                        scale: 1.5,
                        rotate: [0, -10, 10, -10, 0],
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gray-700"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </motion.h2>
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">B.Tech in Computer Science and Engineering</h3>
                    <p className={`${currentTheme.textMuted} mb-2`}>National Institute of Technology Karnataka, Surathkal • Dec 2021 - Apr 2025</p>
                    <p className={`${currentTheme.text} text-sm`}>Focus Area in Artificial Intelligence and Machine Learning</p>
                  </motion.div>
                </motion.div>
              </motion.section>
            </div>

            {/* Projects Section */}
            <div className="w-full pt-16">
              <motion.section 
                id="projects"
                className="w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-xl font-bold mb-8 relative pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {"Projects".split("").map((char) => (
                    <motion.span
                      key={char}
                      className="inline-block"
                      whileHover={{
                        scale: 1.5,
                        rotate: [0, -10, 10, -10, 0],
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gray-700"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </motion.h2>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">The Great Bangalore Hackathon 2025</h3>
                    <p className={`${currentTheme.textMuted} text-sm mb-4`}>Mar 2025</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Developed a novel solution to improve driver-customer matching to reduce cancellation, along with dynamic-pricing system.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Deployed a masked autoencoder model to predict customer requests and proactively guide the drivers to hotspots using an interactive map. An added AI-guidance with language translation facilties was provided for better UX.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Top 27 teams out of 150 semifinalists, which were chosen out of almost 4800 plus applicants Pan-India.
                        </p>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Next.js</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">React</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">MapBox</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Gemini</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">SarvamAI</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">SimPSOEnsemble Model for Enhanced Stock Prediction</h3>
                    <p className={`${currentTheme.textMuted} text-sm mb-4`}>Sep 2024 - Oct 2024</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Theorized and implemented a novel pipeline utilizing hybrid Simulated Annealing and Particle Swarm Optimization algorithms to obtain optimal hyperparameter configurations for the LSTM ensemble model.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Achieved state-of-the-art (SOTA) metric values; results compiled and submitted to the IEEE SSCI 2025 in Trondheim, Norway.
                        </p>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Python</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">TensorFlow</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Machine Learning</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">LSTM</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">RAG-based Intelligent Agent System</h3>
                    <p className={`${currentTheme.textMuted} text-sm mb-4`}>Aug 2024</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Implemented a RAG-based intelligent retrieval agent capable of answering questions from NCERT text using Qwen2-VL and LangChain.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Developed an autonomous agentic workflow with LangGraph, enabling the system to generate, evaluate, and refine responses based on appropriateness and accuracy.
                        </p>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Python</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">LangChain</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">LangGraph</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Qwen2-VL</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">AI for Predictive Maintenance</h3>
                    <p className={`${currentTheme.textMuted} text-sm mb-4`}>Dec 2022 - Jun 2023</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Developed an LSTM model with 89.09% recall and 90.96% accuracy to predict hard disk failures, and an Autoencoder model with 98.73% accuracy for anomaly detection.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Integrated models with Flask for backend deployment.
                        </p>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">TensorFlow</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">NumPy</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Pandas</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Flask</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">LSTM</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">Inventory Management System</h3>
                    <p className={`${currentTheme.textMuted} text-sm mb-4`}>Mar 2023 - May 2023</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Developed a shopping app to efficiently manage orders and products with 4 roles (customers, sellers, shippers, and admins) and implemented user authentication and authorization using JSON Web Token for enhanced security and access control.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Designed an order tracking system for customers to order, sellers to mark as shipped, and shippers to confirm delivery.
                        </p>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">HTML</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">CSS</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">JavaScript</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">React</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Express.js</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Mongoose</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">Mood Based Song Recommendation System</h3>
                    <p className={`${currentTheme.textMuted} text-sm mb-4`}>Jan 2023 - Apr 2023</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Developed a mood prediction system using CNNs that can detect 7 different emotions with an accuracy of 73.05%.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Hosted the system on a web interface built with Flask for personalized song recommendations with real-time suggestions.
                        </p>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Keras</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">TensorFlow</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">OpenCV</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">HTML</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">CSS</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Flask</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">DoT Implementation using BIND9 for IPV6 deployment in NITK</h3>
                    <p className={`${currentTheme.textMuted} text-sm mb-4`}>Jan 2024 - Apr 2024</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Implemented DNS over TLS (DoT) using BIND9, successfully configuring a robust and highly secure DNS resolution system that enhances privacy and overall security by encrypting DNS queries and responses on a Linux environment.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Performed detailed packet tracing and analysis with Wireshark to thoroughly validate the functionality of the DoT implementation and effectively address various challenges related to DNS over HTTPS (DoH) forwarding limitations.
                        </p>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">BIND9</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">DNS over TLS</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Wireshark</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Linux</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">IPv6</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.section>
            </div>

            {/* Publications Section */}
            <div className="w-full pt-16">
              <motion.section 
                id="publications"
                className="w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-xl font-bold mb-8 relative pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {"Publications".split("").map((char) => (
                    <motion.span
                      key={char}
                      className="inline-block"
                      whileHover={{
                        scale: 1.5,
                        rotate: [0, -10, 10, -10, 0],
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gray-700"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </motion.h2>
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">14th ICCCNT IEEE Conference, Indian Institute of Technology Delhi</h3>
                    <p className={`${currentTheme.textMuted} text-sm mb-4`}>Nov 2023</p>
                    <h4 className="text-lg font-medium mb-3">Improving Dynamic TDMA for Wireless Sensor Networks</h4>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <p className={`${currentTheme.text} text-sm`}>
                          Enhanced the Dynamic TDMA framework for Wireless Sensor Networks, building on the work of C. Benrebbouh and L. Louail. Achieved ≈ 1% lower energy consumption, improved energy efficiency, and increased throughput by incorporating advanced node tracking and flexible slot allocation.
                        </p>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">IEEE</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">ICCCNT</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">TDMA</span>
                      <span className="px-3 py-1 bg-black/10 rounded-full text-sm">Wireless Sensor Networks</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.section>
            </div>

            {/* Blogs Section */}
            <div className="w-full pt-16">
              <motion.section 
                id="blogs"
                className="w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-xl font-bold mb-8 relative pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {"Blogs".split("").map((char) => (
                    <motion.span
                      key={char}
                      className="inline-block"
                      whileHover={{
                        scale: 1.5,
                        rotate: [0, -10, 10, -10, 0],
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gray-700"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </motion.h2>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div 
                    className={`p-6 rounded-lg ${currentTheme.cardBg} shadow-lg border ${currentTheme.border} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                    <p className={`${currentTheme.textMuted} text-sm`}>
                      {"A space for my learnings and thoughts. Stay tuned :)".split("").map((char) => (
                        <motion.span
                          key={char}
                          className="inline-block"
                          whileHover={{
                            scale: 1.5,
                            rotate: [0, -10, 10, -10, 0],
                            transition: {
                              duration: 0.4,
                              ease: "easeInOut"
                            }
                          }}
                          animate={{
                            color: theme === 'light' ? '#000' : '#e0e0e0',
                            scale: 1,
                            rotate: 0,
                            transition: {
                              duration: 0.4,
                              ease: "easeInOut"
                            }
                          }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.section>
            </div>

            {/* Footer */}
            <motion.div 
              className="w-full py-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className={`${currentTheme.textMuted} text-sm tracking-wider`}>
                Made with <span className="text-red-500">♡</span> by Vio
              </p>
            </motion.div>
          </motion.section>
        </div>
      </motion.main>
    </motion.div>
  );
}