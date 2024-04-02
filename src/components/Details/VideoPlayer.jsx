import PropTypes from "prop-types";
import { useState } from "react";

const VideoPlayer = ({ videoSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-[700px] xl:max-w-none h-[30dvh] sm:h-[40dvh] lg:h-[60dvh] relative">
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={togglePlay}
        >
          {/* Customize the play button as needed */}
          <img src="/play-video.svg" alt="Play button" />
        </div>
      )}
      <iframe
        className="w-full h-full max-w-full border border-gray-200 bg-[#000000D9] bg-opacity-[85%] rounded-lg dark:border-gray-700"
        src={videoSrc}
        title="YouTube embed video"
        frameBorder="0"
        allowFullScreen
        onLoad={() => setIsPlaying(true)}
      />
    </div>
  );
};

export default VideoPlayer;

VideoPlayer.propTypes = {
  videoSrc: PropTypes.string,
};
