import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {

    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-profile'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_form_name"
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        required
        placeholder="Имя"
        onChange={handleNameChange}
        value={name} />
      <span className="popup__error name-error"></span>
      <input
        className="popup__input popup__input_form_job"
        type="text"
        name="job"
        minLength="2"
        maxLength="200"
        required
        placeholder="О себе"
        onChange={handleDescriptionChange}
        value={description} />
      <span className="popup__error job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;