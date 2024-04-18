import RadioButton from "../../../../components/ui/RadioButton";
import UploadFile from "./UploadFile";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPhotoID,
  setPhotoID,
  setPhotoIDError,
  setPhotoIDType,
} from "../uploadDocsSlice";
import { RootState } from "../../../../store/store";
import { IdentityVerificationDocType } from "../../auth";
import { useCallback } from "react";

function IdentityDocs() {
  const { typeOfPhotoID, photoIDError } = useSelector(
    (state: RootState) => state.uploadDocs
  );

  const dispatch = useDispatch();

  const onSuccessfulUpload = useCallback(
    (name: string) => {
      dispatch(setPhotoID(name));
    },
    [dispatch]
  );

  const onUploadError = useCallback(
    (error: string) => {
      dispatch(setPhotoIDError(error));
    },
    [dispatch]
  );

  const onRemove = () => {
    dispatch(resetPhotoID());
  };

  const setError = useCallback(
    (error: string) => {
      dispatch(setPhotoIDError(error));
    },
    [dispatch]
  );

  return (
    <div>
      <h1 className="text-xl font-medium mb-3">Government-issued photo ID</h1>
      <p className="mb-5">
        Upload a government-issued ID that clearly shows your full name and
        complete photo.{" "}
      </p>
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex gap-2 items-center">
          <RadioButton
            id="nationalId"
            name="identityType"
            checked={typeOfPhotoID === IdentityVerificationDocType.nationalId}
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(
                  setPhotoIDType(IdentityVerificationDocType.nationalId)
                );
              }
            }}
          />
          <label htmlFor="nationalId">National ID</label>
        </div>
        <div className="flex gap-2 items-center">
          <RadioButton
            id="passport"
            name="identityType"
            checked={typeOfPhotoID === IdentityVerificationDocType.passport}
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(setPhotoIDType(IdentityVerificationDocType.passport));
              }
            }}
          />
          <label htmlFor="passport">Passport</label>
        </div>
        <div className="flex gap-2 items-center">
          <RadioButton
            id="drivingLicense"
            name="identityType"
            checked={
              typeOfPhotoID === IdentityVerificationDocType.drivingLicense
            }
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(
                  setPhotoIDType(IdentityVerificationDocType.drivingLicense)
                );
              }
            }}
          />
          <label htmlFor="drivingLicense">Driving license</label>
        </div>
      </div>
      <UploadFile
        onSuccessfulUpload={onSuccessfulUpload}
        onUploadError={onUploadError}
        onRemove={onRemove}
        error={photoIDError}
        setError={setError}
      />
    </div>
  );
}

export default IdentityDocs;
