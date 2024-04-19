import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import DownloadItem from "./DownloadItem";
import { DownloadTask } from "../downloaderSlice";


const FileDownloader = () => {
    const {queue } = useSelector((state:RootState) => state.downloader);
  return (
    <div className="overflow-hidden fixed right-5 bottom-5 h-fit bg-white shadow-2xl border-2 rounded-lg border-blue-300  w-[40rem]">
      <h2 className="text-2xl font-semibold mb-5 px-5 py-3 border-b pb-3 bg-gray-100">
        Download Files
      </h2>
      <div>
        {queue && queue.map((task:DownloadTask) => (
            <DownloadItem key={task.id} taskId={task.id} />
        ))}
      </div>
    </div>
  );
};

export default FileDownloader;
