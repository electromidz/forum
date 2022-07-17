import { motion } from "framer-motion";
import Nav from '@/components/Nav/nav'
const Forum = () => {
  return (
    <div dir="rtl">
      <Nav />
      {/* <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#000",
        }}
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 1.5,
          ease: "linear",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeatDelay: 1,
        }}
      /> */}
    </div>
  );
};
export default Forum;
