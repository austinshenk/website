import React, {ForwardedRef} from "react";
import GridProps, {gridToAttributes} from "am/grid";
import ContainerProps, {containerToAttributes} from "am/container";
import WindowProps, {windowToAttributes} from "am/window";

type AmProps = Partial<
    { grid: GridProps } &
    { container: ContainerProps } &
    { window: WindowProps}
>;

type RenderProps = {
    as: React.ElementType;
    children?: React.ReactNode;
} | {
    render: () => React.ReactElement;
} | {
    children: React.ReactElement;
};

type Props = RenderProps & AmProps;

const renderComponent = (props: Props, amProps: object, ref: ForwardedRef<any>) => {
    if ("as" in props) {
        const {as, ...rest} = props;
        const Component = as;
        return <Component {...amProps} ref={ref} {...rest} />;
    } else if ("render" in props) {
        const {render, ...rest} = props;
        return React.cloneElement(props.render(), {...amProps, ref, ...rest});
    } else {
        const {children, ...rest} = props;
        return React.cloneElement(props.children, {...amProps, ref, ...rest});
    }
}

const Am = (props: Props, ref: ForwardedRef<any>) => {
    const {grid, container, window, ...rest} = props;
    const am = Object.assign({},
        gridToAttributes(grid),
        containerToAttributes(container),
        windowToAttributes(window)
    );

    return renderComponent(rest, am, ref);
}

export default React.forwardRef<any, Props>(Am);