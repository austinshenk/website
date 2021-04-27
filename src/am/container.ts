type ContainerProps = "floating" | "invisible" | "";

export const containerToAttributes = (props?: ContainerProps) => {
    return props !== null && props !== undefined ? {
        "am-container" : props
    } : {};
};

export default ContainerProps;