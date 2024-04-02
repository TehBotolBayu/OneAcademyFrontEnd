import { FaUsers } from "react-icons/fa";
import { MdWorkspacePremium, MdClass } from "react-icons/md";
const QuickInformation = () => {
  return (
    <div>
      <div className="container-fluid w-full flex justify-around flex-grow flex-wrap max-h-52 md:max-h-28 gap-2 md:gap-5 md:my-5">
        <div className="flex-grow max-h-16 md:max-h-28 rounded-xl p-6 flex justify-center items-center gap-5 bg-[#489CFF]">
          <FaUsers
            size={50}
            color="#6148FF"
            className="bg-white rounded-2xl p-2"
          />
          <div className="flex flex-col text-white">
            <h1>450</h1>
            <h1 className="font-bold">Active Users</h1>
          </div>
        </div>
        <div className="flex-grow max-h-16 md:max-h-28 rounded-xl p-6 flex justify-center items-center gap-5 bg-[#73CA5C]">
          <MdClass
            size={50}
            color="#6148FF"
            className="bg-white rounded-2xl p-2"
          />
          <div className="flex flex-col text-white">
            <h1>25</h1>
            <h1 className="font-bold">Active Class</h1>
          </div>
        </div>
        <div className="flex-grow max-h-16 md:max-h-28 rounded-xl p-6 flex justify-center items-center gap-5 bg-darkblue">
          <MdWorkspacePremium
            size={50}
            color="#6148FF"
            className="bg-white rounded-2xl p-2"
          />
          <div className="flex flex-col text-white">
            <h1>20</h1>
            <h1 className="font-bold">Premium Class</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickInformation;
