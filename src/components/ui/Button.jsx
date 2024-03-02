import { GrFormAdd } from "react-icons/gr";

const Button = (props) => {
  const { onClick, children, icon, fullWidth, disabled, type, className } = props;

  return (
    <button
      className={`rounded-[30px] whitespace-nowrap bg-[#FFC327] disabled:bg-[#fac83e] disabled:text-gray-800 disabled:cursor-not-allowed flex px-6 py-2 gap-1 justify-center items-center text-[#151617] ${className? className: ""} ${fullWidth ? "w-full" : ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {typeof icon === "function" ? icon(22) : null} 
      <span className="text-lg font-bold">{children}</span>
    </button>
  );
};

const Add = ({ children , type,onClick, fullWidth}) => {
  return <Button icon={(size) => <GrFormAdd size={size} />} fullWidth={fullWidth} type={type} onClick={onClick}>{children}</Button>;
};

Button.Add = Add;

export default Button;
