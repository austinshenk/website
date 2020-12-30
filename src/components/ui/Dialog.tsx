import React from "react";
import Container from "./Container";
import Button from "./Button";
import Base from "./icon/Base";
import Window from "./Window";
import Tooltip from "../Tooltip";

type Props = React.PropsWithChildren<{
    title: string,
    open: boolean,
    onClose: () => void
}>

function Dialog({title, open, onClose, children}: Props) {
    return <>
        <div am-dialog-backdrop="" am-dialog-open={open.toString()} onClick={onClose} />
        <dialog open={true} am-dialog-open={open.toString()}>
            <Container am-group="vertical" tabIndex={0}>
                <section am-group-header="" am-flexbox="" am-flexbox-justify-content="space-between">
                    <span role="heading" aria-level={2}>{title}</span>
                    <Tooltip content="Close">
                        <Button onClick={onClose}>
                            <Base icon="cross" style="outline"/>
                        </Button>
                    </Tooltip>
                </section>
                {children}
            </Container>
        </dialog>
    </>;
}

export default Dialog;