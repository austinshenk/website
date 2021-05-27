export interface GridProps {
    justifyItems?: "start" | "end" | "center" | "stretch";
    alignItems?: "start" | "end" | "center" | "stretch";
    justifyContent?: "start" | "end" | "center" | "stretch" | "space-around" | "space-between" | "space-evenly";
    alignContent?: "start" | "end" | "center" | "stretch" | "space-around" | "space-between" | "space-evenly";
    autoFlow?: "row" | "column";
    gap?: string;
}

export const grid = (props: GridProps) => ({
    "am-grid": "",
    "am-grid-justify-items": props?.justifyItems,
    "am-grid-align-items": props?.alignItems,
    "am-grid-justify-content": props?.justifyContent,
    "am-grid-align-content": props?.alignContent,
    "am-grid-auto-flow": props?.autoFlow,
    "style": {gap: props?.gap}
});