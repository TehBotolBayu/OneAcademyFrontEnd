import Proptype from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsCourse } from "../../redux/actions/courseActions";
import { useParams } from "react-router-dom";
import UpdateCourse from "../../components/Admin/course/UpdateCourse";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ChapterTable from "../../components/Admin/chapter/ChapterTable";
import MaterialTable from "../../components/Admin/chapter/MaterialTable";

const KelolaChapter = () => {
  const { id } = useParams();
  const { courseDetails } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsCourse(id));
  }, [dispatch, id]);

  return (
    <div className="container-fluid p-5">
      <div role="alert" className="alert alert-warning mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <small>
          Warning: Buat dulu seluruh Chapter agar lebih mudah dalam mengisi
          Materialnya karena Chapter akan otomatis diambil dan bisa dipilih
        </small>
      </div>
      <Link
        to={"/admin/dashboard"}
        className="text-darkblue text-[16px] font-bold flex gap-2 items-center mb-5 w-fit"
      >
        <FaArrowLeft className="text-darkblue" />
        Kembali Ke Dashboard
      </Link>
      <div className="container-fluid flex flex-col">
        <UpdateCourse details={courseDetails} />
        <div>
          <ChapterTable />
          <div className="divider"></div>
          <MaterialTable />
        </div>
      </div>
    </div>
  );
};

export default KelolaChapter;
KelolaChapter.propTypes = {
  id: Proptype.node,
  details: Proptype.arrayOf(Proptype.object),
};
