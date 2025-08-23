import {render, screen} from "@testing-library/react"
import AddButton from "../../components/AddButton"

test("If there is a clickable button", () => {
    render(<AddButton handleClick={() => {}} />)

    const clickableButton = screen.getByRole("button")
    expect(clickableButton).toBeInTheDocument()
})