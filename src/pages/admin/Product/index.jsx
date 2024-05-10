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
import UploadImages from "@/components/UploadImages";
import { SheetTrigger } from "@/shadcn/components/ui/sheet";
import api from "@/services/api";
import toast from "react-hot-toast";

const Product = () => {
  const [products, isLoading, { fetchURL: fetchProducts }] = useFetch("/product", {
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
                className="hidden"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                onLoad={(e) => {
                  e.currentTarget.style.width = "40px";
                  e.currentTarget.style.display = "flex";
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
      header: "Discount Amount",
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
      accessorKey: "status",
      header: "Status",
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
                onClick={() => {
                  navigate("/admin/productManagement/manageProduct/edit", {
                    state: doc,
                  });
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate(`${doc?._id}/editImageGallery`)}
              >
                Edit Image Gallery
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  try {
                    await api.put(`/product/${doc?._id}`, {
                      status: doc.status === "Active" ? "Inactive" : "Active",
                    });
                    fetchProducts(null, () => toast.success("Changed Status"));
                  } catch (error) {
                    console.log(error);
                    toast.error("Failed");
                  }
                }}
              >
                Make {doc.status === "Active" ? "Inactive" : "Active"}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <UploadImages productId={doc?._id}>
                <SheetTrigger>
                  <DropdownMenuText>Upload Images</DropdownMenuText>
                </SheetTrigger>
              </UploadImages>
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
