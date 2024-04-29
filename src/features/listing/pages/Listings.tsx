import HeaderContextProvider from "../../../context/headerContextProvider";
import Header from "../../../layouts/Header";
import Filter from "../filters/components/Filter";
import ListingsSection from "../components/ListingsSection";
import Ads from "../components/Ads";
import Container from "../../../components/ui/Container";
import FormatListing from "../components/FormatListing";
import SortListings from "../components/SortListings";
import DeliveryOptionsQuickFilter from "../filters/components/DeliveryOptionsQuickFilter";
import ConditionQuickFilter from "../filters/components/ConditionQuickFilter";
import ListingTypeQuickFilter from "../filters/components/ListingTypeQuickFilter";
import CurrentSearch from "../components/CurrentSearch";
import MobileSortListings from "../components/MobileSortListings";
import MobileFilter from "../filters/components/MobileFilter";
import { useEffect, useState } from "react";
import { cn } from "../../../utils/mergeClasses";
import MobileListingTypeQuickFilter from "../filters/components/MobileListingTypeQuickFilter";
import { useDispatch, useSelector } from "react-redux";
import { useGetListingsQuery } from "../clientListingApi";
import { RootState } from "../../../store/store";
import { setListings, setTotalListings } from "../clientListingSlice";


function Listings() {
  const dispatch = useDispatch();
  const { filterOptions } = useSelector((state: RootState) => state.clientListing);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { data, isSuccess, isError } = useGetListingsQuery(filterOptions);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setListings(data.data));
      dispatch(setTotalListings(data.total) || 0);
    } else if (isError) {
      dispatch(setListings([]));
    }
  }, [data, isSuccess, isError, dispatch]);

  return (
    <>
      <div
        className={cn("h-full overflow-y-scroll overflow-x-hidden", {
          "overflow-hidden": isModelOpen,
        })}
      >
        <HeaderContextProvider>
          <Header />
        </HeaderContextProvider>

        <Container>
          <main>
            <section className="md:grid md:grid-cols-12 gap-4 mt-5 md:mt-8">
              <aside className="md:col-span-3 xl:col-span-2 hidden md:block">
                <Filter />
              </aside>
              <section className="md:col-span-9  xl:col-span-8">
                {/* start listing options for larger screens */}
                <section className="hidden md:flex gap-10 mb-4">
                  <CurrentSearch />
                </section>
                <section className="hidden md:flex gap-2 mb-4 justify-between text-xs">
                  {/* quick filter options*/}
                  <div className="flex gap-2">
                    <ListingTypeQuickFilter />
                    <ConditionQuickFilter />
                    <DeliveryOptionsQuickFilter />
                  </div>
                  {/* listing sort and format options*/}
                  <div className="flex gap-2">
                    <SortListings />
                    <FormatListing />
                  </div>
                </section>
                {/* end listing options for larger screens */}

                {/* start listing options for mobile screens */}
                <section className="md:hidden text-sm">
                  <div className="flex gap-2 mb-4 justify-between">
                    <CurrentSearch />
                    <div className="flex items-center gap-6">
                      <MobileSortListings setIsModelOpen={setIsModelOpen} />
                      <MobileFilter setIsModelOpen={setIsModelOpen} />
                    </div>
                  </div>
                  <hr className="mb-2" />
                  <div>
                    <MobileListingTypeQuickFilter />
                  </div>
                </section>
                {/* end listing options for mobile screens*/}
                <ListingsSection />
              </section>
              <aside className="hidden xl:block xl:col-span-2">
                <Ads />
              </aside>
            </section>
          </main>
        </Container>
      </div>
    </>
  );
}

export default Listings;
