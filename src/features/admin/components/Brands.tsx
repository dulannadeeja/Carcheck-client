import { useState } from "react";
import Button from "../../../components/ui/Button";
import AddBrand from "./AddBrand";
import { useDeleteBrandMutation, useGetBrandsQuery } from "../adminApiSlice";
import { toast } from "react-toastify";

function Brands() {
  const { data } = useGetBrandsQuery();
  const [deleteBrand] = useDeleteBrandMutation();
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(0);

  const onBrandDelete = async (id: string) => {
    try {
      // delete the brand from the system
      const res = await deleteBrand(id).unwrap();
      console.log(res);
      toast.success("Brand deleted successfully.");
    } catch (error) {
      console.log(error);
        toast.error("Failed to delete brand.");
    }
  }

  const onClickEdit = (id:string,name:string,index:number) => {
    setMode("edit");
    setSelectedBrand(name);
    setSelectedBrandId(id);
    setSelectedBrandIndex(index);
    setShowAddBrand(true);
  }

  const onClickAdd = () => {
    setMode("add");
    setShowAddBrand(true);
  }


  return (
    <div className="flex flex-col w-1/2">
      <h2 className="text-lg font-medium">Brands of vehicles</h2>
      <p className="mt-3 text-gray-400">
        This is the list of brands of vehicles that are available in the system.
        this list of brands are used to categorize the vehicles in the system.
      </p>
      <div className="flex gap-5 items-center mt-10 mb-3 justify-between">
        <p className="">
          Is there a brand that is not in the list? You can add a new brand to
          the list.
        </p>
        <Button
          intent="primary"
          className="shrink-0"
          onClick={onClickAdd}
        >
          Add new
        </Button>
      </div>
      <div>
        <table className="border border-gray-200 w-full">
          <thead className="bg-gray-100">
            <tr className="border border-gray-200 ">
              <th className="border border-gray-200  p-4 text-gray-300">
                Brand
              </th>
              <th className="border border-gray-200  p-4 text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((brand) => (
              <tr key={brand._id} className="border border-gray-200 ">
                <td className="border border-gray-200  p-4">{brand.name}</td>
                <td className="p-4 flex justify-end gap-3">
                  <Button intent="primary" size={"small"} className="shrink-0"
                    onClick={()=>onClickEdit(brand._id, brand.name, brand.index as number)}
                  >
                    Edit
                  </Button>
                  <Button
                    intent="secondary"
                    size={"small"}
                    className="shrink-0"
                    onClick={() => onBrandDelete(brand._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showAddBrand && <AddBrand 
        setShowAddBrand={setShowAddBrand} 
        mode={mode} brandId={selectedBrandId} 
        brandName={selectedBrand}
        brandIndex={selectedBrandIndex}
        setBrandName={setSelectedBrand}
        />}
      </div>
    </div>
  );
}

export default Brands;

