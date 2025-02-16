'use client'

import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-6 mt-auto"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-sm text-gray-400">
            <p>
              © {currentYear} Cineverse. All rights reserved.
            </p>
            <p className="mt-1">
              Made with <span className="text-red-500">❤️</span> by{' '}
              <a
                href="https://twitter.com/Abhinavstwt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                @Abhinavstwt
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
