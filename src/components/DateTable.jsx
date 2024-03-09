import { useMemo } from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/components/ui/table";
import { cn } from "@/shadcn/lib/utils";
import Loader from "@/components/ui/Loader";

function DataTable({ columns, data, isLoading, noDataMsg = "No Data Found" }) {
    const modifiedColumns = useMemo(() => {
        return columns.map((column) => {
            if (column.accessorKey === "status") {
                return {
                    accessorKey: "status",
                    header: "Status",
                    cell: (info) => {
                        const className =
                            info.getValue() === "Active"
                                ? "border-green-700 text-green-700  bg-green-300"
                                : "border-yellow-700 text-yellow-700  bg-yellow-300";

                        return (
                            <span
                                className={cn(
                                    "border p-4 py-2 rounded-full font-bold ",
                                    className
                                )}
                            >
                                {info.getValue()}
                            </span>
                        );
                    },
                };
            } else if (column.accessorKey === "updatedAt") {
                return {
                    ...column,
                    cell: (info) => info.getValue()?.split("T")?.[0],
                };
            }

            return column;
        });
    }, [columns]);

    const table = useReactTable({
        data,
        columns: modifiedColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return isLoading ? (
        <Loader />
    ) : (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="!bg-gray-200">
                        {headerGroup.headers.map((header, i) => {
                            return (
                                <TableHead
                                    key={header.id}
                                    className={i === 0 ? "" : "text-center"}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            );
                        })}
                        {/* <TableHead>Action</TableHead> */}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell, i) => (
                                <TableCell
                                    key={cell.id}
                                    className={i === 0 ? "" : "text-center"}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                            {/* <TableCell
                                className={"text-center"}
                            >
                                hhh
                            </TableCell> */}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                        >
                            {noDataMsg}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
// export default React.memo(DataTable);
export default DataTable;
