import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface CarouselArrowProps {
  carousel: any;
  direction: string;
}

export const CarouselArrow = ({ carousel, direction }: CarouselArrowProps) => {
  const handleSlick = () => {
    if (direction === 'left') {
      carousel?.current?.slickPrev();
    } else {
      carousel?.current?.slickNext();
    }
  };

  const arrowStyle =
    'absolute z-10 flex justify-center items-center top-1/2 -translate-y-1/2 cursor-pointer ' +
    (direction === 'left' ? 'left-6' : 'right-6');

  return (
    <div onClick={handleSlick} className={arrowStyle}>
      <div className="bg-white/80 hover:bg-white hover:shadow-lg rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 group">
        {direction === 'left' ? (
          <AiOutlineLeft
            size={28}
            className="text-gray-800 group-hover:scale-110 transition-transform"
          />
        ) : (
          <AiOutlineRight
            size={28}
            className="text-gray-800 group-hover:scale-110 transition-transform"
          />
        )}
      </div>
    </div>
  );
};
