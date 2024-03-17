// components
import Button from "../../../components/ui/Button";

//icons
import { AiOutlineDelete } from "react-icons/ai";
import List from "../../../components/ui/List";

//utils
import { makeShort } from "../../../utils/strings";
import { formatCurrency } from "../../../utils/price";
import ListItem from "../../../components/ui/ListItem";

//data
import products from "../../../data/products.json";

type TProduct = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  shippingCost: number;
};

const makeList = (products: TProduct[]) => {
  return products.map((product) => {
    return (
      <ListItem key={product._id} className="flex py-2 border-none">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden">
          <img
            className="h-full w-full object-cover object-center"
            src={product.imageUrl}
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <h3 className="text-sm text-gray-500">
            {makeShort(product.title, 25)}
          </h3>
          <div className="flex justify-between gap-2 mt-4">
            <div className="">
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(product.price, "LKR")}
              </p>
              <p className="text-sm text-gray-300">
                + {formatCurrency(product.shippingCost, "LKR")}
              </p>
            </div>
            <p className="text-sm text-gray-300">Qty {product.quantity}</p>
          </div>
          <div className="flex justify-between gap-2 mt-1 items-center">
            <p className="uppercase text-lg text-red-600">last one</p>
            <Button
              intent={"iconRound"}
              size={"mediumRound"}
              className="text-gray-300"
            >
              <span className="text-2xl">
                <AiOutlineDelete />
              </span>
            </Button>
          </div>
        </div>
      </ListItem>
    );
  });
};

type TCartDropdownListProps = React.HTMLAttributes<HTMLUListElement>;

function CartDropdownList({ className, ...rest }: TCartDropdownListProps) {
  return (
    <List
      items={makeList(products)}
      role="list"
      className={className}
      {...rest}
    ></List>
  );
}

export default CartDropdownList;
