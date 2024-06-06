'use client'

import { ButtonText } from "@/components/buttonText"
import { LabelInput  } from "@/components/forms/inputLabel"
import { UseAuth } from "@/hooks/auth"
import { api } from "@/services/api"
import Link from "next/link"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { PiUploadSimple } from "react-icons/pi"
import { InputSelect } from "@/components/forms/inputSelect"
import { MultiValue } from "react-select"
import { OptionType } from "@/lib/categorys"


export default function AddNewDisher() {
    const { user } = UseAuth()
    const [name, setName] = useState<string>('')
    // const [ingredients, setIngredients] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [description, setDescription] = useState<string>('')
    const [isDisabled, setIsDisabled] = useState(true)

    const [img, setImg] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
    const [ingredientes, setIngredientes] = useState<string>('')
    const [productImg, setProductImg] = useState<File | string >('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    
    const [category, setCategory] = useState<OptionType[]>([])


    async function handleNewProduct() {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('ingredients', ingredientes)
            formData.append('description', description)
            formData.append('price', price.toString())
            formData.append('created_by', String(user?.id))

            if (productImg) {
                formData.append('productImg', productImg)
            }

            category.forEach(item => formData.append('category', item.value))
            
            const response = await api.post('/meals' , formData ) 
            return alert('Produto adicionado com sucesso')
        } catch (error) {
            alert(error)
        }
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

    
    function handleNewCategory(selectedOptions: MultiValue<OptionType>) {
        setCategory(selectedOptions as OptionType[])
    }

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
                Novo prato
            </h2>

            <form className="flex flex-col w-full">
                {/* INPUT FILE IMG */}
                <div  className="flex  shadow bg-dark-200 appearance-none border-none rounded-lg w-full h-11 mt-8 leading-tight
                        focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 duration-75 relative group">
                    <label className="flex flex-col w-full h-full text-xs text-light-400 font-roboto absolute bottom-8">
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
                        <span className="flex h-11 items-center">
                            {productImg ?` ${imgName}` : <span className="flex gap-2 items-center"><PiUploadSimple className=" text-3xl h-full"/> Selecione imagem</span>}
                        </span>
                    </div>
                </div>
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

                {/* <Select
                    isMulti
                    name="category"
                    options={categorys}
                    styles={customStyles}
                    classNamePrefix="select"
                    value={category}
                    onChange={handleNewCategory}
                    placeholder="Selecione uma ou mais categorias"
                /> */}

                <InputSelect 
                    category={category}
                    handleNewCategory={handleNewCategory}
                />

                {/* <Select
                    // label="Favorite Animal"
                    placeholder="Select an animal"
                    variant="bordered"
                    selectionMode="multiple"
                    selectedKeys={category}
                    className="w-full mt-2 items-center text-light-500 bg-dark-200 appearance-none border-none rounded-lg py-1 px-3 leading-tight antialiased
                    focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 placeholder:text-light-400 hover:placeholder:text-light-500 duration-300"
                    onChange={handleNewCategory}
                >
                    {categorys.map((item) => (
                        <SelectItem key={item.key} className="w-full bg-dark-300 rounded-md -mt-1">
                        <div className="hover:bg-dark-200 w-full rounded-lg text-light-300 px-2 py-2">
                            {item.label}
                        </div>
                        </SelectItem>
                    ))}
                </Select> */}
                
               
                {/* <Select 
                    name="category"
                    placeholder="Refeição"
                    typeof="text"
                    variant="bordered"
                    value={category}
                    onSelectionChange={handleNewCategory}
                    selectionMode="multiple"
                    className="flex items-center text-light-500 mt-2 shadow bg-dark-200 appearance-none border-none rounded-lg w-full h-11 pb-1 px-3 leading-tight antialiased
                    focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 placeholder:text-light-400 hover:placeholder:text-light-500 duration-300"
                    onChange={(e) => setNewCategory(e.target.value)}
                >
                    {categorys.map((item) => (
                        <SelectItem key={item.key} value={item.label} className="flex w-full h-full items-center bg-dark-100 rounded-lg text-light-300 ">
                                {item.label}
                        </SelectItem>
                        ))}
                </Select>   */}
                
                
                <LabelInput 
                    label="Preço" 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type="Number"
                    placeholder="R$ 00,00"
                />

                <LabelInput 
                    label="Ingredientes" 
                    value={ingredientes}
                    onChange={(e) => setIngredientes(e.target.value)}
                    type="text"
                    placeholder="Adicione os ingredientes"
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
                    onclick={handleNewProduct}
                />
            </form>

        </section>
    )
}