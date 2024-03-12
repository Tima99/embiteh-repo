import { Skeleton } from "@/shadcn/components/ui/skeleton";

export function SkeletonCard({ isImg }) {
    return (
        <div className="max-w-[300px] w-[98%] sm:w-full bg-white rounded-md overflow-hidden shadow-md border border-gray-100">
            <div className="flex flex-col space-y-3">
                {isImg && (
                    <Skeleton className="h-[125px] w-full rounded-none" />
                )}
                <div className="space-y-2 pb-3 px-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    );
}
