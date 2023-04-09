import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value)
  }

  const handleAddPlaceSubmit = (e) => {
    e.preventDefault()
    onAddPlace({
      name,
      link
    })
  }

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setLink('')
    }
  }, [isOpen])

  return (
    <PopupWithForm
      title='Новое место'
      name='new-card'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        className="popup__input popup__input_form_name"
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        required
        placeholder="Название"
        onInput={handleNameChange}
        value={name} />
      <span className="popup__error name-error"></span>
      <input
        className="popup__input popup__input_form_job"
        type="text"
        name="link"
        minLength="2"
        maxLength="200"
        required
        placeholder="Ссылка на картинку"
        onInput={handleLinkChange}
        value={link} />
      <span className="popup__error job-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;