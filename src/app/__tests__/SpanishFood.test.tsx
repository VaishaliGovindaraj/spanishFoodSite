import { render, screen, fireEvent, within } from "@testing-library/react";
import spanishFoods from "@/data/spanishData";
import SpanishFood from "../../components/SpanishFood"

global.alert = jest.fn();

describe("SpanishFood Integration Test", () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test("adds items to cart and calculates totals", () => {
        render(<SpanishFood />);

        const firstFoodItem = spanishFoods[0];
        const expectedFoodItem = screen.getAllByTestId("foodCard")[0];

        const finalFoodItem = within(expectedFoodItem).getByText(firstFoodItem.name)
        expect(finalFoodItem).toBeInTheDocument()

        const addButton = within(expectedFoodItem).getByRole("button");
        fireEvent.click(addButton);
        fireEvent.click(addButton);

        const cartIcon = screen.getByTestId("icon");
        fireEvent.click(cartIcon);

        // Scope to cart container (must exist in component)
        const insideTheCart = screen.getByRole("list");

        // Find item row for that food inside the cart only
        const cartItemRow = within(insideTheCart).getByText(firstFoodItem.name).closest("li");
        expect(cartItemRow).not.toBeNull()!;

        // Verify quantity is 2
        expect(within(cartItemRow!).getByText("2")).toBeInTheDocument();

        const expectedSubtotal = (firstFoodItem.price * 2).toFixed(2);
        screen.debug()
        const finalSubTotal = screen.getByTestId("subTotalData")
        console.log(finalSubTotal)
        expect(finalSubTotal).toBeInTheDocument()

        const expectedTax = (Number(expectedSubtotal) * 0.07).toFixed(2);
        screen.debug(insideTheCart)
        const finalTax = within(insideTheCart).getByText(`€${expectedTax}`)
        console.log("Matched text:", finalTax.textContent);
        expect(finalTax).toBeInTheDocument();

        const expectedShipping = "6.00";
        const finalShipping = within(insideTheCart).getByText(`€${expectedShipping}`)
        expect(finalShipping).toBeInTheDocument()

        const expectedTotal = (Number(expectedSubtotal) + Number(expectedTax) + Number(expectedShipping)).toFixed(2);
        const finalTotal = within(insideTheCart).getByText(`€${expectedTotal}`)
        expect(finalTotal).toBeInTheDocument();

        const checkoutButton = within(insideTheCart).getByRole("button", { name: /cash out/i });
        fireEvent.click(checkoutButton);

        expect(global.alert).toHaveBeenCalledWith(
            expect.stringContaining(`€${expectedTotal}`)
        );
    });

    test("persists cart to localStorage", () => {
        render(<SpanishFood />);
        const secondFoodCard = screen.getAllByTestId("foodCard")[1];
        const addButton = within(secondFoodCard).getByRole("button");
        fireEvent.click(addButton);

        const storedCart = JSON.parse(localStorage.getItem("spanishFoodCart")!);
        expect(storedCart.length).toBe(1);
        expect(storedCart[0].name).toBe(spanishFoods[1].name);
    });

     

});