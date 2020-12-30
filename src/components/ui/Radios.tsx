import React, {FormEvent, useEffect, useState} from "react";
import Base from "./icon/Base";

type RadioProps = {
    name: string,
    label: string,
    value: string,
    checked: boolean,
    onChange: (event: FormEvent<HTMLInputElement>) => void
}

function RadioComponent({name, label, value, checked, onChange}: RadioProps) {
    return <label am-radio="" am-group-item="" am-interactive="">
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
        <Base icon={checked ? "bigRadio" : "smallRadio"} style="fill"/>
        <span>{label}</span>
    </label>;
}

interface Radio {
    label: string,
    value: string
}

type RadiosProps = {
    name: string,
    children: Radio[],
    onChange: (value: string) => void,
    initialValue?: string
}

const determineInitialValue = (radios: Radio[], initialValue?: string) => {
    if (initialValue)
        return initialValue;
    else if (radios.length > 0)
        return radios[0].value;
    else
        return "";
}

const handleChangeEvent = (setCheckedValue: (value: string) => void, onChange: (value: string) => void) => (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setCheckedValue(value);
    onChange(value);
};

function Radios({name, children, onChange, initialValue}: RadiosProps) {
    const [checkedValue, setCheckedValue] = useState<string>(determineInitialValue(children, initialValue));

    return <>
        {children.map(({label, value}) =>
            <RadioComponent key={value} name={name} label={label} value={value} checked={value === checkedValue} onChange={handleChangeEvent(setCheckedValue, onChange)}/>
        )}
    </>
}

export default Radios;