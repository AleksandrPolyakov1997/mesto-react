import React from "react";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, userName, userDescription, userAvatar, cards }) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={userAvatar} alt="аватар" className="profile__avatar" />
          <button
            className="profile__avatar-button"
            onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}>
          </button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}>
        </button>
      </section>
      <section className="cards">
        {
          cards.map((item) => (
            <Card 
            key={item._id}
            card={item}
            onCardClick={onCardClick}
            />
          ))
        }
      </section>
    </main>
  );
}

export default Main;