import { FiPlus, FiX } from "react-icons/fi";

interface NewItemProps {
    isNew?: boolean
    value?: string
    onClick?: () => void
    placeholder?: string 
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function NewItem({ isNew, value, onClick, onChange, ...rest}: NewItemProps) {

    return (
            <div className='flex relative w-fit'
            >
                <input
                    type="text" 
                    value={value}
                    readOnly={!isNew}
                    className={`${isNew ? 'focus:ring-2 focus:bg-cake-400 bg-transparent border-2 tex border-light-500 border-dashed text-light-10 focus-within:w-auto' 
                                            : 'flex text-center ring-1 ring-store-secondary/35 bg-light-600 m-auto w-24'} 
                                            invalid:text-red-600 rounded-lg outline-none border-0 placeholder:opacity-30 text-light-100  m-auto w-28 py-2 px-4 pr-8`}
                    onChange={onChange}
                    {...rest}
                />

                <button
                    type="button"
                    onClick={onClick}
                    className={`${isNew ? 'text-store-orange' : 'text-red-600'} 
                    absolute flex items-center right-0 place-self-center pr-2`}
                >
                    { isNew ? <FiPlus /> : <FiX />}
                </button>
            </div>
                    
    )
}