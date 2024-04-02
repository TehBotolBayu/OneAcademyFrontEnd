import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getProfileData } from "../../redux/actions/profileActions";
import HistoryPembayaran from "../../components/Profile/HistoryPembayaran";
import EditProfile from "../../components/Profile/EditProfile";
import UbahPassword from "../../components/Profile/UbahPassword";

const Account = () => {
  const [activeLink, setActiveLink] = useState("profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);

  const { profileData } = useSelector((state) => state.profile);

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const handleRenderContent = () => {
    switch (activeLink) {
      case "profile":
        return <EditProfile profileData={profileData} />;
      case "ubahPassword":
        return <UbahPassword />;
      case "riwayatPembayaran":
        return <HistoryPembayaran />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="bg-[#EBF3FC] h-[250px] relative">
        <div>
          <div className="absolute flex justify-center w-full top-[9dvh] ">
            <div className="flex flex-col justify-center w-[80%]">
              <Link
                to={"/"}
                className="text-darkblue text-[16px] font-bold flex gap-2 items-center mb-5 w-fit"
              >
                <FaArrowLeft className="text-darkblue" />
                Kembali Ke Beranda
              </Link>

              <div className="card card-compact w-[80dvw] bg-base-100 shadow-xl mb-5">
                <div className="p-2 bg-darkblue rounded-t-md text-center">
                  <h1 className="text-xl text-white font-bold">Akun</h1>
                </div>

                <div className="w-full card-body min-h-[50dvh] flex md:flex-row">
                  <div className="md:w-[30%] flex">
                    <ul className="w-full">
                      <Link
                        onClick={() => handleClick("profile")}
                        className={`text-${
                          activeLink === "profile" ? "darkblue" : "black"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-[16px] mb-2 font-bold">
                          <img src="/Profile/edit.svg" alt="edit" />
                          <h1>Profil Saya</h1>
                        </div>
                        <div className="border-t mb-2 border-[#E5E5E5]"></div>
                      </Link>
                      <Link
                        onClick={() => handleClick("ubahPassword")}
                        className={`text-${
                          activeLink === "ubahPassword" ? "darkblue" : "black"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-[16px] mb-2 font-bold">
                          <img src="/Profile/settings.svg" alt="setting" />
                          <h1>Ubah Password</h1>
                        </div>
                        <div className="border-t mb-2 border-[#E5E5E5]"></div>
                      </Link>
                      <Link
                        onClick={() => handleClick("riwayatPembayaran")}
                        className={`text-${
                          activeLink === "riwayatPembayaran"
                            ? "darkblue"
                            : "black"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-[16px] mb-2 font-bold">
                          <img src="/Profile/cart.svg" alt="cart" />
                          <h1>Riwayat Pembayaran</h1>
                        </div>
                        <div className="border-t mb-2 border-[#E5E5E5]"></div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="hover:text-red-600 w-full"
                      >
                        <div className="flex items-center gap-2 text-[16px] mb-2 font-bold">
                          <img src="/Profile/log-out.svg" alt="log out" />
                          <h1>Keluar</h1>
                        </div>
                        <div className="border-t mb-2 border-[#E5E5E5]"></div>
                      </button>
                      <h1 className="text-center my-2 text-[#8A8A8A] text-xs">
                        Version 1.1.0
                      </h1>
                      <div className="md:hidden border-t mb-2 font-semibold border-[#E5E5E5]"></div>
                    </ul>
                  </div>
                  <div className="flex flex-1 justify-center">
                    {handleRenderContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
