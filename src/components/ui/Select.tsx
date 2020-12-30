import {FormEvent, useState} from "react";
import Base from "./icon/Base";

interface Option {
    label: string;
    value: string;
}

type Props = {
    id: string,
    children: Option[],
    onChange: (value: string) => void,
    initialValue?: string,
    [key:string]: any
}

const determineInitialValue = (options: Option[], initialValue?: string) => {
    if (initialValue)
        return initialValue;
    else if (options.length > 0)
        return options[0].value;
    else
        return "";
}

const handleChangeEvent = (setValue: (value: string) => void, onChange: (value: string) => void) => (event: FormEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;

    setValue(value);
    onChange(value);
}

function Select({id, children, onChange, initialValue, ...props}: Props) {
    const [value, setValue] = useState<string>(determineInitialValue(children, initialValue));

    return <section am-select="" am-interactive="" {...props}>
        <Base icon="downArrow" style="outline" />
        <select id={id} value={value} onInput={handleChangeEvent(setValue, onChange)}>
            {children.map(({label, value}) => <option key={value} value={value}>{label}</option>)}
        </select>
    </section>
}

export default Select;