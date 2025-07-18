// Importa React y el componente Link de Next.js
import React from 'react'
import Link from 'next/link'

// Define las propiedades esperadas por el componente:
// - title: texto que se mostrará.
// - link: URL interna a la que navegará el componente.
interface Indexprops {
  title: string
  link: string
}

// Componente NavTitle: muestra un título como enlace clicable.
const Index = ({ title = 'Title', link = '/' }: Indexprops) => {
  return (
    // Enlace que redirige a la ruta recibida como prop
    <Link href={link}>
      {/* Contenedor visual con estilos y efectos hover */}
      <div className='h-20 flex justify-center text-bank3 items-center hover:text-bank2 cursor-pointer hover:border-b-2 hover:border-bank1 '>
        {/* Texto mostrado dentro del enlace */}
        <h1 className='text-sm font-normal'>{title}</h1>
      </div>
    </Link>
  )
}

// Exporta el componente para ser usado en otras partes del proyecto
export default Index
