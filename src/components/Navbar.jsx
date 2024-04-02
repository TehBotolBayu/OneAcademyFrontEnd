import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaRegBell, FaRegUser, FaListUl } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { logout } from "../redux/actions/authActions";
import { CiLogout } from "react-icons/ci";
import { useEffect } from "react";
import { getProfileData } from "../redux/actions/profileActions";

const Navbar = () => {
  const { token, role } = useSelector((state) => state.auth);
  const profileImage = useSelector(
    (state) => state.profile?.profileData?.avatar ?? "/profile.jpg"
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getProfileData());
    }
  }, [dispatch, token, profileImage]);

  const location = useLocation();
  const hidePath = [
    "/login",
    "/register",
    "/reset",
    "/validate",
    "/admin",
    "/admin/dashboard",
  ];

  const isHidden =
    hidePath.includes(location.pathname) ||
    location.pathname.startsWith("/forgot/") ||
    location.pathname.startsWith("/admin/chapter/");

  if (isHidden) {
    return null;
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements[0].value;

    navigate(`/class?name=${searchQuery}`);
  };

  const onLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="navbar bg-darkblue md:px-[65px]">
      <div className="flex-1">
        <Link
          to={"/"}
          className="btn btn-ghost text-md md:text-xl text-white mr-2"
        >
          {/* OneAcademy */}
          <img src="/testnew.svg" alt="logo" className="w-24" />
        </Link>

        {token ? (
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex relative flex-row"
          >
            <input
              type="search"
              placeholder="Cari Kursus Terbaik..."
              className="sm:w-[35dvw] sm:h-[7dvh] outline-none focus:outline-none px-4 py-[6px] border-2 rounded-2xl border-darkblue"
            />
            <button
              type="submit"
              className="absolute bottom-1/2 right-4 translate-y-1/2 rounded-lg bg-darkblue p-1"
            >
              <img
                src="/icon/search.svg"
                className="w-7 sm:w-5"
                alt="search icon"
              />
            </button>
          </form>
        ) : (
          <></>
        )}
      </div>

      {token ? (
        <>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center sm:hidden relative flex-row"
          >
            <input
              type="search"
              placeholder="Cari Kursus Terbaik..."
              className="placeholder:text-xs w-[47dvw] md:w-[35dvw] md:h-[5dvh] outline-none focus:outline-none px-4 py-[6px] border-2 rounded-2xl border-darkblue"
            />
            <button
              type="submit"
              className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-lg bg-darkblue p-1"
            >
              <img src="/icon/search.svg" alt="search icon" />
            </button>
          </form>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                {profileImage ? (
                  <div className="w-10 rounded-full">
                    <img alt="User Profile Image" src={profileImage} />
                  </div>
                ) : (
                  <div className="skeleton bg-zinc-500 animate-pulse w-10 rounded-full"></div>
                )}
              </label>
              <ul className="mt-3 z-[1] p-2 text-darkblue shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li className="my-2 hover:bg-slate-200 rounded-md">
                  <Link to={"/class"}>
                    <div className="flex items-center gap-2 text-[16px] font-bold ">
                      <FaListUl />
                      <h1>Kelas</h1>
                    </div>
                  </Link>
                </li>
                <li className="my-2 hover:bg-slate-200 rounded-md">
                  <Link to={"/notification"}>
                    <div className="flex items-center gap-2 text-[16px]  font-bold">
                      <FaRegBell />
                      <h1>Notifikasi</h1>
                    </div>
                  </Link>
                </li>
                <li className="my-2 hover:bg-slate-200 rounded-md">
                  <Link to={"/account"}>
                    <div className="flex items-center gap-2 text-[16px] font-bold">
                      <FaRegUser />
                      <h1>Akun</h1>
                    </div>
                  </Link>
                </li>
                {role === "ADMIN" ? (
                  <li className="my-2 hover:bg-slate-200 rounded-md">
                    <Link to={"/admin/dashboard"}>
                      <div className="flex items-center gap-2 text-[16px] font-bold">
                        <RiAdminLine />
                        <h1 className="text-sm">Dashboard Admin</h1>
                      </div>
                    </Link>
                  </li>
                ) : (
                  <></>
                )}

                <li className="my-2 hover:bg-red-200 rounded-md">
                  <button onClick={onLogout}>
                    <div className="flex items-center gap-2 text-[16px] text-red-600 font-bold">
                      <CiLogout />
                      <h1>Logout</h1>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <Link to={"/login"}>
          <div className="flex gap-2 btn btn-ghost">
            <img src="/icon/fi_log-in.svg" alt="time icon"></img>
            <button className="text-white font-bold text-[16px]">Masuk</button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
