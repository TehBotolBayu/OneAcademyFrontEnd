import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { activateAccount, resendOtp } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const RegisterOtp = () => {
  const [OTP, setOtp] = useState("");
  const [resendTimeout, setResendTimeout] = useState(60);
  const email = localStorage.getItem("email");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitOtp = (e) => {
    e.preventDefault();

    dispatch(activateAccount(OTP, navigate));
  };

  useEffect(() => {
    let timer;

    if (resendTimeout > 0) {
      timer = setInterval(() => {
        setResendTimeout((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [resendTimeout]);

  const handleResendClick = () => {
    dispatch(resendOtp());
    //setTimeout to 60 again
    setResendTimeout(60);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-[100%] lg:w-[50%] flex justify-start items-center mx-[23px] lg:px-[145px] ">
        <form onSubmit={handleSubmitOtp} className="w-full">
          <div className="flex items-start gap-2">
            <Link to={"/register"}>
              <FaArrowLeft className="w-10 mt-[10px]" />
            </Link>
            <h1 className="text-[24px] font-bold text-darkblue mb-8">
              Masukkan OTP
            </h1>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-[12px] text-sm lg:text-base mb-[4px] text-center font-Poppins">
                Ketik 6 digit kode yang dikirimkan ke{" "}
                <span className="font-bold">{email}</span>
              </label>
              <OtpInput
                value={OTP}
                onChange={setOtp}
                numInputs={6}
                inputType="text"
                maxValues={6}
                containerStyle="my-6 flex justify-center items-center gap-[16px]"
                inputStyle={{
                  width: "2.6rem",
                  height: "2.6rem",
                  border: "1px solid darkblue",
                  borderRadius: "1rem",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div className="flex flex-col">
              {resendTimeout > 0 ? (
                <label className="text-[12px] text-sm lg:text-base mb-[4px] text-center font-Poppins">
                  Kirim Ulang OTP dalam {resendTimeout} detik
                </label>
              ) : (
                <button
                  onClick={handleResendClick}
                  className="text-[12px] mb-[4px] font-bold text-center font-Poppins text-red-600 cursor-pointer"
                >
                  Kirim Ulang OTP
                </button>
              )}
            </div>
          </div>
          <button className="w-full text-[14px] font-medium bg-darkblue text-white py-[10px] rounded-2xl mt-5">
            Simpan
          </button>
        </form>
      </div>

      <div className="hidden lg:flex justify-center items-center bg-darkblue w-[50%] min-h-[100dvh]">
        <img src="/testlogo.png" alt="logo" />
      </div>
    </div>
  );
};

export default RegisterOtp;
