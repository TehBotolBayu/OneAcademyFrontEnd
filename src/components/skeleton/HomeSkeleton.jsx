// this skeleton is for CardCourse in Homepage

const HomeSkeleton = () => {
    const loop = 7;
    const card = 3

    const generateSkeletons = () =>
        Array.from({ length: loop }, (_, index) => (
            <div key={index}>
                <div className="skeleton h-6 w-24 bg-zinc-500 animate-pulse"></div>
            </div>
        ));

    const generateCard = () =>{
        return Array.from({ length: card }, (_, i) => (
            <div key={i} className="shadow-md bg-white flex flex-col flex-grow sm:flex-none items-stretch pb-2.5 rounded-2xl max-w-[323px] max-h-[200px]">
                <div className="aspect-[4.04] overflow-hidden skeleton h-24  bg-zinc-500 animate-pulse" />
                <div className="flex w-full flex-col mt-1.5 px-2.5">
                    <div className="items-stretch self-stretch flex w-full justify-between gap-5">
                        <div className="skeleton h-4 w-36 bg-zinc-500 animate-pulse mb-1"></div>
                        <div className="justify-between items-stretch flex gap-0 pl-20 max-md:pl-5">
                            <div className="skeleton h-4 w-16 bg-zinc-500 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="self-stretch  text-black text-xs font-bold leading-4">
                        <h1 className="skeleton h-2 w-24 bg-zinc-500 animate-pulse mb-1">
                            <br />
                        </h1>
                        <h1 className="skeleton h-4 w-16 bg-zinc-500 animate-pulse mb-1"></h1>
                    </div>
                    <div className="items-stretch self-stretch flex justify-between gap-0 mb-1">
                        <div className="flex gap-1 items-center">
                            <div className="skeleton h-3 w-24 bg-zinc-500 animate-pulse"></div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="skeleton h-3 w-24 bg-zinc-500 animate-pulse"></div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="skeleton h-3 w-24 bg-zinc-500 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="skeleton h-6 w-20 bg-zinc-500 animate-pulse"></div>
                </div>
            </div>
        ));
    }

    return (
        <div>
            <div className="flex justify-center">
                <div className="flex flex-col justify-center items-center max-w-[1060px] container gap-5 pt-[26px] pb-[53px] ">
                    <div className="flex flex-row container justify-between px-6">
                        <h2 className="skeleton h-4 w-24 bg-zinc-500 animate-pulse"></h2>
                        <h1 className="skeleton h-4 w-24 bg-zinc-500 animate-pulse"></h1>
                    </div>

                    <div className="hidden container sm:flex gap-3 justify-start  items-center max-md:flex-wrap max-md:justify-center md:px-0">
                        {generateSkeletons()}
                    </div>

                    <div className="flex gap-6 justify-center md:justify-around items-center flex-wrap px-5">
                        {generateCard()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSkeleton;
