import { PlusIcon } from "@heroicons/react/16/solid";
import { server } from "../../redux/store";
import { CartItemType } from "../../types/types";

interface ProductProps {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItemType) => string | undefined;
}

const ProductCard = ({
  photo,
  name,
  price,
  stock,
  productId,
  handler,
}: ProductProps) => {
  return (
    <div className="group relative space-y-6 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75">
        <img
          src={`${server}/${photo}`}
          alt={name}
          className="pl-[15%] h-[80%] w-[80%] object-cover object-center lg:h-40 lg:w-40 lg:pl-0"
        />
      </div>
      <div className="flex flex-col items-center justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">₹{price}</p>
      </div>
      <div className="absolute top-[22%] left-[44%] opacity-0 group-hover:opacity-100">
        <button
          className="cursor-pointer hover:rotate-12 transition-all rounded-full bg-red-600"
          onClick={() =>
            handler({
              photo,
              name,
              price,
              stock,
              productId,
              quantity: 1,
            })
          }
        >
          <PlusIcon className="h-6 w-6 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
