"use client"
import { Button, Result } from 'antd'
import React from 'react'

const error = () => {
  return (
    <Result
    status="403"
    title="Impossible d'acceder à la page demandée"
    subTitle="Désolé, Une erreur s'est produite dans le système"
    extra={<Button type="primary">Retourner à la Page d'accueil</Button>}
  />
  )
}

export default error