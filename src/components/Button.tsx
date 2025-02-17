type Props = {
  text: string;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean | undefined;
};
const Button = ({ text, className, onClick ,disabled}: Props) => {
  return (
    <button
      className={` cursor-pointer ${className} block`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
