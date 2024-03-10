import { Button } from "@/shadcn/components/ui/button";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { useToast } from "@/shadcn/components/ui/use-toast";
import { ToastAction } from "@/shadcn/components/ui/toast";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";

const ProductDetail = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const [product, isLoading, { fetchURL }] = useFetch("/product", {
    extractKey: "product",
  });

  useEffect(() => {
    fetchURL(id);
  }, []);

  const productDetailItem = {
    images:
      product?.images?.map((img) => ({
        original: `${import.meta.env.VITE_ASSETS_URL}/${img}`,
        thumbnail: `${import.meta.env.VITE_ASSETS_URL}/${img}`,
      })) || [],
    title: product?.name,
    reviews: "150",
    availability: true,
    brand: "embiteh",
    category: "electronics",
    sku: "BE45VGTRK",
    price: product && product.price - product.discountPrice,
    previousPrice: product && product.price,
    description: product?.description,
    size: ["XS", "S", "M", "L", "XL"],
    color: ["bg-gray-500", "bg-violet-600", "bg-red-600"],
  };
  const plusMinuceButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
  return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      {/* image gallery */}
      <div className="container mx-auto px-4">
        <ReactImageGallery
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={productDetailItem.images}
        />

        {/* /image gallery  */}
      </div>
      {/* description  */}

      <div className="mx-auto px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">
          {productDetailItem.title}
        </h2>
        <div className="mt-1">
          <div className="flex items-center">
            <Rater
              style={{ fontSize: "20px" }}
              total={5}
              interactive={false}
              rating={3.5}
            />

            <p className="ml-3 text-sm text-gray-400">
              ({productDetailItem.reviews})
            </p>
          </div>
        </div>
        <p className="mt-5 font-bold">
          Availability:{" "}
          {productDetailItem.availability ? (
            <span className="text-green-600">In Stock </span>
          ) : (
            <span className="text-red-600">Expired</span>
          )}
        </p>
        <p className="font-bold">
          Brand: <span className="font-normal">{productDetailItem.brand}</span>
        </p>
        <p className="font-bold">
          Category:{" "}
          <span className="font-normal">{productDetailItem.category}</span>
        </p>
        <p className="font-bold">
          SKU: <span className="font-normal">{productDetailItem.sku}</span>
        </p>
        <p className="mt-4 text-4xl font-bold text-violet-900">
          {product && (product.currency === "dollar" ? "$ " : "₹ ")}
          {productDetailItem.price}{" "}
          <span className="text-xs text-gray-400 line-through">
            ${productDetailItem.previousPrice}
          </span>
        </p>
        <p className="pt-5 text-sm leading-5 text-gray-500">
          {productDetailItem.description}
        </p>
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Size</p>
          <div className="flex gap-1">
            {productDetailItem.size.map((x, index) => {
              return (
                <div
                  key={index}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                >
                  {x}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Color</p>
          <div className="flex gap-1">
            {productDetailItem.color.map((x, index) => {
              return (
                <div
                  key={index}
                  className={`h-8 w-8 cursor-pointer border border-white ${x} focus:ring-2 focus:ring-${x}-500 active:ring-2 active:ring-${x}-500`}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Quantity</p>
          <div className="flex">
            <button className={`${plusMinuceButton}`}>&minus;</button>
            <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
              1
            </div>
            <button className={`${plusMinuceButton}`}> +</button>
          </div>
        </div>
        <div className="mt-7 flex items-center gap-4 sm:gap-6 ">
          <Button
            className="flex h-12 sm:max-md:w-1/3 items-center justify-center  text-white duration-100 hover:bg-blue-800 whitespace-nowrap"
            onClick={(e) => {
              e.stopPropagation();
              toast({
                title: "Success",
                description: "Your Item has been added to cart.",
                action: <ToastAction altText="View">View</ToastAction>,
              });
            }}
          >
            <BiShoppingBag className="mx-2" />
            Add to cart
          </Button>
          <Button
            className="flex h-12 sm:max-md:w-1/3  bg-amber-400 duration-100 hover:bg-yellow-300 text-black"
            onClick={(e) => {
              e.stopPropagation();
              toast({
                description: "Your Item has been added to wishlist.",
              });
            }}
          >
            <AiOutlineHeart className="mx-2" />
            Wishlist
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
