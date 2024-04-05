import { IoLogoInstagram } from "react-icons/io5";
import { SlSocialGithub } from "react-icons/sl";
import { RiYoutubeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const hidePath = ["/login", "/register", "/reset", "/validate", "/account"];

  const isHidden =
    hidePath.includes(location.pathname) ||
    location.pathname.startsWith("/forgot/") ||
    location.pathname.startsWith("/details/");

  if (isHidden) {
    return null;
  }

  return (
    <div className="bg-custom-footer">
      {/* <footer className="text-white flex flex-col justify-between md:flex-row w-full h-auto px-6 py-8 border-t-4 border-indigo-500">
        <div className="mb-4 flex items-center flex-col md:w-2/4">
          <img src="/footer_logo.svg" alt="logo" className="w-96 mb-3" />
          <p className="text-sm text-justify md:text-start mt-2 space-x-4">
            Website ini dibuat dengan tujuan untuk menyelesaikan Final Project
            Kampus Merdeka dari Binar Academy dengan tema pendidikan. Dengan
            fokus memberikan solusi kreatif dan pengalaman belajar yang inovatif
            secara online. One Academy berkomitmen untuk menyediakan konten yang
            dapat memberikan ilmu baru dan mendukung pengembangan pengetahuan
            secara interaktif. Temukan pengalaman belajar yang kreatif dan
            solusi pendidikan terbaik di One Academy. 🚀✨
          </p>
        </div>


        <div className="flex flex-col mx-2">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold mb-2">Social Media</h3>
            <ul className="flex gap-2 flex-col">
              <Link
                to={"https://www.instagram.com/academybinar/"}
                target="_blank"
                className="flex items-center gap-2 hover:text-blue-400 w-fit"
              >
                <IoLogoInstagram size={20} /> academybinar
              </Link>
              <Link
                to={"https://github.com/DavincyProject/OneAcademy"}
                target="_blank"
                className="flex items-center gap-2 hover:text-blue-400 w-fit"
              >
                <SlSocialGithub size={20} /> One Academy
              </Link>
              <Link
                to={"https://www.youtube.com/c/BinarAcademy"}
                target="_blank"
                className="flex items-center gap-2 hover:text-blue-400 w-fit"
              >
                <RiYoutubeLine size={20} /> BinarAcademy
              </Link>
            </ul>
          </div>
        </div>
      </footer>
      <p className="text-xs py-3 text-center h-full text-white ">
        <span className="font-bold">
          &#169; 2023-2024 One Academy, All Rights reserved.
        </span>
        <br /> Made by Kelompok B15 <br />{" "}
        <span className="text-[#a5c9ca]">
          All icons and logos are the property of their respective owners.
        </span>
      </p> */}
    </div>
  );
};

export default Footer;
