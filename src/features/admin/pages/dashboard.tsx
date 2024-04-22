import { Link, Outlet, useLocation } from "react-router-dom";
import HeaderContextProvider from "../../../context/headerContextProvider";
import Header from "../../../layouts/Header";
import Container from "../../../components/ui/Container";
import { cn } from "../../../utils/mergeClasses";
import FileDownloader from "../../download/components/FileDownloader";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";

function Dashborad() {
  const location = useLocation();
  const pathName = location.pathname;
  const [isDownloaderOpen, setIsDownloaderOpen] = useState(false);
  const { queue } = useSelector((state: RootState) => state.downloader);

  useEffect(() => {
    if (queue.length > 0) {
      setIsDownloaderOpen(true);
    } else {
      setIsDownloaderOpen(false);
    }
  }, [queue]);

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
                  to="/admin/brands"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150": pathName === "/admin/brands",
                  })}
                >
                  Brands
                </Link>
                <Link
                  to="/admin/vehicles"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150": pathName === "/admin/vehicles",
                  })}
                >
                  Vehicles
                </Link>
                <Link
                  to="/admin/specs"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150": pathName === "/admin/specs",
                  })}
                >
                  Specifications
                </Link>
                <Link
                  to="/admin/accounts"
                  className={cn("px-3 py-2 font-medium", {
                    "text-blue-300 bg-gray-150": pathName === "/admin/accounts",
                  })}
                >
                  Accounts
                </Link>
              </div>
            </div>
            <div className="col-span-10">
              <Outlet />
            </div>
          </div>
        </section>
        {isDownloaderOpen && <FileDownloader />}
      </Container>
    </div>
  );
}

export default Dashborad;
