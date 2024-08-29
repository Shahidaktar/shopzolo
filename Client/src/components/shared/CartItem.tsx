import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { CartItemType } from "../../types/types";
import { server } from "../../redux/store";

type Props= {
  cartItem:CartItemType;
  incrementHandler:(cartItem:CartItemType)=>void;
  decrementHandler:(cartItem:CartItemType)=>void;
  removeHandler:(id:string)=>void;
}

const CartItem = ({ cartItem,incrementHandler,decrementHandler,removeHandler}: Props) => {
  const {productId, name, photo, quantity, price}=cartItem
  return (
    <li key={productId} className="py-6  flex justify-between">
      <div className="flex">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={`${server}/${photo}`}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-base font-medium text-gray-900">{name}</h3>

          <p className="mt-1 text-sm text-gray-500">₹{price}</p>
        </div>
      </div>

      <div className="flex space-x-5">
        <div className="flex items-start  space-x-3">
          <button onClick={()=>decrementHandler(cartItem)}>-</button>
          <p className="text-gray-500">{quantity}</p>
          <button onClick={()=>incrementHandler(cartItem)}>+</button>
        </div>

        <div>
          <button
          onClick={()=>removeHandler(productId)}
            type="button"
            className="font-medium text-red-600 hover:text-red-500"
          >
            <ArchiveBoxIcon className="h-6 w-6 " aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
