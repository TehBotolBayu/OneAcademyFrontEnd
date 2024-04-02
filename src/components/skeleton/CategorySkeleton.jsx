// this card is skeleton for category in homepage
const CategorySkeleton = () => {
  const loop = 6;

  const generateSkeletons = () =>
    Array.from({ length: loop }, (_, index) => (
      <div
        key={index}
        className="justify-center items-center flex grow basis-[0%] flex-col pl-1.5 pr-2.5"
      >
        <h1 className="aspect-[1.6] w-[140px] skeleton h-24 bg-zinc-500 animate-pulse" />
        <div className="skeleton h-4 w-24 mt-2 bg-zinc-500 animate-pulse"></div>
      </div>
    ));

  return (
    <div className="flex justify-center bg-[#EBF3FC]">
      <div className="flex w-full justify-center items-center max-w-[1060px] flex-col pt-[26px] pb-[14px] gap-5 container">
        <div className="flex justify-between container px-6">
          <h2 className="skeleton h-4 w-36 bg-zinc-500 animate-pulse"></h2>
          <h1 className="skeleton h-4 w-24 bg-zinc-500 animate-pulse"></h1>
        </div>
        <div className="flex flex-col max-w-[1200px] px-6">
          <div className="flex justify-start flex-wrap grow gap-2.5">
            {generateSkeletons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
