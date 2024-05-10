import EmblaCarousel from "@/components/Carousel/EmblaCarousel";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
const HeroSection = (props) => {
  return (
    <>
      <EmblaCarousel {...props} slides={SLIDES} options={OPTIONS} />
    </>
  );
};

export default HeroSection;
