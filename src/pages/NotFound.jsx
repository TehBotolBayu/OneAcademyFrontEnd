import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[90dvh] grid grid-cols-1 md:grid-cols-2 gap-3 bg-custom place-items-center">
      <div className="md:h-screen flex items-center justify-center">
        <img
          className="w-3/4 h-auto md:max-w-full md:max-h-full"
          src="/404new.svg"
          alt="not found"
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-3 md:w-3/4 mx-5 text-white">
          <h1 className="text-3xl md:text-5xl font-bold">
            Uh-oh!
            <br />
            <span className="font-normal">Page not found</span>
          </h1>
          <p className="text-md md:text-xl">
            The page has decided to play hide-and-seek. Return to the home page
            to end the game.
          </p>
          <Link
            to={"/"}
            className="btn btn-ghost md:w-64 text-lg bg-blue-500 text-white hover:bg-blue-400"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
