

interface LabelInputProps {
    type: string
    label: string
    placeholder: string
}

export function LabelInput({ type, label, placeholder }: LabelInputProps) {

    return (
        <>
            <label className="flex flex-col w-full h-full mt-8 text-xs text-light-500 font-roboto">
                {label}
            </label>
            <input 
                type={type}
                placeholder={placeholder}
                className="text-light-500 mt-2 shadow bg-dark-200 appearance-none border-none rounded-lg w-full h-11 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
        </>
    )
}