interface Attribute {
    isDefined: boolean;
    value: string;
    set: (value: string) => void;
    remove: () => void;
}

export default {
    attribute: (element: HTMLElement, attribute: string): Attribute => ({
        isDefined: element.hasAttribute(attribute),
        value: element.getAttribute(attribute),
        set: (value) => element.setAttribute(attribute, value),
        remove: () => element.removeAttribute(attribute)
    })
}