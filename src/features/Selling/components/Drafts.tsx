
import { useEffect, useState } from "react";
import { useGetDraftsQuery } from "../SellerApiSlice";
import DraftItems from "./DraftItems";
import PaginationController from "../../../components/PaginationController";

function Drafts() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isSuccess, refetch } = useGetDraftsQuery({
    page,
    limit,
  });

  useEffect(()=>{
    refetch();
  },[refetch])

  return (
    <div>
      {data && isSuccess && (
        <div>
          <DraftItems data={data.data} refetch={refetch} />
          <PaginationController
            totalPages={data.totalPages}
            currentPage={page}
            totalRecords={data.total}
            setPageNumber={setPage}
          />
        </div>
      )}
    </div>
  );
}

export default Drafts;
