import { Button } from "@/shadcn/components/ui/button";
import { useToast } from "@/shadcn/components/ui/use-toast";
import { ToastAction } from "@/shadcn/components/ui/toast";
import { SkeletonCard } from "./SkeletonCard";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
    const { toast } = useToast();
    // const showSkeleton  = useRef(Math.random() > 0.5)
    const navigate = useNavigate()

    return (
        <>
            <div className="max-w-sm mx-auto w-[98%] sm:w-full bg-white rounded-xl overflow-hidden shadow-md"
                onClick={() => {
                    navigate("/product/detail")
                }}
            >
                {/* {showSkeleton.current ? (
                    <img
                        className="w-full h-48 object-cover object-center"
                        src="https://via.placeholder.com/300x200"
                        alt="Product Image"
                    />
                ) : (
                    <Skeleton className="w-full h-48 rounded-xl !rounded-b-none" />
                )} */}

                <img
                    className="w-full h-48 object-cover object-center"
                    src="https://via.placeholder.com/300x200"
                    alt="Product Image"
                />
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 hover:underline hover:cursor-pointer">Product Name</h2>
                    <p className="text-gray-600 text-sm pb-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <SkeletonCard />

                    <div className="mt-4">
                        <span className="text-gray-700 text-lg font-bold">
                            $19.99
                        </span>
                        <Button
                            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation()
                                toast({
                                    title: "Success",
                                    description:
                                        "Your Item has been added to cart.",
                                    action: (
                                        <ToastAction altText="View">
                                            View
                                        </ToastAction>
                                    ),
                                });
                            }}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
