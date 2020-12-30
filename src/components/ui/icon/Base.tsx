type Props = {
    icon: string,
    style: string
}

function Base({icon, style}: Props) {
    return <svg am-icon={icon} am-icon-style={style} width="16px" height="16px" viewBox="0 0 16 16">
        <path />
    </svg>
}

export default Base;