import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { createMaterial } from "../../../redux/actions/adminActions";
import { useParams } from "react-router-dom";

const AddMaterial = () => {
  const { id } = useParams();

  const [step, setStep] = useState("");
  const [title, setTitle] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [duration, setDuration] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { courseMaterial } = useSelector((state) => state.course);

  const handleAddMaterial = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await dispatch(
        createMaterial(step, title, videoURL, duration, id, chapterId)
      );
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
        onClick={() => document.getElementById("addMaterial").showModal()}
      >
        <IoAddCircleOutline
          size={20}
          color="white"
          className="hidden md:block"
        />
        <small>Tambah Material</small>
      </button>
      <dialog id="addMaterial" className="modal">
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
            <form onSubmit={handleAddMaterial}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Step</span>
                </label>
                <input
                  value={step}
                  onChange={(e) => setStep(e.target.value)}
                  type="text"
                  placeholder="Contoh: 1"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Contoh : Dere - Kota"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Video URL</span>
                </label>
                <input
                  value={videoURL}
                  onChange={(e) => setVideoURL(e.target.value)}
                  type="text"
                  placeholder="Contoh : https://www.youtube.com/watch?v=HkRA6UO-cTI"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Duration</span>
                </label>
                <input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  type="text"
                  placeholder="Contoh: 4 Menit"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Chapter ID</span>
                </label>
                <select
                  value={chapterId}
                  onChange={(e) => setChapterId(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>
                    Pilih Chapter ID
                  </option>
                  {courseMaterial.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                      {`Chapter ${chapter.step} - ${chapter.title}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">
                  {loading ? "Membuat Material..." : "Buat Material"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddMaterial;
