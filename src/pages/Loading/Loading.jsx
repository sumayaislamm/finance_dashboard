import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6 gap-6">
      <div className="flex w-100 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-28"></div>
            <p className="text-lg text-primary  font-semibold animate-pulse">
              Loading, please wait...
            </p>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>

        <div className="skeleton h-40 w-full text-center justify-center flex items-center gap-2 
        ">  <span className="loading loading-spinner loading-xl text-green-500 "></span></div>
      </div>
    </div>
  );
};

export default Loading;