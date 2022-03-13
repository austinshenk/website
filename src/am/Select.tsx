import React, {FormEvent, FormEventHandler, useState} from "react";
import {useTheme, Theme} from "./Theme";
import * as Icon from "./Icon";
import * as Container from "./Container";

const styles = (theme: Theme) => <style jsx global>{`
[am-select] {
    position: relative;
    padding: 0 !important;
}

[am-select] > [am-icon] {
    position: absolute;
    height: 100%;
    top: 0;
    left: ${theme.spacing()};
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
    
    padding: ${theme.spacing()};
    padding-left: calc(1em + ${theme.spacing(2)});
}
`}</style>;

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

function Select({children, onInput, value, ref, ...props}: Props) {
    const theme = useTheme();
    const [selectedValue, setSelectedValue] = useState<string | ReadonlyArray<string> | number>(determineInitialValue(children, value));

    return <>
        {styles(theme)}
        <Container.Component as="section" variation="control" containerBodyProps={{"am-select":""}} {...props}>
            <Icon.DownArrow variation="outline" />
            <select value={selectedValue} onInput={handleChangeEvent(setSelectedValue, onInput)}>
                {children.map(({label, value}) => <option key={value} value={value}>{label}</option>)}
            </select>
        </Container.Component>
    </>;
}

export const Component = Select;