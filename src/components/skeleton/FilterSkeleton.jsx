const FilterSkeleton = () => {
    return (
        <div>
            <div className="card w-full min-w-[280px] bg-base-100 text-center mt-3">
                <div className="card-body">
                    <h2 className="card-title skeleton bg-zinc-500 w-full h-5 animate-pulse"></h2>
                    <div className="text-left text-[#202244CC] font-medium">
                        <div className="form-control items-start">
                            <label className="label">
                                <span className="bg-zinc-500 w-5 h-5 animate-pulse rounded-md" />
                                <span className="label-text ml-3 skeleton bg-zinc-500 w-20 h-5 animate-pulse"></span>
                            </label>
                        </div>
                        <div className="form-control items-start">
                            <label className="label">
                                <span className="bg-zinc-500 w-5 h-5 animate-pulse rounded-md" />
                                <span className="label-text ml-3 skeleton bg-zinc-500 w-24 h-5 animate-pulse"></span>
                            </label>
                        </div>
                        <div className="form-control items-start">
                            <label className="label">
                                <span className="bg-zinc-500 w-5 h-5 animate-pulse rounded-md" />
                                <span className="label-text ml-3 skeleton bg-zinc-500 w-16 h-5 animate-pulse"></span>
                            </label>
                        </div>
                    </div>

                    {/* kategori */}
                    <h2 className="card-title skeleton bg-zinc-500 w-full h-5 animate-pulse"></h2>
                    <div className="text-left text-[#202244CC] font-medium">
                        <div className="form-control items-start">
                            <label className="label">
                                <span className="bg-zinc-500 w-5 h-5 animate-pulse rounded-md" />
                                <span className="label-text ml-3 skeleton bg-zinc-500 w-20 h-5 animate-pulse"></span>
                            </label>
                        </div>
                        <div className="form-control items-start">
                            <label className="label">
                                <span className="bg-zinc-500 w-5 h-5 animate-pulse rounded-md" />
                                <span className="label-text ml-3 skeleton bg-zinc-500 w-24 h-5 animate-pulse"></span>
                            </label>
                        </div>
                        <div className="form-control items-start">
                            <label className="label">
                                <span className="bg-zinc-500 w-5 h-5 animate-pulse rounded-md" />
                                <span className="label-text ml-3 skeleton bg-zinc-500 w-16 h-5 animate-pulse"></span>
                            </label>
                        </div>
                    </div>

                    {/* Level Kesulitan */}
                    <h2 className="card-title skeleton bg-zinc-500 w-full h-5 animate-pulse"></h2>
                    <div className="text-left text-[#202244CC] font-medium">
                        <div className="form-control items-start">
                            <label className="label">
                                <span className="bg-zinc-500 w-5 h-5 animate-pulse rounded-md" />
                                <span className="label-text ml-3 skeleton bg-zinc-500 w-20 h-5 animate-pulse"></span>
                            </label>
                        </div>
                        <div className="form-control items-start">
                            <label className="label">
                                <span className="bg-zinc-500 w-5 h-5 animate-pulse rounded-md" />
                                <span className="label-text ml-3 skeleton bg-zinc-500 w-24 h-5 animate-pulse"></span>
                            </label>
                        </div>
                        <div className="form-control items-start">
                            <label className="label">
                                <span className="bg-zinc-500 w-5 h-5 animate-pulse rounded-md" />
                                <span className="label-text ml-3 skeleton bg-zinc-500 w-16 h-5 animate-pulse"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="card-actions w-full px-5">
                    <div className="mb-4  skeleton bg-zinc-500 w-full h-10 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default FilterSkeleton;
