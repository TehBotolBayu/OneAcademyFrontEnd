import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDateAndTimeWithOffset } from "../../utils/utils";
import { transactionDetails } from "../../redux/actions/courseActions";
import PaymentSelect from "../../components/payment/PaymentSelect";
import PaymentSuccess from "../../components/payment/PaymentSuccess";
import { useState } from "react";
import PaymentMethodSkeleton from "../../components/skeleton/PaymentTimeSkeleton";

const Payment = () => {
    const { id } = useParams();
    const [formattedDatePayment, setFormattedDatePayment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const transactionData = useSelector((state) => state?.course?.transaction);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(transactionDetails(id));
        const delay = setTimeout(() => {
            setFormattedDatePayment(
                formatDateAndTimeWithOffset(localStorage.getItem("date"))
            );
            setIsLoading(false); // Mark loading as complete
        }, 2000);

        return () => clearTimeout(delay);
    }, [dispatch, id]);

    return (
        <div className="container-fluid mx-auto">
            <div className="border w-full py-4 bg-[#FFFFFF] shadow-md">
                <div className="flex flex-col px-5 justify-center">
                    <Link
                        to={`/details/${id}`}
                        className="text-[16px] max-w-fit hover:text-darkblue font-bold flex gap-2 items-center mb-5"
                    >
                        <FaArrowLeft />
                        Kembali
                    </Link>
                    <div className="flex justify-center items-center">
                        {isLoading ? (
                            <h1 className="skeleton bg-zinc-500 animate-pulse w-[343px] md:w-[936px] p-4 rounded-xl py-4 px-7"></h1>
                        ) : (
                            <>
                                {transactionData?.status === "Belum Bayar" ? (
                                    <h1 className="text-center w-[343px] md:w-[936px] bg-[#ff0000] text-[13px] md:text-[16px] font-bold text-white p-4 rounded-xl py-4 px-7">
                                        Selesaikan Pembayaran sampai{" "}
                                        {formattedDatePayment}
                                    </h1>
                                ) : (
                                    <h1 className="text-center w-[343px] md:w-[936px] text-[13px] bg-[#73CA5C] md:text-[16px] font-bold text-white p-4 rounded-xl py-4 px-7">
                                        Terima kasih atas pembayaran transaksi
                                    </h1>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {isLoading ? (
                <PaymentMethodSkeleton />
            ) : (
                <>
                    {transactionData?.status === "Belum Bayar" ? (
                        <PaymentSelect />
                    ) : (
                        <PaymentSuccess />
                    )}
                </>
            )}
        </div>
    );
};
export default Payment;
