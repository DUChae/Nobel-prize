import { motion } from "framer-motion";
import "./Title.css";

const Title = () => {
  return (
    <div className="apple-hero-container">
      {/* 1. 배경 바로 위 레이어 */}
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Humanity's Greatest Achievements
        </motion.span>

        <motion.h1
          className="hero-title"
          /* 애니메이션 속성에서 색상을 직접 제어하여 다른 CSS를 이깁니다 */
          initial={{ opacity: 0, y: 20, color: "#ffffff" }}
          animate={{ opacity: 1, y: 0, color: "#ffffff" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover Nobel Prize Winners
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          인류의 진보를 이끈 위대한 지성들을 만나보세요. <br />
          노벨상 수상자들의 기록과 업적을 탐험합니다.
        </motion.p>
      </div>
    </div>
  );
};

export default Title;
