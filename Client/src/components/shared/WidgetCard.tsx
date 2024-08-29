import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

interface Props {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetCard = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: Props) => {
  return (
    <div className=" flex justify-between lg:w-[16rem]  bg-white p-10 ">
      <div>
        <p className="text-xs text-gray-700">{heading}</p>
        <h2 className="text-xl font-bold text-gray-900">
          {amount ? `₹${value}` : value}
        </h2>
        <div className="flex items-center space-x-1 text-green-600">
          {percent > 0 ? (
            <span className="text-green-600">
              <HiTrendingUp /> +{`${percent > 10000 ? 9999 : percent}%`}
            </span>
          ) : (
            <span className="text-red-600">
              <HiTrendingDown /> {`${percent < -10000 ? -9999 : percent}%`}
            </span>
          )}
        </div>
      </div>

      <svg className="w-20 h-20 -rotate-90">
        <circle
          className="text-gray-300"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className="text-blue-600"
          strokeWidth="5"
          strokeDasharray={380}
          strokeLinecap="round"
          stroke={percent < 0 ? "	rgb(255, 0, 0)" : color}
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
          style={{
            strokeDashoffset: `calc(380 -  ${
              Math.abs(
                percent > 0 && percent > 100 //percent > 0 && percent > 1000
                  ? 1000
                  : percent < -100 //percent < 0 && percent < -1000
                  ? 1000 //0
                  : percent
              ) / 2
            }/ 100 *380)`,
          }}
        />
        <text
          x="10"
          y="40"
          transform={
            (percent > 0 && percent >= 100) || (percent < 0 && percent <= -100)
              ? "rotate(90 33,42)"
              : "rotate(90 28,46)"
          }
          fontSize={
            (percent > 0 && percent >= 1000) ||
            (percent < 0 && percent <= -1000)
              ? "11"
              : "13"
          }
          fontFamily="Verdana"
          fill={percent <= 0 ? "	rgb(255, 0, 0)" : color}
        >
          {percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
          {percent <= 0 && `${percent < -10000 ? -9999 : percent}%`}
        </text>
      </svg>
    </div>
  );
};

export default WidgetCard;
