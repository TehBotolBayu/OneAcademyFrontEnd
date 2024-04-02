const DetailsClassSkeleton = () => {
  return (
      <div className="container-fluid p-2 bg-[#EBF3FC]">
          <div className="top-[20px] mx-3 mt-2 md:ml-10 xl:ml-10">
              <h1 className="hover:text-darkblue max-w-fit text-[16px] font-bold flex gap-2 items-center mb-5">
                  <p className="skeleton h-4 w-24 bg-zinc-500 animate-pulse"></p>
              </h1>

              <div className="flex flex-col gap-1 ml-9 container-fluid md:w-[65vw] lg:relative">
                  <div className="flex justify-between container-fluid md:w-[65vw]">
                      <h1 className="skeleton h-4 w-24 bg-zinc-500 animate-pulse"></h1>
                      <div className="flex gap-1 mr-16 items-center">
                          <p className="skeleton h-4 w-5 bg-zinc-500 animate-pulse"></p>
                      </div>
                  </div>
                  <h1 className="skeleton h-4 w-52 md:w-80 bg-zinc-500 animate-pulse"></h1>
                  <p className="skeleton h-4 w-14 bg-zinc-500 animate-pulse"></p>
                  <div className="flex gap-4">
                      <div className="flex gap-1">
                          <h1 className="skeleton h-4 w-14 md:w-24 bg-zinc-500 animate-pulse"></h1>
                      </div>
                      <div className="flex gap-1">
                          <h1 className="skeleton h-4 w-14 md:w-24 bg-zinc-500 animate-pulse"></h1>
                      </div>
                      <div className="flex gap-1">
                          <h1 className="skeleton h-4 w-14 md:w-24 bg-zinc-500 animate-pulse"></h1>
                      </div>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                      <h1 className="skeleton h-10 w-60 bg-zinc-500 animate-pulse"></h1>
                      <h1 className="skeleton h-10 w-60 bg-zinc-500 animate-pulse"></h1>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default DetailsClassSkeleton;