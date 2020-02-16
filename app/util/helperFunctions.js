import DragWrap from "../components/DragWrap";

// Higher-Order function to return a draggable component
export const dragify = (component) => DragWrap(component);