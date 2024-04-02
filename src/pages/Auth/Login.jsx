import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions";
import toast from "react-hot-toast";
import GoogleOAuth from "../../components/Auth/GoogleOAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    // validate form
    if (!email && !password) {
      toast.error("Email dan Password belum diisi");
      return;
    } else if (!email) {
      toast.error("Email belum diisi");
      return;
    } else if (!password) {
      toast.error("Password belum diisi");
      return;
    } else if (password.length < 8) {
      toast.error("Password min 8 karakter!");
      return;
    }

    dispatch(login(email, password, navigate));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-[100%] lg:w-[50%] flex flex-col justify-center items-center mx-[23px] lg:px-[145px] ">
        <form onSubmit={handleLogin} className="w-full">
          <h1 className="text-[24px] font-bold text-darkblue mb-8">Masuk</h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-[12px] mb-[4px] font-Poppins">
                Email/No Telepon
              </label>
              <input
                type="email"
                className="border text-[14px] w-full p-2 rounded-2xl"
                placeholder="Contoh: johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-[12px]">
              <div className="flex justify-between items-center ">
                <label className="mb-[4px] font-Poppins">Password</label>
                <Link to="/reset">
                  <span className="text-darkblue font-Poppins">
                    Lupa Kata Sandi
                  </span>
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
          <button className="btn btn-primary w-full text-[14px] font-medium bg-darkblue text-white py-[10px] rounded-2xl mt-5">
            Masuk
          </button>
          <div className="flex flex-col justify-center items-center gap-2 mt-6">
            <div className="flex gap-2">
              <h1 className="text-[14px] font-normal font-Poppins">
                Belum punya akun?
              </h1>
              <Link
                to="/register"
                className="text-darkblue text-[14px] font-bold"
              >
                Daftar di sini
              </Link>
            </div>
          </div>
        </form>
        <div className="divider">Or Login With</div>
        <GoogleOAuth />
      </div>

      <div className="hidden lg:flex justify-center items-center bg-darkblue w-[50%] min-h-[100dvh]">
        <img src="/testlogo.png" alt="logo" />
      </div>
    </div>
  );
};

export default Login;
