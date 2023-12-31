import React from 'react'
import './Pokemon.css'

function Pokemon({ name, image }) {
  return (
    <div className='pokemon'>
      <div className='pokemon-name-container'>{name}</div>
      <div className='pokemon-img-container'><img src={image} /></div>
    </div>
  )
}

export default Pokemon