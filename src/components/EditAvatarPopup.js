import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = useRef()

    function handleSubmit(e) {

        e.preventDefault();

        onUpdateAvatar(
            avatarRef.current.value
        );
    }

  return (
    <PopupWithForm
            title='Обновить аватар'
            name='edit-avatar'
            isOpen={isOpen}
            onClose={onClose}
            buttonText='Сохранить'
            onSubmit={handleSubmit}
          >
            <input
              className="popup__input popup__input_form_image"
              type="url"
              name="avatar"
              placeholder="Ссылкка на картинку"
              required
              ref={avatarRef}/>
            <span className="popup__error avatar-error"></span>
          </PopupWithForm>
  );
}

export default EditAvatarPopup;