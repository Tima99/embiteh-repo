import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CgRemove } from "react-icons/cg";
import { RxDragHandleDots2 } from "react-icons/rx";
import { FiUpload } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

const SortableItem = ({
  setSortedImages,
  index,
  setUploadedImages,
  uploadedImages,
  ...props
}) => {
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

  const ref = useRef();
  const [imageFile, setImageFile] = useState();

  useEffect(() => {
    setImageFile(
      uploadedImages.find((file) => file.index === props.value)?.file
    );
  }, [uploadedImages, props.value]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border p-3 relative flex items-center justify-center group"
    >
      {imageFile ? (
        <img src={URL.createObjectURL(imageFile)} alt="" width="100%" />
      ) : (
        <img
          src={`${import.meta.env.VITE_ASSETS_URL}/${props.value}`}
          alt=""
          width="100%"
        />
      )}
      <div className="absolute bottom-0 py-2 items-center justify-center group-hover:flex hidden bg-slate-400 w-full bg-opacity-50 gap-4 backdrop-blur-[2px]">
        <span
          onClick={(e) => {
            e.stopPropagation();
            setSortedImages((prev) => {
              const cloneArr = [...prev];
              cloneArr[index] = -1;
              return cloneArr;
            });
          }}
          className="cursor-pointer"
        >
          <CgRemove size={26} className="text-red-500" />
        </span>

        <span className="cursor-pointer">
          <input
            type="file"
            name="images"
            id=""
            ref={ref}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              const alreadyUploaded = uploadedImages.findIndex(
                (file) => file.index === props.value
              );

              if (alreadyUploaded !== -1) {
                uploadedImages[alreadyUploaded].file = file;
                setUploadedImages([...uploadedImages]);
                return;
              }

              setUploadedImages((prev) => [
                ...prev,
                { index: props.value, file },
              ]);
            }}
          />

          <FiUpload size={26} onClick={() => ref.current?.click()} />
        </span>

        <span
          className=""
          {...listeners}
          {...attributes}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <RxDragHandleDots2 size={28} />
        </span>
      </div>
    </div>
  );
};

export default SortableItem;
