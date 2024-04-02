import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatedCategory } from "../../../redux/actions/adminActions";
import Proptype from "prop-types";
import { useEffect } from "react";

const EditCategory = ({ id, data }) => {
  const [name, setName] = useState(data?.name || "");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setName(data?.name || "");
  }, [data]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      await dispatch(updatedCategory(id, formData));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };
  return (
    <div>
      <div className="py-4">
        <form onSubmit={handleUpdateProfile}>
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
              placeholder={data?.name ? data.name : "Masukkan Nama Kategori"}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">
              {loading ? "Mengupdate..." : "Update Data Kategori"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
EditCategory.propTypes = {
  id: Proptype.string,
  data: Proptype.object,
};
