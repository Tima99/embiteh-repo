import { useState } from "react";
import { motion } from "framer-motion";
import { IoGridOutline } from "react-icons/io5";
import { BiCarousel } from "react-icons/bi";
import ProductCard from "@/components/ProductCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shadcn/components/ui/carousel";

const ProductRow = ({ label }) => {
    const [isCarouselView, setIsCraouselView] = useState();

    if (label?.products?.length <= 0) {
        return null;
    }

    return (
        <>
            <div className="flex justify-between px-6 items-center xl:px-16">
                <span className="text-xl font-bold xl:text-3xl text-slate-900 ">
                    {label.name}
                </span>
                <span
                    className="2xl:hidden cursor-pointer translate-y-1/4"
                    onClick={() => setIsCraouselView((prev) => !prev)}
                    title={!isCarouselView ? "Carousel View" : "List View"}
                >
                    {!isCarouselView ? (
                        <motion.div
                            whileTap={{ scale: 0.6 }}
                            transition={{ duration: 0.2 }}
                        >
                            <BiCarousel size={32} />
                        </motion.div>
                    ) : (
                        <motion.div
                            whileTap={{ scale: 0.6 }}
                            transition={{ duration: 0.2 }}
                        >
                            <IoGridOutline size={32} />
                        </motion.div>
                    )}
                </span>
            </div>
            {!isCarouselView ? (
                <div className="flex gap-6 flex-wrap px-6 py-6">
                    {label.products.map((product) => {
                        return (
                            <ProductCard
                                key={product._id}
                                {...product}
                            ></ProductCard>
                        );
                    })}
                </div>
            ) : (
                <div className="px-6 py-6 xl:px-16">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent>
                            {label.products.map((product) => {
                                return (
                                    <CarouselItem
                                        key={product._id}
                                        className="xl:basis-1/3 sm:basis-1/2 md:basis-1/3"
                                    >
                                        <ProductCard
                                            key={product._id}
                                            {...product}
                                        ></ProductCard>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            )}
        </>
    );
};

export default ProductRow;
