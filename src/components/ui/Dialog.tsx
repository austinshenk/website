import React, {MutableRefObject, useEffect, useState} from "react";
import Container from "./Container";
import Button from "./Button";
import Base from "./icon/Base";
import Tooltip from "../Tooltip";

type Props = React.PropsWithChildren<{
    title: string;
    onOpen?: () => void;
    onClose?: () => void;
}>

export interface DialogRef {
    open: () => void;
}

function Dialog(props: Props, ref: MutableRefObject<DialogRef>) {
    const {title, onOpen, onClose, children} = props;
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (ref)
            ref.current = {
                open: () => setOpen(true)
            }
    }, []);

    useEffect(() => {
        if (open)
            onOpen();
        else
            onClose();
    }, [open]);

    return <>
        <div am-dialog-backdrop="" am-dialog-open={open.toString()} onClick={() => setOpen(false)} />
        <dialog open={true} am-dialog-open={open.toString()}>
            <Container am-group="vertical" tabIndex={0}>
                <section am-group-header="" am-flexbox="" am-flexbox-justify-content="space-between">
                    <span role="heading" aria-level={2}>{title}</span>
                    <Tooltip content="Close">
                        <Button onClick={() => setOpen(false)}>
                            <Base icon="cross" style="outline"/>
                        </Button>
                    </Tooltip>
                </section>
                {children}
            </Container>
        </dialog>
    </>;
}

const Component = React.forwardRef<DialogRef, Props>(Dialog);
Component.displayName = "Dialog";

export default Component;