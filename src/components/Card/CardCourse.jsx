import { useState } from "react";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCourse } from "../../redux/actions/courseActions";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { formatPrice } from "../../utils/utils";

// This card for HomePages

const CardCourse = () => {
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const dispatch = useDispatch();

  const course = useSelector((state) => state.course.listCourse);
  const categories = useSelector((state) => state.course.listCategory);

  useEffect(() => {
    dispatch(listCourse(1));
  }, [dispatch]);

  const handleBadgeClick = (categoryId) => {
    setSelectCategoryId(categoryId);
  };

  if (categories <= 0) {
    return <HomeSkeleton />;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center max-w-[1060px] container gap-5 pt-[26px] pb-[53px] ">
        <div className="flex flex-row container justify-between px-6">
          <h2 className="text-xl font-bold">Kursus Populer</h2>
          <Link to="/class" className="font-extrabold text-xs text-darkblue">
            Lihat Semua
          </Link>
        </div>

        <div className="hidden container sm:flex gap-3 justify-center items-center max-md:flex-wrap max-md:justify-center md:px-0">
          <div
            className={`badge hover:cursor-pointer text-xs text-center  ${
              !selectCategoryId ? "badge-darkblue" : "badge-lightwhite"
            } font-bold p-5`}
            onClick={() => handleBadgeClick(null)}
          >
            All
          </div>
          {categories.map((category) => (
            <div key={category.id}>
              <div
                className={`badge hover:cursor-pointer text-xs text-center  ${
                  selectCategoryId === category.name
                    ? "badge-darkblue"
                    : "badge-lightwhite"
                } font-bold p-5`}
                onClick={() => handleBadgeClick(category.name)}
              >
                {category.name}
              </div>
            </div>
          ))}
        </div>

        <div className="sm:hidden container px-5">
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn w-full bg-darkblue text-white hover:bg-[#402eb4]"
            onClick={() => document.getElementById("category").showModal()}
          >
            <BiCategory size={20} />
            Select Category
          </button>
          <dialog id="category" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h3 className="font-bold text-lg">Select Category</h3>
              <div className="py-3 flex flex-col gap-2">
                <div
                  className={`badge hover:cursor-pointer w-full text-xs text-center  ${
                    !selectCategoryId ? "badge-darkblue" : "badge-lightwhite"
                  } font-bold p-5`}
                  onClick={() => handleBadgeClick(null)}
                >
                  All
                </div>
                {categories.map((category) => (
                  <div key={category.id}>
                    <div
                      className={`badge hover:cursor-pointer w-full text-xs text-center  ${
                        selectCategoryId === category.name
                          ? "badge-darkblue"
                          : "badge-lightwhite"
                      } font-bold p-5`}
                      onClick={() => handleBadgeClick(category.name)}
                    >
                      {category.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </dialog>
        </div>

        <div className="flex gap-6 justify-center md:justify-around items-center flex-wrap px-5">
          {course
            .filter((data) =>
              selectCategoryId === null || selectCategoryId === "All"
                ? true
                : data.category?.name === selectCategoryId
            )
            .slice(0, 3)
            .map((data) => (
              <Link
                to={`/details/${data.id}`}
                key={data.id}
                className="shadow-md bg-white flex flex-col flex-grow sm:flex-none items-stretch pb-2.5 rounded-2xl max-w-[323px] max-h-[200px] hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
              >
                <img
                  loading="lazy"
                  src={data?.image?.url}
                  alt="course image"
                  className="aspect-[4.04] w-full overflow-hidden h-[85px] object-cover rounded-t-2xl"
                />
                <div className="flex w-full flex-col mt-1.5 px-2.5">
                  <div className="items-stretch self-stretch flex w-full justify-between gap-5">
                    <div className="text-indigo-600 text-xs font-bold leading-4 flex-1">
                      {data.category?.name}
                    </div>
                    <div className="justify-between items-stretch flex gap-0 pl-20 max-md:pl-5">
                      <img
                        loading="lazy"
                        src="/icon/ic_round-star.svg"
                        alt="star icon"
                      />
                      <div className="text-indigo-950 text-xs font-semibold leading-4 grow whitespace-nowrap">
                        {data.rating || 4.5}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch text-black text-xs font-bold leading-4">
                    <span className="font-bold text-indigo-950 ">
                      {data?.title}
                      <br />
                    </span>
                    <span className=" text-black">{data?.instructor}</span>
                  </div>
                  <div className="items-stretch self-stretch flex justify-between gap-0">
                    <div className="flex gap-1 items-center">
                      <img
                        loading="lazy"
                        src="/icon/mdi_badge-outline.svg"
                        alt="badge icon"
                        className="aspect-square object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
                      />
                      <div className="text-indigo-600 text-xs font-semibold leading-4 self-stretch">
                        {data?.level}
                      </div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <img
                        loading="lazy"
                        src="/icon/clarity_book-line.svg"
                        alt="book icon"
                        className="aspect-square object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
                      />
                      <div className="text-black text-xs font-normal leading-4 self-stretch">
                        {data.modul || "10 module"}
                      </div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <img
                        loading="lazy"
                        src="/icon/ri_time-fill.svg"
                        alt="clock icon"
                        className="aspect-square object-contain object-center w-3.5 overflow-hidden shrink-0 max-w-full"
                      />
                      <div className="text-black text-xs font-normal leading-4 self-stretch">
                        {data.durasi || "120 Menit"}
                      </div>
                    </div>
                  </div>
                  <div className="badge badge-blue p-3 mt-2">
                    <div className="flex gap-1 items-center font-Poppins font-bold">
                      <img src="/icon/Diamond.svg" alt="diamond icon" />
                      <span className="mr-2">{data?.courseType}</span>
                      {data.price !== 0 && <>{formatPrice(data?.price)}</>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CardCourse;
