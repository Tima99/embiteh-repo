import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import useFetch from "@/hooks/useFetch";
import ProductRow from "./ProductRow";
// import CategoryCard from "@/components/CategoryCard";

export default function Home() {
    const [labels] = useFetch("/product/by/labels", {
        extractKey: "labels",
        autoFetchOnce: true,
    });

    return (
        <div>
            <HeroSection></HeroSection>

            {labels?.map((label) => {
                return <ProductRow key={label._id} label={label} />;
            })}

            <Testimonials></Testimonials>

            <Footer></Footer>
        </div>
    );
}
