import React from 'react';
import './Card.css';

const Card = props =>{
  return (
    <div className='card'
      style={{backgroundImage: `url(${props.backgroundImage})`}}
    >
      <div className='card-header'>
        <img className='card-portrait' src={props.portrait} alt='hero portrait' />
        <h2 className='card-title'>{props.name}</h2>        
      </div>
      <p className='card-text'>{props.text}</p>
    </div>
  );
}

export default Card;
