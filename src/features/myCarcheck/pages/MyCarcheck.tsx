import { Link, Outlet, useLocation } from "react-router-dom";
import HeaderContextProvider from "../../../context/headerContextProvider";
import Header from "../../../layouts/Header";
import Container from "../../../components/ui/Container";
import { cn } from "../../../utils/mergeClasses";

function MyCarcheck() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="h-full overflow-y-scroll">
      <HeaderContextProvider>
        <Header />
      </HeaderContextProvider>
      <Container>
        <section className="py-5">
          <h2 className="text-2xl font-semibold mb-5">My carCheck</h2>
          <div className="flex justify-between border-b border-b-gray-200 mb-7 pb-2">
            <div className="flex gap-8">
              <div className="relative">
                <Link
                  to=""
                  className="text-gray-600 relative before:absolute before:-bottom-2 before:left-0 before:right-0 before:bg-gray-600 before:h-[0.17rem] before:rounded-full"
                >
                  Activity
                </Link>
              </div>
              <Link
                to=""
                className="text-gray-300 relative before:hidden hover:before:block before:absolute before:-bottom-2 before:left-0 before:right-0 before:bg-gray-300 before:h-[0.17rem] before:rounded-full"
              >
                Messages
              </Link>
              <Link
                to=""
                className="text-gray-300 relative before:hidden hover:before:block before:absolute before:-bottom-2 before:left-0 before:right-0 before:bg-gray-300 before:h-[0.17rem] before:rounded-full"
              >
                Account
              </Link>
            </div>
            <Link to="/myProfile" className="text-blue-300 underline">
              duanda_51 <span>(0)</span>{" "}
            </Link>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2">
              <div className="flex flex-col">
                <Link
                  to="/myCarcheck"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150": pathName === "/myCarcheck",
                  })}
                >
                  Summary
                </Link>
                <Link
                  to="/myCarcheck/recentlyViewed"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150":
                      pathName === "/myCarcheck/recentlyViewed",
                  })}
                >
                  Recently viewed
                </Link>
                <Link
                  to="/myCarcheck/bidsAndOffers"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150":
                      pathName === "/myCarcheck/bidsAndOffers",
                  })}
                >
                  Bids & offers
                </Link>
                <Link
                  to="/myCarcheck/purchases"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150":
                      pathName === "/myCarcheck/purchases",
                  })}
                >
                  Purchases
                </Link>
                <Link
                  to="/myCarcheck/Wishlist"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150":
                      pathName === "/myCarcheck/Wishlist",
                  })}
                >
                  Wishlist
                </Link>
                <Link
                  to="/myCarcheck/savedSearches"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150":
                      pathName === "/myCarcheck/savedSearches",
                  })}
                >
                  Saved searches
                </Link>
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

export default MyCarcheck;
