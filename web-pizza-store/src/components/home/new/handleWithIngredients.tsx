'use client'

import { useState } from "react";
import { Section } from "@/components/forms/ingredientsSection";
import { NewItem } from "@/components/forms/newItem";
import { useOrders } from "@/hooks/orderRequest";

export function HandleWithIngredients() {
    const { ingredients, handleAddIngredients, handleRemoveIngredients } = useOrders();
    const [newIngredient, setNewIngredient] = useState<string>('');

    const handleAddIngredient = () => {
        if (newIngredient.trim()) {
            handleAddIngredients(newIngredient);
            setNewIngredient('');
        }
    };

    return (
        <div className="flex h-full flex-col col-span-4 justify-end">
            <Section title="Ingredientes">
                <div className="flex flex-wrap justify-start gap-4">
                    {ingredients.map((item, index) => (
                        <NewItem
                            key={String(index)}
                            value={item}
                            onClick={() => handleRemoveIngredients(item)}
                        />
                    ))}

                    <NewItem
                        isNew
                        value={newIngredient}
                        placeholder='Adicionar'
                        onChange={(e) => setNewIngredient(e.target.value)}
                        onClick={handleAddIngredient}
                    />
                </div>
            </Section>
        </div>
    );
}
