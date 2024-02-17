import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-6 bg-white min-h-[500px]'>
        <img src='/no-disconnect.png' className='w-[300px]' />
        <h1>Erreur 404 </h1>
        <h1 className='font-bold text-2xl'>Désolé la page que vous recherchez est introuvable</h1>
    </div>
  )
}

export default page