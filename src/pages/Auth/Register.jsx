import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/authActions";
import { validatePhoneInput } from "../../utils/utils";
import toast from "react-hot-toast";

const Register = () => {
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name && !email && !phone && !password) {
            toast.error("Semua Form Harus Diisi");
            return;
        } else if (name === "") {
            toast.error("Nama masih kosong");
            return;
        } else if (email === "") {
            toast.error("Email masih kosong");
            return;
        } else if (phone === "") {
            toast.error("Nomor Telepon masih kosong");
            return;
        } else if (password === "") {
            toast.error("Password masih kosong");
            return;
        } else if (password.length < 8) {
            toast.error("Password min 8 karakter!");
            return;
        } else if (!/[A-Z]/.test(password)) {
            toast.error("Password harus memiliki setidaknya satu huruf besar");
            return;
        } else if (!/[0-9]/.test(password)) {
            toast.error("Password harus memiliki setidaknya satu angka");
            return;
        }

        dispatch(register(email, password, name, phone, navigate));
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-[100%] lg:w-[50%] flex justify-start items-center mx-[23px] lg:px-[145px] ">
                <form onSubmit={handleSubmit} className="w-full">
                    <h1 className="text-[24px] font-bold text-darkblue mb-8">
                        Daftar
                    </h1>
                    <div className="flex flex-col gap-5 ">
                        <div className="flex flex-col">
                            <label className="text-[12px] mb-[4px] font-Poppins">
                                name
                            </label>
                            <input
                                type="text"
                                className="border w-full p-2 rounded-2xl"
                                placeholder="nama Lengkap"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[12px] mb-[4px] font-Poppins">
                                Email
                            </label>
                            <input
                                type="email"
                                className="border w-full p-2 rounded-2xl"
                                placeholder="Contoh: johndoe@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[12px] mb-[4px] font-Poppins">
                                Nomor Telepon
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={14}
                                value={phone}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    if (validatePhoneInput(input)) {
                                        setPhone(input);
                                    }
                                }}
                                placeholder="+62"
                                className="border w-full p-2 rounded-2xl appearance-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center">
                                <label className="text-[12px] mb-[4px] font-Poppins">
                                    Buat Password
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="border w-full p-2 rounded-2xl pr-[3.5rem]"
                                    placeholder="Masukkan password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
                        Daftar
                    </button>
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <h1 className="text-[14px] font-normal font-Poppins">
                            Sudah punya akun?
                        </h1>
                        <Link
                            to="/login"
                            className="text-darkblue text-[14px] font-bold"
                        >
                            Masuk di sini
                        </Link>
                    </div>
                </form>
            </div>

            <div className="hidden lg:flex justify-center items-center bg-darkblue w-[50%] min-h-[100dvh]">
                <img src="/testlogo.png" alt="logo" />
            </div>
        </div>
    );
};

export default Register;
