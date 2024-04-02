import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addcategory } from "../../../redux/actions/adminActions";
const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      await dispatch(addcategory(formData));
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
        onClick={() => document.getElementById("addCategory").showModal()}
      >
        <IoAddCircleOutline
          size={20}
          color="white"
          className="hidden md:block"
        />
        <small>Tambah Kategori</small>
      </button>
      <dialog id="addCategory" className="modal">
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
            Buat Kategori Baru
          </h3>
          <div className="py-4">
            <form onSubmit={handleUpdateCategory}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Thumbnail Kategori</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered"
                  onChange={handleImageChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nama Kategori</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Masukkan Nama Kategori Baru"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">
                  {loading ? "Menyimpan..." : "Buat Kategori Baru"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddCategory;
