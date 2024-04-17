import { Link, Outlet, useLocation } from "react-router-dom";
import HeaderContextProvider from "../../../context/headerContextProvider";
import Header from "../../../layouts/Header";
import Container from "../../../components/ui/Container";
import { cn } from "../../../utils/mergeClasses";

function Dashborad() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="h-full overflow-y-scroll">
      <HeaderContextProvider>
        <Header />
      </HeaderContextProvider>
      <Container>
        <section className="py-5">
          <h2 className="text-2xl font-semibold mb-5">Dashboard - Admin</h2>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2">
              <div className="flex flex-col gap-3">
                <Link
                  to="/admin"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150": pathName === "/admin",
                  })}
                >
                  Overview
                </Link>
                <Link
                  to="/admin/activity"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150": pathName === "/admin/activity",
                  })}
                >
                  Activity
                </Link>
                <Link
                  to="/admin/inspection"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150":
                      pathName === "/admin/inspection",
                  })}
                >
                  Accounts
                </Link>
                <div className="flex flex-col gap2">
                  <Link
                    to="/admin/accounts"
                    className={cn("px-3 py-2 font-medium", {
                      "text-blue-300 bg-gray-150":
                        pathName === "/admin/accounts",
                    })}
                  >
                    Accounts
                  </Link>
                  <ul className="text-gray-300 pl-4 flex flex-col gap-1">
                    <li>
                      <Link
                        to="/admin/accounts/pending"
                        className={cn("px-3 py-2", {
                          "text-blue-300 bg-gray-150":
                            pathName === "/admin/accounts/pending",
                        })}
                      >
                        Pending
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/accounts/suspended"
                        className={cn("px-3 py-2", {
                          "text-blue-300 bg-gray-150":
                            pathName === "/admin/accounts/suspended",
                        })}
                      >
                        Suspended
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/accounts/active"
                        className={cn("px-3 py-2", {
                          "text-blue-300 bg-gray-150":
                            pathName === "/admin/accounts/active",
                        })}
                      >
                        Active
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-10">
              <Outlet />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default Dashborad;
