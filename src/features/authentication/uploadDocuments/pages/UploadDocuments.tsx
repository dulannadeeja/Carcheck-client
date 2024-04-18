import { Link, useNavigate } from "react-router-dom";
import ContainerSmall from "../../../../components/ui/ContainerSmall";
import logo from "../../../../assets/brand/logo.svg";
import IdentityDocs from "../components/IdentityDocs";
import BusinessDocs from "../components/BusinessDocs";
import Button from "../../../../components/ui/Button";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setBusinessRegistrationError,
  setPhotoIDError,
} from "../uploadDocsSlice";
import { useSubmitDocsMutation } from "../uploadDocsApiSlice";
import { SellerDocsInput } from "../schema/docsSchema";
import { toast } from "react-toastify";

function UploadDocuments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitDocs] = useSubmitDocsMutation();
  const {
    photoID,
    photoIDError,
    businessRegistration,
    businessRegistrationError,
    typeOfPhotoID,
    typeOfBusinessDoc,
  } = useSelector((state: RootState) => state.uploadDocs);

  const submitHandler = async () => {
    if (!validateDocs()) {
      return;
    }
    try {
      const input: SellerDocsInput = {
        identityDoc: photoID,
        businessDoc: businessRegistration,
        identityDocType: typeOfPhotoID,
        businessDocType: typeOfBusinessDoc,
      };
      const response = await submitDocs(input).unwrap();
      toast.success(response.message);
      // navigate to the home page
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const validateDocs = () => {
    if (!photoID || !businessRegistration) {
      if (!photoID) {
        dispatch(setPhotoIDError("Looks like you forgot to upload photo ID"));
      }
      if (!businessRegistration) {
        dispatch(
          setBusinessRegistrationError(
            "Looks like you forgot to upload proof of business"
          )
        );
      }
      return false;
    }
    if (photoIDError || businessRegistrationError) {
      return false;
    }
    return true;
  };

  return (
    <div className="text-sm h-screen overflow-y-scroll">
      <ContainerSmall>
        <header className="">
          <div className="my-5 mb-10">
            <Link to="/">
              <img src={logo} alt="logo" className="w-40" />
            </Link>
          </div>
        </header>
        <main className="flex flex-col gap-10 max-w-md mx-auto mb-40">
          <IdentityDocs />
          <BusinessDocs />
          <div>
            <p className="bg-gray-100 p-3 rounded-md mb-5">
              After uploading the documents, we will review them and get back to
              you within 7 business days.
            </p>
            <div className="flex gap-3">
              <Button intent={"secondary"} className="rounded-full">
                Cancel
              </Button>
              <Button
                intent={"primary"}
                className="rounded-full"
                onClick={submitHandler}
              >
                Submit documents
              </Button>
            </div>
          </div>
        </main>
      </ContainerSmall>
    </div>
  );
}

export default UploadDocuments;
