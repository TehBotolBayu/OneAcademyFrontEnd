import QuickInformation from "./QuickInformation";
import { FaFilter, FaSearch } from "react-icons/fa";
import AddClass from "./AddClass";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listCategory, listCourse } from "../../redux/actions/courseActions";
import AddCategory from "./category/AddCategory";
import { deleteCategory, deleteCourse } from "../../redux/actions/adminActions";
import { formatDateAndTime } from "../../utils/utils";
import EditCategory from "./category/EditCategory";

const KelolaKelas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const course = useSelector((state) => state.course.listCourse);
  const { totalPages } = useSelector((state) => state.admin);
  const categoryList = useSelector((state) => state.course.listCategory);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(listCategory());
      dispatch(listCourse(currentPage));
    };

    fetchData();
  }, [dispatch, course, totalPages]);

  const handledeletecategory = (id) => {
    dispatch(deleteCategory(id));
  };

  const handledeletecourse = (id) => {
    dispatch(deleteCourse(id));
  };

  const totalPage = totalPages || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage && page !== currentPage) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="flex flex-col w-full">
      {/* Quick Information About class and classs */}
      <QuickInformation />

      <div>
        {/* Table Of Information about course and level */}
        <div className="container-fluid flex justify-between mt-2">
          <h1 className="font-bold text-xl">Kelola Kelas</h1>
          <div className="flex justify-center items-center gap-2 p">
            <AddClass />
            <button className="badge p-4 text-darkblue border-darkblue">
              <FaFilter size={15} color="#6148FF" className="mr-2" />
              Filter
            </button>
            <FaSearch size={20} color="#6148FF" />
          </div>
        </div>
        <div className="overflow-x-auto my-3 rounded-md">
          <table className="table shadow-lg border rounded-lg">
            {/* head */}
            <thead>
              <tr className="bg-[#EBF3FC] text-black">
                <th>Instructor</th>
                <th>Kategori</th>
                <th>Nama Kelas</th>
                <th>Tipe Kelas</th>
                <th>level</th>
                <th>Harga Kelas</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {course.map((item) => (
                <tr key={item.id} className="hover">
                  <th>{item.instructor}</th>
                  <td>{item.category?.name}</td>
                  <td>{item.title}</td>
                  <td
                    className={`font-bold text-xs ${
                      item.courseType === "Gratis"
                        ? "text-green-500"
                        : "text-darkblue"
                    }`}
                  >
                    {item.courseType}
                  </td>
                  <td>{item.level}</td>
                  <td>{formatPrice(item?.price)}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/admin/chapter/${item.id}`}
                      className="badge-darkblue p-1 rounded-md"
                    >
                      Detail
                    </Link>
                    <button
                      onClick={() => handledeletecourse(item.id)}
                      className="badge-red p-1 rounded-md"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              <button className="join-item btn btn-blue">{currentPage}</button>
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

        <div className="divider my-2"></div>

        {/* Table Category */}
        <div className="container-fluid flex justify-between mt-2">
          <h1 className="font-bold text-xl">Category Table</h1>
          <AddCategory />
        </div>
        <div className="overflow-x-auto my-3 rounded-md">
          <table className="table shadow-lg border rounded-lg">
            {/* head */}
            <thead>
              <tr className="bg-[#EBF3FC] text-black">
                <th>ID Kategori</th>
                <th>Nama Kategori</th>
                <th>Tanggal Dibuat</th>
                <th>Update Terakhir</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((list) => (
                <tr key={list.id} className="hover">
                  <th>
                    <small>{list.id}</small>
                  </th>
                  <th>{list.name}</th>
                  <td>{formatDateAndTime(list?.createdAt)}</td>
                  <td>{formatDateAndTime(list?.updatedAt)}</td>
                  <td className="flex gap-2">
                    <button
                      className="badge-darkblue p-1 rounded-md"
                      onClick={() =>
                        document
                          .getElementById(`editCategory_${list.id}`)
                          .showModal()
                      }
                    >
                      Ubah
                    </button>
                    <dialog id={`editCategory_${list.id}`} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Kategori</h3>
                        <div className="py-4">
                          <EditCategory id={list.id} data={list} />
                        </div>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>

                    <button
                      onClick={() => handledeletecategory(list.id)}
                      className="badge-red p-1 rounded-md"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KelolaKelas;
