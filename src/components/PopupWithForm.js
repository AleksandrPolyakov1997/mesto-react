import React from "react";

function PopupWithForm({ title, name, isOpen, onClose, children, buttonText}) {
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
        <form className="popup__form popup__form_profile" name={`${name}-form`} noValidate>
          {children}
          <button className="popup__button-save popup__button-save_invalid" type="submit" disabled>
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;