import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addChapter } from "../../../redux/actions/adminActions";
import { useParams } from "react-router-dom";

const AddChapter = () => {
  const { id } = useParams();

  const [totalDuration, setTotalDuration] = useState("");
  const [step, setStep] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleAddChapter = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await dispatch(addChapter(totalDuration, step, title, id));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div>
      <button
        className="btn btn-ghost badge-darkblue rounded-3xl text-white hover:bg-gray-700"
        onClick={() => document.getElementById("addChapter").showModal()}
      >
        <IoAddCircleOutline
          size={20}
          color="white"
          className="hidden md:block"
        />
        <small>Tambah Chapter</small>
      </button>
      <dialog id="addChapter" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="text-darkblue btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <img
                src="/icon/close.svg"
                className="w-10 absolute bottom-1"
                alt="close button"
              />
            </button>
          </form>
          <h3 className="font-bold text-lg text-darkblue text-center mt-5">
            Buat Chapter Baru
          </h3>
          <div className="py-4">
            <form onSubmit={handleAddChapter}>
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
                  {loading ? "Membuat Chapter..." : "Buat Chapter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddChapter;
