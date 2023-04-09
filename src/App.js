import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import api from './utils/Api';
import './index.css';
import ImagePopup from './components/ImagePopup';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import AddPlacePopup from './components/AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    "name": '',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInfoUser(), api.getCards()])
      .then(([infoUser, cards]) => {
        setCurrentUser(infoUser);
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
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  const handleUpdateUser = (data) => {
    api.editUser(data).then(updateUser => {
      setCurrentUser(updateUser)
      closeAllPopups();
    })
      .catch(err => console.log(err))
  }

  const handleUpdateAvatar = (data) => {
    api.editAvatar(data).then(updateUser => {
      setCurrentUser(updateUser)
      closeAllPopups()
    })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
      closeAllPopups()
    })
      .catch(err => console.log(err))
  }

  const handleAddPlace = (data) => {
    api.addNewCard(data).then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
      .catch(err => console.log(err))
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className="page__content">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleLikeClick}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />

          <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          />

          <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
