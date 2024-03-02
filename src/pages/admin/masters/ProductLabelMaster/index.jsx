import DateTable from "@/components/DateTable";
import HeaderWrapper from "@/shared/HeaderWrapper";
import useFetch from "@/hooks/useFetch";

const columns = [
    {
        accessorKey: "name",
        header: "Label Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
    },
];

// eslint-disable-next-line react-refresh/only-export-components
const ProductLabelMaster = () => {
    const [productLabels, isLoading] = useFetch("/master/product-label", {
        extractKey: "labels",
        autoFetchOnce: true
    })

    return (
        <>
            <DateTable
                columns={columns}
                data={productLabels || []}
                isLoading={isLoading}
            />
        </>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default HeaderWrapper(ProductLabelMaster, {isBtn: true});
