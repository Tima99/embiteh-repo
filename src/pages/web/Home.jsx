import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/components/ui/carousel";
import { IoGridOutline } from "react-icons/io5";
import { BiCarousel } from "react-icons/bi";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import useFetch from "@/hooks/useFetch";
// import CategoryCard from "@/components/CategoryCard";

export default function Home() {
  const [products, isLoading] = useFetch("/product", {
    extractKey: "products",
    autoFetchOnce: true,
  });
  const [isCarouselView, setIsCraouselView] = useState();

  return (
    <div>
      <HeroSection></HeroSection>

      <div className="flex justify-between px-6 items-center xl:px-16">
        <span className="text-xl font-bold xl:text-3xl text-slate-900 ">
          Products
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
        <div className="flex gap-6 flex-wrap xl:px-16 px-6 py-6">
          {products?.map((product) => {
            return <ProductCard key={product._id} {...product}></ProductCard>;
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
              {products?.map((product) => {
                return (
                  <CarouselItem
                    key={product._id}
                    className="xl:basis-1/3 sm:basis-1/2 md:basis-1/3"
                  >
                    <ProductCard key={product._id} {...product}></ProductCard>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      <Testimonials></Testimonials>

      <Footer></Footer>
    </div>
  );
}
