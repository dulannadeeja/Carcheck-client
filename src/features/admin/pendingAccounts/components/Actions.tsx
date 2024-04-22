import { CellContext } from "@tanstack/react-table";
import { TData } from "../PendingAccounts";
import Button from "../../../../components/ui/Button";
import { useDispatch } from "react-redux";
import {
  approveAccount,
  updatePendingAccount,
  updateStatus,
} from "../pendingAccountsSlice";
import { IoIosMore } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { AccountStatus } from "../../../authentication/auth";
import {
  useApproveAccountMutation,
  useRejectAccountMutation,
} from "../../adminApiSlice";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../../../utils/constants";
import { UserDoc } from "../../../authentication/auth";
import { addTask, DownloadTask } from "../../../download/downloaderSlice";
import { random } from "lodash";
import { v4 as uuidv4 } from 'uuid';

type ActionsProps = CellContext<TData, unknown>;

function Actions(props: ActionsProps) {
  const [approveAccount, { isLoading }] = useApproveAccountMutation();
  const [rejectAccount, { isLoading: isRejecting }] =
    useRejectAccountMutation();
  const popupRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [showActions, setShowActions] = useState(false);
  

  // if click outside the popup, close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onApprove = async () => {
    try {
      // send a request to the server to approve the account
      await approveAccount(props.row.original._id).unwrap();
      // update the status of the account in the redux store
      dispatch(
        updateStatus({
          _id: props.row.original._id,
          status: AccountStatus.sellingActive,
        })
      );
      toast.success("Account approved successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Failed to approve account, try refreshing the page.");
    }
  };

  const onReject = async () => {
    // send a request to the server to reject the account
    try {
      await rejectAccount(props.row.original._id).unwrap();
      // update the status of the account in the redux store
      dispatch(
        updateStatus({
          _id: props.row.original._id,
          status: AccountStatus.sellingRestricted,
        })
      );
      toast.success("Account rejected successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Failed to reject account, try refreshing the page.");
    }
  };

  const onDownloadDocs = () => {
    const { userDocs } = props.row.original;
    // check if the user has uploaded any documents
    if (userDocs === 0) {
      toast.error("No documents uploaded by the user.");
      return;
    }
    // download all the documents uploaded by the user
    userDocs.forEach((doc: UserDoc) => {
      // prepare the download url
      let url = ''
      if(doc.docName.match(/(jpg|jpeg|png|gif)$/)) {
        url = `${SERVER_URL}/images/${doc.docName}`;
      }else{
        url = `${SERVER_URL}/pdfs/${doc.docName}`;
      }
      // append to the downloader queue
      const task:DownloadTask ={
        id: uuidv4(),
        fileName: doc.docName,
        downloadUrl: url,
        progress: 0,
        size: 0,
        downloadedSize: 0,
        type: doc.docName.match(/(jpg|jpeg|png|gif)$/) ? 'image' : 'pdf' 
      }
      dispatch(addTask(task))
    });
  };

  return (
    <div className="relative overflow-visible p-4">
      <div>
        <IoIosMore
          className="text-xl cursor-pointer hover:text-blue-300 hover:scale-110 transition-transform transform origin-center"
          onClick={() => setShowActions(!showActions)}
        />
      </div>
      {showActions && (
        <div
          ref={popupRef}
          className="z-[100] flex flex-col gap-3 absolute bottom-0 left-0 bg-white p-3 shadow-lg border-gray-200 border rounded-md w-[10rem] translate-y-[100%]"
        >
          <Button
            intent="iconText"
            size={"none"}
            className="shrink-0 text-blue-300"
            onClick={onApprove}
            disabled={isLoading}
          >
            Approve
          </Button>
          <Button
            intent="iconText"
            size={"none"}
            className="shrink-0 text-red-300"
            onClick={onReject}
            disabled={isRejecting}
          >
            Reject
          </Button>
          <Button
            intent="iconText"
            size={"none"}
            className="shrink-0 text-gray-300"
            onClick={onDownloadDocs}
          >
            Download docs
          </Button>
          <Button
            intent="iconText"
            size={"none"}
            className="shrink-0 text-gray-300"
          >
            Request more info
          </Button>
        </div>
      )}
    </div>
  );
}

export default Actions;
