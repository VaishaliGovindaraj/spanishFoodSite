import { CartDataProps } from "@/utils/types";
import { useState } from "react";

interface CartProps {
    items: CartDataProps[];
    onRemove?: (name: string) => void;
    onIncrease?: (name: string) => void;
    onDecrease?: (name: string) => void;
    subtotal?: number;
    tax?: number;
    shipping?: number;
    total?: number;
    onCheckout?: () => void;
}

const Cart = ({
    items,
    onRemove,
    onIncrease,
    onDecrease,
    subtotal,
    tax,
    shipping,
    total,
    onCheckout
}: CartProps) => {
    const [cartDisplay, setCartDisplay] = useState<boolean>(false)

    const handleClick = () => {
        setCartDisplay(prev => !prev)
    }

    const subTotal = subtotal ?? items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const Shipping = shipping ?? 6;
    const Tax = tax ?? subTotal * 0.07;
    const Total = total ?? subTotal + Shipping + Tax;
    const quantity = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleAlert = () => {
        alert(`Thank You!! Your total order amount is €${Total.toFixed(2)} which includes €${Tax.toFixed(2)} tax and ${Shipping} shipping charges`);
        onCheckout?.();
    };



    return (
        <>
            <button>
                <img
                    data-testid="icon"
                    src="/cart-icon.png"
                    className="fixed top-8  right-10 md:right-14 w-12 h-12 z-40 cursor-pointer hover:scale-110 transition-transform"
                    onClick={handleClick}
                    alt="CartIcon"
                />
            </button>
            {cartDisplay && <>
                <div data-testid="cart_display" className="fixed top-20 md:top-25 right-0 md:right-10 max-w-sm w-full bg-gray-500 shadow-lg rounded-lg p-2 mx-2 z-50">
                    <h3 className="text-lg font-bold mb-4">Your Cart</h3>

                    {items.length === 0 && <p className="text-gray-200">Your cart is empty.</p>}




                    <ul role="list" data-testid="cart_display">
                        {items.length > 0 && items.map((item, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center mb-4 last:border-b pb-2"
                            >
                                <div className="flex flex-col" >
                                    <span className="font-medium text-gray-800">{item.name}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <button
                                            data-testid="increase"
                                            onClick={() => onIncrease?.(item.name)}
                                            className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
                                        >
                                            +
                                        </button>
                                        <span className="px-2">{item.quantity}</span>
                                        <button
                                            data-testid="decrease"
                                            onClick={() => onDecrease?.(item.name)}
                                            className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="font-semibold text-gray-800">€{(item.price * item.quantity).toFixed(2)}</div>
                                    <button
                                        onClick={() => onRemove?.(item.name)}
                                        className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                                    >
                                        X
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {items.length > 0 && (
                        <div className="flex justify-center items-center flex-col p-2">
                            {/* <p className="fixed right-5 top-5 bg-orange-500 rounded-2xl p-2 text-2xl">{quantity}</p> */}
                            {/* <div data-testid="subTotalData">
                            {`Subtotal: €${subTotal.toFixed(2)}`}
                        </div> */}
                            <div>
                                <span>Subtotal:</span>
                                <span data-testid="subTotalData">{`€${subTotal.toFixed(2)}`}</span>
                                {/* <p data-testid="subTotalData" className="text-white">{`€${subTotal.toFixed(2)}`}</p> */}
                            </div>
                           <div>
  <span className="font-bold">Tax:</span>
  <span data-testid="taxData">{`€${Tax.toFixed(2)}`}</span>
</div>
                            <div><span className="font-bold">Shipping: </span> €{Shipping.toFixed(2)}</div>
                            <div className="pb-2"><span className="font-bold">Total: </span> €{Total.toFixed(2)}</div>
                            <button
                                data-testid="close"
                                onClick={handleClick}
                                className="bg-gray-700 text-white rounded-full w-20 h-6 flex items-center justify-center hover:bg-gray-800 mb-2"
                            >
                                Close
                            </button>
                            <button
                                className="bg-green-500 text-white rounded-full w-full h-6 flex items-center justify-center hover:bg-green-600 p-4"
                                onClick={handleAlert}
                            >
                                Cash Out
                            </button>
                        </div>
                    )}
                </div>
            </>}
        </>
    );
};

export default Cart;
