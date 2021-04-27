type WindowProps = {
    active?: boolean;
    fullscreen?: boolean;
}

export const windowToAttributes = (props?: WindowProps) => {
    return props ? {
        "am-window" : props?.active ? "active" : "inactive",
        "am-window-fullscreen": props?.fullscreen?.toString()
    } : {};
};

export default WindowProps;