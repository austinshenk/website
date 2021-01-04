import React, {createContext, PropsWithChildren, ReactNode, useContext, useState} from "react";

interface WindowContext {
    isPopupActive: boolean;
    activatePopup: () => void;
    deactivatePopup: () => void;
}

const WindowContext = createContext<WindowContext>({
    isPopupActive: false,
    activatePopup: () => {},
    deactivatePopup: () => {}
});

export function WindowController({children}: PropsWithChildren<{}>) {
    const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

    return <WindowContext.Provider value={{
        isPopupActive,
        activatePopup: () => setIsPopupActive(true),
        deactivatePopup: () => setIsPopupActive(false)
    }}>
        {children}
    </WindowContext.Provider>
}

type WindowProps = React.PropsWithChildren<{
    fullscreen?: boolean,
    [key:string]: any
}>
function Window({fullscreen, ...props}: WindowProps, ref) {
    const {isPopupActive} = useContext(WindowContext);

    return <section am-window={!isPopupActive ? "active" : "inactive"} am-window-fullscreen={fullscreen?.toString()} {...props} ref={ref} />;
}
Window.displayName = "Window";


type PopupWindowProps = {
    children: (popup: {activate: () => void, deactivate: () => void}) => ReactNode,
    fullscreen?: boolean,
    [key:string]: any
}
function PopupWindowComponent({fullscreen, children, ...props}: PopupWindowProps, ref) {
    const {isPopupActive, activatePopup, deactivatePopup} = useContext(WindowContext);

    return <section am-window={isPopupActive ? "active" : "inactive"} am-window-fullscreen={fullscreen?.toString()} {...props} ref={ref}>
        {children({activate: activatePopup, deactivate: deactivatePopup})}
    </section>;

}
PopupWindowComponent.displayName = "PopupWindow";

export default React.forwardRef(Window);
export const PopupWindow =  React.forwardRef(PopupWindowComponent);