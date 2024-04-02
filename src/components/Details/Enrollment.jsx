import PropTypes from "prop-types";

const Enrollment = ({ id }) => {
    return (
        <div key={id}>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
                className="h-[34px] w-[269px] bg-darkblue mt-3 text-white rounded-[25px]"
                onClick={() =>
                    document.getElementById("enrollment").showModal()
                }
            >
                <span className="flex justify-center items-center">
                    Mulai Kelas
                </span>
            </button>
            <dialog id="enrollment" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="text-darkblue btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            <img
                                src="/icon/close.svg"
                                className="w-10 absolute bottom-1"
                                alt="close button"
                            />
                        </button>
                    </form>
                    <div className="text-center">
                        <h3 className="font-bold text-2xl text-check-100">
                            Onboarding...
                        </h3>
                    </div>

                    <div className="flex flex-col items-center justify-center mt-5">
                        <img src="/icon/onboarding.svg" alt="onboarding" />

                        <div className="text-center mt-4">
                            <h1 className="font-bold my-5">
                                Persiapkan hal berikut untuk belajar yang
                                maksimal
                            </h1>
                            <ul>
                                <li>
                                    Mempunyai akun Figma atau Install Adobe XD
                                </li>
                                <li>
                                    Menggunakan internet minimal kecepatan 2Mbps
                                </li>
                                <li>Belajar di tempat yang nyaman</li>
                            </ul>
                        </div>
                    </div>

                    <div className="modal-action flex justify-center">
                        <form method="dialog">
                            <button
                                alt="close button"
                                className="font-bold text-base mt-3 w-[320px] h-[48px] bg-darkblue text-white rounded-[25px]"
                            >
                                Ikuti Kelas
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Enrollment;
Enrollment.propTypes = {
    id: PropTypes.node,
};
