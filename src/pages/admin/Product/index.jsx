import useFetch from "@/hooks/useFetch";
import DateTable from "@/components/DateTable";
import HeaderWrapper from "@/shared/HeaderWrapper";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuText,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { Button } from "@/shadcn/components/ui/button";

import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import UploadImages from "./UploadImages";
import { SheetTrigger } from "@/shadcn/components/ui/sheet";

const Product = () => {
  const [products, isLoading] = useFetch("/product", {
    extractKey: "products",
    autoFetchOnce: true,
  });
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: (info) => {
        const { images, name } = info.row.original;
        return (
          <div className="flex gap-4">
            {images?.[0] && (
              <img
                src={`${import.meta.env.VITE_ASSETS_URL}/${images[0]}`}
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
      cell: (info) => {
        const v = info.getValue();
        return v === "dollar" ? "$" : "Rupees";
      },
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
          <span className={value <= 0 ? "text-red-500" : ""}>{value}</span>
        );
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const doc = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <PiDotsThreeOutlineVerticalFill size={22} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate(`${doc?._id}/editImageGallery`)}
              >
                Edit Image Gallery
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <UploadImages productId={doc?._id}>
                <SheetTrigger>
                  <DropdownMenuText>Upload Images</DropdownMenuText>
                </SheetTrigger>
              </UploadImages>
              {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
