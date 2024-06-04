'use client'

import { ButtonText } from "@/components/buttonText"
import { LabelInput  } from "@/components/forms/inputLabel"
import { InputSelect, OptionType } from "@/components/forms/inputSelect"
import { UseAuth } from "@/hooks/auth"
import { api } from "@/services/api"
import { Image } from "@nextui-org/react"
import NextImage from "next/image";
import Link from "next/link"
import { useParams } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io"
import { LuImagePlus } from "react-icons/lu"
import { PiUploadSimple } from "react-icons/pi"
import { MultiValue } from "react-select"


interface DisheProps {
    meal_id: number
    name: string
    description: string
    price: number
    category:  string[]
    productImg: string
    created_by: number
}

export default function UpdateDisher() {
    const { user } = UseAuth()

    const [data, setData] = useState<DisheProps>()
    const [name, setName] = useState<string>('')
    const [category, setCategory] = useState<OptionType[]>([])
    // const [values, setValues] = useState<Selection>(new Set(["Refeição"]));
    const [ingredients, setIngredients] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [description, setDescription] = useState<string>('')
    const [isDisabled, setIsDisabled] = useState(true)
    const [updateIMG, setUpdateIMG] = useState(false)

    const [img, setImg] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
    const [productImg, setProductImg] = useState<File | string >('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const params = useParams()

    
    async function handleWithUpdateDisher() {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('ingredients', ingredients)
            formData.append('description', description)
            formData.append('price', price.toString())
            formData.append('productImg', productImg)
            formData.append('created_by', String(user?.id))
            category.forEach(item => formData.append('category', item.label))

            // check if img already exist
            if (productImg) {
                formData.append('productImg', productImg as Blob)
            }

            // add new categories
            formData.append('category', JSON.stringify(category))
            // category.forEach(item => formData.append('category', item))

            const response = await api.put(`/meals/${params.id}` , formData ) 
            console.log(response.data)
            return alert('Produto atualizado com sucesso')
        } catch (error: any) {
            alert(error.response?.data?.message || error.message)
        }
    }

    function handleNewCategory(selectedOptions: MultiValue<OptionType>) {
        setCategory(selectedOptions as OptionType[])
    }

    async function handleUploadImg(e: FormEvent<HTMLInputElement>) {
        const file = e.currentTarget.files?.[0]

        if (file) {
            setProductImg(file)
            setImgName(file.name)
            const imgPreview = URL.createObjectURL(file)
            setImg(imgPreview)
        }
    }

    useEffect(() => {
        async function getDisheId() {
            const response = await api.get(`/meals/${params.id}`)
            const data = response.data[0]
            console.log('data category', data.category)
            if (data) {
                setName(data.name)
                setCategory(data.category)
                setPrice(data.price)
                setDescription(data.description)
                setIngredients(data.ingredients)
                setImg(data.productImg)
            } else {
                console.log("Error to get products")
            }
        }
        getDisheId()
        
    }, [params])

    useEffect(() => {
        if (!name || !category || !price || !description) {
            setIsDisabled(true)
        } else{
            setIsDisabled(false)
        }
    }, [name, category, price, description])

    
    return (
        <section className="flex flex-col w-full min-h-screen px-8 pb-12">
            <Link
                href='/home'
                className="flex items-center text-left mr-auto pt-3 font-medium text-base text-light-300 hover:text-light-400 duration-75"
            >
                <IoIosArrowBack className="text-2xl"/> voltar
            </Link>

            <h2 className="text-3xl font-roboto text-light-300 antialiased pt-6 pb-6">
                Atualizar prato
            </h2>

            <form className="flex flex-col w-full">
                {/* INPUT FILE IMG */}
                {updateIMG ? (
                    <div  className="flex  shadow bg-dark-200 appearance-none border-none rounded-lg w-full h-11 mt-8 leading-tight
                        focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 duration-75 relative">
                            <label className="flex gap-2 w-full h-full text-xs text-light-400 font-roboto absolute bottom-8 group/checked">
                                Imagem do prato 
                                <FaCheck onClick={() => setUpdateIMG(false)} className="group-hover/checked:text-tint-cake-400"/>
                            </label>       
                            <input
                                name="productImg"
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleUploadImg}
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                className="flex bg-transparent w-full rounded-lg appearance-none border-none opacity-100 placeholder-transparent file:opacity-0 only-of-type:opacity-0
                                focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 duration-75 relative z-20" 
                            />
                        <div  className={`${isInputFocused ? 'ring-2 ring-light-700 shadow-outline' : 'ring-0'} duration-75 absolute flex w-full left-0 h-11 px-8 top-0 rounded-lg text-light-400 z-10`}>
                            <span className="flex h-11 items-center">
                                {productImg ? ` ${imgName}` : <span className="flex gap-2 items-center"><PiUploadSimple className=" text-3xl h-full hover:text-light-500"/> Selecione imagem</span>}
                            </span>
                        </div>
                    </div>
                ) : (
                    <>
                        <span className="flex items-center w-[88px] h-[88px] rounded-full overflow-hidden">
                            <Image
                                as={NextImage}
                                width={488}
                                height={488}
                                src={`${productImg}`}
                                alt="NextUI hero Image"
                                className="flex"
                            />
                        </span>
                        <button type="button" onClick={() => setUpdateIMG(true)} 
                            className="flex items-center  gap-2 text-light-300 "
                        >
                            Atualizar imagem <LuImagePlus />
                        </button>
                    </>
                )}
                {/* END OF FILE IMG */}
                

                <LabelInput 
                    label="Nome" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" 
                    placeholder="Ex.: Salada Ceasar"
                />
                
                <label className="flex gap-2 w-full h-full text-xs text-light-400 font-roboto pt-8">
                    Categoria
                </label>    
                <InputSelect 
                    category={category}
                    handleNewCategory={handleNewCategory}
                />

                <LabelInput 
                    label="Ingredientes" 
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    type="text" 
                    placeholder="Pão Naan"
                />              
                
                <LabelInput 
                    label="Preço" 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type="Number"
                    placeholder="R$ 00,00"
                />
                
                <label className="flex flex-col w-full h-full mt-8 text-xs text-light-400 font-roboto">
                    Descrição
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                    className="flex w-full h-[172px] text-light-500  font-roboto mt-2 shadow bg-dark-200 appearance-none border-none rounded-lg py-2 px-3 leading-tight
                    focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 overflow-hidden mb-8 placeholder:text-light-400 hover:placeholder:text-light-500 duration-300 antialiased"
                />
                <ButtonText 
                    text="Salvar alterações" 
                    size={48} 
                    isDisable={isDisabled}
                    onclick={handleWithUpdateDisher}
                />
            </form>

        </section>
    )
}