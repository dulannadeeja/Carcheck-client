import axios from "axios";
import { useCallback, useEffect} from "react";
import { FaFileImage } from "react-icons/fa";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import Button from "../../../components/ui/Button";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { DownloadTask, removeTask, updateTaskProgress, updateTaskSize } from "../downloaderSlice";

type DownloadItemProps = {
  taskId: string;
};

function DownloadItem({ 
    taskId
 }: DownloadItemProps) {
    const dispatch = useDispatch();
    const { queue } = useSelector((state: RootState) => state.downloader);
    const tasks = queue.filter((task) => task.id === taskId);
    const task:DownloadTask = tasks[0];

  const downloadFile = useCallback(async (url: string) => {
    const response = await axios({
      url,
      method: "GET",
      responseType: "blob", // important for handling the binary response content
      onDownloadProgress: (progressEvent) => {

        // set the size of the file
        if (progressEvent.total) {
            dispatch(updateTaskSize({ id: taskId, size: progressEvent.total }));
        }

        // update the downloaded size of the file
        dispatch(updateTaskSize({ id: taskId, downloadedSize: progressEvent.loaded }));

        // update the progress of the task
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
            dispatch(updateTaskProgress({ id: taskId, progress: percentCompleted }));
        }
        if(progressEvent.loaded === progressEvent.total) {
            dispatch(updateTaskProgress({ id: taskId, progress: 100 }));
        }
      },
    });
    return response.data;
  }, [dispatch, taskId]);

  const handleDownload = useCallback(async (url: string) => {
    const data = await downloadFile(url);
    const downloadUrl = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", url.split("/").pop() as string);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [downloadFile]);

  useEffect(() => {
    handleDownload(task.downloadUrl);
  }, [task.downloadUrl, handleDownload]);

 const handleRemove = () => {
    // remove the task from the queue
    dispatch(removeTask(taskId));
 }

 useEffect(()=>{
        return () => {
            // cleanup the task
            dispatch(removeTask(taskId));
        }
 })

  return (
    <div className="flex flex-col gap-3 mb-3">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <FaFileImage className="text-4xl" />
          <p>{task.downloadedSize}Kb/{task.size}Kb</p>

          <p>{task.fileName}</p>
        </div>
        {task.progress === 100 ? (
          <p className="text-green-600  flex gap-2 items-center text-lg">
            <span>Completed</span>{" "}
            <MdOutlineFileDownloadDone className="text-2xl" />
          </p>
        ) : (
          <Button intent="iconText" className="text-sm text-red-300"
            onClick={handleRemove}
          >
            Remove
          </Button>
        )}
      </div>
      <div className="w-full rounded-full h-2 bg-gray-200">
        <div
          className="bg-blue-300 h-2 rounded-full"
          style={{ width: `${task.progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default DownloadItem;
