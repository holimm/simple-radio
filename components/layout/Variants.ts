export const widthVariants = {
  full: "w-full",
  screen: "w-screen",
  fit: "w-fit",
  auto: "w-auto",
  "1/2": "w-1/2",
  "1/3": "w-1/3",
  "2/3": "w-2/3",
  "1/4": "w-1/4",
  "3/4": "w-3/4",
  "3/12": "w-3/12",
  "4/12": "w-4/12",
  "5/12": "w-5/12",
  "6/12": "w-6/12",
  "7/12": "w-7/12",
} as const;

export const heightVariants = {
  full: "h-full",
  screen: "h-screen",
  fit: "h-fit",
  auto: "h-auto",
} as const;

export const positionVariants = {
  static: "static",
  relative: "relative",
  absolute: "absolute",
  fixed: "fixed",
  sticky: "sticky",
} as const;

export const overflowVariants = {
  auto: "overflow-auto",
  hidden: "overflow-hidden",
  clip: "overflow-clip",
  visible: "overflow-visible",
  scroll: "overflow-scroll",
  "x-hidden": "overflow-x-hidden",
  "y-hidden": "overflow-y-hidden",
} as const;

export const displayVariants = {
  block: "block",
  "inline-block": "inline-block",
  inline: "inline",
  hidden: "hidden",
  contents: "contents",
} as const;

export const flexDirectionVariants = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
} as const;

export const alignItemsVariants = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const;

export const justifyContentVariants = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
} as const;

export const flexWrapVariants = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse",
} as const;

export const gapVariants = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
} as const;

export const gridColsVariants = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
  none: "grid-cols-none",
} as const;

export const gridRowsVariants = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6",
  none: "grid-rows-none",
} as const;

export const gridFlowVariants = {
  row: "grid-flow-row",
  col: "grid-flow-col",
  dense: "grid-flow-dense",
  "row-dense": "grid-flow-row-dense",
  "col-dense": "grid-flow-col-dense",
} as const;

export const placeItemsVariants = {
  start: "place-items-start",
  center: "place-items-center",
  end: "place-items-end",
  stretch: "place-items-stretch",
} as const;

export const justifyItemsVariants = {
  start: "justify-items-start",
  center: "justify-items-center",
  end: "justify-items-end",
  stretch: "justify-items-stretch",
} as const;

export type WidthVariant = keyof typeof widthVariants;
export type HeightVariant = keyof typeof heightVariants;
export type PositionVariant = keyof typeof positionVariants;
export type OverflowVariant = keyof typeof overflowVariants;
export type DisplayVariant = keyof typeof displayVariants;
export type FlexDirectionVariant = keyof typeof flexDirectionVariants;
export type AlignItemsVariant = keyof typeof alignItemsVariants;
export type JustifyContentVariant = keyof typeof justifyContentVariants;
export type FlexWrapVariant = keyof typeof flexWrapVariants;
export type GapVariant = keyof typeof gapVariants;
export type GridColsVariant = keyof typeof gridColsVariants;
export type GridRowsVariant = keyof typeof gridRowsVariants;
export type GridFlowVariant = keyof typeof gridFlowVariants;
export type PlaceItemsVariant = keyof typeof placeItemsVariants;
export type JustifyItemsVariant = keyof typeof justifyItemsVariants;
