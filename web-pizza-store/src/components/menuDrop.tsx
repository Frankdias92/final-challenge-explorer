'use client'

import { ParagraphDivision } from "./paragraphDivision"
import { UseAuth } from "@/hooks/auth"
import { useRouter } from "next/navigation"
import { SearchForm } from "./forms/searchForm"
import { useSearch } from "@/app/(home)/searchProvider"
import { Image } from "@nextui-org/react"
import NextImage from "next/image"
import { TbShoppingBagPlus } from "react-icons/tb"

interface isMenuOpenProps {
    isMenuOpen: boolean
}

export function MenuDrop() {
    const  { signOut, user, handleMenuOpen, isMenuOpen }  = UseAuth()
    const { searchTerm, setSearchTerm, filteredProducts} = useSearch()
    const router = useRouter()

    function handleClickNewDishe() {
        router.push('/new')
        handleMenuOpen(false)
    }

    function handleSignOutRouter() {
        signOut()
        router.push('/login')
        handleMenuOpen(false)
    }

    return (
        <>
            {isMenuOpen &&
                <div className="flex flex-col w-full min-h-full px-7 pt-12 z-40">
                    <div className="flex flex-col w-full gap-9">
                        <div>
                            <SearchForm
                                searchTerm={searchTerm}
                                setSearchForm={setSearchTerm}
                            />

                        </div>

                             
                        {searchTerm ? (
                            filteredProducts.map(product => (
                                <div key={product.meal_id}
                                    className="flex w-full items-center gap-4"
                                    >
                                    <span className="flex items-center size-[88px] md:size-[172px]">
                                        <Image
                                            as={NextImage}
                                            // priority={false}
                                            // placeholder="blur"
                                            // blurDataURL={process.env.BLUR_DATA}
                                            // loading="lazy"
                                            width={488}
                                            height={488}
                                            quality={100}
                                            src={`http://localhost:3333/files/${product.productImg}`}
                                            alt="NextUI hero Image"
                                            className="flex bg-contain rounded-full overflow-hidden"
                                        />
                                    </span>

                                    <div className="flex w-full flex-col">
                                        <p>{product.name}</p>
                                        <p>{product.description}</p>
                                        <p className="start-0 col-span-2">R$ {product.price}</p>
                                    </div>
                                    <TbShoppingBagPlus className="text-3xl justify-self-end hover:text-light-400"/>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col w-full text-light-300">
                                { user?.role === 'admin' && <ParagraphDivision text="Novo prato" onClick={handleClickNewDishe}/>}
                                {!user ? (
                                    <ParagraphDivision text="Fazer Login" onClick={() => router.push('/login')}/>
                                ) : (
                                    <ParagraphDivision text="Sair" onClick={handleSignOutRouter}/>
                                )}
                            </div>
                        )}     
                    </div>
                    
                </div>
            }
        </>
    )
}