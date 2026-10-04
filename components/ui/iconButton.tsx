"use client";

type IconButtonSize = "sm" | "lg";

type IconButtonProps = {
  src: string;
  alt: string;
  onClick?: () => void;
  size?: IconButtonSize;
  className?: string;
};

const buttonClassName: Record<IconButtonSize, string> = {
  sm: "h-9 w-9 bg-transparent border-2 hover:scale-110 transition duration-300 ease-in-out text-white rounded-full",
  lg: "h-16 w-16 lg:h-20 lg:w-20 text-lg bg-transparent border-2 transition duration-300 ease-in-out text-white rounded-full",
};

const iconClassName: Record<IconButtonSize, string> = {
  sm: "h-6 w-6 mx-auto",
  lg: "h-12 w-12 mx-auto",
};

const IconButton = ({
  src,
  alt,
  onClick,
  size = "sm",
  className,
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        className ? `${buttonClassName[size]} ${className}` : buttonClassName[size]
      }
    >
      <img className={iconClassName[size]} src={src} alt={alt} />
    </button>
  );
};

export default IconButton;
