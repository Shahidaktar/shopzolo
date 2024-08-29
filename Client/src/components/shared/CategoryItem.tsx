interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="w-full flex  items-center space-x-3 justify-between  p-4">
    <h5 className="font-[300]">{heading}</h5>
    <div className="ml-auto w-[6rem]  bg-gray-200 rounded-[20px] h-2 flex-none ">
      <div
        className="rounded-[20px] h-full"
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default CategoryItem;
