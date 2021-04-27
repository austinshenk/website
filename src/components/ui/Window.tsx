import React, {createContext, ForwardedRef, PropsWithChildren, ReactNode, RefObject, useContext, useEffect, useState} from "react";
import Element from "components/Element";
import Am from "am";
import forwardedRef from "../ForwardedRefWrapper";

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

export function Windows({children}: PropsWithChildren<{}>) {
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
    fullscreen?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>;

function Window({fullscreen, ...props}: WindowProps, ref: ForwardedRef<HTMLElement>) {
    const {isPopupActive} = useContext(WindowContext);
    useEffect(() => setFocusable(forwardedRef(ref).current(), !isPopupActive), [isPopupActive]);

    return <Am as="section" window={{active: !isPopupActive, fullscreen}} {...props} ref={ref} />;
}
Window.displayName = "Window";


type PopupWindowProps = {
    children: (popup: {activate: () => void, deactivate: () => void}) => React.ReactElement;
    fullscreen?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

function PopupWindowComponent({fullscreen, children, ...props}: PopupWindowProps, ref: ForwardedRef<HTMLElement>) {
    const {isPopupActive, activatePopup, deactivatePopup} = useContext(WindowContext);
    useEffect(() => setFocusable(forwardedRef(ref).current(), isPopupActive), [isPopupActive]);

    return <Am as="section" window={{active: isPopupActive, fullscreen}} {...props} ref={ref}>
        {children({activate: activatePopup, deactivate: deactivatePopup})}
    </Am>;
}
PopupWindowComponent.displayName = "PopupWindow";

const setFocusable = (container: HTMLElement | null, focusable: boolean) => {
    const tabIndexAttribute = "tabindex";
    const tabIndexPlaceholderAttribute = "data-tabindex";
    const toggleableDisabledValue = "-99";
    const placeholderDisabledValue = "-1";
    const focusableSelector = `[${tabIndexAttribute}], [${tabIndexPlaceholderAttribute}], a, input, button, select, textarea`;

    if (focusable) {
        container?.querySelectorAll(focusableSelector).forEach((element: Element) => {
            if (!element)
                return;

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
        container?.querySelectorAll(focusableSelector).forEach((element: Element) => {
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