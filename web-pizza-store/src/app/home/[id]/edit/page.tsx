'use client'

import { ButtonText } from "@/components/buttonText"
import { Section } from "@/components/forms/ingredientsSection"
import { LabelInput  } from "@/components/forms/inputLabel"
import { InputSelect } from "@/components/forms/inputSelect"
import { NewItem } from "@/components/forms/newItem"
import { HandleImageUpload } from "@/components/home/new/handleImageUpload"
import { UseAuth } from "@/hooks/auth"
import { useOrders } from "@/hooks/orderRequest"
import { OptionType, categorys } from "@/lib/categorys"
import { api } from "@/services/api"
import { Image, spacer } from "@nextui-org/react"
import NextImage from "next/image";
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
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
    ingredients: string[]
    productImg: string
    created_by: number
}

export default function UpdateDisher() {
    const { user } = UseAuth()
    const { DeleteMealId } = useOrders()

    const [data, setData] = useState<DisheProps>()
    const [name, setName] = useState<string>('')
    const [category, setCategory] = useState<OptionType[]>([])

    const [description, setDescription] = useState<string>('')
    const [ingredients, setIngredients] = useState<string[]>([])
    const [newIngredientes, setNewIngredientes] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [isDisabled, setIsDisabled] = useState(true)

    const [img, setImg] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
    const [productImg, setProductImg] = useState<File | string >('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    
    const fileInputRef = useRef<HTMLInputElement>(null)    
    const params = useParams()
    const router = useRouter()
    // const {handleAddIngredients, handleRemoveIngredients, ingredients, setIngredients} = useOrders()

    

    function handleAddIngredients() {
        setIngredients(prevState => Array.isArray(ingredients) ? [...prevState, newIngredientes] : [newIngredientes])
        setNewIngredientes('')
    }
    function handleRemoveIngredients(deleted: string) {
        setIngredients(prevState => prevState.filter(item => item !== deleted))
    }
    async function handleWithUpdateDisher() {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('ingredients', JSON.stringify(ingredients))
            formData.append('price', price.toString())
            formData.append('created_by', String(user?.id))
            
            
            // category.forEach(item => formData.append('category', item.value))
            if (category.length > 0) {
                formData.append('category', JSON.stringify(category.map(item => item.value)))
            } else {
                formData.append('category', '[]')
            }
            
            // check if img already exist
            if (productImg) {
                formData.append('productImg', productImg as Blob)
            }
            
            const response = await api.put(`/meals/${params.id}` , formData ) 
            // console.log('response', response.data)
            return alert('Produto atualizado com sucesso')
        } catch (error: any) {
            alert(error.response?.data?.message || error.message)
        }
    }
    function handleNewCategory(selectedOptions: MultiValue<OptionType>) {
        setCategory(selectedOptions as OptionType[])
    }

    const handleDeletMeal = useCallback(() => {
        DeleteMealId(Number(params.id))
    }, [params, DeleteMealId])

    function cleanString(input: string) {
        return input.replace(/\\/g, '').replace(/"/g, '');
    }

    useEffect(() => {
        async function getDisheId() {
            const response = await api.get(`/meals/${params.id}`)
            const data = response.data[0]
            
            if (data) {
                setName(data.name)
                setDescription(data.description)
                setPrice(data.price)
                
                try {
                    let ingredients = JSON.parse(data.ingredients)
                    setIngredients(ingredients)
                } catch (error) {
                    console.error(error)
                }
                          
                if (Array.isArray(data.category)) {
                    setCategory(data.category.map((gory: string) => {
                        const cleanedGory = cleanString(gory);
                        const found = categorys.find(option => option.value === cleanedGory);
                        return found ? found : { value: cleanedGory, label: cleanedGory };
                    }));
                } else if (typeof data.category === 'string') {
                    // Remove colchetes e espaços extras, depois separa por vírgula
                    const cleanedCategoryString = data.category.replace(/[\[\]]/g, '').trim();
                    const categoryArray = cleanedCategoryString.split(',').map((gory: string) => cleanString(gory.trim()));
                
                    setCategory(categoryArray.map((gory: string) => {
                        const found = categorys.find(option => option.value === gory);
                        return found ? found : { value: gory, label: gory };
                    }));
                } else {
                    console.error("Category data is not in a recognized format");
                }

                setImg(`http://localhost:3333/files/${data.productImg}`)
                setProductImg(data.productImg)

            } else {
                console.log("Error to get products")
            }
        }
        getDisheId()
        
    }, [params, setIngredients])

    useEffect(() => {
        if (!name || !category || !price || !description || !ingredients) {
            setIsDisabled(true)
        } else{
            setIsDisabled(false)
        }
    }, [name, category, price, description, ingredients])

    
    return (
        <>
        {user?.role === 'admin' &&
        <section className="flex flex-col w-full h-fit pb-14 px-8 md:px-0 
            md:w-3/4 m-auto md:relative md:pb-20 md:mt-10">
            <span
                onClick={() => router.back()}
                className="flex items-center text-left mr-auto pt-3 font-medium md:font-bold md:text-2xl text-base text-light-300 hover:text-light-400 duration-75
                cursor-pointer"
            >
                <IoIosArrowBack className="text-2xl" />
                    voltar
            </span>

            <h2 className="text-3xl font-roboto text-light-300 antialiased pt-6 pb-6 md:pb-0
                md:font-medium"
            >
                Atualizar prato
            </h2>


            <form className="w-full h-full justify-stretch justify-items-stretch
            md:grid grid-cols-7 gap-x-8 items-end">
                
                {/* INPUT FILE IMG */}
                <div className="col-start-1 col-span-2 relative">
                    <HandleImageUpload 
                        productImg={productImg}
                        setProductImg={setProductImg}
                        setImgName={setImgName}
                        setImg={setImg}
                        >
                        {productImg && <span className="flex gap-2 items-center h-12">./ {img.split('-')[1]}</span>}
                    </HandleImageUpload>
                </div>
                {/* END OF FILE IMG */}
                
                {/* name */}
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

                {/* category */}
                <div className="flex h-full flex-col col-span-3">
                    <label className="flex gap-2 w-full h-full text-xs text-light-400 font-roboto pt-8">
                        Categoria
                    </label>    
                    <InputSelect 
                        category={category}
                        handleNewCategory={handleNewCategory}
                        size={56}
                    />
                </div>

                {/* INGREDIENTS */}
                <div className="flex w-full h-full flex-col col-start-1 col-span-5 justify-end">
                    <Section title="Ingredientes">
                        <div className="flex flex-wrap justify-start gap-4">
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
                
                {/*  price */}
                <div className="flex w-full flex-col col-start-6 col-span-2">
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
                <div className="flex h-fit flex-col col-start-1 col-span-7">
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
                </div>

            </form>

            <div className="flex m-auto w-full md:mr-0 md:w-fit gap-x-12 gap-y-4 flex-col sm:flex-row">
                <ButtonText 
                    text="Excluir prato" 
                    size={48} 
                    // isDisable={isDisabled}
                    colorDark={true}
                    onclick={handleDeletMeal}
                />

            <ButtonText 
                    text="Salvar alterações" 
                    size={48} 
                    isDisable={isDisabled}
                    onclick={handleWithUpdateDisher}
                />
            </div>
        </section>
        }
        </>
    )
}