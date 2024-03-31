import React from "react";

function AboutThisItem() {
  return (
    <div>
      <section className="pb-6">
        <h3 className="text-xl font-medium pb-4">Item specifics</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="grid grid-cols-6">
            <p className="col-span-2 text-gray-300">Condition:</p>
            <p className="col-span-4">Used</p>
          </div>
          <div className="grid grid-cols-6">
            <p className="col-span-2 text-gray-300">Year:</p>
            <p className="col-span-4">2019</p>
          </div>
          <div className="grid grid-cols-6">
            <p className="col-span-2 text-gray-300">Mileage:</p>
            <p className="col-span-4">20,000</p>
          </div>
          <div className="grid grid-cols-6">
            <p className="col-span-2 text-gray-300">Engine:</p>
            <p className="col-span-4">2.0L</p>
          </div>
          <div className="grid grid-cols-6">
            <p className="col-span-2 text-gray-300">Transmission:</p>
            <p className="col-span-4">Automatic</p>
          </div>
          <div className="grid grid-cols-6">
            <p className="col-span-2 text-gray-300">Drive:</p>
            <p className="col-span-4">RWD</p>
          </div>
          <div className="grid grid-cols-6">
            <p className="col-span-2 text-gray-300">Exterior Color:</p>
            <p className="col-span-4">Black</p>
          </div>
          <div className="grid grid-cols-6">
            <p className="col-span-2 text-gray-300">Interior Color:</p>
            <p className="col-span-4">Black</p>
          </div>
          <div className="grid grid-cols-6">
            <p className="col-span-2 text-gray-300">Body Style:</p>
            <p className="col-span-4">Sedan</p>
          </div>
          <div className="grid grid-cols-6">
            <p className="col-span-2 text-gray-300">Doors:</p>
            <p className="col-span-4">4</p>
          </div>
        </div>
      </section>
      <section className="pb-6 p-6">
        <div>
          <h3 className="text-lg font-medium py-4">Vehicle Details</h3>
          <p id="vehicleDescription-p1">
            2006 BMW X5 This vehicle has recently undergone extensive service.
            All fluids have been changed, front suspension has been rebuilt, new
            axles, new Toyo tires, new air conditioning compressor. Car runs
            fine.
          </p>
        </div>
        <hr />
        <div id="imagesContainer">
          <h3 className="text-lg font-medium py-4">Images</h3>
          <div id="unclassifiedImages">
            <div>
              <a href="https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/onoAAOSw2FRl8kYT/$_32.JPG?set_id=880000500F">
                <img
                  src="https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/onoAAOSw2FRl8kYT/$_32.JPG?set_id=880000500F"
                  alt="unclassified image 1"
                />
              </a>
            </div>
            {/* Add other image elements similarly */}
          </div>
        </div>
        <hr />
      </section>
    </div>
  );
}

export default AboutThisItem;
