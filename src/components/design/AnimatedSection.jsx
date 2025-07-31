// components/AnimatedSection.jsx
import { motion } from "framer-motion";

const AnimatedSection = ({ children }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
};

export default AnimatedSection;
