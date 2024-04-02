import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTelegram } from "react-icons/fa";
import VideoCardList from "../../components/Details/VideoCardList";
import VideoPlayer from "../../components/Details/VideoPlayer";
import BuyCourseButton from "../../components/Details/BuyCourseButton";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { detailsCourse } from "../../redux/actions/courseActions";
import DetailsClassSkeleton from "../../components/skeleton/DetailsClassSkeleton";
import Enrollment from "../../components/Details/Enrollment";
import { logout } from "../../redux/actions/authActions";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/utils";

const KelasDetail = () => {
  const [activeVideo, setActiveVideo] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseDetails, transaction } = useSelector((state) => state.course);
  const { idUser } = useSelector((state) => state.auth);
  const idProfile = localStorage.getItem("idProfile");

  useEffect(() => {
    const delay = setTimeout(() => {
      if (idUser === null) {
        dispatch(logout(navigate));
        toast.error("Kamu harus login terlebih dahulu");
      }

      if (idUser !== idProfile) {
        dispatch(logout(navigate));
        toast.error("Kamu harus login terlebih dahulu");
      } else {
        dispatch(detailsCourse(id));
      }
    }, 1000);

    return () => {
      clearTimeout(delay);
      dispatch(detailsCourse(null));
    };
  }, []);

  if (courseDetails <= 0) {
    return <DetailsClassSkeleton />;
  }

  return (
    <div>
      <div className="container-fluid p-2 bg-[#EBF3FC]">
        <div className="top-[20px] mx-3 mt-2 md:ml-10 xl:ml-10">
          <Link
            to={"/class"}
            className="hover:text-darkblue max-w-fit text-[16px] font-bold flex gap-2 items-center mb-5"
          >
            <FaArrowLeft className="text-[16px] font-bold" />
            Kelas Lainnya
          </Link>

          <div className="flex flex-col gap-1 ml-9 container-fluid md:w-[65vw] lg:relative">
            <div className="flex justify-between container-fluid md:w-[65vw]">
              <h1 className="text-darkblue text-[20px] font-bold">
                {courseDetails?.category?.name}
              </h1>
              <div className="flex gap-1 mr-16 items-center">
                <img
                  src="/icon/ic_round-star.svg"
                  className="w-[14px]"
                  alt="rating icon"
                ></img>
                <p className="text-[14px] font-bold">5.0</p>
              </div>
            </div>
            <h1 className="text-[14px]">{courseDetails.title}</h1>
            <p className="text-[12px] font-bold">{courseDetails?.instructor}</p>
            <div className="flex gap-4">
              <div className="flex gap-1">
                <img src="/icon/mdi_badge-outline.svg" alt="level icon"></img>
                <h1 className="text-[12px] text-darkblue font-semibold">
                  {courseDetails?.level}
                </h1>
              </div>
              <div className="flex gap-1">
                <img src="/icon/clarity_book-line.svg" alt="module icon"></img>
                <h1 className="text-[12px]">5 Modul</h1>
              </div>
              <div className="flex gap-1">
                <img src="/icon/ri_time-fill.svg" alt="time icon"></img>
                <h1 className="text-[12px]">45 Menit</h1>
              </div>
            </div>
            <div className="flex gap-1 flex-wrap">
              <button className="mt-3 w-[269px] h-[34px] bg-[#73CA5C] text-white rounded-[25px]">
                <Link
                  to={"https://t.me/+Ko8M-S08yvBlMTVl"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex justify-center items-center"
                >
                  Join Grup Telegram
                  <FaTelegram className="ml-2" />
                </Link>
              </button>
              {/* need to add logic to send id course into transaction pages */}
              {transaction?.status === "Sudah Bayar" ? (
                <Enrollment />
              ) : (
                <BuyCourseButton id={id} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mx-3 md:ml-10 xl:ml-10">
        <div className="md:flex-col">
          {transaction?.status === "Sudah Bayar" ? (
            <div className="p-5 order-2 lg:order-1">
              {/* Video component di sini */}
              <VideoPlayer videoSrc={activeVideo} />
            </div>
          ) : (
            <></>
          )}
          <div className="w-full md:w-[65vw] p-5">
            <div className="collapse collapse-arrow bg-darkblue rounded-[4px] shadow-md mb-2">
              <input type="checkbox" />
              <div className="collapse-title text-white text-xl font-medium">
                <h1>Kelas Ini Ditujukan Untuk</h1>
              </div>
              <div className="collapse-content bg-white">
                <div className="w-full px-4">
                  <ol className="text-sm font-semibold text-justify py-3 list-decimal">
                    <li>
                      Anda yang ingin memahami poin penting{" "}
                      {courseDetails?.category?.name}
                    </li>
                    <li>
                      Anda yang ingin bekerja di bidang{" "}
                      {courseDetails?.category?.name}
                    </li>
                    <li>
                      Anda yang ingin melatih skill mengenai{" "}
                      {courseDetails?.category?.name}
                    </li>
                    <li>
                      Anda yang ingin mengembangkan pengetahuan terhadap{" "}
                      {courseDetails?.category?.name}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-darkblue rounded-[4px] shadow-md">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-white text-xl font-medium">
                <h1>Tentang kelas</h1>
              </div>
              <div className="collapse-content bg-white">
                <div className="w-full text-sm font-semibold py-3 text-justify rounded-md">
                  {courseDetails?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 lg:order-2">
          {transaction?.status === "Sudah Bayar" ? (
            <VideoCardList
              onVideoSelect={(videoSrc) => setActiveVideo(videoSrc)}
            />
          ) : (
            <h1>
              Buy This Course to Access Material Chapter with only{" "}
              {formatPrice(courseDetails?.price)}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default KelasDetail;
