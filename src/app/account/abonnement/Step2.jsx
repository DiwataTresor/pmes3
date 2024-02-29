import { Button, Input } from '@nextui-org/react'
import { Info } from 'lucide-react'
import React, { useState } from 'react'

const Step2 = ({nbreAnnee,setNewNbreAnnee}) => {
   const [v,setV]=useState(nbreAnnee);
  return (
    <div>
        <div className='flex flex-col items-center justify-center gap-4 w-full font-thin'>
            <div className='text-center font-normal flex gap-3'>
              <Info />Veuillez indiquez le temps de votre nouvel abonnement
            </div>
            <div className='w-full px-72'>
              <Input 
                type='number' 
                className='w-full' 
                size='sm' min={1} 
                max={5} 
                defaultValue={v} 
                label="Nombre Année" 
                onChange={(e)=>{
                    if(parseInt(e.target.value)<1)
                    {
                        setV("1"); 
                        setNewNbreAnnee(1)
                    }else{
                        setV(e.target.value); 
                        setNewNbreAnnee(e.target.value)
                    }
                }} 
            />
            </div>
            
          </div>
    </div>
  )
}

export default Step2