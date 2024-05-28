'use client'

import { ButtonText } from "@/components/buttonText"
import { LabelInput  } from "@/components/forms/inputLabel"
import { UseAuth } from "@/hooks/auth"
import { api } from "@/services/api"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { IoIosArrowBack } from "react-icons/io"

export default function UpdateOrAddNewMeal() {
    const [name, setName] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    // const [ingredients, setIngredients] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [description, setDescription] = useState<string>('')

    const [isDisabled, setIsDisabled] = useState(true)

    const { user } = UseAuth()


    async function handleNewProduct() {
        try {
            const data = await api.post('/meals' , {
                name,
                description,
                price,
                category,
                created_by: user?.id
            }
        ) 

        return alert('Produto adicionado com sucesso')
        } catch (error: any) {
            alert(error)
        }
    }

    useEffect(() => {
        if (!name || !category || !price || !description) {
            setIsDisabled(true)
        } else{
            setIsDisabled(false)
        }
    }, [name, category, price, description])

    return (
        <section className="flex flex-col w-full min-h-screen px-8">
            <Link
                href='/home'
                className="flex items-center text-left mr-auto pt-3 font-medium text-base text-light-300 hover:text-light-400 duration-75"
            >
                <IoIosArrowBack className="text-2xl"/> voltar
            </Link>

            <form className="flex flex-col w-full">
                <LabelInput 
                    label="Nome" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" 
                    placeholder="Ex.: Salada Ceasar"
                />
                <LabelInput 
                    label="Categoria" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    type="text" 
                    placeholder="Refeição"
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
                    focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 duration-75 overflow-hidden mb-8"
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