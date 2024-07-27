
import { MultiValue } from "react-select";
import { OptionType } from "@/lib/categorys";
import { InputSelect } from "@/components/forms/inputSelect";

interface CategorySelectProps {
    category: OptionType[]
    handleNewCategory: (selectedOptions: MultiValue<OptionType>) => void
}

export function HandleCategorySelect({ category, handleNewCategory }: CategorySelectProps) {
    return (
        <div className="flex h-full flex-col col-span-3">
            <label className="flex gap-2 w-full h-full text-xs text-light-400 font-roboto pt-8">
                Categoria
            </label>
            <InputSelect
                category={category}
                size={56}
                handleNewCategory={handleNewCategory}
            />
        </div>
    );
}
