import BidsItems from "./BidsItems";
import OffersItems from "./OffersItems";

function BidsAndOffers() {
  return (
    <div>
      <div>
        <h3 className="text-xl font-medium">Bidding</h3>
        <BidsItems />
        <h3 className="text-xl font-medium">Offers</h3>
        <OffersItems />
      </div>
    </div>
  );
}

export default BidsAndOffers;
