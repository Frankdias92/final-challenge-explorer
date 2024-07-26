
import dynamic from "next/dynamic";
import DesktopView from "./desktopView";

// const DesktopView = dynamic(() => 
//     import(
//         /* webpackChuckName: "Desktop View"*/
//         "./desktopView"), { ssr: false }
// )

const MobiViewHeader = dynamic(() => 
    import(
        /* webpackPrefetch: true */
        /* webpackChuckName: "MobiView"*/
        "./mobiViewHeader"), { ssr: false }
)

export default function HandleViewHeader () {
        return (
            <>
                <DesktopView />

                <MobiViewHeader />
            </>
        )
}