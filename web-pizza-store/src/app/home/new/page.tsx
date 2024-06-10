'use client'

import { ButtonText } from "@/components/buttonText"
import { LabelInput  } from "@/components/forms/inputLabel"
import { UseAuth } from "@/hooks/auth"
import { api } from "@/services/api"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { PiUploadSimple } from "react-icons/pi"
import { InputSelect } from "@/components/forms/inputSelect"
import { MultiValue } from "react-select"
import { OptionType } from "@/lib/categorys"
import { Section } from "@/components/forms/ingredientsSection"
import { NewItem } from "@/components/forms/newItem"


export default function AddNewDisher() {
    const { user } = UseAuth()
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [description, setDescription] = useState<string>('')
    const [isDisabled, setIsDisabled] = useState(true)

    const [img, setImg] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
    const [ingredientes, setIngredientes] = useState<string[]>([])
    const [productImg, setProductImg] = useState<File | string >('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [newIngredientes, setNewIngredientes] = useState<string>('')
    
    const [category, setCategory] = useState<OptionType[]>([])


    async function handleNewProduct() {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price.toString())
            formData.append('ingredients', JSON.stringify(ingredientes))
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


    function handleAddIngredients() {
        setIngredientes(prevState => Array.isArray(ingredientes) ? [...prevState, newIngredientes] : [newIngredientes])
        setNewIngredientes('')
    }
    function handleRemoveIngredients(deleted: string) {
        setIngredientes(prevState => prevState.filter(item => item !== deleted))
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

                <InputSelect 
                    category={category}
                    handleNewCategory={handleNewCategory}
                />                
                
                <LabelInput 
                    label="Preço" 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type="Number"
                    placeholder="R$ 00,00"
                />

                {/* INGREDIENTS */}
                {/* <LabelInput 
                    label="Ingredientes" 
                    value={ingredientes}
                    onChange={(e) => setIngredientes(e.target.value)}
                    type="text"
                    placeholder="Adicione os ingredientes"
                /> */}
                    <Section title="Ingredientes">
                        <div className="flex flex-wrap w-fit gap-4 justify-stretch">
                            {ingredientes.map((item, index) => {
                                return (
                                    <NewItem 
                                        key={String(index)}
                                        value={item}
                                        onClick={() => handleRemoveIngredients(item)}
                                    />
                                )
                            })}

                            <NewItem 
                                isNew
                                value={newIngredientes}
                                placeholder='Adicionar'
                                onChange={(e) => setNewIngredientes(e.target.value)}
                                onClick={handleAddIngredients}
                            />
                        </div>
                    </Section>                
                {/* INGREDIENTS */}
                
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