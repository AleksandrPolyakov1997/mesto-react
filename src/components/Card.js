import React from "react";

function Card({card, onCardClick}) {

  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="card">
    <button className="card__remove-button"></button>
    <img src={card.link} alt={card.name} className="card__image" onClick={handleClick}/>
    <div className="card__content">
      <h2 className="card__title">{card.name}</h2>
      <div className="card__like-container">
        <button className="card__like" type="button"></button>
        <div className="card__like-count">{card.likes.length}</div>
      </div>
    </div>
  </div>
  );
}

export default Card;