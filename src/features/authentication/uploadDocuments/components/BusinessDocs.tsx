import UploadFile from "./UploadFile";
import { useDispatch, useSelector } from "react-redux";
import {
  resetBusinessRegistration,
  setBusinessDocType,
  setBusinessRegistration,
  setBusinessRegistrationError,
} from "../uploadDocsSlice";
import RadioButton from "../../../../components/ui/RadioButton";
import { RootState } from "../../../../store/store";
import { BusinessVerificationDocType } from "../../auth";
import { useCallback } from "react";

function BusinessDocs() {
  const dispatch = useDispatch();
  const { typeOfBusinessDoc, businessRegistrationError } = useSelector(
    (state: RootState) => state.uploadDocs
  );

  const setError = useCallback(
    (error: string) => dispatch(setBusinessRegistrationError(error)),
    [dispatch]
  );

  const onSuccessfulUpload = useCallback(
    (name: string) => {
      dispatch(setBusinessRegistration(name));
    },
    [dispatch]
  );

  const onUploadError = useCallback(
    (error: string) => {
      dispatch(setBusinessRegistrationError(error));
    },
    [dispatch]
  );

  const onRemove = () => {
    dispatch(resetBusinessRegistration());
  };

  return (
    <div>
      <h1 className="text-xl font-medium mb-3">Provide proof of business</h1>
      <p className="mb-5">
        Upload a government-issued business registration document that clearly
        shows your business name and registration number.
      </p>
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex gap-2 items-center">
          <RadioButton
            id="businessReg"
            name="businessProof"
            checked={
              typeOfBusinessDoc ===
              BusinessVerificationDocType.businessRegistration
            }
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(
                  setBusinessDocType(
                    BusinessVerificationDocType.businessRegistration
                  )
                );
              }
            }}
          />
          <label htmlFor="businessReg">Business Registration</label>
        </div>
        <div className="flex gap-2 items-center">
          <RadioButton
            id="bankDoc"
            name="businessProof"
            checked={
              typeOfBusinessDoc === BusinessVerificationDocType.bankDocument
            }
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(
                  setBusinessDocType(BusinessVerificationDocType.bankDocument)
                );
              }
            }}
          />
          <label htmlFor="bankDoc">Bank Document</label>
        </div>
      </div>
      <UploadFile
        onSuccessfulUpload={onSuccessfulUpload}
        onUploadError={onUploadError}
        onRemove={onRemove}
        error={businessRegistrationError}
        setError={setError}
      />
    </div>
  );
}

export default BusinessDocs;
