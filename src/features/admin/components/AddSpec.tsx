import React from "react";
import { IoClose } from "react-icons/io5";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { ErrorResponse } from "../../../types";
import { toast } from "react-toastify";
import { useAddSpecMutation, useEditSpecMutation } from "../adminApiSlice";
import { SpecsType } from "../admin";
import { SpecDocument } from "./Spec";

type AddSpecProps = {
    setShow: (show: boolean) => void;
    mode: "add" | "edit";
    specType: SpecsType;
    specTypeName: string;
    selectedSpec: SpecDocument;
};

function AddSpec({
    setShow,
    mode,
    specType,
    specTypeName,
    selectedSpec,
}: AddSpecProps) {
    const [addSpec] = useAddSpecMutation();
    const [editSpec] = useEditSpecMutation();
    const [specName, setSpecName] = React.useState( mode === "edit" ? selectedSpec.name : "");
    const [specError, setSpecError] = React.useState("");

    const onChangeSpecName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpecName(e.target.value);
        if (e.target.value === "") {
            setSpecError(`You must enter a ${specTypeName} name.`);
        } else {
            setSpecError("");
        }
    };

    const onAddSpec = async () => {
        if (specName === "") {
            setSpecError(`You must enter a ${specTypeName} name.`);
            return;
        }
        try {
            await addSpec({ name: specName, specType }).unwrap();
            toast.success(`${specType.charAt(0).toUpperCase() + specType.slice(1)} added successfully.`);
            setShow(false);
        } catch (error) {
            console.log(error);
            const errorResponse = error as ErrorResponse;
            setSpecError(errorResponse.data.message || `Failed to add ${specTypeName}.`);
        }
    };

    const onEditSpec = async () => {
        if (specName === "") {
            setSpecError(`You must enter a ${specType} name.`);
            return;
        }
        try {
            await editSpec({ name: specName, id: selectedSpec._id, specType }).unwrap();
            toast.success(`${specType.charAt(0).toUpperCase() + specType.slice(1)} updated successfully.`);
            setShow(false);
        } catch (error) {
            console.log(error);
            const errorResponse = error as ErrorResponse;
            setSpecError(errorResponse.data.message || `Failed to update ${specTypeName}.`);
        }
    };

    const onClose = () => {
        setShow(false);
    }

    return (
        <div className="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-xl shadow-lg border z-[10] w-96 h-fit">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium uppercase">{mode === "add" ? `Add new ${specTypeName}` : `Edit existing ${specTypeName}`}</h2>
                <IoClose
                    className="text-2xl cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <div className="mt-5 p-4">
                <form className="flex flex-col gap-3">
                    <Input
                        type="text"
                        id={`${specType}Name`}
                        className="border-gray-200 bg-gray-20"
                        placeholder={`${specTypeName} name`}
                        value={specName}
                        onChange={onChangeSpecName}
                    />
                    {specError && (
                        <p className="text-sm text-red-300 mt-2">{specError}</p>
                    )}
                    <Button
                        intent="secondary"
                        className="rounded-xl mt-3"
                        onClick={(e) => {
                            e.preventDefault();
                            mode === "add" ? onAddSpec() : onEditSpec();
                        }}
                    >
                        Save
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AddSpec;
