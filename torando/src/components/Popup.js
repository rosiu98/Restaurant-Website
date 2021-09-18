import React from "react";
import { motion } from "framer-motion";

const backdrop = {
  visible: { opacity: 1, transition: { delay: 0.5 } },
  hidden: { opacity: 0 },
};

const Popup = ({ children, trigger, setTrigger }) => {
  return trigger ? (
    <motion.div
      className="popup"
      variants={backdrop}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="popup-inner" variants={backdrop}>
        <button className="close-btn" onClick={() => setTrigger(false)}>
          close
        </button>
        {children}
      </motion.div>
    </motion.div>
  ) : (
    ""
  );
};

export default Popup;
