import { useState } from "react";
import Button from "../../../components/ui/Button";
import { toast } from "react-toastify";
import { useDeleteSpecMutation, useGetSpecsQuery } from "../adminApiSlice";
import { SpecsType } from "../admin";
import AddSpec from "./AddSpec";

export type SpecDocument = {
  _id: string;
  name: string;
  value: string;
};

type CategoriesProps = {
    specType: SpecsType;
    specTypeName: string;
    title: string;
    subline: string;
    addNewText: string;
};

function Spec({
    specType,
    specTypeName,
    title,
    subline,
    addNewText
}:CategoriesProps) {
  const { data } = useGetSpecsQuery(specType);
  const [deleteSpec] = useDeleteSpecMutation();
  const [showAddSpec, setShowAddSpec] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedSpec, setSelectedSpec] = useState<SpecDocument | null>(null);

  const onSpecDelete = async (id: string) => {
    try {
      // delete the category from the system
      const res = await deleteSpec({ id, specType }).unwrap();
      console.log(res);
      toast.success("Spec deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete spec.");
    }
  };

  const onClickEdit = (spec: SpecDocument) => {
    setMode("edit");
    setSelectedSpec(spec);
    setShowAddSpec(true);
  };

  const onClickAdd = () => {
    setMode("add");
    setSelectedSpec(null);
    setShowAddSpec(true);
  };

  return (
    <div className="flex flex-col flex-1 shrink-0 basis-[40%]">
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="mt-3 text-gray-400">{subline}</p>
      <div className="flex gap-5 items-center mt-10 mb-3 justify-between">
        <p className="">
          {addNewText}
        </p>
        <Button intent="primary" className="shrink-0" onClick={onClickAdd}>
          Add new
        </Button>
      </div>
      <div>
        <table className="border border-gray-200 w-full">
          <thead className="bg-gray-100">
            <tr className="border border-gray-200 ">
              <th className="border border-gray-200  p-4 text-gray-300 capitalize">
                {specTypeName}
              </th>
              <th className="border border-gray-200  p-4 text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((spec) => (
                <tr key={spec._id} className="border border-gray-200 ">
                  <td className="border border-gray-200  p-4">
                    {spec.name}
                  </td>
                  <td className="p-4 flex justify-end gap-3">
                    <Button
                      intent="primary"
                      size={"small"}
                      className="shrink-0"
                      onClick={() => onClickEdit(spec)}
                    >
                      Edit
                    </Button>
                    <Button
                      intent="secondary"
                      size={"small"}
                      className="shrink-0"
                      onClick={() => onSpecDelete(spec._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {showAddSpec && (
          <AddSpec
            setShow={setShowAddSpec}
            mode={mode}
            specType={specType}
            specTypeName = {specTypeName}
            selectedSpec={selectedSpec as SpecDocument}
          />
        )}
      </div>
    </div>
  );
}

export default Spec;
