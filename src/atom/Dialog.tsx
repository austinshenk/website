import React, {useEffect, useState} from "react";
import Am from "am";
import forwardedRef from "components/ForwardedRefWrapper";

export type DialogProps = React.PropsWithChildren<Am.Dialog.Props> & Partial<{
    containerProps: Omit<Am.Container.Props, "ref">;
    dialogRef: React.RefObject<DialogRef>;
    onOpen: () => void;
    onClose: () => void;
}>;

export interface DialogRef {
    open: () => void;
    close: () => void;
}

export const useDialog = () => {
    return React.useRef<DialogRef>({
        open: () => {},
        close: () => {}
    });
};

function Dialog(props: DialogProps, ref: React.ForwardedRef<HTMLDialogElement>) {
    const {onOpen, onClose, children, dialogRef, containerProps, ...dialogProps} = props;
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (dialogRef)
            forwardedRef(dialogRef).current({
                open: () => setOpen(true),
                close: () => setOpen(false)
            })
    }, []);

    useEffect(() => {
        if (open)
            onOpen?.();
        else
            onClose?.();
    }, [open]);

    return <Am.Dialog.Component open={open} onClose={() => setOpen(false)} {...dialogProps} ref={ref}>
        <Am.Container.Component tabIndex={0} {...containerProps}>
            {children}
        </Am.Container.Component>
    </Am.Dialog.Component>
}

export default React.forwardRef<HTMLDialogElement, DialogProps>(Dialog);