'use client'

import { useEffect, useState } from "react";
import AddButton from "../AddButton";
import spanishFoods from "@/data/spanishData";
import { CartDataProps, SpanishFoodsProp } from "@/utils/types";
import Cart from "../Cart";

const SpanishFood = () => {

    const [cartItems, setCartItems] = useState<CartDataProps[]>([])
    const [cartDisplay, setCartDisplay] = useState<boolean>(false)

    useEffect(() => {
        const stored = localStorage.getItem("spanishFoodCart");
        if (stored) {
            setCartItems(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("spanishFoodCart", JSON.stringify(cartItems));
    }, [cartItems]);

    const handleClick = () => {
        setCartDisplay(prev => !prev)
    }

    const handleIncrease = (item: string) => {
        setCartItems(prev => {
            const itemIndex = prev.findIndex(i => i.name === item)
            if (itemIndex !== -1) {
                let updateCartItem = [...prev];
                updateCartItem[itemIndex] = { ...updateCartItem[itemIndex], quantity: updateCartItem[itemIndex].quantity + 1 }
                return updateCartItem
            }
            return prev;
        })
    }

    const handleDecrease = (item: string) => {
        setCartItems(prev => {
            const itemIndex = prev.findIndex(i => i.name === item)
            if (itemIndex !== -1) {
                let updateCartItem = [...prev];
                let currentQuantity = updateCartItem[itemIndex].quantity
                if (currentQuantity > 1) {
                    updateCartItem[itemIndex] = { ...updateCartItem[itemIndex], quantity: updateCartItem[itemIndex].quantity - 1 }
                    return updateCartItem
                } else {
                    updateCartItem.filter((_, index) => index !== itemIndex)
                }
            }

            return prev;
        })
    }

    const handleRemove = (item: string) => {
        setCartItems(prev => {
            const itemIndex = prev.findIndex(i => i.name === item)
            if (itemIndex !== -1) {
                let updateCartItem = [...prev];
                return updateCartItem.filter((_, index) => index !== itemIndex)

            }
            return prev;
        })
    }

    const chosenFood = (item: SpanishFoodsProp) => {
        setCartItems(prev => {
            const itemIndex = prev.findIndex(i => i.name === item.name)
            if (itemIndex !== -1) {
                let updateCartItem = [...prev];
                updateCartItem[itemIndex] = { ...updateCartItem[itemIndex], quantity: updateCartItem[itemIndex].quantity + 1 }
                return updateCartItem
            }
            return [...prev, { name: item.name, price: item.price, quantity: 1 }]
        })

    }

    return (
        <>

            <div data-testid="spanishInfo" className="flex-grow m-auto px-4">

                <button data-testid="icon_SF" onClick={handleClick} className="relative">
                    <img
                        src="/cart-icon.png"
                        className="fixed top-8 right-10 md:right-14 w-12 h-12 z-40 cursor-pointer hover:scale-110 transition-transform"
                        alt="CartIcon"
                    />
                    {cartItems.length > 0 && (
                        <span className="fixed top-5 right-6 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                    )}
                </button>
                <div className="bg-gray-800 bg-opacity-50 px-4 m-4">
                    <div className="grid grid-cols-1  gap-6 mt-8">
                        {spanishFoods.map((item: SpanishFoodsProp, index: number) => (
                            <div
                                key={index}
                                data-testid="foodCard"
                                className="flex mb-2 mt-2"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    width="200px"
                                    height="auto"
                                />
                                <div className="flex-col max-w-[300px] bg-gray-600 mx-4 p-2 rounded-lg shadow">
                                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                    <div className="text-sm text-gray-200">{item.description}</div>
                                    <p className="text-white font-semibold">€{item.price}</p>

                                    <button
                                        onClick={() => chosenFood(item)}
                                        className="bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-1 mt-2"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {cartDisplay && (
                    <Cart
                        items={cartItems}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        onRemove={handleRemove}
                    />
                )}
            </div>


        </>
    )
}
export default SpanishFood;