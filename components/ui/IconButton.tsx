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
  sm: "player-icon-button",
  lg: "player-icon-button player-icon-button-lg",
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
      type="button"
      onClick={onClick}
      aria-label={alt}
      className={className ? `${buttonClassName[size]} ${className}` : buttonClassName[size]}
    >
      <img src={src} alt="" />
    </button>
  );
};

export default IconButton;
