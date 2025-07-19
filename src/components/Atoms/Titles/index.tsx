// Importa React para definir los componentes
import React from 'react'

/**
 * HeroTitle:
 * Título grande usado como encabezado principal.
 * Muestra un texto fijo con estilos definidos.
 */
const HeroTitle = () => {
  return (
    <h1 className='text-[56px] text-bank2 font-light text-left max-w-[400px]'>
      Next generation digital banking
    </h1>
  )
}

/**
 * MediumTitle:
 * Título mediano con un texto fijo simple.
 * Sin estilos personalizados.
 */
const MediumTitle = () => {
  return <h2>Next generation digital banking</h2>
}

/**
 * SubTitle:
 * Subtítulo que recibe el texto como prop.
 * Se usa para títulos secundarios con estilo.
 */
const SubTitle = ({ title }: { title: string }) => {
  return <h3 className='text-[24px] text-bank2 font-light text-left'>{title}</h3>
}

/**
 * SubText:
 * Párrafo breve que recibe el texto como prop.
 * Se usa como texto descriptivo o informativo.
 */
const SubText = ({ text }: { text: string }) => {
  return <p className='text-[18px] text-bank3 font-normal text-left max-w-[400px]'>{text}</p>
}

// Exporta todos los componentes para ser usados individualmente
export { HeroTitle, MediumTitle, SubTitle, SubText }
