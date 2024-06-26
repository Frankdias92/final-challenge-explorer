import { CartProps } from "@/hooks/auth";

interface ItemProps {
    item: CartProps
}

export function DrobMenuCart ({item}: ItemProps) {
    return (
        <div>
            {item.name}
            {item.price}
            {item.quantity}
        </div>
    )
}