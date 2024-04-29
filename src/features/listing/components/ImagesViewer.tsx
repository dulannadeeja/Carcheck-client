import { useEffect, useMemo, useState } from "react";
import { cn } from "../../../utils/mergeClasses";
import Button from "../../../components/ui/Button";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { SERVER_URL } from "../../../utils/constants";

type ImagesViewerProps = {
  images: string[];
};

function ImagesViewer({ images }: ImagesViewerProps) {
  const [selected, setSelected] = useState(0);
  const [isTempView, setIsTempView] = useState(false);
  const [tempSelected, setTempSelected] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(
    images.length > 6 ? 5 : images.length
  );

  // Preload all images once when the component mounts or when images change
  useEffect(() => {
    setStartIndex(0);
    setEndIndex(images.length > 6 ? 5 : images.length);
  }, [images]);

  // Memoized array of image elements based on images state
  const imageElements = useMemo(() => {
    return images.map((image, index) => (
      <img
        key={index}
        src={`${SERVER_URL}/images/${image}`}
        alt={`image-${index}`}
        className={cn("w-full aspect-square object-cover rounded-xl", {
          "border-2 border-gray-600": selected === index,
        })}
        onClick={() => setSelected(index)}
        onMouseEnter={() => {
          setTempSelected(index);
          setIsTempView(true);
        }}
        onMouseLeave={() => {
          setIsTempView(false);
        }}
      />
    ));
  }, [images, selected]);

  const handleNext = () => {
    const newStartIndex = Math.min(startIndex + 6, images.length - 6);
    const newEndIndex = Math.min(endIndex + 6, images.length - 1);

    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  };

  const handlePrev = () => {
    const newStartIndex = Math.max(startIndex - 6, 0);
    const newEndIndex = Math.max(endIndex - 6, 5);

    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  };

  return (
    <div className="flex gap-2 min-h-full ">
      {images.length > 0 && (
        <div className="h-full flex flex-col gap-2 relative basis-[20%] md:basis-[15%] lg:basis-[10%]">
          <Button
            intent="iconRound"
            size="none"
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white w-8 h-8 text-xl shadow-xl hover:bg-gray-150"
            onClick={handlePrev}
          >
            <IoChevronUp />
          </Button>
          {imageElements.slice(startIndex, endIndex + 1)}
          <Button
            intent="iconRound"
            size="none"
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white w-8 h-8 text-xl shadow-xl hover:bg-gray-150"
            onClick={handleNext}
          >
            <IoChevronDown />
          </Button>
        </div>
      )}
      <div className="flex-1 relative bg-gray-100 rounded-xl">
        <Button
          intent="iconRound"
          size="none"
          className="absolute top-3 right-3 bg-white p-3 shadow-xl hover:bg-gray-150 text-lg cursor-pointer z-10"
        >
          <BsArrowsAngleExpand />
        </Button>
        {/* selected image view */}
        <img
          src={`${SERVER_URL}/images/${images[selected]}`}
          alt="selected image"
          className={cn("absolute top-0 left-0 w-full h-full object-contain", {
            hidden: isTempView,
          })}
        />
        {/* temp image view on hover */}
        {isTempView && (
          <img
            src={`${SERVER_URL}/images/${images[tempSelected]}`}
            alt="selected image"
            className={cn("absolute top-0 left-0 w-full h-full object-contain")}
          />
        )}
      </div>
    </div>
  );
}

export default ImagesViewer;
