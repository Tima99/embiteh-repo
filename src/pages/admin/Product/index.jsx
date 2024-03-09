import useFetch from "@/hooks/useFetch";
import DateTable from "@/components/DateTable";
import HeaderWrapper from "@/shared/HeaderWrapper";
import { useNavigate } from "react-router-dom";



const Product = () => {
    const [products, isLoading] = useFetch("/product", {
        extractKey: "products",
        autoFetchOnce: true,
    });
    const navigate = useNavigate()

    const columns = [
        {
            accessorKey: "name",
            header: "Product Name",
            cell: (info) => {
                const { images, name, _id } = info.row.original;
                return (
                    <div className="flex gap-4" onClick={() => {
                        navigate(`/admin/productManagement/manageProduct/${_id}/editImageGallery`)
                    }}>
                        {images?.[0] && (
                            <img
                                src={`${import.meta.env.VITE_ASSETS_URL}/${
                                    images[0]
                                }`}
                                alt=""
                                className="w-10"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        )}
                        <span>{name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "currency",
            header: "Currency",
            cell: info => {
                const v = info.getValue()
                return v === "dollar" ? '$' : 'Rupees'  
            }
        },
        {
            accessorKey: "price",
            header: "Price",
        },
        {
            accessorKey: "discountPrice",
            header: "Discount Price",
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
            cell: (info) => {
                const value = info.getValue();
                return (
                    <span className={value <= 0 ? "text-red-500" : ""}>
                        {value}
                    </span>
                );
            },
        },
        {
            accessorKey: "tags",
            header: "Tags",
        },
    ];

    return (
        <>
            <DateTable
                columns={columns}
                data={products || []}
                isLoading={isLoading}
            />
        </>
    );
};

export default HeaderWrapper(Product, {
    isBtn: true,
});
