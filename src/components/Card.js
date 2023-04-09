import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_checked'}`
  );;

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      {isOwn && <button className="card__remove-button" onClick={handleCardDelete} />}
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      <div className="card__content">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} onClick={handleCardLike} type="button"></button>
          <div className="card__like-count">{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;