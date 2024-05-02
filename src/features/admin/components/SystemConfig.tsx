import Button from "../../../components/ui/Button";
import { SiVerizon } from "react-icons/si";
import { ClipLoader } from "react-spinners";
import {
  useCleanModelMutation,
  useGetModelInfoQuery,
  useLoadInitialDataMutation,
  useProcessDataMutation,
  useSyncDataMutation,
  useTrainModelMutation,
} from "../../../api/predictionApiSlice";
import { CiWarning } from "react-icons/ci";
import { useState } from "react";
import { set } from "lodash";

function SystemConfig() {
  const [
    cleanModel,
    {
      isError: cleanErr,
      isLoading: cleaning,
      isSuccess: cleanSuccess,
      reset: resetClean,
    },
  ] = useCleanModelMutation();
  const [
    loadInitialData,
    {
      isError: initialDataErr,
      isLoading: initialDataLoading,
      isSuccess: initialDataLoadSuccess,
      reset: resetLoadInitialData,
    },
  ] = useLoadInitialDataMutation();
  const [
    syncData,
    {
      isError: syncErr,
      isLoading: syncing,
      isSuccess: syncSuccess,
      reset: resetSyncData,
    },
  ] = useSyncDataMutation();
  const [
    processData,
    {
      isError: processDataErr,
      isLoading: dataProcessing,
      isSuccess: dataProcessSuccess,
      reset: resetProcessData,
    },
  ] = useProcessDataMutation();
  const [
    trainModel,
    {
      isError: trainErr,
      isLoading: training,
      isSuccess: trainSuccess,
      reset: resetTrainModel,
    },
  ] = useTrainModelMutation();
  const { data, isLoading, isError,refetch } = useGetModelInfoQuery();

  const [showResetProcess, setShowResetProcess] = useState(false);
  const [showSyncProcess, setShowSyncProcess] = useState(false);

  const onRestartModel = async () => {
    try {
      setShowResetProcess(true);
      setShowSyncProcess(false);
      resetClean();
      resetLoadInitialData();
      resetSyncData();
      resetProcessData();
      resetTrainModel();
      await cleanModel().unwrap();
      await loadInitialData().unwrap();
      await syncData().unwrap();
      await processData().unwrap();
      const result = await trainModel().unwrap();
      console.log(result);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const onSyncModel = async () => {
    try {
      setShowSyncProcess(true);
      setShowResetProcess(false);
      resetClean();
      resetLoadInitialData();
      resetSyncData();
      resetProcessData();
      resetTrainModel();
      await syncData().unwrap();
      await processData().unwrap();
      const result = await trainModel().unwrap();
      console.log(result);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-5">Cracheck Settings</h2>
      <div>
        <h3 className="text-lg font-medium">Mashine learning model</h3>
        <div className="text-gray-300 grid grid-cols-2 my-3 gap-1">
          <p>
            Current model: <span className="text-black">Linear Regression</span>
          </p>
          <p>
            Model version: <span className="text-black">{!isLoading && data && data.version}</span>
          </p>
          <p>
            Model accuracy: <span className="text-black">{!isLoading && data && data.accuracy}%</span>
          </p>
          <p>
            Predictions based on:{" "}
            <span className="text-black">{!isLoading && data && data.totalRecords}+ data collection</span>
          </p>
        </div>
        <div>
          <h4 className="font-medium mt-5 mb-2">Restart model</h4>
          <p className="mb-3 max-w-3xl text-red-300">
            Caution! This will restart the model and all the data will be lost.
            you can't undo this action. Are you sure you want to restart the
            model?
          </p>
          <Button
            intent="primary"
            className="bg-red-600 hover:bg-red-400 rounded-full"
            onClick={onRestartModel}
          >
            Restart model
          </Button>
          {showResetProcess && (
            <div className="bg-gray-100 p-10 rounded-lg w-fit flex gap-3 flex-col mt-3 mb-10">
              <div className="flex gap-5 items-center justify-between">
                <p>Clear the exsisting data</p>
                {cleaning && <ClipLoader color="#000" size={20} />}
                {cleanSuccess && <SiVerizon className="text-green-600" />}
                {cleanErr && <CiWarning className="text-red-600" />}
              </div>
              <div className="flex gap-5 items-center justify-between">
                <p className={initialDataLoading ? "font-medium" : ""}>
                  Load the initial data
                </p>
                {initialDataLoading && <ClipLoader color="#000" size={20} />}
                {initialDataLoadSuccess && (
                  <SiVerizon className="text-green-600" />
                )}
                {initialDataErr && <CiWarning className="text-red-600" />}
              </div>
              <div className="flex gap-5 items-center justify-between">
                <p className={syncing ? "font-medium" : ""}>
                  Sync data with database
                </p>
                {syncing && <ClipLoader color="#000" size={20} />}
                {syncSuccess && <SiVerizon className="text-green-600" />}
                {syncErr && <CiWarning className="text-red-600" />}
              </div>
              <div className="flex gap-5 items-center justify-between">
                <p className={dataProcessing ? "font-medium" : ""}>
                  Process and clean data
                </p>
                {dataProcessing && <ClipLoader color="#000" size={20} />}
                {dataProcessSuccess && <SiVerizon className="text-green-600" />}
                {processDataErr && <CiWarning className="text-red-600" />}
              </div>
              <div className="flex gap-5 items-center justify-between">
                <p className={training ? "font-medium" : ""}>
                  Train the new model
                </p>
                {training && <ClipLoader color="#000" size={20} />}
                {trainSuccess && <SiVerizon className="text-green-600" />}
                {trainErr && <CiWarning className="text-red-600" />}
              </div>
              <div className="flex gap-5 items-center justify-between">
                <p
                  className={
                    cleanSuccess &&
                    initialDataLoadSuccess &&
                    syncSuccess &&
                    dataProcessSuccess &&
                    trainSuccess
                      ? "font-medium"
                      : ""
                  }
                >
                  Ready to predictions
                </p>
                {cleanSuccess &&
                  initialDataLoadSuccess &&
                  syncSuccess &&
                  dataProcessSuccess &&
                  trainSuccess && <SiVerizon className="text-green-600" />}
              </div>
            </div>
          )}
        </div>
        <div>
          <h4 className="font-medium mt-5 mb-2">Sync model</h4>
          <p className="mb-3 max-w-3xl">
            Sync the model with the latest data from the database. This will
            update the model with the latest data. we recommend to sync the
            model once in a week.
          </p>
          <Button intent="primary" className="rounded-full"
            onClick={onSyncModel}
          >
            Sync model
          </Button>
          <div>
            <p className="text-gray-400 mt-3">
              Last sync: <span className="text-black">5 days ago</span>
            </p>
            {showSyncProcess && (
              <div className="bg-gray-100 p-10 rounded-lg w-fit flex gap-3 flex-col mt-3 mb-10">
                <div className="flex gap-5 items-center justify-between">
                  <p className={syncing ? "font-medium" : ""}>
                    Sync data with database
                  </p>
                  {syncing && <ClipLoader color="#000" size={20} />}
                  {syncSuccess && <SiVerizon className="text-green-600" />}
                  {syncErr && <CiWarning className="text-red-600" />}
                </div>
                <div className="flex gap-5 items-center justify-between">
                  <p className={dataProcessing ? "font-medium" : ""}>
                    Process and clean data
                  </p>
                  {dataProcessing && <ClipLoader color="#000" size={20} />}
                  {dataProcessSuccess && (
                    <SiVerizon className="text-green-600" />
                  )}
                  {processDataErr && <CiWarning className="text-red-600" />}
                </div>
                <div className="flex gap-5 items-center justify-between">
                  <p className={training ? "font-medium" : ""}>
                    Train the new model
                  </p>
                  {training && <ClipLoader color="#000" size={20} />}
                  {trainSuccess && <SiVerizon className="text-green-600" />}
                  {trainErr && <CiWarning className="text-red-600" />}
                </div>
                <div className="flex gap-5 items-center justify-between">
                  <p
                    className={
                      cleanSuccess &&
                      initialDataLoadSuccess &&
                      syncSuccess &&
                      dataProcessSuccess &&
                      trainSuccess
                        ? "font-medium"
                        : ""
                    }
                  >
                    All new data synced
                  </p>
                  {
                    syncSuccess &&
                    dataProcessSuccess &&
                    trainSuccess && <SiVerizon className="text-green-600" />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemConfig;
