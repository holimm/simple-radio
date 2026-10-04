import { forwardRef } from "react";
import clsx from "clsx";
import {
  alignItemsVariants,
  gapVariants,
  gridColsVariants,
  gridFlowVariants,
  gridRowsVariants,
  heightVariants,
  justifyContentVariants,
  justifyItemsVariants,
  overflowVariants,
  placeItemsVariants,
  positionVariants,
  widthVariants,
  type AlignItemsVariant,
  type GapVariant,
  type GridColsVariant,
  type GridFlowVariant,
  type GridRowsVariant,
  type HeightVariant,
  type JustifyContentVariant,
  type JustifyItemsVariant,
  type OverflowVariant,
  type PlaceItemsVariant,
  type PositionVariant,
  type WidthVariant,
} from "@/components/layout/Variants";

type GridProps = React.ComponentPropsWithoutRef<"div"> & {
  cols?: GridColsVariant;
  rows?: GridRowsVariant;
  flow?: GridFlowVariant;
  gap?: GapVariant;
  align?: AlignItemsVariant;
  justify?: JustifyContentVariant;
  justifyItems?: JustifyItemsVariant;
  placeItems?: PlaceItemsVariant;
  width?: WidthVariant;
  height?: HeightVariant;
  position?: PositionVariant;
  overflow?: OverflowVariant;
  centered?: boolean;
};

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      children,
      cols,
      rows,
      flow,
      gap,
      align,
      justify,
      justifyItems,
      placeItems,
      width,
      height,
      position,
      overflow,
      centered = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "grid",
          cols && gridColsVariants[cols],
          rows && gridRowsVariants[rows],
          flow && gridFlowVariants[flow],
          gap !== undefined && gapVariants[gap],
          align && alignItemsVariants[align],
          justify && justifyContentVariants[justify],
          justifyItems && justifyItemsVariants[justifyItems],
          placeItems && placeItemsVariants[placeItems],
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

Grid.displayName = "Grid";

export default Grid;
