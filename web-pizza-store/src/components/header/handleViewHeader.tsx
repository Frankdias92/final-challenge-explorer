import dynamic from "next/dynamic";

const DesktopView = dynamic(() => 
    import(
        /* webpackChuckName: "Desktop View"*/
        "./desktopView"), { ssr: true }
)

const MobiViewHeader = dynamic(() => 
    import(
        /* webpackPrefetch: true */
        /* webpackChuckName: "MobiView"*/
        "./mobiViewHeader"), { ssr: true }
)

export default function HandleViewHeader () {
        return (
            <>
                <DesktopView />

                <MobiViewHeader />
            </>
        )
}