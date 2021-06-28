import React, {FormEvent, FormEventHandler, useState} from "react";
import {css} from "styled-jsx/css";
import {useTheme, Theme} from "./Theme";
import Am from "./index";

function styles(theme: Theme) {return css.global`
[am-select] {
    position: relative;
}

[am-select] > [am-icon] {
    position: absolute;
    height: 100%;
    top: 0;
    left: ${theme.spacing(3)};
    pointer-events: none;
}

[am-select] > select {
    appearance: none;
    background: none;
    border: none;
    border-radius: 0;
    color: inherit;
    font: 400 1rem system-san-serif;
    white-space: normal;
    width: 100%;
    line-height: calc(${theme.spacing(2)} + 2ex);
    vertical-align: middle;
    
    padding: 0 ${theme.spacing()} 0 ${theme.spacing(9)};
}
`}

type HtmlSelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

type Option = {
    label: string;
    value: string;
};

type Props = HtmlSelectProps & {
    children: Option[];
};

const determineInitialValue = (options: Option[], initialValue?: string | ReadonlyArray<string> | number) => {
    if (initialValue)
        return initialValue;
    else if (options.length > 0)
        return options[0].value;
    else
        return "";
}

const handleChangeEvent = (setValue: (value: string) => void, onChange?: FormEventHandler<HTMLSelectElement>) => (event: FormEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;

    setValue(value);
    onChange?.(event);
}

function Select({children, onInput, value, ...props}: Props) {
    const theme = useTheme();
    const style = styles(theme);
    const [selectedValue, setSelectedValue] = useState<string | ReadonlyArray<string> | number>(determineInitialValue(children, value));

    return <>
        <style jsx global>{style}</style>
        <section am-select="" am-interactive="" {...props}>
            <Am.Icon.DownArrow variation="outline" />
            <select value={selectedValue} onInput={handleChangeEvent(setSelectedValue, onInput)}>
                {children.map(({label, value}) => <option key={value} value={value}>{label}</option>)}
            </select>
        </section>
    </>;
}

export const Component = Select;