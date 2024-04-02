import { FaFilter, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTransactionData } from "../../redux/actions/adminActions";
import { useState } from "react";
import { formatDateAndTime } from "../../utils/utils";
import QuickInformation from "./QuickInformation";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { paymentStatus, totalPages } = useSelector((state) => state.admin);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (role === "ADMIN") {
      dispatch(getTransactionData(currentPage));
    }
  }, [dispatch, role, currentPage]);

  const totalPage = totalPages || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Quick Information About class and users */}
      <QuickInformation />

      <div>
        {/* Table Of Information about course and payment */}
        <div className="container-fluid flex justify-between mt-2">
          <h1 className="font-bold text-xl">Status Pembayaran</h1>
          <div className="flex justify-center items-center gap-2 p">
            <button className="badge p-4 text-darkblue border-darkblue">
              <FaFilter size={15} color="darkblue" className="mr-2" />
              Filter
            </button>
            <FaSearch size={20} color="darkblue" />
          </div>
        </div>
        <div className="overflow-x-auto my-3 rounded-md">
          <table className="table shadow-lg border rounded-lg">
            {/* head */}
            <thead>
              <tr className="bg-[#EBF3FC] text-black">
                <th>User Name</th>
                <th>Kategori</th>
                <th>Judul Kelas</th>
                <th>Status</th>
                <th>Metode Pembayaran</th>
                <th>Tanggal Bayar</th>
              </tr>
            </thead>
            <tbody>
              {paymentStatus.map((item) => (
                <tr key={item.id}>
                  <th>{item?.user?.profile?.name}</th>
                  <td>{item?.course?.category?.name}</td>
                  <td>{item?.course?.title}</td>
                  <td
                    className={`font-bold text-xs ${
                      item.status === "Belum Bayar"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="text-center">{item.paymentMethod || "-"}</td>
                  <td className="text-center">
                    {formatDateAndTime(item.paymentDate)}
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
      </div>
    </div>
  );
};

export default DashboardAdmin;
