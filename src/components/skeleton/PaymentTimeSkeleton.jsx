const PaymentMethodSkeleton = () => {
    return (
        <div className="flex flex-col items-center justify-start mt-10 py-5 min-h-[80vh]">
            <div className="flex justify-center items-start flex-wrap flex-row gap-5">
                <div className="p-[7%] md:p-0 flex flex-col gap-3">
                    <div className="skeleton bg-zinc-500 animate-pulse w-[60dvw] h-14 rounded-[4px] shadow-md"></div>
                    <div className="skeleton bg-zinc-500 animate-pulse w-[60dvw] h-14 rounded-[4px] shadow-md"></div>
                </div>
                <div className="px-8 md:p-0">
                    <div className="card skeleton bg-zinc-500 animate-pulse w-auto md:w-[400px] h-[375px]  shadow-xl p-5 border ">
                        <div className="card-body flex justify-center flex-col p-0">
                            <h1 className="skeleton bg-slate-950 w-24 h-6 animate-pulse"></h1>

                            <div className="skeleton bg-slate-950 w-full h-6 animate-pulse shadow-md  flex flex-col flex-grow sm:flex-none items-stretch pb-2.5 rounded-2xl max-w-[400px]"></div>

                            <div className="flex justify-around items-center font-Poppins py-[10px]">
                                <div>
                                    <h1 className="skeleton bg-slate-950 w-24 h-4 mb-2 animate-pulse"></h1>
                                    <p className="skeleton bg-slate-950 w-20 h-4 animate-pulse"></p>
                                </div>
                                <div>
                                    <h1 className="skeleton bg-slate-950 w-24 h-4 mb-2 animate-pulse"></h1>
                                    <p className="skeleton bg-slate-950 w-20 h-4 animate-pulse"></p>
                                </div>
                                <div>
                                    <h1 className="skeleton bg-slate-950 w-24 h-4 mb-2 animate-pulse"></h1>
                                    <p className="skeleton bg-slate-950 w-20 h-4 animate-pulse"></p>
                                </div>
                            </div>

                            <div className="skeleton bg-slate-950 animate-pulse mt-3 h-[50px] w-full rounded-[25px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodSkeleton;
