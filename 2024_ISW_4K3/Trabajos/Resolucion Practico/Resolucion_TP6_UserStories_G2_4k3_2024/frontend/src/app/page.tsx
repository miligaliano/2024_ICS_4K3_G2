'use client';

import App from "@/components/app";
import PublicarPedidoPage from "@/components/prueba";
import { SnackbarProvider } from "notistack";

export default function Page() {

    return <div>
        <SnackbarProvider>
            <App></App>
        </SnackbarProvider>
    </div>
  }