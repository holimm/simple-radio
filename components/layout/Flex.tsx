import { forwardRef } from "react";
import clsx from "clsx";
import {
  alignItemsVariants,
  flexDirectionVariants,
  flexWrapVariants,
  gapVariants,
  heightVariants,
  justifyContentVariants,
  overflowVariants,
  positionVariants,
  widthVariants,
  type AlignItemsVariant,
  type FlexDirectionVariant,
  type FlexWrapVariant,
  type GapVariant,
  type HeightVariant,
  type JustifyContentVariant,
  type OverflowVariant,
  type PositionVariant,
  type WidthVariant,
} from "@/components/layout/Variants";

type FlexProps = React.ComponentPropsWithoutRef<"div"> & {
  direction?: FlexDirectionVariant;
  align?: AlignItemsVariant;
  justify?: JustifyContentVariant;
  wrap?: FlexWrapVariant;
  gap?: GapVariant;
  width?: WidthVariant;
  height?: HeightVariant;
  position?: PositionVariant;
  overflow?: OverflowVariant;
  inline?: boolean;
  centered?: boolean;
};

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      children,
      direction,
      align,
      justify,
      wrap,
      gap,
      width,
      height,
      position,
      overflow,
      inline = false,
      centered = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          inline ? "inline-flex" : "flex",
          direction && flexDirectionVariants[direction],
          align && alignItemsVariants[align],
          justify && justifyContentVariants[justify],
          wrap && flexWrapVariants[wrap],
          gap !== undefined && gapVariants[gap],
          width && widthVariants[width],
          height && heightVariants[height],
          position && positionVariants[position],
          overflow && overflowVariants[overflow],
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

Flex.displayName = "Flex";

export default Flex;
