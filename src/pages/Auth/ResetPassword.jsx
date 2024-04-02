import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [ulangPassword, setUlangPassword] = useState("");
  const [showPasswordTop, setShowPasswordTop] = useState(false);
  const [showPasswordDown, setShowPasswordDown] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (typeof id !== "string" || id.length < 10) {
    return (
      <div className="flex min-h-screen">
        <div className="w-[100%] lg:w-[50%] flex justify-center items-center mx-[23px] lg:px-[145px] ">
          <h1 className="text-red-600 font-bold">
            Invalid ID for reset password
          </h1>
        </div>
        <div className="hidden lg:flex justify-center items-center bg-darkblue w-[50%] min-h-[100dvh]">
          <img src="/testlogo.png" alt="logo" />
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //validate form submission if null
    if (password === "" || ulangPassword === "") {
      toast.error("Password harus diisi!");
      return;
    }

    //validate password
    if (ulangPassword !== password) {
      toast.error("Password harus sama!");
      return;
    }

    dispatch(forgotPassword(password, id, navigate));
  };

  const togglePasswordTop = () => {
    setShowPasswordTop(!showPasswordTop);
  };
  const togglePasswordDown = () => {
    setShowPasswordDown(!showPasswordDown);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-[100%] lg:w-[50%] flex justify-start items-center mx-[23px] lg:px-[145px] ">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="text-[24px] font-bold text-darkblue mb-8">
            Reset Password
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label className="text-[12px] mb-[4px]">
                  Masukkan Password Baru
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPasswordTop ? "text" : "password"}
                  className="border w-full p-2 rounded-2xl pr-[3.5rem]"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={togglePasswordTop}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 border rounded-lg"
                >
                  {showPasswordTop ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label className="text-[12px] mb-[4px]">
                  Ulangi Password Baru
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPasswordDown ? "text" : "password"}
                  className="border w-full p-2 rounded-2xl pr-[3.5rem]"
                  placeholder="Masukkan password"
                  value={ulangPassword}
                  onChange={(e) => setUlangPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={togglePasswordDown}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 border rounded-lg"
                >
                  {showPasswordDown ? (
                    <FaRegEyeSlash className="border-none" />
                  ) : (
                    <FaRegEye className="border-none" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button className="btn btn-primary w-full text-[14px] bg-darkblue text-white py-[10px] rounded-2xl mt-5">
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

export default ResetPassword;
