import { motion } from "framer-motion";
// import ReactLogo from "@/assets/react.svg";
import Logo from "@/assets/Logo.jpeg";

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-10 sm:flex-row items-center justify-center h-hero p-4 sm:p-10">
      <motion.div
        className="flex flex-col items-center justify-center sm:items-start xl:px-10 md:w-1/2 w-full"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h1 className="text-4xl font-bold mb-4">Your Heading</h1>
        <p className="text-lg text-center sm:text-start">Some description about your product or service.</p>
      </motion.div>
      <motion.div
        className="w-1/2"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={Logo} className="xl:w-[500px]" />
      </motion.div>

    </div>
  );
};

export default HeroSection;
