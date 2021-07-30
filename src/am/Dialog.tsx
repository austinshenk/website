import React from "react";
import {css} from "styled-jsx/css";

type DialogConfig = Partial<{
    open: boolean
}>;

type DialogBackdropConfig = Partial<{
    open: boolean
}>;

function styles() {return css.global`
[am-dialog] > dialog {
    color: inherit;
    background: none;
    border: none;
    
    position: absolute;
    left: auto;
    right: 0;
    max-width: 500px;
    width: 100%;
    height: 100%;
    padding: 0;
    overflow: hidden auto;
    
    transform: translateX(100%);
    visibility: hidden;
    transition: transform .5s ease-in-out, visibility .5s;
}

[am-dialog] > dialog::backdrop {
    display: none;
}

[am-dialog] > [am-dialog-backdrop] {
    position: absolute;
    width: 100%;
    height: 100%;
    
    background: hsla(0, 0%, 0%, 0.25);
    opacity: 0;
    pointer-events: none;
    transition: opacity .5s, pointer-events 1ms .5s;
    transition-timing-function: ease-in-out;
}

[am-dialog] > dialog[am-dialog=true] {
    transform: translateX(0);
    visibility: visible;
}

[am-dialog] > [am-dialog-backdrop=true] {
    opacity: 1;
    pointer-events: auto;
}

[prefers-reduced-motion=reduce] [am-dialog] > dialog {
    transition: none;
}

[prefers-color-scheme=dark] [am-dialog] > [am-dialog-backdrop] {
    background: hsla(0, 0%, 0%, 0.5);
}
`;}

const dialog = (props?: DialogConfig) => ({
    "open": true,
    "am-dialog": props?.open?.toString() ?? ""
});

const dialogBackdrop = (props?: DialogBackdropConfig) => ({
    "am-dialog-backdrop": props?.open?.toString() ?? ""
});

type HtmlDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
type HtmlDialogProps = React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>;

export type Props = React.PropsWithChildren<HtmlDialogProps> & DialogConfig & {
    onClose: () => void;
    backdropProps?: React.PropsWithChildren<HtmlDivProps>
};

function Dialog({open, onClose, backdropProps, ...props}: Props, ref: React.ForwardedRef<HTMLDialogElement>) {
    const style = styles();

    return <>
        <style jsx global>{style}</style>
        <div {...dialogBackdrop({open})} {...backdropProps} onClick={onClose} />
        <dialog {...dialog({open})} {...props} ref={ref}>
            {props.children}
        </dialog>
    </>;
}

export const Component = React.forwardRef<HTMLDialogElement, Props>(Dialog);