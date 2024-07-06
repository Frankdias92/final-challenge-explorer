'use client'

import { ButtonReturn } from "@/components/buttonReturn"
import { ButtonText } from "@/components/buttonText"
import { LabelInput } from "@/components/forms/inputLabel"
import { useOrders } from "@/hooks/orderRequest"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"


interface CepProps {
    cep: string
    adressNumber: string
    bairro: string
    localidade: string
    logradouro: string
}

export default function Delivery () {
    const [cep, setCep] = useState<string>('')
    const [adress, setAdress] = useState<string>('')
    const [adressNumber, setAdressNumber] = useState<string>('')
    const [neighborHood, setNeighborHood] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    
    // DgHh0J2Fujo3Q4y8rGdCaw
    
    // https://chat.whatsapp.com/CITkK4QrDOV0Sum6bdwPSO
    
    const { HandleWithCurrentStep, currentStep, cart,  } = useOrders()
    const router = useRouter()

    function handleWithFinalStep() {
        if (adressNumber === '')  {
            return alert('Informe o numero da residencia')
        }
        HandleWithCurrentStep(2)
        router.push('')

        const message = `
         🍕 NOVO PEDIDO
         \n Entregar em: ${adress}
         \n ${cart?.map(item => item.name)}
        \nValor total: ${'test'}
        `
        const encodedMessage = encodeURIComponent(message)
        const PHONE_NUMBER = '5584994508010'        // Phone number
        const groupId = 'DgHh0J2Fujo3Q4y8rGdCaw'         // Group Id
        // const url = `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}` // phone number
        const url = `https://api.whatsapp.com/send?group_id=${groupId}` // group id
        window.open(url, '_blank')
    }

    useEffect(() => {
        async function getCepUser() {
            if (cep.length === 8) {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                const data: CepProps = response.data

                setNeighborHood(data.bairro)
                setLocation(data.localidade)
                setAdress(data.logradouro)
            } 
        }
        getCepUser()
    }, [cep])

    return (
        <section className="flex w-full h-full text-light-100 py-8">
            <div className="flex flex-col w-3/4 min-h-screen m-auto justify-between">
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
                                    {...require}
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