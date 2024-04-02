import { useDispatch, useSelector } from "react-redux";
import { formatDateAndTime } from "../../../utils/utils";
import AddMaterial from "./AddMaterial";
import { deleteMaterial } from "../../../redux/actions/adminActions";

const MaterialTable = () => {
  const dispatch = useDispatch();
  const chapters = useSelector((state) => state.course.courseMaterial);

  // Flatten the array of materials from chapters
  const materialList = chapters.flatMap((chapter) =>
    chapter.material.map((material) => ({
      ...material,
      chapterTitle: chapter.title, // Include chapter title for unique material
    }))
  );

  const handleDeleteMaterial = (materialId) => {
    dispatch(deleteMaterial(materialId));
  };

  return (
    <div>
      <>
        <div className="p-1 container-fluid flex justify-between items-center mt-2">
          <h1 className="font-bold text-xl mt-5">Kelola Material</h1>
          <AddMaterial />
        </div>
        <div className="overflow-x-auto">
          <table className="table shadow-lg border rounded-lg">
            {/* head */}
            <thead className="bg-zinc-500 text-white">
              <tr>
                <th>Material id</th>
                <th>Step</th>
                <th>Title</th>
                <th>Video URL</th>
                <th>Created At</th>
                <th>Course id</th>
                <th>Chapter id</th>
                <th>Chapter Title</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {materialList?.map((material) => (
                <tr key={material.id} className="hover">
                  <td>{material.id}</td>
                  <td>{material.step}</td>
                  <td>{material.title}</td>
                  <td>{material.videoURL}</td>
                  <td>{formatDateAndTime(material.createdAt)}</td>
                  <td>{material.courseId}</td>
                  <td>{material.chapterId}</td>
                  <td>{material.chapterTitle}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleDeleteMaterial(material.id)}
                      className="badge-red p-1 rounded-md"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <small className="text-red-500 font-semibold">
            jika tidak muncul data yang baru, refresh halaman ini
          </small>
        </div>
      </>
    </div>
  );
};

export default MaterialTable;
