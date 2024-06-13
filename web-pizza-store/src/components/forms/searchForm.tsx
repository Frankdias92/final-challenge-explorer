import { ReactElement } from "react"


type SearchFormType = {
    placeHolder: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    children: ReactElement
}

export function SearchForm({children, placeHolder, onChange}: SearchFormType) {
    return (
        <div className="flex w-full h-full items-center relative ">
            <input 
                placeholder={placeHolder}
                type="text" 
                onChange={onChange}
                className="flex w-full h-12 px-14 bg-dark-200  rounded-md overflow-hidden"
            />
            <span className="flex items-center text-light-400 px-4 pt-1 absolute">
                {children}
            </span>
        </div>
    )
}