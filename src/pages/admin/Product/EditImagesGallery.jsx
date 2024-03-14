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
import UploadImages from "@/components/UploadImages";
import { SheetTrigger } from "@/shadcn/components/ui/sheet";
import { FcAddImage } from "react-icons/fc";


const EditImagesGallery = () => {
  const { productId } = useParams();
  const [product, isLoading] = useFetch(`/product/${productId}?images=1`, {
    extractKey: "product",
    autoFetchOnce: true,
  });
  const [sortedImages, setSortedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

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

  const handleDragEnd = (event) => {
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
      const formData = new FormData();

      // Append imagesOrder elements individually with a consistent naming convention
      sortedImages?.forEach((img) => {
        const fileIndex = uploadedImages.findIndex(
          (file) => file.index === img
        );
        if (fileIndex !== -1) {
          formData.append(`imagesOrder`, "0"); // replacing image
        } else {
          formData.append(`imagesOrder`, img.toString());
        }
      });

      // Append images as files
      uploadedImages?.forEach((item) => {
        formData.append(`images`, item.file);
      });

      const data = await api.put(`/product/${productId}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
      toast.error("Try Again");
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
        >
          <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-7 bg-white py-6 px-6 border shadow-sm relative">
            <UploadImages
              productId={productId}
              setSortedImages={setSortedImages}
            >
              <SheetTrigger className="absolute -top-2 right-12 -translate-y-1/2 cursor-pointer">
                <FcAddImage size={50} title="Add Images"/>
              </SheetTrigger>
            </UploadImages>

            <SortableContext
              items={sortedImages}
              strategy={rectSortingStrategy}
            >
              {sortedImages.map((id, index) => {
                if (id === -1) return;

                return (
                  <SortableItem
                    key={id}
                    id={id}
                    handle={true}
                    value={id}
                    index={index}
                    setSortedImages={setSortedImages}
                    setUploadedImages={setUploadedImages}
                    uploadedImages={uploadedImages}
                  />
                );
              })}
            </SortableContext>
          </div>
        </DndContext>
      )}
      <Button onClick={handleImageSubmit} className="w-max m-auto">
        Submit
      </Button>
    </div>
  );
};

export default HeaderWrapper(EditImagesGallery, {
  isBack: true,
  subTitle: "Manage Product",
});
