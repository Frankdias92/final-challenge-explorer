'use client'

import { ButtonReturn } from "@/components/buttonReturn"
import { ButtonText } from "@/components/buttonText"
import { LabelInput } from "@/components/forms/inputLabel"
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

        const { HandleWithCurrentStep, groupedCartItems, totalPrice } = useOrders()
        const router = useRouter()

    function handleWithFinalStep() {
        if (adressNumber === '')  {
            return alert('Informe o numero da residencia')
        }
        HandleWithCurrentStep(2)
        router.push('')

        const message = `
                🍕 NOVO PEDIDO
                \nEntregar em: \n RUA: ${adress}, ${adressNumber}, CEP: ${cep}, \n ${neighborHood}
                \n${groupedCartItems?.map(item =>  ` \n${item.name} ${item.quantity} x ${item.price}`)}
                \nValor total: R$ ${totalPrice}`;

                const encodedMessage = encodeURIComponent(message)
                // const groupId = 'DgHh0J2Fujo3Q4y8rGdCaw'         // Group Id
                const url = `http://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_PHONE_NUMBER}&text=${encodedMessage}` // phone number
                // const url = `https://api.whatsapp.com/send?group_id=${}` // group id
                window.open(url, '_blank')
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
        <section className="flex w-full h-full text-light-100 py-8">
                <div className="flex flex-col w-full min-h-screen m-auto justify-between">
                        <div className="flex flex-col w-full h-full">
                                <ButtonReturn 
                                        label="Endereço para entrega" 
                                        context="Dados cadastrais"
                                />

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

                                        {/*  )} */}

                                </form>
                        </div>

                        <ButtonText text="Enviar Pedido" onclick={handleWithFinalStep} size={48}/>
                </div>
        </section>
        )
}