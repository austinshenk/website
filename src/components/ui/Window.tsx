import React, {createContext, PropsWithChildren, ReactNode, RefObject, useContext, useEffect, useState} from "react";
import Element from "../Element";

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
    fullscreen?: boolean
}>
function Window({fullscreen, ...props}: WindowProps, ref: RefObject<HTMLElement>) {
    const {isPopupActive} = useContext(WindowContext);
    useEffect(() => setFocusable(ref.current, !isPopupActive), [isPopupActive]);

    return <section am-window={!isPopupActive ? "active" : "inactive"} am-window-fullscreen={fullscreen?.toString()} {...props} ref={ref} />;
}
Window.displayName = "Window";


type PopupWindowProps = {
    children: (popup: {activate: () => void, deactivate: () => void}) => ReactNode,
    fullscreen?: boolean
}
function PopupWindowComponent({fullscreen, children, ...props}: PopupWindowProps, ref: RefObject<HTMLElement>) {
    const {isPopupActive, activatePopup, deactivatePopup} = useContext(WindowContext);
    useEffect(() => setFocusable(ref.current, isPopupActive), [isPopupActive]);

    return <section am-window={isPopupActive ? "active" : "inactive"} am-window-fullscreen={fullscreen?.toString()} {...props} ref={ref}>
        {children({activate: activatePopup, deactivate: deactivatePopup})}
    </section>;
}
PopupWindowComponent.displayName = "PopupWindow";

const setFocusable = (container: HTMLElement, focusable: boolean) => {
    const tabIndexAttribute = "tabindex";
    const tabIndexPlaceholderAttribute = "data-tabindex";
    const toggleableDisabledValue = "-99";
    const placeholderDisabledValue = "-1";
    const focusableSelector = `[${tabIndexAttribute}], [${tabIndexPlaceholderAttribute}], a, input, button, select, textarea`;

    if (focusable) {
        container.querySelectorAll(focusableSelector).forEach((element: HTMLElement) => {
            const tabindex = Element.attribute(element, tabIndexAttribute);
            const dataTabindex = Element.attribute(element, tabIndexPlaceholderAttribute);

            if (dataTabindex.isDefined) {
                dataTabindex.remove();
                tabindex.set(dataTabindex.value);
            } else if (tabindex.value === toggleableDisabledValue) {
                tabindex.remove();
            }
        });
    } else {
        container.querySelectorAll(focusableSelector).forEach((element: HTMLElement) => {
            const tabindex = Element.attribute(element, tabIndexAttribute);
            const dataTabindex = Element.attribute(element, tabIndexPlaceholderAttribute);

            if (tabindex.isDefined) {
                dataTabindex.set(tabindex.value);
                tabindex.set(placeholderDisabledValue);
            } else {
                tabindex.set(toggleableDisabledValue);
            }
        });
    }
};

export default React.forwardRef(Window);
export const PopupWindow =  React.forwardRef(PopupWindowComponent);