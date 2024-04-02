import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
    const { id } = useParams();

    if (localStorage.getItem("date")) {
        setTimeout(() => {
            localStorage.removeItem("date");
        }, 1500);
    }

    const detailsCourse = useSelector((state) => state.course?.courseDetails);

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <h1 className="text-4xl font-bold text-darkblue ">Selamat!</h1>
            <img
                src="/icon/Cart_shopping-list.svg"
                className="w-32 md:w-60 lg:block mt-6"
                alt="Cart Shopping"
            />
            <p className="mt-4 text-sm md:text-lg text-center mb-5">
                <span className="font-bold">
                    Transaksi pembayaran kelas {detailsCourse?.courseType}{" "}
                    berhasil!
                </span>{" "}
                <br />
                E-receipt telah dikirimkan ke email.
            </p>
            <div className="flex flex-col justify-center mt-8 gap-2">
                <Link
                    to={`/details/${id}`}
                    className="btn btn-ghost w-full sm:w-[343px] bg-blue-500 text-white p-4 rounded-full hover:bg-blue-700"
                >
                    Mulai Belajar
                </Link>
                <Link
                    to={"/"}
                    className="w-full text-center sm:w-[343px] text-darkblue p-4 rounded-full hover:text-[#489CFF]"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
