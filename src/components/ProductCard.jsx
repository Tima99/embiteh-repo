import { useNavigate } from "react-router-dom";

const ProductCard = ({
  images,
  name,
  _id
}) => {
  // const showSkeleton  = useRef(Math.random() > 0.5)
  const navigate = useNavigate();

  return (
    <>
      <div
        className="md:max-w-[300px] w-[100%] sm:w-full bg-white rounded-md overflow-hidden shadow-md border border-gray-100"
        onClick={() => {
          navigate(`/product/detail/${_id}`);
        }}
      >
        <img
          className="w-full h-44 object-cover object-center"
          src={
            images?.length > 0
              ? `${import.meta.env.VITE_ASSETS_URL}/${images[0]}`
              : "https://via.placeholder.com/300x200"
          }
          alt="Product Image"
        />
        <div className="p-6 pb-2">
          <h2 className="text-lg font-semibold mb-1 hover:underline hover:cursor-pointer">
            {name}
          </h2>
          {/* <p className="text-gray-600 text-sm pb-1">{description ? description : <>&nbsp;</>}</p> */}
          {/* <SkeletonCard /> */}

          {/* <div className="mt-4">
            <span className="text-gray-700 text-lg font-bold">
              {currency === "dollar" ? "$ " : "₹ "}
              {price - (discountPrice || 0)}
            </span>
            <Button
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                toast({
                  title: "Success",
                  description: "Your Item has been added to cart.",
                  action: <ToastAction altText="View">View</ToastAction>,
                });
              }}
            >
              Add to Cart
            </Button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
