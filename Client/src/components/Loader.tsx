const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <div className="w-28 h-28 border-4 border-solid border-gray-200 border-b-red-600  rounded-full inline-block animate-spin"></div>
    </div>
  );
};

export default Loader;

export const Skeleton = () => {
  return (
    <div className="flex h-screen w-screen bg-transparent">
      <div
        
        className="w-full bg-slate-200 mb-2 rounded animate-pulse"
      ></div>
    </div>
  );
};
