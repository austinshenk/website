import React from "react";
import {css} from "styled-jsx/css";
import {useTheme, Theme} from "./Theme";
import * as Icon from "./Icon";

function styles(theme: Theme) {return css.global`
[am-radio] {
    position: relative;
}

[am-radio] > input[type=radio] {
    position: absolute;
    top: -${theme.spacing()};
    left: -${theme.spacing()};
    width: calc(100% + ${theme.spacing(2)});
    height: calc(100% + ${theme.spacing(2)});
}

[am-radio] > [am-icon] {
    margin-left: ${theme.spacing()};
    margin-right: ${theme.spacing()};
}

[am-radio] > [am-icon] > path {
    stroke-width: 0;
}

[am-radio] > span {
    padding: 0 ${theme.spacing()};
    font-family: system-san-serif;
}
`}

type HtmlInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type RadioChildProps = Omit<HtmlInputProps, "label"|"value"|"ref"|"key"|"children"> & {
    label: string,
    value: string,
    ref?: React.ForwardedRef<HTMLInputElement>
};

const RadioChild = React.forwardRef((props: RadioChildProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {label, ...radioProps} = props;

    return <label am-radio="" am-interactive="">
        <input type="radio" {...radioProps} ref={ref}/>
        {radioProps.checked ? <Icon.BigRadio variation="fill"/> : <Icon.SmallRadio variation="fill"/>}
        <span>{label}</span>
    </label>;
});

type RadioProps = {
    children: Omit<RadioChildProps, "name"|"onChange"|"checked">[],
    name: string,
    onChange: (value: string) => void,
    initialValue?: string
}

function Radio({name, children, onChange, initialValue}: RadioProps) {
    const theme = useTheme();
    const [checkedValue, setCheckedValue] = React.useState<string>(determineInitialValue(children, initialValue));
    const style = styles(theme);

    return <>
        <style jsx global>{style}</style>
        {children.map((props, index) => {
            return <RadioChild
                key={`${props.label}-${index}-${props.value}`}
                name={name}
                checked={props.value === checkedValue}
                onChange={handleChangeEvent(setCheckedValue, onChange)}
                {...props}
                ref={props.ref}/>
        })}
    </>
}

const determineInitialValue = (radios: RadioChildProps[], initialValue?: string): string => {
    if (initialValue)
        return initialValue;
    else if (radios.length > 0)
        return String(radios[0].value);
    else
        return "";
}

const handleChangeEvent = (setCheckedValue: (value: string) => void, onChange: (value: string) => void) => (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setCheckedValue(value);
    onChange(value);
};

export const Component = Radio;