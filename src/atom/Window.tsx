import React, {MutableRefObject} from "react";
import Am from "am";
import forwardedRef from "components/ForwardedRefWrapper";
import Element from "components/Element";

interface WindowContext {
    isPopupActive: boolean;
    activatePopup: () => void;
    deactivatePopup: () => void;
}

const WindowContext = React.createContext<WindowContext>({
    isPopupActive: false,
    activatePopup: () => {},
    deactivatePopup: () => {}
});

function WindowsProvider({children}: React.PropsWithChildren<{}>) {
    const [isPopupActive, setIsPopupActive] = React.useState<boolean>(false);

    return <WindowContext.Provider value={{
        isPopupActive,
        activatePopup: () => setIsPopupActive(true),
        deactivatePopup: () => setIsPopupActive(false)
    }}>
        {children}
    </WindowContext.Provider>
}

type BasicWindowProps = Am.Window.Props;

function BasicWindow({fullscreen, ...props}: BasicWindowProps, ref: React.ForwardedRef<HTMLElement>) {
    const {isPopupActive} = React.useContext(WindowContext);
    const windowRef: MutableRefObject<HTMLElement | null> = React.useRef<HTMLElement>(null);
    useFocusToggle(windowRef, !isPopupActive, [isPopupActive]);

    return <Am.Window.Component active={!isPopupActive} fullscreen={fullscreen} {...props} ref={(instance) => {
        forwardedRef(ref).current(instance);
        forwardedRef(windowRef).current(instance);
    }} />;
}
BasicWindow.displayName = "Window";


type PopupWindowProps = Am.Window.Props & {
    children: (popup: {activate: () => void, deactivate: () => void}) => React.ReactElement;
};

function PopupWindowComponent({fullscreen, children, ...props}: PopupWindowProps, ref: React.ForwardedRef<HTMLElement>) {
    const {isPopupActive, activatePopup, deactivatePopup} = React.useContext(WindowContext);
    const windowRef: MutableRefObject<HTMLElement | null> = React.useRef<HTMLElement>(null);
    useFocusToggle(windowRef, isPopupActive, [isPopupActive]);

    return <Am.Window.Component active={isPopupActive} fullscreen={fullscreen} {...props} ref={(instance) => {
        forwardedRef(ref).current(instance);
        forwardedRef(windowRef).current(instance);
    }}>
        {children({activate: activatePopup, deactivate: deactivatePopup})}
    </Am.Window.Component>;
}
PopupWindowComponent.displayName = "PopupWindow";

const useFocusToggle = (container: React.ForwardedRef<HTMLElement>, focusable: boolean, dependency: any[]) => {
    React.useEffect(() => {
        const tabIndexAttribute = "tabindex";
        const tabIndexPlaceholderAttribute = "data-tabindex";
        const toggleableDisabledValue = "-99";
        const placeholderDisabledValue = "-1";
        const focusableSelector = `[${tabIndexAttribute}], [${tabIndexPlaceholderAttribute}], a, input, button, select, textarea`;

        if (focusable) {
            forwardedRef(container).current()?.querySelectorAll(focusableSelector).forEach((element: Element) => {
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
            forwardedRef(container).current()?.querySelectorAll(focusableSelector).forEach((element: Element) => {
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
    }, dependency);
};

export default {
    Basic: React.forwardRef<HTMLElement, BasicWindowProps>(BasicWindow),
    Popup: React.forwardRef<HTMLElement, PopupWindowProps>(PopupWindowComponent),
    Provider: WindowsProvider,
}