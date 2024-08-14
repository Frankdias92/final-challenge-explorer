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
import { Section } from "@/components/forms/ingredientsSection";
import { NewItem } from "@/components/forms/newItem";
import { LoaderProducts } from "@/components/loader/LoaderProducts";
import { useSearch } from "@/app/(home)/searchProvider";


export default function ProductForm() {
    const { user } = UseAuth()

    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)

    const [ingredients, setIngredients] = useState<string[]>([])
    const [newIngredientes, setNewIngredientes] = useState<string>('')

    const [description, setDescription] = useState<string>('')
    const [isDisabled, setIsDisabled] = useState(true)

    const [img, setImg] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
    const [productImg, setProductImg] = useState<File | string>('')
    const [category, setCategory] = useState<OptionType[]>([])
    const {loading, loadingProducts} = useSearch()

    const router = useRouter()

    function handleAddIngredients() {
        setIngredients(prevState => Array.isArray(ingredients) ? [...prevState, newIngredientes] : [newIngredientes])
        setNewIngredientes('')
    }
    function handleRemoveIngredients(deleted: string) {
        setIngredients(prevState => prevState.filter(item => item !== deleted))
    }

    const handleNewProduct = useCallback(async () => {
        loadingProducts(true)
        
        function confirmOrReset() {
            const confirmation = 'Produto adicionado com sucesso! Gostaria de adicionar outro produto?'
            if (confirm(confirmation) === true) {
                setName('')
                setCategory([])
                setDescription('')
                setProductImg('')
                setIngredients([])
                setPrice
                router.refresh()
            } else {
                router.push('/')
            } 
        } 
    
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', JSON.stringify(price))
            formData.append('ingredients', JSON.stringify(ingredients))
            formData.append('created_by', String(user?.id))
            
            if (productImg) {
                formData.append('productImg', productImg as Blob)
            }
            
            if (category.length > 0) {
                formData.append('category', JSON.stringify(category.map(item => item.value)))
            } else {
                formData.append('category', '[]')
            }
            
            await api.post('/meals', formData)
            // const handleConfirmation = prompt(`Produto adicionado com sucesso`)
            confirmOrReset()
        } catch (error: any) {
            alert(error.response.data.message || error.message)
        } finally {
            loadingProducts(false)
        }
    }, [name, description, price, ingredients, user?.id, productImg, category, router, loadingProducts])

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
            router.push('/')
        }
    }, [router, user])

    return (
        <form className="w-full h-full justify-stretch justify-items-stretch
            md:grid grid-cols-7 gap-x-8 items-end ">
            
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

            {/* INGREDIENTS */}
            <div className="flex w-full h-full flex-col col-start-1 col-span-5 justify-end">
                    <Section title="Ingredientes">
                        <div className="flex flex-wrap w-full justify-start gap-4">
                            {Array.isArray(ingredients) && ingredients.map((item, index) => {
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
                {!loading ? (
                    <ButtonText
                        text="Salvar"
                        onclick={handleNewProduct}
                        isDisable={isDisabled}
                        size={48}
                    />
                ) : (
                    <div className="absolute flex m-auto left-0  top-0 w-screen h-screen items-center justify-center bg-black/80">
                        <span className="">
                        <LoaderProducts />
                        </span>
                    </div>
                )}
            </div>
        </form>
    );
}
