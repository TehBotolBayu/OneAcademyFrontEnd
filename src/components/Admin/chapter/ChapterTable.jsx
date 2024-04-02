import { useDispatch, useSelector } from "react-redux";
import AddChapter from "./AddChapter";
import { formatDateAndTime } from "../../../utils/utils";
import { deleteChapter } from "../../../redux/actions/adminActions";
import EditChapter from "./EditChapter";

const ChapterTable = () => {
  const dispatch = useDispatch();
  const chapterList = useSelector((state) => state.course.courseMaterial);

  const handleDeleteChapter = (chapterId) => {
    dispatch(deleteChapter(chapterId));
  };

  return (
    <>
      <div className="p-1 container-fluid flex justify-between items-center mt-2">
        <h1 className="font-bold text-xl mt-5">Kelola Chapter</h1>
        <AddChapter />
      </div>
      <div className="overflow-x-auto">
        <table className="table shadow-lg border rounded-lg">
          {/* head */}
          <thead className="bg-zinc-500 text-white">
            <tr>
              <th>Chapter</th>
              <th>Name</th>
              <th>Duration</th>
              <th>Chapter id</th>
              <th>Created At</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {chapterList.map((chapter) => (
              <tr key={chapter.id} className="hover">
                <th>{chapter.step}</th>
                <td>{chapter.title}</td>
                <td>{chapter.totalDuration}</td>
                <td>{chapter.id}</td>
                <td>{formatDateAndTime(chapter.createdAt)}</td>
                <td className="flex gap-2">
                  <EditChapter chapterId={chapter.id} data={chapter} />
                  <button
                    onClick={() => handleDeleteChapter(chapter.id)}
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
  );
};

export default ChapterTable;
