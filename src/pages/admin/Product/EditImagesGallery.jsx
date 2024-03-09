import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import useFetch from "@/hooks/useFetch";
import HeaderWrapper from "@/shared/HeaderWrapper";
import { useParams } from "react-router-dom";
import { CgRemove } from "react-icons/cg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const EditImagesGallery = () => {
    const { productId } = useParams();
    const [product, isLoading] = useFetch(`/product/${productId}?images=1`, {
        extractKey: "product",
        autoFetchOnce: true,
    });
    const [sortedImages, setSortedImages] = useState([]);

    useEffect(() => {
        if (!product?.images) return;
        setSortedImages(product.images);
    }, [product?.images]);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(sortedImages);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSortedImages(items);
    };

    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-7 bg-white py-6 px-6 border shadow-sm">
            {isLoading ? (
                <Loader />
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="images">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {sortedImages.map((image, index) => (
                                    <Draggable
                                        key={image}
                                        draggableId={image}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="border p-3 relative flex items-center justify-center group"
                                            >
                                                <img
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_ASSETS_URL
                                                    }/${image}`}
                                                    alt=""
                                                    width="100%"
                                                />
                                                <div className="absolute bottom-0 py-2 items-center justify-center group-hover:flex hidden bg-slate-400 w-full bg-opacity-25">
                                                    <CgRemove
                                                        size={28}
                                                        className="text-red-500"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    );
};

export default HeaderWrapper(EditImagesGallery, {
    isBack: true,
    subTitle: "Manage Product",
});
