"use client"
import { useEffect, useState } from "react"
import Header from "../Header/Header"
import SearchFull from "../Header/SearchFull"
import "./EstructuraCuerpo.scss"
import useStore from "@/zustand"

const EstructuraCuerpo = ({ children, childrenDetail, detalle }) => {
    const { isOpenSearchFull, setIsOpenSearchFull } = useStore();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateSize = () => {
            const isNowMobile = window.innerWidth <= 554;
            setIsMobile(isNowMobile);

            if (!isNowMobile) setIsOpenSearchFull(false);
        };

        updateSize();

        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [setIsOpenSearchFull]);


    return (
            <div className='estructura-cuerpo'>
                <div className="contenedor-estructura-cuerpo">

                    <Header />

                    {isOpenSearchFull
                        ?
                        <SearchFull />
                        :
                        <>
                            <main className="main-original">
                                {children}
                            </main>

                            {detalle &&
                                <main className="main-secundario">
                                    {childrenDetail}
                                </main>
                            }
                        </>
                    }

                </div>
            </div>
    )
}

export default EstructuraCuerpo