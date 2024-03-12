import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import useFetch from "@/hooks/useFetch";
import ProductRow from "./ProductRow";
import { SkeletonCard } from "@/components/SkeletonCard";
import EmblaCarousel from "@/components/Carousel/EmblaCarousel";
// import CategoryCard from "@/components/CategoryCard";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
  const [labels, isLoading] = useFetch("/product/by/labels", {
    extractKey: "labels",
    autoFetchOnce: true,
  });

  return (
    <div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />

      <HeroSection></HeroSection>

      {isLoading && (
        <div className="px-6 xl:px-16 gap-6 py-6 grid xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
          <SkeletonCard isImg={true} />
          <SkeletonCard isImg={true} />
          <SkeletonCard isImg={true} />
          <SkeletonCard isImg={true} />
          <SkeletonCard isImg={true} />
          <SkeletonCard isImg={true} />
          <SkeletonCard isImg={true} />
          <SkeletonCard isImg={true} />
          <SkeletonCard isImg={true} />
          <SkeletonCard isImg={true} />
        </div>
      )}

      {labels?.map((label) => {
        return <ProductRow key={label._id} label={label} />;
      })}

      <Testimonials></Testimonials>

      <Footer></Footer>
    </div>
  );
}
