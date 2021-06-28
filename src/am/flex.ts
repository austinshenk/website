export type FlexProps = Partial<{
    inline: boolean;
    direction: "row" | "row-reverse" | "column" | "column-reverse";
    wrap: "yes" | "no" | "reverse";
    justifyContent: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
    alignItems: "start" | "end" | "center" | "stretch" | "baseline";
    alignContent: "start" | "end" | "center" | "stretch" | "space-around" | "space-between";
    gap: string;
}>;

export const flex = (props: FlexProps) => ({
    "am-flexbox": props.direction ?? "",
    "am-flexbox-inline": props.inline ? "" : undefined,
    "am-flexbox-wrap": props.wrap,
    "am-flexbox-justify-content": props.justifyContent,
    "am-flexbox-align-items": props.alignItems,
    "am-flexbox-align-content": props.alignContent,
    "style": {gap: props.gap}
});

export type FlexItemProps = Partial<{
    alignSelf: "auto" | "start" | "center" | "end" | "baseline" | "stretch";
    grow: number;
    shrink: number;
    basis: string;
}>;

export const flexItem = (props: FlexItemProps) => ({
    "am-flexitem": props.alignSelf ?? "",
    "am-flexitem-grow": props.grow,
    "am-flexitem-shrink": props.shrink,
    "style": {flexBasis: props.basis}
});