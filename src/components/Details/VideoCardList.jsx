import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addProgress, getProgress } from "../../redux/actions/courseActions";
import { useParams } from "react-router-dom";

const VideoCardList = ({ onVideoSelect }) => {
  const { id } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { courseMaterial, transaction, progressCourse } = useSelector(
    (state) => state.course
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProgress(id));
  }, []);

  const handleAddProgress = (materialId, id) => {
    dispatch(addProgress(materialId, id));
  };

  function extractVideoId(videoURL) {
    try {
      const url = new URL(videoURL);
      if (url.hostname === "www.youtube.com" && url.pathname === "/watch") {
        const videoId = url.searchParams.get("v");
        if (videoId) {
          const linkEmbed = `https://www.youtube.com/embed/${videoId}`;
          return linkEmbed;
        }
      }
      throw new Error("Invalid YouTube URL");
    } catch (error) {
      return null;
    }
  }

  const isMaterialCompleted = (materialId) => {
    const materialProgress = progressCourse.find(
      (item) => item.materialId === materialId
    );
    return materialProgress ? materialProgress.isCompleted : false;
  };

  const handleVideoSelect = (videoSrc) => {
    onVideoSelect(videoSrc);
    setSelectedVideo(videoSrc);
  };

  const materialLenght = progressCourse.length;
  const completedMaterials = progressCourse.filter(
    (item) => item.isCompleted
  ).length;

  const progressPercentage =
    materialLenght > 0
      ? ((completedMaterials / materialLenght) * 100).toFixed(2)
      : 0;

  return (
    <div className="container-fluid xs:w-full sm:max-w-[320px] xl:max-w-[400px] lg:absolute lg:top-[8rem] md:right-5 xl:right-20">
      <div className="p-3 mb-5 h-full w-full relative flex flex-col text-gray-700 bg-white drop-shadow-lg shadow-lg lg:max-w-[400px] rounded-md bg-clip-border">
        <div className="p-1 flex justify-between items-center">
          <h1 className="text-sm xl:text-[20px] font-bold">Materi Belajar</h1>
          <div className="flex gap-1">
            <img src="/icon/progress-check.svg" alt="progress check" />
            <div className="w-[150px] h-[16px] bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="bg-darkblue h-[16px] text-xs font-medium text-blue-200 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${progressPercentage}%` }}
              >
                {`${progressPercentage}%`}
              </div>
            </div>
          </div>
        </div>

        {courseMaterial.length > 0 && transaction?.status === "Sudah Bayar" ? (
          courseMaterial.map((chapter) => (
            <div
              key={chapter.id}
              className="p-1 mt-2 w-full md:max-w-[350px] mx-auto"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-[12px] mx-1 text-darkblue font-extrabold">
                  Chapter {chapter.step} - {chapter.title}
                </h2>
                <p className="text-[11px] font-extrabold text-center text-[#489CFF]">
                  {chapter.totalDuration} Menit
                </p>
              </div>
              {chapter.material.map((materials) => {
                const completed = isMaterialCompleted(materials.id);

                return (
                  <div
                    key={materials.id}
                    onClick={() => {
                      handleVideoSelect(extractVideoId(materials.videoURL));
                      handleAddProgress(materials.id, id);
                    }}
                    className={`h-[52px] p-2 cursor-pointer ${
                      completed ? "completed-material" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center mt-2">
                        <h1 className="bg-[#EBF3FC] rounded-full w-[36px] h-[36px] flex justify-center items-center">
                          {materials.step}
                        </h1>
                        <h1
                          className={`text-[12px] max-w-[251px] ${
                            selectedVideo === extractVideoId(materials.videoURL)
                              ? "text-[#00CC00]"
                              : "text-black"
                          } ${completed ? " text-blue-600" : ""}`}
                        >
                          {materials.title}
                        </h1>
                      </div>
                      {completed ? (
                        <img
                          src={
                            selectedVideo === extractVideoId(materials.videoURL)
                              ? "/icon/Pause.svg"
                              : "/icon/done.svg"
                          }
                          alt="done icon"
                          className="w-4 h-4 text-blue-600 cursor-pointer"
                          onClick={() => {
                            handleVideoSelect(
                              extractVideoId(materials.videoURL)
                            );
                            handleAddProgress(materials.id);
                          }}
                        />
                      ) : (
                        <img
                          src={
                            selectedVideo === extractVideoId(materials.videoURL)
                              ? "/icon/Pause.svg"
                              : "/icon/Play.svg"
                          }
                          alt="play pause icon"
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => {
                            handleVideoSelect(
                              extractVideoId(materials.videoURL)
                            );
                            handleAddProgress(materials.id);
                          }}
                        />
                      )}
                    </div>
                    <div className="border-t mt-2 border-[#EBF3FC]"></div>
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <p className="p-1 mt-2 w-full md:max-w-[350px] mx-auto">
            Material Chapter is not ready yet
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoCardList;

VideoCardList.propTypes = {
  onVideoSelect: PropTypes.func,
};
