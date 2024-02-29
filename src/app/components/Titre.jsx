import React from 'react'

const Titre = ({titre,cls}) => {
  return (
    <div className={`bg-blue-500 text-white py-2 pl-4 mb-3 ${cls}`}>{titre}</div>
  )
}

export default Titre