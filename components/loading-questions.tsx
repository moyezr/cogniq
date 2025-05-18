import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

export default function LoadingQuestions() {
  // Animation variants for the quiz icon
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1.05,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1.5
      }
    }
  };
  
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };
  
  // Animation variants for text appearing
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Loading icon - replaced checkmark with loading animation */}
      <motion.div 
        className="mb-8"
        variants={iconVariants}
      >
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Loader className="w-12 h-12 text-white" />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Text */}
      <motion.h2 
        className="text-2xl md:text-3xl font-bold text-blue-100 mb-4 text-center"
        variants={textVariants}
      >
        Preparing Your Quiz
      </motion.h2>
      
      <motion.p 
        className="text-blue-200 mb-8 text-center max-w-md"
        variants={textVariants}
      >
        We're crafting thoughtful questions just for you...
      </motion.p>
      
      {/* Dots container */}
      <div className="flex items-center justify-center space-x-3">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-300"
            initial={{ y: 0 }}
            animate={{
              y: [0, -15, 0],
              backgroundColor: index === 0 ? 
                ['#3b82f6', '#60a5fa', '#3b82f6'] :
                index === 1 ? 
                ['#60a5fa', '#3b82f6', '#60a5fa'] :
                ['#93c5fd', '#60a5fa', '#93c5fd'],
              boxShadow: [
                '0 0 0 rgba(59, 130, 246, 0)',
                '0 8px 16px rgba(59, 130, 246, 0.3)',
                '0 0 0 rgba(59, 130, 246, 0)'
              ]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Loading bar */}
      <motion.div 
        className="w-64 mt-8 bg-gray-700 rounded-full h-1.5 overflow-hidden"
        variants={textVariants}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-300"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
