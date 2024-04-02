import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyingHistory } from "../../redux/actions/profileActions";
import { Link } from "react-router-dom";

const HistoryPembayaran = () => {
  const { buyHistory } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buyingHistory());
  }, [dispatch]);

  if (buyHistory?.message) {
    return (
      <div className="w-full card py-5 my-2 text-center text-red-500 text-xl font-semibold">
        {buyHistory?.message}
      </div>
    );
  }

  return (
    <div className="w-full card py-5 my-2">
      <h1 className="text-2xl text-center font-bold mb-6">
        Riwayat Pembayaran
      </h1>

      <div className="flex gap-3 flex-wrap justify-center">
        {buyHistory?.transaction?.map((history) => (
          <Link
            to={`/details/${history?.courseId}`}
            key={history.id}
            className="shadow-md bg-white flex flex-col flex-grow sm:flex-none items-stretch pb-2.5 rounded-2xl max-w-[323px] max-h-[200px]"
          >
            <img
              loading="lazy"
              src={history?.course?.image?.url}
              alt={history?.course?.title}
              className="aspect-[4.04] w-full overflow-hidden h-[85px] object-cover rounded-t-2xl"
            />
            <div className="flex w-full flex-col mt-1.5 px-2.5">
              <div className="items-stretch self-stretch flex w-full justify-between gap-5">
                <div className="text-indigo-600 text-xs font-bold leading-4 flex-1">
                  {history?.course?.category?.name}
                </div>
                <div className="justify-between items-stretch flex gap-0 pl-20 max-md:pl-5">
                  <img
                    loading="lazy"
                    src="/icon/ic_round-star.svg"
                    alt="star icon"
                  />
                  <div className="text-indigo-950 text-xs font-semibold leading-4 grow whitespace-nowrap">
                    {history?.course?.review || 4.5}
                  </div>
                </div>
              </div>
              <div className="self-stretch text-black text-xs font-bold leading-4">
                <span className="font-bold text-indigo-950 ">
                  {history?.course?.title}
                  <br />
                </span>
                <span className=" text-black">
                  {history?.course?.instructor}
                </span>
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
                    {history?.course?.level}
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
                    {history?.course?.modul || "10 module"}
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
                    {history?.course?.durasi || "120 Menit"}
                  </div>
                </div>
              </div>
              <div
                className={`p-3 mt-2 badge ${
                  history?.status === "Sudah Bayar"
                    ? "badge-green"
                    : "badge-red"
                } `}
              >
                <div className="flex gap-1 items-center">
                  <img src="/icon/Diamond.svg" alt="diamond icon"></img>
                  <p className="font-bold text-xs">{history?.status}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* <div
                        key={history.id}
                        className="card card-compact flex-grow w-full sm:max-w-[370px] bg-base-100 shadow-xl"
                    >
                        <img
                            loading="lazy"
                            src={history?.course?.image?.url}
                            alt={history?.course?.title}
                            className="aspect-[4.04] w-full overflow-hidden h-[85px] object-cover rounded-t-2xl"
                        />
                        <div className="card-body flex flex-col">
                            <div className="text-[12px] flex flex-row justify-between font-Montserrat font-bold">
                                <h3 className="font-bold text-[#6148FF] text-sm">
                                    {history?.course?.category?.name}
                                </h3>
                                <div className="flex gap-1">
                                    <img
                                        src="/icon/ic_round-star.svg"
                                        alt="star icon"
                                    ></img>
                                    <p>4.5</p>
                                </div>
                            </div>
                            <div className="text-[#202244] font-bold">
                                {history?.course?.title}
                                <br />
                                <span className="font-normal">
                                    {history?.course?.instructor}
                                </span>
                            </div>

                            <div className="flex justify-between items-center ">
                                <div className="text-[12px] flex flex-row justify-between font-Montserrat font-bold">
                                    <div className="flex gap-1">
                                        <img
                                            src="/icon/mdi_badge-outline.svg"
                                            alt="badge icon"
                                        ></img>
                                        <h1 className="text-[12px] text-[#6148FF] font-semibold font-Poppins">
                                            {history?.course?.level}
                                        </h1>
                                    </div>
                                </div>
                                <div className="text-[12px] flex flex-row justify-between font-Montserrat font-bold">
                                    <div className="flex gap-1">
                                        <img
                                            src="/icon/clarity_book-line.svg"
                                            alt="book icon"
                                        ></img>
                                        <h1 className="text-[12px] font-normal font-Poppins">
                                            10 Modul
                                        </h1>
                                    </div>
                                </div>
                                <div className="text-[12px] flex flex-row justify-between font-Montserrat font-bold">
                                    <div className="flex gap-1">
                                        <img
                                            src="/icon/ri_time-fill.svg"
                                            alt="time icon"
                                        ></img>
                                        <h1 className="text-[12px] font-normal font-Poppins">
                                            120 Menit
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`p-3 badge ${
                                    history?.status === "Sudah Bayar"
                                        ? "badge-green"
                                        : "badge-red"
                                } `}
                            >
                                <div className="flex gap-1 items-center">
                                    <img
                                        src="/icon/Diamond.svg"
                                        alt="diamond icon"
                                    ></img>
                                    <p className="font-bold text-xs">
                                        {history?.status}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
    </div>
  );
};

export default HistoryPembayaran;
