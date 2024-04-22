import React from "react";
import Input from "../../../../components/ui/Input";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";

const MAX_TITLE_LENGTH = 80;

function Title() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);

  const { title } = data;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_TITLE_LENGTH) {
      dispatch(updateFieldHandler({ field: "title", value: e.target.value }));
      dispatch(validateFieldHandler({ field: "title", value: e.target.value }));
    }
  };

  return (
    <div className="flex flex-col ">
      <h3 className="text-lg uppercase font-medium my-4">title</h3>
      <Input
        placeholder="Title"
        className="border-gray-200 bg-gray-50 h-10 mb-1"
        onChange={handleTitleChange}
        value={title}
      />
      <div className="flex justify-between gap-5 items-center w-full">
        {errors.title && (
          <p className="text-red-300 text-sm">{errors["title"]}</p>
        )}
        <p className="ml-auto">
          {title.length}/{MAX_TITLE_LENGTH}
        </p>
      </div>
    </div>
  );
}

export default Title;
