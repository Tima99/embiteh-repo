import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import useFetch from "@/hooks/useFetch";
import HeaderWrapper from "@/shared/HeaderWrapper";
import { useParams } from "react-router-dom";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/components/SortableItem";
import api from "@/services/api";
import { Button } from "@/shadcn/components/ui/button";
import toast from "react-hot-toast";

const EditImagesGallery = () => {
  const { productId } = useParams();
  const [product, isLoading] = useFetch(`/product/${productId}?images=1`, {
    extractKey: "product",
    autoFetchOnce: true,
  });
  const [sortedImages, setSortedImages] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!product?.images) return;
    setSortedImages(product.images);
  }, [product?.images]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      setSortedImages((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  async function handleImageSubmit(e) {
    try {
      e.preventDefault();
      const data = await api.put(`/product/${productId}`, {
        imagesOrder: sortedImages,
      });
      toast.success(data?.message)
    } catch (error) {
      console.log(error);
      toast.error("Try Again")
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <Loader />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-7 bg-white py-6 px-6 border shadow-sm">
            <SortableContext
              items={sortedImages}
              strategy={rectSortingStrategy}
            >
              {sortedImages.map((id) => (
                <SortableItem key={id} id={id} handle={true} value={id} />
              ))}
              {/* <DragOverlay>
                {activeId ? (
                  <div
                    style={{
                      //   width: "100px",
                      //   height: "100px",
                      height: "100%",
                      backgroundColor: "green",
                      opacity: "0.05",
                    }}
                    className="border p-3 relative flex items-center justify-center group"
                  ></div>
                ) : null}
              </DragOverlay> */}
            </SortableContext>
          </div>
        </DndContext>
      )}
      <Button onClick={handleImageSubmit} className="w-max m-auto">Submit</Button>
    </div>
  );
};

export default HeaderWrapper(EditImagesGallery, {
  isBack: true,
  subTitle: "Manage Product",
});
