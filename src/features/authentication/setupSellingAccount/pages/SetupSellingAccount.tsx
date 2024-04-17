import ContainerSmall from "../../../../components/ui/ContainerSmall";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../../../assets/brand/logo.svg";
import { cn } from "../../../../utils/mergeClasses";

function SetupSellingAccount() {
  const location = useLocation();
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
        <main className="">
          <div className="flex gap-2 font-medium justify-between">
            <h2
              className={cn(
                "text-base border-b-2 border-solid border-gray-200 pb-1",
                {
                  "border-gray-800": location.pathname === "/selling/register",
                }
              )}
            >
              1. Complete your personal info
            </h2>
            <h2
              className={cn(
                "text-base border-b-2 border-solid border-gray-200 pb-1",
                {
                  "border-gray-800":
                    location.pathname === "/selling/register/identity-info",
                }
              )}
            >
              2. Verify your identity
            </h2>
            <h2 className={
              cn(
                "text-base border-b-2 border-solid border-gray-200 pb-1",
                {
                  "border-gray-800":
                    location.pathname === "/selling/register/financial-info",
                }
              )
            }
            >
              3. Add your financial info
            </h2>
            <h2 className={
              cn(
                "text-base border-b-2 border-solid border-gray-200 pb-1",
                {
                  "border-gray-800":
                    location.pathname === "/selling/register/submit-registration",
                }
              )
            }>
              4. Submit registration info
            </h2>
          </div>
          <div className="mt-8">
            <Outlet />
          </div>
        </main>
      </ContainerSmall>
    </div>
  );
}

export default SetupSellingAccount;
