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

type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  width?: WidthVariant;
  height?: HeightVariant;
  position?: PositionVariant;
  overflow?: OverflowVariant;
  display?: DisplayVariant;
  centered?: boolean;
};

const Section = forwardRef<HTMLElement, SectionProps>(
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
      <section
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
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
