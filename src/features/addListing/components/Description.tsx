import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";

function Description() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { description } = data;

  const onChangeHandler = (value: string) => {
    dispatch(updateFieldHandler({ field: "description", value }));
    dispatch(validateFieldHandler({ field: "description", value }));
  };

  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-lg uppercase font-medium">Description</h3>
      <div>
        <textarea
          value={description}
          onChange={(e) => onChangeHandler(e.target.value)}
          className="w-full h-[20rem] border border-gray-200 rounded-md p-4"
          placeholder="Write a detailed description of your item. Include details like its condition, features, and any other information that will help buyers understand what you're selling."
        ></textarea>
        {/* character counter */}
        <p className="text-sm text-gray-400 mt-2">{description.length}/500</p>
        {errors.description && (
          <p className="text-red-300 text-sm mt-1">{errors.description}</p>
        )}
      </div>
    </div>
  );
}

export default Description;
