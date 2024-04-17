import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/brand/logo.svg";
import Button from "../../../../components/ui/Button";
import ContainerSmall from "../../../../components/ui/ContainerSmall";

function StartSelling() {
  const navigate = useNavigate();
  return (
    <div className="text-sm h-screen overflow-y-scroll">
      <ContainerSmall>
        <header className="">
          <div className="my-5 mb-10">
            <Link to="/">
              <img src={logo} alt="logo" className="w-40" />
            </Link>
          </div>
          <h1 className="text-xl font-medium">Set up your selling account</h1>
        </header>
        <main className="text-sm">
          <div>
            <h2 className="font-medium my-6">1. Complete your personal info</h2>
            <p className="mb-3">
              Before you can start selling, we need some information about you.
            </p>
            <p className="mb-3">
              Carefully fill out the form with your personal information. Make
              sure to provide accurate information to avoid any issues with your
              account.
            </p>
            <p>
              All information you provide will be kept confidential and will not
              be shared with third parties.
            </p>
          </div>
          <div>
            <h2 className="font-medium my-6">2. Verify your identity</h2>
            <p className="mb-3">
              To ensure the security of your account and prevent fraud, we need
              to verify your identity.
            </p>
            <p>
              You will need to upload a valid ID card or passport. Make sure the
              document is not expired and the information is clearly visible.
            </p>
          </div>
          <div>
            <h2 className="font-medium my-6">3. Add your financial info</h2>
            <p>
              To receive payments for your sales, you need to provide your bank
              account information.
            </p>
          </div>
          <h2 className="font-medium my-6">4. Submit registration info</h2>
          <p className="mb-5">
            Carcheck will verify your details, and we'll let you know when your
            account is ready to go.
          </p>
          <p className="text-gray-300 mb-6">
            by proceeding, you agree that any information you have provided or
            will provide to Carcheck is accurate and complete.
            <Link to="/terms" className="text-blue-300">
              Terms and conditions
            </Link>
          </p>
          <Button
            intent={"primary"}
            className="rounded-full"
            onClick={() => navigate("/selling/register")}
          >
            Get started
          </Button>
        </main>
      </ContainerSmall>
    </div>
  );
}

export default StartSelling;
