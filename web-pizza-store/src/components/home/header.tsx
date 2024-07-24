import dynamic from "next/dynamic";


const HandleViewHeader = dynamic(() => 
    import('../header/handleViewHeader'), {
        loading: () => <p>Loading...</p>
    }
)
export default function Header() {
    return (
        <header className={`flex  w-full h-28 items-center bg-dark-400 text-light-100`}>
            <HandleViewHeader />
        </header>
    )
}