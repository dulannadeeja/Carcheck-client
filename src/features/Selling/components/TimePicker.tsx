import React, { useCallback, useEffect } from "react";
import { add, format } from "date-fns";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFieldHandler,
  validateFieldHandler,
} from "../inspectionReqSlice";
import { cn } from "../../../utils/mergeClasses";

const TimePicker: React.FC = () => {
  const dispatch = useDispatch();
  const [slots, setSlots] = React.useState<Date[]>([]);
  const { errors, inspectionTime, inspectionDate } = useSelector(
    (state: RootState) => state.inspectionReq
  );

  const getTimeSlots = useCallback(() => {
    if (!inspectionDate) {
      return [];
    } else {
      // convert value to a date object
      const date = new Date(inspectionDate);
      // convert value to start of the day
      date.setHours(0, 0, 0, 0);

      // set the beginning and end of the day
      const beginning = add(date, { hours: 9 }); // 9:00 AM
      const end = add(date, { hours: 17 }); // 5:00 PM
      const interval = 30; // 30 minutes

      const slots = [];

      for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
        slots.push(new Date(i));
      }

      return slots;
    }
  }, [inspectionDate]);

  useEffect(() => {
    setSlots(getTimeSlots());
  }, [inspectionDate, getTimeSlots]);

  const handleChange = useCallback(
    (value: Date) => {
      // validate and set the value to the state
      dispatch(
        updateFieldHandler({
          field: "inspectionTime",
          value: value,
        })
      );
      dispatch(
        validateFieldHandler({
          field: "inspectionTime",
          value: value,
        })
      );
    },
    [dispatch]
  );

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-6">
        <h2 className="text-lg font-semibold">Select a time slot</h2>
        <p className="text-gray-300">
          Please be aware that the time slot you select will be the time you
          will be available for the inspection.
        </p>
      </div>
      <div className="flex flex-col gap-3 col-span-6">
        <p className="text-sm text-gray-300">Available slots</p>
        <div className="flex gap-3 flex-wrap">
          {slots.map((slot) => (
            <div
              onClick={() => handleChange(slot)}
              key={slot.getTime()}
              className={cn(
                "bg-gray-50 border-gray-100 shadow-sm border py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer",
                {
                  "bg-gray-100 border-blue-300":
                    inspectionTime && new Date(inspectionTime).getTime() === slot.getTime(),
                }
              )}
            >
              {format(slot, "kk:mm")}
            </div>
          ))}
        </div>
        {errors.inspectionTime && (
          <p className="text-red-300 text-sm mt-1">{errors.inspectionTime}</p>
        )}
      </div>
    </div>
  );
};

export default TimePicker;
