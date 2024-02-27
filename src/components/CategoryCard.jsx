import { Skeleton } from "@/shadcn/components/ui/skeleton"

const CategoryCard = () => {

    return (
        <>
            <div className="max-w-[150px] mx-auto bg-white rounded-xl overflow-hidden shadow-md">

                <img
                    className="w-full h-24 object-cover object-center"
                    src="https://via.placeholder.com/150x100"
                    alt="Product Image"
                />
                <div className="p-4">
                    <h2 className="text-sm font-medium mb-2">Category Name</h2>
                    <Skeleton className={"w-full h-2 mb-1"} />
                    <Skeleton className={"w-1/2 h-2"} />
                </div>
            </div>
        </>
    );
};

export default CategoryCard;
