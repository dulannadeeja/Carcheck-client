import React, { useState, useEffect } from "react";
import { IoChevronDownOutline, IoClose } from "react-icons/io5";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Checkbox from "../../../components/ui/Checkbox";
import { toast } from "react-toastify";
import {
  useCreateVehicleModelMutation,
  useEditVehicleModelMutation,
  useGetBrandsQuery,
  useGetSpecsQuery,
} from "../adminApiSlice";
import { BrandDocument } from "../admin";
import { SpecDocument } from "./Spec";
import { ErrorResponse } from "react-router-dom";
import { Vehicle } from "../../listing/clientListing";

type ModelErrors = {
  brand: string;
  model: string;
  categories: string;
};

type AddVehicleModelProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedModel?: Vehicle;
  mode: "add" | "edit";
};

function AddVehicleModel({
  setShow,
  selectedModel,
  mode,
}: AddVehicleModelProps) {
  const { data: brands } = useGetBrandsQuery();
  const [editVehicleModel] = useEditVehicleModelMutation();
  const { data: categories } = useGetSpecsQuery("categories");
  const [createVehicleModel, { isLoading }] = useCreateVehicleModelMutation();
  const [selectedBrand, setSelectedBrand] = useState<BrandDocument | null>(
    null
  );
  const [selectedCategories, setSelectedCategories] = useState<SpecDocument[]>(
    []
  );
  const [modelName, setModelName] = useState("");
  const [errors, setErrors] = useState({
    brand: "",
    model: "",
    categories: "",
  });
  const [showBrands, setShowBrands] = useState(false);

  useEffect(() => {
    if (selectedModel) {
      // find the brand document from the brands array
      const brand = brands?.find((b) => b._id === selectedModel.make._id);
      setSelectedBrand(brand || null);
      setModelName(selectedModel.vehicleModel);
      // find the categories from the categories array
      const selectedCats = categories?.filter((c) =>
        selectedModel.category.includes(c._id)
      );
      setSelectedCategories(selectedCats || []);
    }
  }, [selectedModel, brands, categories]);

  const validateForm = () => {
    const newErrors: ModelErrors = {
      brand: "",
      model: "",
      categories: "",
    };
    if (!modelName) newErrors.model = "Model name is required.";
    if (!selectedBrand) newErrors.brand = "Brand selection is required.";
    if (selectedCategories.length === 0)
      newErrors.categories = "At least one category must be selected.";

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const onSave = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await createVehicleModel({
        vehicleModel: modelName,
        make: selectedBrand?._id as string,
        category: selectedCategories.map((c) => c.name),
      }).unwrap();
      toast.success("Vehicle model added successfully.");
      setShow(false);
    } catch (error) {
      const responseError = error as ErrorResponse;
      toast.error(responseError.data.message || "Failed to add vehicle model.");
    }
  };

  const onUpdate = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await editVehicleModel({
        id: selectedModel?._id as string,
        vehicleModel: modelName,
        make: selectedBrand?._id as string,
        category: selectedCategories.map((c) => c.name),
      }).unwrap();
      toast.success("Vehicle model updated successfully.");
      setShow(false);
    } catch (error) {
      const responseError = error as ErrorResponse;
      toast.error(
        responseError.data.message || "Failed to update vehicle model."
      );
    }
  };

  const onCategoryChange = (category: SpecDocument) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) =>
        prev.filter((c) => c._id !== category._id)
      );
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  return (
    <div className="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-xl shadow-lg border z-10 w-96 h-fit">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium uppercase">Add a vehicle model</h2>
        <IoClose
          className="text-2xl cursor-pointer"
          onClick={() => setShow(false)}
        />
      </div>
      <form
        className="mt-5 p-4 flex flex-col gap-5"
        onSubmit={mode === "add" ? onSave : onUpdate}
      >
        <div>
          <Input
            type="text"
            className="border-gray-200 bg-gray-50"
            placeholder="Vehicle model name"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
          />
          {errors.model && (
            <p className="text-red-300 text-sm">{errors.model}</p>
          )}
        </div>
        <div>
          <div
            onClick={() => {
              setShowBrands(!showBrands);
            }}
            className="cursor-pointer relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
          >
            {selectedBrand ? selectedBrand.name : "Select a brand"}
            <IoChevronDownOutline />
            {showBrands && (
              <div className="z-[50]  flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
                {brands?.map((brand) => (
                  <div
                    key={brand._id}
                    onClick={() => setSelectedBrand(brand)}
                    className="p-1 hover:bg-gray-100"
                  >
                    {brand.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.brand && (
            <p className="text-red-300 text-sm">{errors.brand}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categories?.map((category) => (
            <label key={category._id} className="flex items-center gap-2">
              <Checkbox
                onChange={() => onCategoryChange(category)}
                checked={selectedCategories.includes(category)}
              />
              {category.name}
            </label>
          ))}
          {errors.categories && (
            <p className="text-red-300 text-sm">{errors.categories}</p>
          )}
        </div>
        <Button type="submit" disabled={isLoading} className="mt-4">
          Save
        </Button>
      </form>
    </div>
  );
}

export default AddVehicleModel;
