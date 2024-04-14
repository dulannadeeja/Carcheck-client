import { useCallback, useMemo } from "react";
import ReactCalendar from "react-calendar";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFieldHandler,
  validateFieldHandler,
} from "../inspectionReqSlice";

const Calendar = () => {
  const dispatch = useDispatch();
  const { errors, inspectionDate } = useSelector(
    (state: RootState) => state.inspectionReq
  );

  const minDate = useMemo(() => new Date(), []);
  const maxDate = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  }, []);

  const selectedDate = useMemo(
    () => (inspectionDate ? new Date(inspectionDate) : new Date()),
    [inspectionDate]
  );

  console.log(selectedDate);

  const handleChange = useCallback(
    (value: Date) => {
      dispatch(
        updateFieldHandler({
          field: "inspectionDate",
          value: value,
        })
      );
      dispatch(
        validateFieldHandler({
          field: "inspectionDate",
          value: value,
        })
      );
      dispatch(validateFieldHandler({ field: "inspectionTime", value: "" }));
      dispatch(updateFieldHandler({ field: "inspectionTime", value: "" }));
    },
    [dispatch]
  );

  return (
    <div className="grid grid-cols-12 gap-5 border-b pb-8 border-gray-200">
      <div className="col-span-6">
        <h2 className="text-lg font-semibold">Select a date</h2>
        <p className="text-gray-300">
          Please be responsible and select a date you will be available for the
          inspection.
        </p>
      </div>
      <div className="col-span-6">
        <ReactCalendar
          minDate={minDate}
          maxDate={maxDate}
          className="react-calendar"
          view="month"
          value={selectedDate}
          onClickDay={handleChange}
        />
        {errors.inspectionDate && (
          <p className="text-red-300 text-sm mt-1">{errors.inspectionDate}</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
