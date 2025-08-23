import { fireEvent, render, screen, within } from "@testing-library/react"
import Cart from '../../components/Cart'

describe("testing if the cart functions as required", () => {
    const mockData = { name: "pasta", price: 10, quantity: 6 }

    beforeEach(() => {
        render(<Cart
            items={[mockData]}
            onRemove={() => { }}
            onIncrease={() => { }}
            onDecrease={() => { }}
            subtotal={0}
            tax={0}
            shipping={0}
            total={0}
            onCheckout={() => { }}
        />)
    })

    test("test the button functionality", () => {
        const cartInfo = screen.getAllByRole("button")
        expect(cartInfo.length).toBeGreaterThan(0)
    })

    test("if there is the cart icon", () => {
        const cartIcon = screen.getByTestId("icon")
        expect(cartIcon).toBeInTheDocument()
    })

    test("If there are items in the cart ", () => {
        const itemsInCart = screen.getByText("6")
        expect(itemsInCart).toBeInTheDocument()
    })

    test("If the cart is empty", () => {
        const emptyCart = screen.queryByText("0")
        expect(emptyCart).not.toBeInTheDocument()
    })

    test("Shows the cart heading when open", () => {
        fireEvent.click(screen.getByTestId("icon"))

        const subTitle = screen.getByRole("heading", { level: 3 })
        expect(subTitle).toBeInTheDocument()
    })
})

test("Whether the cart is empty", () => {

    render(<Cart
        items={[]}
        onRemove={() => { }}
        onIncrease={() => { }}
        onDecrease={() => { }}
        subtotal={0}
        tax={0}
        shipping={0}
        total={0}
        onCheckout={() => { }}
    />)

    fireEvent.click(screen.getByTestId("icon"))

    const emptyCart = screen.getByText(/Your cart is empty./i)
    expect(emptyCart).toBeInTheDocument()
})

describe("Displays all the information when the cart is open", () => {
    const mockData = { name: "pizza", price: 15, quantity: 10 }

    beforeEach(() => {
        render(<Cart
            items={[mockData]}
            onRemove={() => { }}
            onIncrease={() => { }}
            onDecrease={() => { }}
            subtotal={150}
            tax={150 * 0.07}
            shipping={4}
            total={154.07}
            onCheckout={() => { }}
        />)
        fireEvent.click(screen.getByTestId("icon"))
    })

    test("if item has a name", () => {
        const nameInfo = screen.getByText("pizza")
        expect(nameInfo).toBeInTheDocument()
    })

    test("if there is decrease function", () => {
        const decreaseInfo = screen.getByTestId("decrease")
        expect(decreaseInfo).toBeInTheDocument()
    })

    test("if quantity of item is included", () => {
        const listItem = screen.getByText("pizza").closest("li")! //value is not null or undefined
        const quantityInfo = within(listItem).getByText(/10/)
        expect(quantityInfo).toBeInTheDocument()
    })

    test("if there is increase function", () => {
        const increaseInfo = screen.getByTestId("increase")
        expect(increaseInfo).toBeInTheDocument()
    })

    test("if there is total price for each item", () => {
        const listItem = screen.getByText("pizza").closest("li")!
        const itemPrice = within(listItem).getByText(/150/)
        expect(itemPrice).toBeInTheDocument()
    })


    test("if items are closed", () => {
        const close = screen.getByTestId("close")
        expect(close).toBeInTheDocument()
    })

    test("testing for subTotal", () => {
        const subTotalName = screen.getByText(/Subtotal/i).closest("div")!
        const subTotal = within(subTotalName).getByText("€150.00")

        expect(subTotalName).toBeInTheDocument()
        expect(subTotal).toBeInTheDocument()
    })

    test("testing for tax", () => {
        const subTotal = 150
        const taxRate = 0.07
        const expectedTax = (`€${(subTotal * taxRate).toFixed(2)}`)
        const totalTax = screen.getByText(expectedTax)

        expect(totalTax).toBeInTheDocument()
    })

    test("testing for shipping price", () => {
        const shippingName = screen.getByText(/shipping/i).closest("div")!
        const shipping = within(shippingName).getByText("€4.00")

        expect(shippingName).toBeInTheDocument()
        expect(shipping).toBeInTheDocument()
    })

    test("if there is a total", () => {
        const total = 150
        const taxRate = 0.07
        const shipping = 4
        const totalName = screen.getByText("Total:").closest("div")
        const expectedTotal = (`€${(total + taxRate + shipping).toFixed(2)}`)
        const allTotal = screen.getByText(expectedTotal)

        expect(totalName).toBeInTheDocument()
        expect(allTotal).toBeInTheDocument()
    })

    test("if there is a checkout button", () => {
        const checkout = screen.getByText(/cash out/i)
        expect(checkout).toBeInTheDocument()
    })

})