'use client';

import Body from "@/components/body";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { SnackbarProvider } from "notistack";
import clases from '../Styles/Componente.module.css'
import { useState } from "react";


export default function Page() {
    const [notificaciones, setNotificaciones] = useState([]);
        

    return (
        <>
            <style jsx global>{`
                html, body, #__next {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    overflow-x: hidden;
                }
            `}</style>
            <link rel="stylesheet" href="" />

            <div className={clases.global}>
                <div className={clases.main}>
                    <Header setNotificaciones={setNotificaciones} notificaciones={notificaciones}/>
                    <SnackbarProvider>
                        <Body setNotificaciones={setNotificaciones} notificaciones={notificaciones}/>
                    </SnackbarProvider>
                    <Footer />
                </div>
            </div>
        </>
    );
}