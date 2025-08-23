type AddButtonProps = {
    handleClick :() => void;
}

const AddButton  = ({handleClick}: AddButtonProps) => {
    return(
        // <p onClick={handleClick}>Add food</p>
        <button onClick={handleClick} className="bg-green-500 text-2xl text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600">+</button>
    )
}
export default AddButton