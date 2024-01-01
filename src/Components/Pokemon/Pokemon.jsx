import React from 'react'
import './Pokemon.css'
import { Link } from 'react-router-dom'


function Pokemon({ id, name, image }) {
  return (
    <div>
      <Link className='link-wrapper' to={`/pokemon/${id}`}>
        <div className="pokemon">
          <div className='pokemon-name-container'>
            <p>{name}</p>
          </div>
          <div className='pokemon-img-container'><img src={image} /></div>
        </div>
      </Link>
    </div>
  )
}

export default Pokemon