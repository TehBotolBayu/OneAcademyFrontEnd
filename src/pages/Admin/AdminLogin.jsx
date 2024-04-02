import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { loginAdmin } from "../../redux/actions/adminActions";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    // validate form
    if (!email && !password) {
      toast.error("ID Admin dan Password belum diisi");
      return;
    } else if (!email) {
      toast.error("ID Admin belum diisi");
      return;
    } else if (!password) {
      toast.error("Password belum diisi");
      return;
    }

    dispatch(loginAdmin(email, password, navigate));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex justify-center items-center bg-darkblue w-[50%] min-h-[100dvh]">
        <img src="/testlogo.png" alt="logo" />
      </div>

      <div className="w-[100%] lg:w-[50%] flex justify-start items-center mx-[23px] lg:px-[145px] ">
        <form onSubmit={handleLogin} className="w-full">
          <h1 className="text-[24px] font-bold text-darkblue mb-8">
            Login Admin
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-[12px] mb-[4px]">ID Admin</label>
              <input
                type="text"
                className="border text-[14px] w-full p-2 rounded-2xl"
                placeholder="ID Admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-[12px]">
              <div className="flex justify-between items-center">
                <label className=" mb-[4px]">Password</label>
                <Link to="/reset">
                  <span className="text-darkblue">Lupa Kata Sandi</span>
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="border text-[14px] w-full p-2 rounded-2xl"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 border rounded-lg"
                >
                  {showPassword ? (
                    <FaRegEyeSlash className="border-none" />
                  ) : (
                    <FaRegEye className="border-none" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button className="w-full text-[14px] font-medium bg-darkblue text-white py-[10px] rounded-2xl mt-5">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
