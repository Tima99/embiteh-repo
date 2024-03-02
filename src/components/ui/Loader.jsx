import { PiSpinnerBold } from "react-icons/pi";

const Loader = () => {
  return (
    <div className={"rounded-lg shadow-xl bg-white py-4 flex items-center justify-center"}>
        <span className="animate-spin w-6 h-6 rounded-full">
            <PiSpinnerBold size={26} />
        </span>
    </div>
  )
}

export default Loader