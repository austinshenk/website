import React, {useEffect} from "react";
import Container from "./Container";
import Button from "./Button";
import Base from "./icon/Base";
import Tooltip from "../Tooltip";

type Props = React.PropsWithChildren<{
    title: string,
    open: boolean,
    onOpen?: () => void,
    onClose?: () => void
}>

export interface DialogRef {
    open: () => void;
}

function Dialog({title, open, onOpen, onClose, children}: Props) {
    useEffect(() => {
        if (open)
            onOpen();
    }, [open]);

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