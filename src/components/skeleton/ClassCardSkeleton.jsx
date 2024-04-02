import PropTypes from "prop-types";

const ClassCardSkeleton = ({ length }) => {
  if (length <= 0) {
    return <div className="font-semibold">Courses Not Found</div>;
  }

  const loop = 4;

  const generateSkeletons = () =>
    Array.from({ length: loop }, (_, index) => (
      <div
        key={index}
        className="shadow-sm w-full lg:max-w-[343px] max-h-[185px] bg-white flex flex-col flex-grow sm:flex-none items-stretch pb-2.5 rounded-2xl"
      >
        <div className="aspect-[4.04] overflow-hidden skeleton h-[85px] w-full bg-zinc-500 animate-pulse" />
        <div className="flex w-full flex-col mt-1.5 px-2.5">
          <div className="items-stretch self-stretch flex w-full justify-between gap-5">
            <div className="skeleton h-4 w-24 bg-zinc-500 animate-pulse"></div>
            <div className="justify-between items-stretch flex gap-0 pl-20 max-md:pl-5">
              <div className="skeleton h-4 w-14 bg-zinc-500 animate-pulse"></div>
            </div>
          </div>
          <div className="self-stretch text-black text-xs font-bold leading-4">
            <h1 className="skeleton h-4 w-48 bg-zinc-500 animate-pulse mt-1">
              <br />
            </h1>
            <h1 className=" skeleton h-3 w-20 bg-zinc-500 animate-pulse mt-1"></h1>
          </div>
          <div className="items-stretch self-stretch flex justify-between gap-0">
            <div className="flex gap-1 items-center">
              <div className="skeleton h-4 w-16  bg-zinc-500 animate-pulse mt-1"></div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="skeleton h-4 w-16  bg-zinc-500 animate-pulse mt-1"></div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="skeleton h-4 w-16   bg-zinc-500 animate-pulse mt-1"></div>
            </div>
          </div>
          <div className="skeleton h-6 w-32 bg-zinc-500 animate-pulse mt-1"></div>
        </div>
      </div>
    ));

  return generateSkeletons();
};

export default ClassCardSkeleton;

ClassCardSkeleton.propTypes = {
  length: PropTypes.number,
};
