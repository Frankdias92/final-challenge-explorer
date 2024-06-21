'use client'

import { ButtonText } from "@/components/buttonText"
import { LabelInput  } from "@/components/forms/inputLabel"
import { UseAuth } from "@/hooks/auth"
import { api } from "@/services/api"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { IoIosArrowBack, IoIosArrowRoundBack } from "react-icons/io"
import { PiUploadSimple } from "react-icons/pi"
import { InputSelect } from "@/components/forms/inputSelect"
import { MultiValue } from "react-select"
import { OptionType } from "@/lib/categorys"
import { Section } from "@/components/forms/ingredientsSection"
import { NewItem } from "@/components/forms/newItem"
import { useRouter } from "next/navigation"


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

    const router = useRouter()

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

    useEffect(() => {
        if (user?.role !== 'admin') {
            router.push('/home')
        }
    }, [router, user])


    return (
        <section className="flex flex-col w-full h-fit px-8 pb-14 md:px-0
            md:w-3/4 m-auto md:relative md:mt-10"
        >
            <Link
                href='/home'
                className="flex items-center text-left mr-auto pt-3 font-medium md:font-bold md:text-2xl text-base text-light-300 hover:text-light-400 duration-75"
            >
                <IoIosArrowBack className="flex mt-1 text-2xl md:text-4xl"/>
                voltar
            </Link>

            <h2 className="text-3xl font-roboto text-light-300 antialiased pt-6 pb-6 md:pb-0
                md:font-medium"
            >
                Novo prato
            </h2>



            <form className="w-full h-full justify-items-stretch
            md:grid grid-cols-5 grid-rows-2  gap-x-8 ">

                {/* INPUT FILE IMG */}
                <div className="flex flex-col h-full justify-end sm:col-span-2 lg:col-span-1">
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
                </div>
                {/* END OF FILE IMG */}

                {/* name */}
                <div className="flex flex-col flex-1 md:col-span-3 lg:col-span-2">
                    <LabelInput 
                        label="Nome" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text" 
                        placeholder="Ex.: Salada Ceasar"
                        size={48}
                    />
                </div>
                

                {/* category */}
                <div className="flex h-full flex-col col-span-2 md:col-span-5 lg:col-span-2">
                    <label className="flex gap-2 w-full h-full text-xs text-light-400 font-roboto pt-8">
                        Categoria
                    </label> 
                    <InputSelect 
                        category={category}
                        size={56}
                        handleNewCategory={handleNewCategory}
                    />                
                </div>


                {/* INGREDIENTS */}
                <div className="flex h-full flex-col col-span-4 justify-end">
                    <Section title="Ingredientes">
                        <div className="flex flex-wrap justify-start gap-4">
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
                </div>
                {/* INGREDIENTS */}

                {/*  price */}
                <div className="flex h-full flex-col">
                    <LabelInput 
                        label="Preço" 
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        type="Number"
                        placeholder="R$ 00,00"
                        size={48}
                    />
                </div>
               

                {/*  description */}
                <div className="flex h-fit flex-col col-span-5">
                    <label className="flex flex-col w-full h-full mt-8  text-xs text-light-400 font-roboto">
                        Descrição
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                        className="flex w-full h-[172px] text-light-500  font-roboto mt-2 shadow bg-dark-200 appearance-none border-none rounded-lg py-2 px-3 leading-tight 
                        focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 overflow-hidden mb-8 placeholder:text-light-400 hover:placeholder:text-light-500 duration-300 antialiased"
                    />
                </div>
                
                
            </form>

            <div className="flex m-auto w-full md:mr-0 md:w-fit"
            >
                <ButtonText 
                    text="Salvar alterações" 
                    size={48} 
                    isDisable={isDisabled} 
                    onclick={handleNewProduct}
                />
            </div>

        </section>
    )
}