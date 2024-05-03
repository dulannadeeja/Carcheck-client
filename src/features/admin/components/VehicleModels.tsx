import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import {
  useDeleteVehicleModelMutation,
  useGetVehiclesModelsQuery,
} from "../adminApiSlice";
import AddVehicleModel from "./AddVehicleModel";
import { Vehicle } from "../../listing/clientListing";
import { toast } from "react-toastify";
import PaginationController from "../../../components/PaginationController";

function VehicleModels() {
  const [deleteVehicleModel] = useDeleteVehicleModelMutation();
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedModel, setSelectedModel] = useState<Vehicle | null>(null);
  const [showAddVehicleModel, setShowAddVehicleModel] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort] = useState("make");
  const [make] = useState("");
  const [category] = useState("");
  const { data, error, isSuccess } = useGetVehiclesModelsQuery({
    make,
    category,
    page,
    limit,
    sort,
  });

  const onEdit = (model: Vehicle) => {
    setMode("edit");
    setSelectedModel(model);
    setShowAddVehicleModel(true);
  };

  const onAdd = () => {
    setMode("add");
    setSelectedModel(null);
    setShowAddVehicleModel(true);
  };

  const onDelete = async (id: string) => {
    // delete the vehicle model from the system
    try {
      const res = await deleteVehicleModel(id).unwrap();
      console.log(res);
      toast.success("Vehicle model deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete vehicle model.");
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-col flex-1 shrink-0 basis-[40%]">
      {showAddVehicleModel && (
        <AddVehicleModel
          setShow={setShowAddVehicleModel}
          mode={mode}
          selectedModel={selectedModel as Vehicle}
        />
      )}
      <h2 className="text-lg font-medium">Vehicle models</h2>
      <p className="mt-3 text-gray-400">These </p>
      <div className="flex gap-5 items-center mt-10 mb-3 justify-between">
        <p className="">
          These are the specifications of the vehicles in your system, you can
          manage various type of specifications here.
        </p>
        <Button intent="primary" className="shrink-0" onClick={onAdd}>
          Add new
        </Button>
      </div>
      <div>
        <table className="border border-gray-200 w-full">
          <thead className="bg-gray-100">
            <tr className="border border-gray-200 ">
              <th className="border border-gray-200  p-4 text-gray-300 capitalize">
                Model
              </th>
              <th className="border border-gray-200  p-4 text-gray-300">
                Make
              </th>
              <th className="border border-gray-200  p-4 text-gray-300">
                Category
              </th>
              <th className="border border-gray-200  p-4 text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              isSuccess &&
              !error &&
              data.data.map((model) => (
                <tr key={model._id} className="border border-gray-200 ">
                  <td className="border border-gray-200  p-4">
                    <p className="max-w-[10rem]">{model.vehicleModel}</p>
                  </td>
                  <td className="border border-gray-200  p-4">
                    <p className="max-w-[10rem]">{model?.make?.name}</p>
                  </td>
                  <td className="border border-gray-200  p-4">
                    <div className="flex gap-2 max-w-fit">
                      {model &&
                        model.category.map((category) => (
                          <span
                            key={category}
                            className="bg-gray-100 px-4 py-2 rounded-md flex w-fit"
                          >
                            {category}
                          </span>
                        ))}
                    </div>
                  </td>
                  <td className="p-4 flex justify-end gap-3">
                    <Button
                      intent="primary"
                      size={"small"}
                      className="shrink-0"
                      onClick={() => onEdit(model)}
                    >
                      Edit
                    </Button>
                    <Button
                      intent="secondary"
                      size={"small"}
                      className="shrink-0"
                      onClick={() => onDelete(model._id as string)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {data && isSuccess && !error && (
          <PaginationController
            totalPages={data.totalPages}
            currentPage={page}
            totalRecords={data.total}
            setPageNumber={setPage}
          />
        )}
      </div>
    </div>
  );
}

export default VehicleModels;
