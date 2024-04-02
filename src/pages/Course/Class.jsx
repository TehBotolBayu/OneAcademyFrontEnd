import { useState } from "react";
import CourseCard from "../../components/Card/CourseCard";
import Filter from "../../components/Card/Filter";
import { FaFilter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listCourse } from "../../redux/actions/courseActions";
import ClassCardSkeleton from "../../components/skeleton/ClassCardSkeleton";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Class = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { coursePage, filtersearch } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(listCourse(currentPage));
  }, [dispatch, currentPage]);

  const totalPages = coursePage || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements[0].value;

    navigate(`/class?name=${searchQuery}`);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    if (filter === "Premium Class") {
      const currentParams = new URLSearchParams(searchParams);
      currentParams.set("courseType", "premium");
      setSearchParams(currentParams);
    } else if (filter === "Free") {
      const currentParams = new URLSearchParams(searchParams);
      currentParams.set("courseType", "gratis");
      setSearchParams(currentParams);
    } else {
      const currentParams = new URLSearchParams(searchParams);
      currentParams.delete("courseType");
      setSearchParams(currentParams);
    }
  };

  let filters;
  if (token) {
    filters = ["All", "In Progress", "Done", "Premium Class", "Free"];
  } else {
    filters = ["All", "Premium Class", "Free"];
  }

  return (
    <div className="bg-[#EBF3FC] min-h-screen">
      <div className="flex flex-col justify-center items-center w-full p-2 px-3 lg:px-0">
        <div className="flex flex-grow justify-between items-center mt-[30px] w-full max-w-[1000px]">
          <h1 className="text-base lg:text-[24px] font-bold">Kelas Tersedia</h1>
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex flex-row"
          >
            <input
              type="search"
              placeholder="Cari Kelas"
              className="w-full outline-none focus:outline-none px-4 py-[6px] border-2 rounded-2xl border-darkblue"
            />
            <button
              type="submit"
              className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-lg bg-darkblue p-1"
            >
              <img src="/icon/search.svg" alt="search icon" />
            </button>
          </form>
        </div>

        <div className="flex flex-grow justify-between items-start gap-2 md:mt-[30px] w-full lg:max-w-[1000px]">
          {/* This Filter Will Show up only on Desktop Screen */}
          <div className="hidden md:block">
            <Filter page={currentPage} />
          </div>

          {/* This Filter Will Show up only on Mobile / Tablet Screen */}
          <div className="flex flex-col flex-grow">
            <div className="flex w-full gap-2">
              <div className="flex flex-grow ">
                <div className="flex flex-auto mt-2 md:hidden w-full">
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn btn-ghost bg-darkblue hover:bg-[#402eb4] text-white w-full"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    <FaFilter />
                    Filter
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <Filter page={currentPage} />
                    </div>
                  </dialog>
                </div>
              </div>
              <div className="flex flex-grow">
                <div className="flex flex-auto mt-2 md:hidden w-full">
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn btn-ghost bg-darkblue hover:bg-[#402eb4] text-white w-full"
                    onClick={() =>
                      document.getElementById("my_modal_2").showModal()
                    }
                  >
                    <FaFilter />
                    Course Filter
                  </button>
                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg ">Course Filter</h3>
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <div className="flex flex-col mt-2 flex-grow gap-2 overflow-x-auto max-w-screen py-1">
                        {filters.map((filter) => (
                          <button
                            key={filter}
                            className={`btn flex-grow rounded-2xl ${
                              selectedFilter === filter
                                ? "btn-blue"
                                : "btn-base"
                            }`}
                            onClick={() => handleFilterChange(filter)}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>

            {/* This Filter Will Show up only on Desktop / Laptop Screen */}
            <div className="flex flex-col items-start">
              <div className="hidden md:flex mt-2 flex-grow gap-2 w-full py-1">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={`btn flex-grow rounded-2xl ${
                      selectedFilter === filter ? "btn-blue" : "btn-base"
                    }`}
                    onClick={() => handleFilterChange(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="flex gap-5 flex-wrap mx-2 md:mx-0 mt-5">
                {filtersearch.length === 0 ? (
                  <ClassCardSkeleton length={filtersearch.length} />
                ) : (
                  // Render actual course cards once data is available
                  filtersearch.map((data) => (
                    <CourseCard key={data.id} data={data} />
                  ))
                )}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center my-5">
              <div className="join">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="join-item btn btn-blue"
                >
                  «
                </button>
                <button className="join-item btn btn-blue">
                  {currentPage}
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="join-item btn btn-blue"
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class;
