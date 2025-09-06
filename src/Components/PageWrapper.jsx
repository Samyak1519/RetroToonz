// src/components/PageWrapper.jsx
import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.15, ease: "easeIn" }
    },
};

const PageWrapper = ({ children }) => {
    return (
        <motion.div
            key={Math.random()} // ensures re-render (optional, only if needed)
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-black" // solid bg removes color bleed
        >
            {children}
        </motion.div>
    );
};

export default PageWrapper;
