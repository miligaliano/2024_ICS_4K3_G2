'use client';

import App from "@/components/app";
import Body from "@/components/body";
import Footer from "@/components/footer";
import Header from "@/components/header";
import PublicarPedidoPage from "@/components/prueba";
import { Button, Typography } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import clases from '../Styles/Componente.module.css'
export default function Page() {


    const [dato, setDato] = useState(0);
    const handleChange = () => {
        setDato(dato + 1)
        
    }

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

            <div className={clases.global}>
                <div className={clases.main}>
                    <Header />
                    <SnackbarProvider>
                        <Body />
                    </SnackbarProvider>
                    <Footer />
                </div>
            </div>
        </>
    );
}