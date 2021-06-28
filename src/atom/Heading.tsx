import React from "react";
import Am from "am";

type HeadingContext = {
    level: number;
}

const HeadingContext = React.createContext<HeadingContext>({
    level: 0
});

type Props = Omit<Am.Heading.Props, "children"> & {
    level?: number;
    children: React.ReactChild[];
};

type HeadingRef = HTMLHeadingElement & {
    align: string;
};

type SpanRef = HTMLSpanElement & {
    align: string;
};

const getLevel = (props: Props, context: HeadingContext) => {
    return props.level ?? context.level;
};

const header = (levelForHeader: number, props: Props, ref: React.ForwardedRef<HeadingRef | SpanRef>, headingChildren: React.ReactFragment) => {
    const {level, children, ...headingProps} = props;

    if (!levelForHeader)
        return <></>;

    switch (levelForHeader) {
        case 1:
            return <Am.Heading.H1 {...headingProps} ref={ref}>{headingChildren}</Am.Heading.H1>;
        case 2:
            return <Am.Heading.H2 {...headingProps} ref={ref}>{headingChildren}</Am.Heading.H2>;
        case 3:
            return <Am.Heading.H3 {...headingProps} ref={ref}>{headingChildren}</Am.Heading.H3>;
        case 4:
            return <Am.Heading.H4 {...headingProps} ref={ref}>{headingChildren}</Am.Heading.H4>;
        case 5:
            return <Am.Heading.H5 {...headingProps} ref={ref}>{headingChildren}</Am.Heading.H5>;
        case 6:
            return <Am.Heading.H6 {...headingProps} ref={ref}>{headingChildren}</Am.Heading.H6>;
        default:
            return <Am.Heading.Imposter {...props} ref={ref}>{headingChildren}</Am.Heading.Imposter>;
    }
}

const Provider = (props: React.PropsWithChildren<any>) => {
    return <HeadingContext.Provider value={{level: 1}}>
        {props.children}
    </HeadingContext.Provider>;
};

const Component = (props: Props, ref: React.ForwardedRef<HeadingRef | SpanRef>) => {
    const context = React.useContext(HeadingContext);
    const levelForHeader = getLevel(props, context);
    const [headingChildren, contentChildren] = props.children;

    return <HeadingContext.Provider value={{level: context.level + 1}}>
        {header(levelForHeader, props, ref, headingChildren)}
        {contentChildren}
    </HeadingContext.Provider>;
};

export default {
    Component: React.forwardRef<HeadingRef | SpanRef, Props>(Component),
    Provider
}