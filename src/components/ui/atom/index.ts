import BodyAtom from "./Body";
import ContainerAtom from "./Container";
import WindowAtom from "./Window";

export * from "./Body";
export * from "./Container";
export * from "./Window";

namespace Atom {
    export const Body = BodyAtom;
    export const Container = ContainerAtom;
    export const Window = WindowAtom;
}

export default Atom;