import { Link } from "react-router-dom";
import "./Fields.css"; // CSS 파일 import

interface Category {
  name: string;
  label: string;
  image: string;
}

function Fields() {
  const categories: Category[] = [
    {
      name: "medicine",
      label: "Medicine",
      image: "/images/medicine.jpg", // public 폴더 내 이미지를 사용
    },
    {
      name: "physics",
      label: "Physics",
      image: "/images/physics.jpg", // public 폴더 내 이미지를 사용
    },
    {
      name: "chemistry",
      label: "Chemistry",
      image: "/images/chemistry.jpg", // public 폴더 내 이미지를 사용
    },
    {
      name: "peace",
      label: "Peace",
      image: "/images/peace.jpg", // public 폴더 내 이미지를 사용
    },
    {
      name: "literature",
      label: "Literature",
      image: "/images/literature.jpg", // public 폴더 내 이미지를 사용
    },
    {
      name: "economics",
      label: "Economics",
      image: "/images/economics.jpg", // public 폴더 내 이미지를 사용
    },
  ];

  return (
    <div className="fields-container">
      <h2>Select a Category</h2>
      <div className="fields-list">
        {categories.map((cat) => (
          <Link
            to={`/category/${cat.name}`}
            key={cat.name}
            className="field-link"
          >
            <div className="field-item">
              <img src={cat.image} alt={cat.label} className="field-image" />
              <h3>{cat.label}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Fields;
