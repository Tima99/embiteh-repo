import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CgRemove } from "react-icons/cg";

const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border p-3 relative flex items-center justify-center group"
      {...listeners}
      {...attributes}
    >
      {/* <button {...listeners} {...attributes}>
          Drag handle
        </button> */}
      <img
        src={`${import.meta.env.VITE_ASSETS_URL}/${props.value}`}
        alt=""
        width="100%"
      />
      <div className="absolute bottom-0 py-2 items-center justify-center group-hover:flex hidden bg-slate-400 w-full bg-opacity-25">
        <CgRemove size={28} className="text-red-500" />
      </div>
    </div>
  );
};

export default SortableItem;
