import { useEffect, useState } from "react";
import { useGetUnsoldListingsQuery } from "../SellerApiSlice";
import PaginationController from "../../../components/PaginationController";
import UnsoldItems from "./UnsoldItems";

function Unsold() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isSuccess, refetch } = useGetUnsoldListingsQuery({
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
          <UnsoldItems data={data.data} refetch={refetch} />
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

export default Unsold;