import { Skeleton } from "@/shadcn/components/ui/skeleton"

export function SkeletonCard({ isImg }) {
  return (
    <div className="flex flex-col space-y-3">
      {isImg && <Skeleton className="h-[125px] w-[250px] rounded-xl" />}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
