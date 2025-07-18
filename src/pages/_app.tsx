// Importación de estilos globales y proveedores necesarios
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from '@/components/ui/use-toast';

// Componente principal de la aplicación
// Envuelve todas las páginas con los proveedores globales:
// - SessionProvider: maneja la autenticación con NextAuth
// - ToastProvider: permite mostrar notificaciones tipo toast
export default function App({ Component, pageProps: {session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </SessionProvider>
  );
}
