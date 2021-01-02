import {
    cloneElement,
    createContext, MutableRefObject,
    ReactElement, RefObject,
    useContext, useEffect,
    useReducer,
    useRef,
} from "react";
import Container from "./ui/Container";

interface Context {
    open: (content: string) => (event: React.FocusEvent | React.MouseEvent) => void;
    close: () => void;
}

const TooltipContext = createContext<Context>({
    open: () => () => {},
    close: () => {}
});

type Props = {
    content: string;
    children: ReactElement;
};

export default function Tooltip({content, children}: Props) {
    const {open, close} = useContext(TooltipContext);

    return <>
        {cloneElement(children, {onMouseEnter: open(content), onFocus: open(content), onMouseLeave: close, onBlur: close})}
    </>;
}

interface TooltipState {
    flow: "opening" | "opened" | "closed";
    content: string;
    position: {x: number, y: number};
}

type Event<Action, Data> = {
    action: Action;
} & Data;

type Opening = Event<"opening", {
    content: string;
}>;
type Open = Event<"open", {
    target: Element;
    tooltip: Element;
    container: Element;
}>;
type Close = Event<"close", {}>;
type TooltipEvent = Opening | Open | Close;

const position = (containerBoundingBox: DOMRect, targetBoundingBox: DOMRect, tooltipBoundingBox: DOMRect) => {
    let x = targetBoundingBox.x - tooltipBoundingBox.width/2 + targetBoundingBox.width/2;
    let y = targetBoundingBox.y + targetBoundingBox.height + 8;

    if (x + tooltipBoundingBox.width > containerBoundingBox.width)
        x = containerBoundingBox.width - tooltipBoundingBox.width - 8;
    else if (x < containerBoundingBox.x)
        x = containerBoundingBox.x;

    return { x, y };
}

export function TooltipProvider({children}: {children: (containerRef: RefObject<Element>, tooltip: ReactElement) => ReactElement}) {
    const tooltipElement = useRef<Element>();
    const targetElement: MutableRefObject<Element> = useRef<HTMLElement>();
    const containerElement: RefObject<Element> = useRef<HTMLElement>();
    const openTimeout: MutableRefObject<number> = useRef<number>();
    const closedAt: MutableRefObject<number> = useRef<number>(Date.now());
    const [state, dispatch] = useReducer((state: TooltipState, event: TooltipEvent) => {
        switch (event.action) {
            case "close":
                window.clearTimeout(openTimeout.current);
                closedAt.current = Date.now();

                return {
                    ...state,
                    flow: "closed"
                };

            case "opening":
                return {
                    ...state,
                    flow: "opening",
                    content: event.content
                };

            case "open":
                const targetBB = event.target.getBoundingClientRect();
                const tooltipBB = event.tooltip.getBoundingClientRect();
                const containerBB = event.container.getBoundingClientRect();

                return {
                    ...state,
                    flow: "opened",
                    position: position(containerBB, targetBB, tooltipBB)
                };
        }
    }, {
        flow: "closed",
        content: "",
        position: {x: 0, y: 0}
    });

    useEffect(() =>  {
        if (state.flow === "opening" && state.content !== "")  {
            const dispatchOpen = () => {
                dispatch({action: "open", target: targetElement.current, tooltip: tooltipElement.current, container: containerElement.current});
            }

            if (Date.now() - closedAt.current > 300)
                openTimeout.current = window.setTimeout(dispatchOpen, 500);
            else
                dispatchOpen();
        }
    }, [state.flow, state.content, targetElement.current]);

    const open = (content: string) => (event: React.FocusEvent | React.MouseEvent) => {
        const target = event.currentTarget;
        const tooltip = tooltipElement.current;
        if (!target || !tooltip)
            return;

        targetElement.current = target;
        dispatch({action: "opening", content: content});
    }

    const close = () => {
        dispatch({action: "close"});
    }

    return <TooltipContext.Provider value={{
        open,
        close
    }}>
        {children(containerElement, <Container ref={tooltipElement} am-tooltip="" am-tooltip-open={state.flow === "opened" ? "true": ""} style={{position: "absolute", left: state.position.x, top: state.position.y}}>
            {state.content}
        </Container>)}
    </TooltipContext.Provider>
}