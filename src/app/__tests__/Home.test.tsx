import SpanishFood from "@/components/SpanishFood"
import {render, screen} from "@testing-library/react"

test("Has Spanish Food", () => {
    render(<SpanishFood/>)
    const foodData = screen.getByTestId("spanishInfo")
    expect(foodData).toBeInTheDocument()
})