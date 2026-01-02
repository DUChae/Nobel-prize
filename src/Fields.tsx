import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Fields.css";

interface Category {
  name: string;
  label: string;
  image: string;
  description: string; // 더 세련된 느낌을 위해 설명을 추가합니다.
}

const categories: Category[] = [
  {
    name: "medicine",
    label: "Medicine",
    image: "/images/medicine.jpg",
    description: "인류의 생명과 건강을 위한 헌신",
  },
  {
    name: "physics",
    label: "Physics",
    image: "/images/physics.jpg",
    description: "우주의 근원과 법칙을 향한 탐구",
  },
  {
    name: "chemistry",
    label: "Chemistry",
    image: "/images/chemistry.jpg",
    description: "물질의 변환과 새로운 창조",
  },
  {
    name: "peace",
    label: "Peace",
    image: "/images/peace.jpg",
    description: "인류의 화합과 갈등의 치유",
  },
  {
    name: "literature",
    label: "Literature",
    image: "/images/literature.jpg",
    description: "언어를 통해 빚어낸 영혼의 울림",
  },
  {
    name: "economics",
    label: "Economics",
    image: "/images/economics.jpg",
    description: "사회와 부의 흐름에 대한 통찰",
  },
];

function Fields() {
  return (
    <div className="fields-wrapper">
      <div className="fields-header">
        <h2 className="fields-title">Categories</h2>
        <p className="fields-subtitle">
          관심 있는 노벨상 분야를 선택하여 탐색해보세요.
        </p>
      </div>

      <div className="fields-grid">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <Link to={`/category/${cat.name}`} className="field-card">
              <div className="card-image-wrapper">
                <img src={cat.image} alt={cat.label} className="card-image" />
                <div className="card-overlay" />
              </div>
              <div className="card-info">
                <h3 className="card-label">{cat.label}</h3>
                <p className="card-description">{cat.description}</p>
                <span className="card-more">둘러보기</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Fields;
