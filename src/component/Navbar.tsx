import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const tabs = [
    { label: 'search', path: '/search' },
    { label: 'tender', path: '/' }
  ]

  return (
    <div className='h-[50px] w-full gap-10 flex justify-center items-center bg-[#acaaaa89] '>
      {tabs.map((tab) => (
        <motion.button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 capitalize
            ${isActive(tab.path) ? 'text-blue-600' : 'text-gray-500'}`}
        >
          {tab.label}
          {isActive(tab.path) && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}

export default Navbar
