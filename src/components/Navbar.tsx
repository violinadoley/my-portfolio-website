'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Work Experience', href: '#work-experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blogs', href: '#blogs' },
];

interface NavbarProps {
  theme: string;
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const themeStyles = {
    light: {
      background: 'bg-[#ede6d6]/70',
      border: 'border-black/10',
      text: '#333333',
      hoverText: '#3b82f6',
      underlineBg: 'bg-black',
    },
    dark: {
      background: 'bg-[#1a1a1a]/70',
      border: 'border-[#444]',
      text: '#e0e0e0',
      hoverText: '#93c5fd',
      underlineBg: 'bg-white',
    }
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles];

  return (
    <motion.nav
      className={`w-full sticky top-0 z-50 backdrop-blur-md ${currentTheme.background} border-b ${currentTheme.border} shadow-lg`}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.name} className="relative group">
              <a
                href={item.href}
                className={`transition-colors duration-200`}
                style={{ color: hoveredItem === item.name ? currentTheme.hoverText : currentTheme.text }}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.name}
                <motion.span
                  layoutId="underline"
                  className={`absolute left-0 -bottom-1 h-0.5 w-0 ${currentTheme.underlineBg} rounded-full group-hover:w-full transition-all duration-300`}
                  whileHover={{ width: '100%' }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full md:hidden bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 shadow-lg"
            >
              <ul className="flex flex-col py-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={`block px-6 py-3 transition-colors duration-200 ${hoveredItem === item.name ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                      style={{ color: hoveredItem === item.name ? currentTheme.hoverText : currentTheme.text }}
                      onClick={() => setIsMenuOpen(false)}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 