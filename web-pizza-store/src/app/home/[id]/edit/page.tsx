'use client'

import { ButtonText } from "@/components/buttonText"
import { Section } from "@/components/forms/ingredientsSection"
import { LabelInput  } from "@/components/forms/inputLabel"
import { InputSelect } from "@/components/forms/inputSelect"
import { NewItem } from "@/components/forms/newItem"
import { UseAuth } from "@/hooks/auth"
import { OptionType, categorys } from "@/lib/categorys"
import { api } from "@/services/api"
import { Image, spacer } from "@nextui-org/react"
import NextImage from "next/image";
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useRef, useState } from "react"
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
            
            category.forEach(item => formData.append('category', item.value))
            // ingredients.forEach(item => formData.append('ingredients', item))

            // check if img already exist
            if (productImg) {
                formData.append('productImg', productImg as Blob)
            }

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
        
    }, [params])

    useEffect(() => {
        if (!name || !category || !price || !description || !ingredients) {
            setIsDisabled(true)
        } else{
            setIsDisabled(false)
        }
    }, [name, category, price, description, ingredients])

    
    return (
        <section className="flex flex-col w-full min-h-screen px-8 pb-12">
            <span
                className="flex items-center text-left mr-auto pt-3 font-medium text-base text-light-300 hover:text-light-400 duration-75"
            >
                <IoIosArrowBack className="text-2xl" onClick={() => router.back()}/> voltar
            </span>

            <h2 className="text-3xl font-roboto text-light-300 antialiased pt-6 pb-6">
                Atualizar prato
            </h2>

            <form className="flex flex-col w-full">
                
                {/* INPUT FILE IMG */}
                {img &&
                    <div className="relative m-auto w-fit">
                        <span className="flex items-center w-[88px] h-[88px] rounded-full overflow-hidden">
                            <Image
                                as={NextImage}
                                width={488}
                                height={488}
                                src={`${img}`}
                                alt="NextUI hero Image"
                                className="flex"
                            />
                        </span>
                            <button type="button" 
                                onClick={() => fileInputRef.current?.click()}
                                className="flex gap-2 bg-tint-tomato-200 p-1 rounded-full text-light-300 absolute right-0 bottom-0 z-10"
                            >
                                <LuImagePlus />
                            </button>
                    </div>
                }
                <div  className="flex  shadow bg-dark-200 appearance-none border-none rounded-lg w-full h-11 mt-8 leading-tight
                    focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 duration-75 relative">
                        <label className="flex gap-2 w-full h-full text-xs text-light-400 font-roboto absolute bottom-8 group/checked">
                            Imagem do prato 
                        </label>       
                        <input
                            ref={fileInputRef}
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
                            {productImg ? ` ./ ${imgName || img.split('-')[1]}` : <span className="flex gap-2 items-center"><PiUploadSimple className=" text-3xl h-full hover:text-light-500"/> Selecione imagem</span>}
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

                {/* INGREDIENTS */}
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
                {/* INGREDIENTS */}          
                
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