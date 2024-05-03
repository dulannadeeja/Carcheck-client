import { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "../../../utils/mergeClasses";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useGetPendingAccountsQuery } from "../adminApiSlice";
import { AccountStatus, UserDocument } from "../../authentication/auth";
import { setPendingAccounts } from "./pendingAccountsSlice";
import Actions from "./components/Actions";
import PaginationController from "../../../components/PaginationController";

const columnHelper = createColumnHelper<UserDocument>();

const columns = [
  columnHelper.display({
    id: "actions",
    header: () => "Actions",
    size: 80,
    cell: (info) => <Actions {...info} />,
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => <div className={
      cn("overflow-hidden text-sm p-2",{
        "bg-green-100": info.getValue() === AccountStatus.sellingActive,
        "bg-red-100": info.getValue() === AccountStatus.sellingRestricted,
        "bg-yellow-100": info.getValue() === AccountStatus.docsNeeded,
        "bg-blue-100": info.getValue() === AccountStatus.suspended,
        "bg-gray-100": info.getValue() === AccountStatus.requestPending,
      })
    }>{info.getValue()}</div>,
  }),
  columnHelper.accessor("firstName", {
    header: () => "First name",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("lastName", {
    header: () => "Last name",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("accountType", {
    header: () => "Type of account",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("businessInfo.ownershipType", {
    header: () => "Ownership Type",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("businessAddress.street", {
    header: () => "Street",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("businessAddress.city", {
    header: () => "City",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("businessAddress.zip", {
    header: () => "State",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("email", {
    header: () => "Business email",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("phone", {
    header: () => "Phone",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("personalInfo.nationalId", {
    header: () => "National ID",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("personalInfo.passportNo", {
    header: () => "Passport No",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("personalInfo.drivingLicense", {
    header: () => "Driving License",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("businessInfo.businessName", {
    header: () => "Business Name",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("businessInfo.businessReqNo", {
    header: () => "Business Req No",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("businessInfo.businessWebsite", {
    header: () => "Business Website",
    cell: (info) => <div className="overflow-hidden text-sm p-2">{info.getValue()}</div>,
  })
];

function PendingAccounts() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const { data, error,isSuccess } = useGetPendingAccountsQuery({
    page,
    limit
  });
  
  const dispatch = useDispatch();
  const { pendingAccounts } = useSelector(
    (state: RootState) => state.pendingAccounts
  );

  const table = useReactTable({
    data: pendingAccounts || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    columnResizeMode: "onChange",
    getPaginationRowModel: getPaginationRowModel()
    // autoResetAll: true,
  });

  useEffect(()=>{
    if(data){
      dispatch(setPendingAccounts(data.data));
      console.log(data);
    }
  },[data, dispatch])

  console.log(pendingAccounts);

  return (
    <div className="overflow-x-hidden">
      <div className="overflow-x-scroll">
        <table className="" width={table.getTotalSize()}>
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="flex divide-x divide-gray-200 border-b border-b-gray-200 "
              >
                {headerGroup.headers.map((header) => (
                  <th
                    className="flex justify-between group text-gray-300 py-4"
                    style={{ width: header.getSize() }}
                  >
                    <div className="px-4 shrink-0">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    </div>
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={cn(
                        "bg-blue-300 w-1 h-full opacity-0 group-hover:opacity-100 cursor-col-resize",
                        {
                          "bg-green-600": header.column.getIsResizing(),
                        }
                      )}
                    ></div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="flex divide-x divide-gray-200 border-b border-b-gray-200 "
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className=""
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {data && isSuccess && !error && (
          <div>
          <PaginationController
          totalPages={data.totalPages}
          currentPage={page}
          totalRecords={data.total}
          setPageNumber={setPage}
          />
        </div>
        )}
      </div>
    </div>
  );
}

export default PendingAccounts;
