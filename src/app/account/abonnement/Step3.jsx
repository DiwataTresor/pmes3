import { Checkbox } from 'antd'
import { CheckCircle, CheckCircle2, CheckCircle2Icon } from 'lucide-react'
import React from 'react'

const Step3 = () => {
  return (
    <div>
        <p className='text-lg flex flex-col justify-center items-center text-center gap-5'>
            <CheckCircle2 size={60} color='green' />
            Nous vous remercions pour votre demande du nouvel abonnement, nos services vont rapidement traiter votre demande, 
            et vous repondront dans un bref delais. 
        </p>
    </div>
  )
}

export default Step3