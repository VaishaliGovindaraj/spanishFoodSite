import {render, screen} from "@testing-library/react"
import Logo from "../../components/Logo"

it("test if there is a logo", () => {
    render(<Logo/>)

    const LogoData = screen.getByTestId("foodLogo")
    expect(LogoData).toBeInTheDocument()
})