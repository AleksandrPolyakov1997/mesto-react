import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import PopupWithForm from './components/PopupWithForm';
import api from './utils/Api';
import './index.css';
import ImagePopup from './components/ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
 
  const [user, setUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInfoUser(), api.getCards()])
      .then(([infoUser, cards]) => {
        setUser(infoUser);
        setCards(cards);
      })
      .catch(err => console.log(`Ошибка ${err}`))
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    // console.log(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className='page'>
      <div className="page__content">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          userName={user.name}
          userDescription={user.about}
          userAvatar={user.avatar}
          cards={cards}
        />
        <Footer />

        <PopupWithForm
          title='Редактировать профиль'
          name='edit-profile'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText='Сохранить'
        >
          <input
            className="popup__input popup__input_form_name"
            type="text"
            name="name"
            minLength="2"
            maxLength="40"
            required
            placeholder="Имя" />
          <span className="popup__error name-error"></span>
          <input
            className="popup__input popup__input_form_job"
            type="text"
            name="job"
            minLength="2"
            maxLength="200"
            required
            placeholder="О себе" />
          <span className="popup__error job-error"></span>
        </PopupWithForm>

        <PopupWithForm
          title='Новое место'
          name='new-card'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText='Сохранить'
        >
          <input
            className="popup__input popup__input_form_name"
            type="text"
            name="name"
            minLength="2"
            maxLength="40"
            required
            placeholder="Имя" />
          <span className="popup__error name-error"></span>
          <input
            className="popup__input popup__input_form_job"
            type="text"
            name="job"
            minLength="2"
            maxLength="200"
            required
            placeholder="О себе" />
          <span className="popup__error job-error"></span>
        </PopupWithForm>

        <PopupWithForm
          title='Обновить аватар'
          name='edit-avatar'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText='Сохранить'
        >
          <input
            className="popup__input popup__input_form_image"
            type="url"
            name="avatar"
            placeholder="Ссылкка на картинку"
            required />
          <span className="popup__error avatar-error"></span>
        </PopupWithForm>

        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />

        {/*

        <section className="popup popup_delete-card">
          <div className="popup__content">
            <button className="popup__close" type="button"></button>
            <h2 className="popup__title">
              Вы уверены?
            </h2>
            <button className="popup__button-save popup__button-delete" type="submit">
              Да
            </button>
          </div>
        </section>

        <section className="popup popup_big-image">
          <div className="popup__image-container">
            <button className="popup__close" type="button"></button>
            <img src="#" alt="#" className="popup__big-image" />
            <p className="popup__image-caption"></p>
          </div>
        </section> */}

      </div>

    </div>
  );
}

export default App;
