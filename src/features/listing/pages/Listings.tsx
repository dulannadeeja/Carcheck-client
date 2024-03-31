import HeaderContextProvider from "../../../context/headerContextProvider";
import Header from "../../../layouts/Header";
import Filter from "../../filter/components/Filter";
import ListingsSection from "../components/ListingsSection";
import Ads from "../components/Ads";
import Container from "../../../components/ui/Container";
import FormatListing from "../components/FormatListing";
import SortListings from "../components/SortListings";
import DeliveryOptionsQuickFilter from "../../filter/components/DeliveryOptionsQuickFilter";
import ConditionQuickFilter from "../../filter/components/ConditionQuickFilter";
import ListingTypeQuickFilter from "../../filter/components/ListingTypeQuickFilter";
import CurrentSearch from "../components/CurrentSearch";
import MobileSortListings from "../components/MobileSortListings";
import MobileFilter from "../../filter/components/MobileFilter";
import { useState } from "react";
import { cn } from "../../../utils/mergeClasses";
import MobileListingTypeQuickFilter from "../../filter/components/MobileListingTypeQuickFilter";

function Listings() {
  const [isModelOpen, setIsModelOpen] = useState(false);

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
