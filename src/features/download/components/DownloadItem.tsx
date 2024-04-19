import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import Button from "../../../components/ui/Button";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  DownloadTask,
  removeTask,
  updateTaskDownloadedSize,
  updateTaskProgress,
  updateTaskSize,
} from "../downloaderSlice";
import { limitString } from "../../../utils/format";

type DownloadItemProps = {
  taskId: string;
};

function DownloadItem({ taskId }: DownloadItemProps) {
  const dispatch = useDispatch();
  const { queue } = useSelector((state: RootState) => state.downloader);
  const tasks = queue.filter((task) => task.id === taskId);
  const task: DownloadTask = tasks[0];
  const isDownloading = useRef(false);

  const downloadFile = useCallback(
    async (url: string) => {
      if (isDownloading.current) return;

      isDownloading.current = true;

      const response = await axios({
        url,
        method: "GET",
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          dispatch(
            updateTaskDownloadedSize({
              id: taskId,
              downloadedSize: loaded,
            })
          );
          if (total) {
            dispatch(
              updateTaskSize({
                id: taskId,
                size: total,
              })
            );
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / total
            );
            dispatch(
              updateTaskProgress({ id: taskId, progress: percentCompleted })
            );

            // check if the all the file is downloaded
            if(loaded === total) {
              // remove the task from the queue after 5 seconds
              setTimeout(() => {
                dispatch(removeTask(taskId));
              }, 5000)
            }

          }
        },
      });

      const data = response.data;
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", url.split("/").pop() as string);
      document.body.appendChild(link);
      link.click();
      link.remove();

      isDownloading.current = false;
    },
    [dispatch, taskId]
  );

  useEffect(() => {
    if (task.progress === 0) {
      downloadFile(task.downloadUrl);
    }
  }, [task.downloadUrl, task.progress, downloadFile]);

  const handleRemove = () => {
    dispatch(removeTask(taskId));
  };

  return (
    <div className="flex flex-col gap-3 mb-3 px-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <FaFileImage className="text-4xl" />
          <div>
            <p className="pb-1 font-medium">
              {task.downloadedSize}Mb / {task.size}Mb
            </p>
            <p className="text-sm">{limitString(task.fileName, 60)}</p>
          </div>
        </div>
        {task.progress === 100 ? (
          <p className="text-green-600 flex gap-2 items-center text-lg">
            <span>Completed</span>
            <MdOutlineFileDownloadDone className="text-2xl" />
          </p>
        ) : (
          <Button
            intent="iconText"
            className="text-sm text-red-300"
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
