import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

const SureCheck = ({confirm, cancel}) => {
  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-2xl tracking-wide">Are you sure?</p>
      <div className="flex justify-between w-[6rem] mt-2">
        <button onClick={confirm} className="text-pastel-green bg-white rounded-full p-[0.3rem] transition-all hover:scale-[1.2] active:scale-[0.9] border border-pastel-green border-2">
          <FaRegThumbsUp size={24} className="mt-[-2px]"/>
        </button>
        <button onClick={cancel} className="text-red-400 bg-white rounded-full p-[0.3rem] transition-all hover:scale-[1.2] active:scale-[0.9] border border-red-400 border-2">
          <FaRegThumbsDown size={24} className="mb-[-2px]"/>
        </button>
      </div>
    </div>
  );
};

export default SureCheck;
