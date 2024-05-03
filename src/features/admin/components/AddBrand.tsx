import React from "react";
import { IoClose } from "react-icons/io5";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAddBrandMutation, useEditBrandMutation } from "../adminApiSlice";
import { ErrorResponse } from "../../../types";
import { toast } from "react-toastify";

type AddBrandProps = {
  setShowAddBrand: (showAddBrand: boolean) => void;
  mode: "add" | "edit";
  brandName: string;
  brandId: string;
  brandIndex: number;
  setBrandName: (brandName: string) => void;
};

function AddBrand({ setShowAddBrand,mode,brandId,brandName,brandIndex,setBrandName }: AddBrandProps) {
  const [addBrand] = useAddBrandMutation();
  const [editBrand] = useEditBrandMutation();
  const [brand, setBrand] = React.useState(brandName);
  const [brandError, setBrandError] = React.useState("");

  const onChangeBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
    if (e.target.value === "") {
      setBrandError("You must enter a brand name.");
    } else {
      setBrandError("");
    }
  };

  const onAddBrand = async () => {
    if (brand === "") {
      setBrandError("You must enter a brand name.");
      return;
    }
    // add the brand to the system
    try {
      await addBrand({ name: brand }).unwrap();
      toast.success("Brand added successfully.");
        setShowAddBrand(false);
    } catch (error) {
      console.log(error);
        const errorResponse = error as ErrorResponse;
      setBrandError(errorResponse.data.message || "Failed to add brand.");
    }
  };

  const onEditBrand = async () => {
    if (brand === "") {
      setBrandError("You must enter a brand name.");
      return;
    }
    // update the brand in the system
    try {
      await editBrand({ name: brand, id: brandId, index:brandIndex }).unwrap();
      toast.success("Brand updated successfully.");
      setBrandName("");
        setShowAddBrand(false);
    } catch (error) {
      console.log(error);
        const errorResponse = error as ErrorResponse;
      setBrandError(errorResponse.data.message || "Failed to update brand.");
    }
  }

  const onClose = () => {
    setShowAddBrand(false);
    setBrandName("");
  }

  return (
    <div className="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-xl shadow-lg border z-[10] w-96 h-fit">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium uppercase">{
            mode === "add" ? "Add new brand" : "Edit existing brand"
        }</h2>
        <IoClose
          className="text-2xl cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="mt-5 p-4">
        <form className="flex flex-col gap-3">
          <div>
            <Input
              type="text"
              id="brand"
              className="border-gray-200 bg-gray-20"
              placeholder="Brand name"
              value={brand}
              onChange={onChangeBrand}
            />
            {brandError && (
              <p className="text-sm text-red-300 mt-2">{brandError}</p>
            )}
          </div>
          <Button
            intent={"secondary"}
            className="rounded-xl mt-3"
            type="submit"
            onClick={(e)=>{
                e.preventDefault()
                if(mode === "add"){
                    onAddBrand()
                }
                if(mode === "edit"){
                    onEditBrand()
                }
            }}
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddBrand;
