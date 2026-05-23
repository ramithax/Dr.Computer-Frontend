import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function FloatingAddButton() {
  return (
    <Link to="/admin/addproduct">
      <div className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110">
        <FiPlus size={28} />
      </div>
    </Link>
  );
}