import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listCategory } from "../../redux/actions/courseActions";
import CategorySkeleton from "../skeleton/CategorySkeleton";
import { useNavigate } from "react-router-dom";

const CardCategori = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryList = useSelector((state) => state.course.listCategory);

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/class?category=${categoryId}`);
  };

  {
    categoryList.length <= 1 ? (
      <CategorySkeleton />
    ) : (
      "Category is not Available Now"
    );
  }

  return (
    <div className="flex justify-center bg-[#EBF3FC] ">
      <div className="flex w-full justify-center items-center max-w-[1060px] flex-col pt-[26px] pb-[14px] gap-5 container">
        <div className="flex justify-between container px-6">
          <h2 className="text-xl font-bold">Kategori Belajar</h2>
          <Link
            to="/class"
            className=" font-extrabold text-xs max-w-fit text-darkblue"
          >
            Lihat Semua
          </Link>
        </div>
        <div className="flex flex-col max-w-[1200px] px-6">
          <div className="flex justify-start flex-wrap grow gap-2.5">
            {categoryList.map((category) => (
              <div
                key={category.id}
                className="justify-center items-center flex grow flex-col pl-1.5 pr-2.5 hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
              >
                <img
                  loading="lazy"
                  alt={category.name}
                  src={category.image.url}
                  className="aspect-[1.6] object-cover object-center w-[140px] rounded-xl shadow-md hover:cursor-pointer"
                  onClick={() => handleCategoryClick(category.id)}
                />
                <div className="text-black text-center text-xs font-semibold leading-9 whitespace-nowrap">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCategori;
