import React from "react";

function PopupWithForm({ title, name, isOpen, onClose, children, buttonText, onSubmit }) {
  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_open' : ''}`}>
      <div className="popup__content">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}>
        </button>
        <h2 className="popup__title">
          {title}
        </h2>
        <form className="popup__form popup__form_profile" name={`${name}-form`} onSubmit={onSubmit}>
          {children}
          <button className="popup__button-save" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;