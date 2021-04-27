interface Attribute {
    isDefined: boolean;
    value: string | null;
    set: (value: string | null) => void;
    remove: () => void;
}

export default {
    attribute: (element: Element, attribute: string): Attribute => ({
        isDefined: element.hasAttribute(attribute),
        value: element.getAttribute(attribute),
        set: (value) => element.setAttribute(attribute, value || ""),
        remove: () => element.removeAttribute(attribute)
    })
}