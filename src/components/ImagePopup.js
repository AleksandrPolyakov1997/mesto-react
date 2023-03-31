import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_big-image ${card ? 'popup_open' : ''}`}>
      <div className="popup__image-container">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img src={card?.link} alt={card?.name} className="popup__big-image" />
        <p className="popup__image-caption">{card?.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;