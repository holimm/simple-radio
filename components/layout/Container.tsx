import { forwardRef } from "react";
import clsx from "clsx";
import {
  displayVariants,
  heightVariants,
  overflowVariants,
  positionVariants,
  widthVariants,
  type DisplayVariant,
  type HeightVariant,
  type OverflowVariant,
  type PositionVariant,
  type WidthVariant,
} from "@/components/layout/Variants";

type ContainerProps = React.ComponentPropsWithoutRef<"div"> & {
  width?: WidthVariant;
  height?: HeightVariant;
  position?: PositionVariant;
  overflow?: OverflowVariant;
  display?: DisplayVariant;
  centered?: boolean;
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      children,
      width,
      height,
      position,
      overflow,
      display,
      centered = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          width && widthVariants[width],
          height && heightVariants[height],
          position && positionVariants[position],
          overflow && overflowVariants[overflow],
          display && displayVariants[display],
          centered && "mx-auto",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
