'use client'

import { useSearch } from "@/app/(home)/searchProvider"
import { ButtonText } from "@/components/buttonText"
import { LabelInput } from "@/components/forms/inputLabel"
import { LoaderProducts } from "@/components/loader/LoaderProducts"
import { useOrders } from "@/hooks/orderRequest"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type CepProps =  {
        cep: string
        adressNumber: string
        bairro: string
        localidade: string
        logradouro: string
}

export function HandleWithDelivery () {
        const [cep, setCep] = useState<string>('')
        const [adress, setAdress] = useState<string>('')
        const [adressNumber, setAdressNumber] = useState<string>('')
        const [neighborHood, setNeighborHood] = useState<string>('')
        const [location, setLocation] = useState<string>('')
        const router = useRouter()
        const { loadingProducts, loading } = useSearch()

        const { cartSummary } = useOrders()
        // const router = useRouter()

        function handleWithFinalStep() {
                loadingProducts(true)

                function confirmOrReset() {
                        const confirmation = 'Produto realizado!'
                        if (confirm(confirmation) === true) {
                            setCep('')
                            setAdress('')
                            setAdressNumber('')
                            setNeighborHood('')
                            setLocation('')
                            router.refresh()

                        //     could add order here.
                        } else {
                            router.push('/')
                        } 
                } 

                try {
                        const message = `
                                🍕 NOVO PEDIDO
                                \nEntregar em: \n RUA: ${adress}, ${adressNumber}, CEP: ${cep}, \n ${neighborHood}
                                \n${cartSummary.groupedItems?.map(item =>  ` \n${item.name} ${item.quantity} x ${item.price}`)}
                                \nValor total: R$ ${cartSummary.totalPrice}
                                \nRef:. ${cartSummary.groupedItems?.map(item => item.user_id)}`
        
                                const encodedMessage = encodeURIComponent(message)
                                // const groupId = 'DgHh0J2Fujo3Q4y8rGdCaw'         // Group Id
                                const url = `http://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_PHONE_NUMBER}&text=${encodedMessage}` // phone number
                                // const url = `https://api.whatsapp.com/send?group_id=${}` // group id
                                window.open(url, '_blank')

                                confirmOrReset()
                } catch (err) {
                        console.error('Error ao fazer o pedido', err)
                } finally {
                        loadingProducts(false)
                }
        }      
        

        useEffect(() => {
                async function getCepUser() {
                        try {
                                if (cep.length === 8) {
                                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                                const data: CepProps = response.data;
                        
                                setNeighborHood(data.bairro);
                                setLocation(data.localidade);
                                setAdress(data.logradouro);
                                }
                        } catch (error) {
                                console.error('Erro ao buscar informações do CEP:', error);
                        }
                }
            
                getCepUser();
        }, [cep]);

        return (
        <section className="flex w-full h-fit text-light-100 my-24 lg:px-0 md:px-16 px-4 ">
                <div className="flex flex-col w-full  gap-8">
                        {!loading ? (
                                <div className="flex flex-col w-full">
                                        <h2 className="font-poppins font-bold tracking-wider text-2xl leading-normal">
                                                Endereço para entrega
                                        </h2>

                                        <form className="flex flex-col w-full">
                                                <LabelInput 
                                                label="Cep" 
                                                type="number"
                                                placeholder="00000-00"
                                                value={cep}
                                                size={48}
                                                onChange={(e) => setCep(e.target.value)}
                                                />

                                                {/* {cep && ( */}
                                                <section className={`flex flex-col w-full  ${cep.length !== 8 ? 'opacity-45' : 'opacity-100'}`}
                                                >
                                                        <LabelInput 
                                                        label="Rua" 
                                                        type="string"
                                                        placeholder="Rua Vila Nova"
                                                        value={adress}
                                                        size={48}
                                                        onChange={(e) => setAdress(e.target.value)}
                                                        />

                                                        <LabelInput 
                                                        label="Numero" 
                                                        type="number"
                                                        placeholder="2024"
                                                        value={adressNumber}
                                                        size={48}
                                                        onChange={(e) => setAdressNumber(e.target.value)}
                                                        />

                                                        <LabelInput 
                                                        label="Localidade" 
                                                        type="string"
                                                        placeholder="Pipa"
                                                        value={location}
                                                        size={48}
                                                        onChange={(e) => setLocation(e.target.value)}
                                                        />

                                                        <LabelInput 
                                                        label="Bairro" 
                                                        type="string"
                                                        placeholder="Tibau do Sul"
                                                        value={neighborHood}
                                                        size={48}
                                                        onChange={(e) => setAdressNumber(e.target.value)}
                                                        />
                                                </section>

                                                <div className="flex w-full h-full mt-12">
                                                        <ButtonText text="Continuar com o pagamento"  onclick={handleWithFinalStep} size={48}/>
                                                </div>
                                        </form>
                                </div>
                        ) : (
                                <div className="absolute flex m-auto left-0  top-0 w-screen h-screen items-center justify-center bg-black/80">
                                        <span >
                                                <LoaderProducts />
                                        </span>
                        </div>
                        )}
                </div>
        </section>
        )
}