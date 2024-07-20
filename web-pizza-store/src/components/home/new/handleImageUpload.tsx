import { FormEvent, useCallback, useState } from "react"
import { PiUploadSimple } from "react-icons/pi"

interface ImageUploadProps {
    productImg: File | string
    setProductImg: (file: File | string) => void
    setImgName: (name: string) => void
    setImg: (img: string) => void
}

export function HandleImageUpload ({ productImg, setProductImg, setImg }: ImageUploadProps) {
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [imgName, setImgName] = useState<string>('')

    const handleUploadImg = useCallback((e: FormEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0]

        if (file) {
            setProductImg(file)
            setImgName(file.name)
            const imgPreview = URL.createObjectURL(file)
            setImg(imgPreview)
        }
    }, [setProductImg, setImgName, setImg])
    

    return (
        <div  className="flex shadow bg-dark-200 appearance-none border-none rounded-lg w-full h-12 md:h-14 mt-8 md:mt-0 leading-tight
                focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 duration-75 relative group">
            <label className="flex flex-col w-full h-11 text-xs text-light-400 font-roboto absolute bottom-8 md:bottom-10">
                Imagem do prato
            </label>        
            <input
                name="productImg"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleUploadImg}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                className="flex bg-transparent w-full rounded-lg appearance-none border-none opacity-0
                focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 duration-75 relative z-20"
            />
            <div  className={`${isInputFocused ? 'ring-2 ring-light-700 shadow-outline' : 'ring-0'} duration-75 absolute flex w-full left-0 h-11 px-8 top-0 rounded-lg text-light-400 z-10  group-hover:text-light-500`}>
                <span className="flex h-11 md:h-14 items-center">
                    {productImg ?` ${imgName}` : <span className="flex gap-2 items-center"><PiUploadSimple className="text-3xl h-full"/> Selecione imagem</span>}
                </span>
            </div>
        </div>
    )
}