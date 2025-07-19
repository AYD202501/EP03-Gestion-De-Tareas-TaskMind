// Importa React y los componentes necesarios
import React from 'react'
import Icon from '@/components/Atoms/Icon'
import { SubTitle, SubText } from '@/components/Atoms/Titles'

/**
 * FeatureCard:
 * Componente que muestra una tarjeta simple con un ícono, un subtítulo y un texto.
 * 
 * Props:
 * - icon: nombre del ícono que se mostrará.
 * - title: texto del subtítulo.
 * - text: descripción breve.
 */
const Index = ({ icon, title, text }: { icon: string; title: string; text: string }) => {
  return (
    <div className='flex flex-col gap-5'>
      {/* Muestra el ícono */}
      <div>
        <Icon icon={icon} />
      </div>

      {/* Muestra el subtítulo */}
      <div>
        <SubTitle title={title} />
      </div>

      {/* Muestra el texto descriptivo */}
      <div>
        <SubText text={text} />
      </div>
    </div>
  )
}

// Exporta el componente para su uso
export default Index
