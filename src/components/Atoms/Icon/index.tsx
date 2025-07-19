import React from 'react'
// Importa el componente Icon desde la librería @iconify/react
import { Icon } from '@iconify/react'

/**
 * Componente funcional para renderizar un icono dentro de un contenedor circular con estilos.
 *
 * @param {string} icon - Nombre o identificador del icono que se desea renderizar.
 */
const Index = ({ icon }: { icon: string }) => {
  return (
    <div
      className='flex flex-col items-center justify-center gradient w-[72px] h-[72px] rounded-full'
    >
      {/* Renderiza el icono recibido como prop usando Iconify */}
      <Icon
        icon={`${icon}`}
        width='40'
        height='40'
        className='text-white'
      />
    </div>
  )
}

export default Index
