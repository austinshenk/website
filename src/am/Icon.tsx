import React from "react";
import {useTheme, Theme} from "./Theme";
import css from "styled-jsx/css";

function styles(theme: Theme) {return css.global`
[am-icon] {
    height: 1em;
    width: 1em;
    vertical-align: middle;
}
    
[am-icon] > path {
    transition: d .3s ease-in-out, stroke .3s ease-in-out, fill .3s ease-in-out;
    stroke: none;
    stroke-width: ${theme.spacing()};
    stroke-linecap: square;
    fill: none;
}
    
[am-icon][am-icon-style=outline] > path {
    stroke: var(--pixel);
    fill: none;
}

[am-icon][am-icon-style=fill] > path {
    fill: var(--pixel);
    stroke: none;
}

[am-icon][am-icon-style=outline-fill] > path {
    fill: var(--background-main);
    stroke: var(--pixel);
}
`;}

type Config = Partial<{
    icon: string,
    variation: string
}>;

const amicon = ({icon, variation, ...props}: Config) => ({
    "am-icon": icon ?? "",
    "am-icon-style": variation,
    ...props
});

type HtmlSVGProps = React.SVGProps<SVGSVGElement>;

export type Props = React.PropsWithChildren<HtmlSVGProps> & Config;

export const Component = React.forwardRef<SVGSVGElement, Props>(function (props: Props, ref: React.ForwardedRef<SVGSVGElement>) {
    const theme = useTheme();
    const style = styles(theme);

    return <>
        <style jsx global>{style}</style>
        <svg {...amicon(props)} width={theme.spacing(4)} height={theme.spacing(4)} viewBox="0 0 16 16" ref={ref}>
            <path />
        </svg>
    </>;
});

const downArrowStyle = css.global`
    [am-icon=downArrow] > path {
        d: path("M 3 6 l 5 5 l 5 -5");
    }
`;
export const DownArrow = React.forwardRef<SVGSVGElement, Omit<Props, "icon">>((props: Props, ref: React.ForwardedRef<SVGSVGElement>) => {
    return <>
        <style jsx global>{downArrowStyle}</style>
        <Component icon="downArrow" {...props} ref={ref} />
    </>;
});
const checkStyle = css.global`
    [am-icon=check] > path {
        d: path("M 3 9 l 3 3 m 0 0 l 7 -7");
    }
`;
export const Check = React.forwardRef<SVGSVGElement, Omit<Props, "icon">>((props: Props, ref: React.ForwardedRef<SVGSVGElement>) => {
    return <>
        <style jsx global>{checkStyle}</style>
        <Component icon="check" {...props} ref={ref} />
    </>;
});
const crossStyle = css.global`
    [am-icon=cross] > path {
        d: path("M 3 3 L 13 13 M 3 13 L 13 3");
    }
`;
export const Cross = React.forwardRef<SVGSVGElement, Omit<Props, "icon">>((props: Props, ref: React.ForwardedRef<SVGSVGElement>) => {
    return <>
        <style jsx global>{crossStyle}</style>
        <Component icon="cross" {...props} ref={ref} />
    </>;
});
const smallRadioStyle = css.global`
    [am-icon=smallRadio] > path {
        d: path("M 4 4 h 8 v 8 h -8 z");
    }
`;
export const SmallRadio = React.forwardRef<SVGSVGElement, Omit<Props, "icon">>((props: Props, ref: React.ForwardedRef<SVGSVGElement>) => {
    return <>
        <style jsx global>{smallRadioStyle}</style>
        <Component icon="smallRadio" {...props} ref={ref} />
    </>;
});
const bigRadioStyle = css.global`
    [am-icon=bigRadio] > path {
        d: path("M 0 0 h 16 v 16 h -16 z");
    }
`;
export const BigRadio = React.forwardRef<SVGSVGElement, Omit<Props, "icon">>((props: Props, ref: React.ForwardedRef<SVGSVGElement>) => {
    return <>
        <style jsx global>{bigRadioStyle}</style>
        <Component icon="bigRadio" {...props} ref={ref} />
    </>;
});