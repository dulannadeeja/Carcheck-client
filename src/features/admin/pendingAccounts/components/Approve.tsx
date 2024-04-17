import { CellContext } from "@tanstack/react-table";
import { TData } from "../PendingAccounts";
import Button from "../../../../components/ui/Button";
import { useDispatch } from "react-redux";
import { updatePendingAccount } from "../pendingAccountsSlice";

type ApproveProps = CellContext<TData, string>;

function Approve(props: ApproveProps) {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(
      updatePendingAccount({
        email: props.row.original.email,
        status: "approved",
        note: props.row.original.note,
      })
    );
  };

  return (
    <div>
      <Button onClick={onClick}>Approve</Button>
    </div>
  );
}

export default Approve;
