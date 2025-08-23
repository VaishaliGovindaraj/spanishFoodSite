'use client'

import { useState } from "react"
import Logo from "../Logo"
import Cart from "../Cart"


interface HeaderProps{
    title: string
}

const Header = ({title}:HeaderProps) => {
    // const [cartDisplay, setCartDisplay] = useState<boolean>(false)

    // const handleClick = () => {
    //     setCartDisplay(prev => !prev)
    // }

    return(
        <div className="flex justify-between items-center p-8 bg-gray-300">
            <Logo />
            <h1 className="text-2xl m-auto uppercase font-bold "> {title} </h1>
            
        </div>

    )
}
export default Header