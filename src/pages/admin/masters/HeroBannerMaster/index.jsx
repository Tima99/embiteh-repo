import useFetch from "@/hooks/useFetch";
import HeaderWrapper from "@/shared/HeaderWrapper";
import { useMemo } from "react";
import DateTable from "@/components/DateTable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn/components/ui/tooltip";

const HeroBannerMaster = () => {
  const [heroBanners, isLoading] = useFetch("/master/hero-banner", {
    extractKey: "docs",
    autoFetchOnce: true,
  });

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: "Title",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "images",
        header: "Banners",
        cell: (info) => {
          const images = info.getValue();
          return (
            <div className="flex gap-3 m-auto max-w-[240px] overflow-x-auto">
              <div className="flex gap-4 m-auto">
                {images?.[0] &&
                  images.map((image) => {
                    return (
                      <TooltipProvider key={image}>
                        <Tooltip>
                          <TooltipTrigger>
                            <img
                              key={image}
                              src={`${
                                import.meta.env.VITE_ASSETS_URL
                              }/${image}`}
                              alt=""
                              className="w-10"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <img
                              key={image}
                              src={`${
                                import.meta.env.VITE_ASSETS_URL
                              }/${image}`}
                              alt=""
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                              className="w-44"
                            />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
      },
    ];
  }, []);

  return (
    <>
      helo
      <DateTable
        columns={columns}
        data={heroBanners || []}
        isLoading={isLoading}
      />
    </>
  );
};

export default HeaderWrapper(HeroBannerMaster, {
  isBtn: true,
});
