'use client'

import { useCallback, useEffect, useState } from "react";
import { LabelInput } from "@/components/forms/inputLabel";
import { ButtonText } from "@/components/buttonText";
import { UseAuth } from "@/hooks/auth";
import { api } from "@/services/api";
import { OptionType } from "@/lib/categorys";
import { useRouter } from "next/navigation";
import { HandleImageUpload } from "./handleImageUpload";
import { HandleCategorySelect } from "./handleCategorySelect";
import { MultiValue } from "react-select";
import { useOrders } from "@/hooks/orderRequest";


export default function ProductForm() {
    const { user } = UseAuth()
    const {ingredients} = useOrders()

    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [description, setDescription] = useState<string>('')
    const [isDisabled, setIsDisabled] = useState(true)

    const [img, setImg] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
    const [productImg, setProductImg] = useState<File | string>('')
    const [category, setCategory] = useState<OptionType[]>([])

    const router = useRouter()

    const handleNewProduct = useCallback(async () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price.toString())
            formData.append('ingredients', JSON.stringify(ingredients))
            formData.append('created_by', String(user?.id))
            
            if (productImg) {
                formData.append('productImg', productImg as Blob)
            }
            
            category.forEach(item => formData.append('category', item.value))
            
            await api.post('/meals', formData)
            alert('Produto adicionado com sucesso')
        } catch (error: any) {
            alert(error.response.data.message || error.message)
        }
    }, [name, description, price, ingredients, user?.id, productImg, category])

    const handleNewCategory = useCallback((selectedOptions: MultiValue<OptionType>) => {
        setCategory(selectedOptions as OptionType[])
    }, []);

    const checkFormValidity = useCallback(() => {
        setIsDisabled(!name || !category || !price || !description)
    }, [name, category, price, description])

    useEffect(() => {
        checkFormValidity()
    }, [name, category, price, description, checkFormValidity])

    useEffect(() => {
        if (user?.role !== 'admin') {
            router.push('/home')
        }
    }, [router, user])

    return (
        <form className="w-full h-full justify-stretch justify-items-stretch
            md:grid grid-cols-7 gap-x-8 items-end">
            
            <div className="col-start-1 col-span-2">
                <HandleImageUpload
                    productImg={productImg}
                    setProductImg={setProductImg}
                    setImgName={setImgName}
                    setImg={setImg}
                />
            </div>

            <div className="flex flex-col flex-1 col-start-3 col-span-2">
                <LabelInput
                    label="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Ex.: Salada Ceasar"
                    size={48}
                />
            </div>

            <HandleCategorySelect
                category={category}
                handleNewCategory={handleNewCategory}
            />

            <div className="flex w-full flex-col col-start-6 col-span-2">
                <LabelInput
                    label="Preço"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type="number"
                    placeholder="R$ 00,00"
                    size={48}
                />
            </div>

            <div className="flex h-fit flex-col col-start-1 col-span-7">
                <label className="flex gap-2 w-full h-full text-xs text-light-400 font-roboto pt-8">
                    Descrição
                </label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="flex resize-none shadow bg-dark-200 appearance-none border-none rounded-lg w-full h-40
                    focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 duration-75 p-2 text-light-300"
                    placeholder="Descrição do prato">
                </textarea>
            </div>

            <div className="flex flex-col col-start-1 col-span-7 mt-8">
                <ButtonText
                    text="Salvar"
                    onclick={handleNewProduct}
                    isDisable={isDisabled}
                    size={48}
                />
            </div>
        </form>
    );
}
