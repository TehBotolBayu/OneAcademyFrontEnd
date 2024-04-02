import { useState, useEffect } from "react";
import {
    payCourses,
    payCoursesWithoutPayment,
    transactionDetails,
} from "../../redux/actions/courseActions";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../utils/utils";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const PaymentSelect = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const detailsCourse = useSelector((state) => state.course?.courseDetails);
    const detailsTransaction = useSelector(
        (state) => state.course?.transaction
    );

    useEffect(() => {
        dispatch(transactionDetails(id));
    }, [dispatch, id]);

    const handlePayment = async () => {
        setLoading(true);

        try {
            if (detailsTransaction.totalPrice > 0) {
                dispatch(payCourses(detailsTransaction?.id, id, navigate));
            }

            if (detailsTransaction.totalPrice <= 0) {
                dispatch(
                    payCoursesWithoutPayment(
                        detailsTransaction?.id,
                        id,
                        navigate
                    )
                );
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    };

    const handleCardNumberChange = (e) => {
        const inputValue = e.target.value;

        // Hapus semua karakter non-digit dari nomor kartu
        const digitsOnly = inputValue.replace(/\D/g, "");

        // Pisahkan nomor kartu menjadi 4 digit
        const formattedNumber = digitsOnly.replace(/(\d{4})/g, "$1 ").trim();

        setCardNumber(formattedNumber);
    };

    const bankList = [
        {
            id: 1,
            name: "BCA Virtual Account",
            image: "/bank/bca.svg",
        },
        {
            id: 2,
            name: "BRI Virtual Account",
            image: "/bank/bri.svg",
        },
        {
            id: 3,
            name: "BSI Virtual Account",
            image: "/bank/bsi.svg",
        },
        {
            id: 4,
            name: "Mandiri Virtual Account",
            image: "/bank/mandiri.svg",
        },
        {
            id: 5,
            name: "BTN Virtual Account",
            image: "/bank/btn.svg",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-start mt-10 py-5 min-h-[80vh]">
            <div className="flex justify-center items-start flex-wrap flex-row gap-5">
                <div className="p-[7%] md:p-0 flex flex-col gap-3">
                    <div className="collapse collapse-arrow bg-[#3c3c3c] rounded-[4px] shadow-md">
                        <input type="checkbox" />
                        <div className="collapse-title text-white text-xl font-medium">
                            <h1>Bank Transfer</h1>
                        </div>
                        <div className="collapse-content bg-white">
                            <div className="flex flex-col justify-center items-start gap-5 my-2">
                                {bankList.map((bank) => (
                                    <div
                                        key={bank.id}
                                        className="w-full flex  items-center gap-2 shadow-md rounded-md px-4"
                                    >
                                        <img
                                            src={bank.image}
                                            alt={bank.name}
                                            className="w-[80px] h-[80px] mr-3"
                                        />{" "}
                                        <h1>{bank.name}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-darkblue rounded-[4px] shadow-md">
                        <input type="checkbox" defaultChecked />
                        <summary className="collapse-title text-white text-xl font-medium">
                            <h1>Credit Card</h1>
                        </summary>
                        <div className="collapse-content bg-white">
                            <div className="flex justify-center flex-col items-center p-5 w-full">
                                <div className="flex gap-5">
                                    <img
                                        src="/icon/mastercard.svg"
                                        alt="mastercard"
                                    />
                                    <img src="/icon/visa.svg" alt="visa" />
                                    <img
                                        src="/icon/amex.svg"
                                        alt="american express"
                                    />
                                    <img src="/icon/paypal.svg" alt="paypal" />
                                </div>
                                <div>
                                    <label className="form-control w-full ">
                                        <div className="label">
                                            <span className="label-text text-black">
                                                Card Number
                                            </span>
                                        </div>
                                        <input
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={19}
                                            placeholder="4480 0000 0000 0000"
                                            className="input input-border-b w-full"
                                        />
                                    </label>

                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text text-black">
                                                Card Holder name
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="input input-border-b w-full"
                                        />
                                    </label>
                                    <div className="flex gap-10">
                                        <label className="form-control w-full max-w-xs">
                                            <div className="label">
                                                <span className="label-text text-black">
                                                    CVV
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={4}
                                                placeholder="000"
                                                className="input input-border-b w-full max-w-xs"
                                            />
                                        </label>
                                        <label className="form-control w-full max-w-xs">
                                            <div className="label">
                                                <span className="label-text text-black">
                                                    Expiry date
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={5}
                                                placeholder="07/24"
                                                className="input input-border-b w-full max-w-xs"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div key={id} className="px-8 md:p-0">
                    <div className="card w-auto md:w-[400px] h-[375px] bg-base-100 shadow-xl p-5 border border-darkblue">
                        <div className="card-body flex justify-center flex-col p-0">
                            <h1 className="font-bold text-xl mb-2">
                                Pembayaran Kelas
                            </h1>

                            <div className="shadow-md bg-white flex flex-col flex-grow sm:flex-none items-stretch pb-2.5 rounded-2xl max-w-[400px]">
                                <img
                                    loading="lazy"
                                    src={detailsCourse?.image?.url}
                                    alt="image course"
                                    className="aspect-[4.04] w-full overflow-hidden h-[85px] object-cover rounded-t-2xl"
                                />
                                <div className="flex w-full flex-col mt-1.5 px-2.5">
                                    <div className="items-stretch self-stretch flex w-full justify-between gap-5">
                                        <div className="text-indigo-600 text-xs font-bold leading-4 flex-1">
                                            {detailsCourse?.category?.name}
                                        </div>
                                    </div>
                                    <div className="self-stretch text-black text-xs font-bold leading-4">
                                        <span className="font-bold text-indigo-950">
                                            {detailsCourse?.title}
                                            <br />
                                        </span>
                                        <span className=" text-black">
                                            {detailsCourse?.instructor}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-around items-center font-Poppins py-[10px]">
                                <div>
                                    <h1 className="text-xs font-bold">Harga</h1>
                                    <p className="text-xs font-medium">
                                        {formatPrice(detailsCourse?.price || 0)}
                                    </p>
                                </div>
                                <div>
                                    <h1 className="text-xs font-bold">
                                        PPN 11%
                                    </h1>
                                    <p className="text-xs font-medium">
                                        {formatPrice(
                                            detailsTransaction?.totalTax || 0
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <h1 className="text-xs font-bold">
                                        Total Bayar
                                    </h1>
                                    <p className="text-darkblue text-xs font-medium">
                                        {formatPrice(
                                            detailsTransaction?.totalPrice || 0
                                        )}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                className="mt-3 btn w-full h-[50px] bg-[#ff0000] hover:bg-[#f15555] text-white rounded-[25px]"
                            >
                                <div className="flex justify-center items-center gap-2 text-sm">
                                    {loading ? (
                                        "Memproses Pembelian..."
                                    ) : (
                                        <>
                                            Bayar dan Ikuti Kelas Selamanya
                                            <img
                                                src="/icon/buy-now.svg"
                                                alt="buy icon"
                                            ></img>
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSelect;
PaymentSelect.propTypes = {
    id: PropTypes.node,
    transactionId: PropTypes.node,
};
