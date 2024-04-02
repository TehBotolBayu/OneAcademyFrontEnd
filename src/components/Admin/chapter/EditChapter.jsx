import { useState } from "react";
import Proptype from "prop-types";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatedChapter } from "../../../redux/actions/adminActions";
import { useEffect } from "react";

const EditChapter = ({ chapterId, data }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [totalDuration, setTotalDuration] = useState(data?.totalDuration ?? "");
  const [step, setStep] = useState(data?.step ?? "");
  const [title, setTitle] = useState(data?.title ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTotalDuration(data?.totalDuration || "");
    setStep(data?.step || "");
    setTitle(data?.title || "");
  }, [data]);

  const handleUpdateChapter = async (e) => {
    e.preventDefault();

    console.log(totalDuration, step, title, id, chapterId);

    setLoading(true);

    try {
      await dispatch(updatedChapter(totalDuration, step, title, id, chapterId));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="badge-darkblue p-1 rounded-md"
        onClick={() =>
          document.getElementById(`editChapter_${data.id}`).showModal()
        }
      >
        Edit Chapter
      </button>
      <dialog id={`editChapter_${data.id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Edit Chapter</h3>
          <div className="py-4">
            <form onSubmit={handleUpdateChapter}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Total Durasi</span>
                </label>
                <input
                  value={totalDuration}
                  onChange={(e) => setTotalDuration(e.target.value)}
                  type="text"
                  placeholder="Masukkan Total Durasi"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Chapter</span>
                </label>
                <input
                  value={step}
                  onChange={(e) => setStep(e.target.value)}
                  type="text"
                  placeholder="Contoh : 1, tidak perlu menggunakan kata Chapter"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Judul Chapter</span>
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Contoh: Pendahuluan"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">
                  {loading ? "Mengupdate Chapter..." : "Update Chapter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditChapter;
EditChapter.propTypes = {
  chapterId: Proptype.string,
  data: Proptype.object,
};
