import React from "react";
import { SERVER_URL } from "../../../utils/constants";

type Spec = {
  name: string;
  value: string;
}

type Props = {
  itemSpecs: Spec[];
  description: string;
  images: string[];
}

function AboutThisItem({
  itemSpecs,
  description,
  images
}) {
  return (
    <div>
      <section className="pb-6">
        <h3 className="text-xl font-medium pb-4">Item specifics</h3>
        <div className="grid grid-cols-2 gap-2">
          {
            itemSpecs.map((spec:Spec) => (
              <div key={spec.name} className="grid grid-cols-6">
                <p className="col-span-2 text-gray-300">{spec.name}:</p>
                <p className="col-span-4">{spec.value}</p>
              </div>
            ))
          }
        </div>
      </section>
      <section className="pb-6 p-6">
        <div>
          <h3 className="text-lg font-medium py-4">Vehicle Details</h3>
          <p id="vehicleDescription-p1">
            {description}
          </p>
        </div>
        <hr />
        <div id="imagesContainer">
          <h3 className="text-lg font-medium py-4">Images</h3>
          <div id="unclassifiedImages">
            <div>
              {
                // Use images array to render images
                images.map((image:string, index:number) => (
                  <a key={index} href={`${SERVER_URL}/images/${image}`}>
                    <img src={`${SERVER_URL}/images/${image}`} alt={`unclassified image ${index + 1}`} />
                  </a>
                ))
              }
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
