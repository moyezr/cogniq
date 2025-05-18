import { motion } from 'framer-motion';

export default function LoadingQuestions() {
    return (
        <div className="flex items-center justify-center space-x-2 h-screen">
            <motion.div
                className="w-4 h-4 bg-blue-500 rounded-full"
                animate={{
                    y: ['0%', '-50%', '0%'],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: 0,
                }}
            />
            <motion.div
                className="w-4 h-4 bg-blue-500 rounded-full"
                animate={{
                    y: ['0%', '-50%', '0%'],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: 0.2,
                }}
            />
            <motion.div
                className="w-4 h-4 bg-blue-500 rounded-full"
                animate={{
                    y: ['0%', '-50%', '0%'],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: 0.4,
                }}
            />
            <span className="ml-4 text-lg font-medium">Loading questions...</span>
        </div>
    );
}