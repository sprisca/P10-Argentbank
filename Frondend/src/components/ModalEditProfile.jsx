import { useEffect, useState } from 'react';
import { useUpdateUserInfo } from '../hooks/useUpdateUserInfo';

export const ModalEditProfile = ({ onClose, userInfo }) => {
  const updateUserInfo = useUpdateUserInfo();

  const [userName, setUserName] = useState(userInfo?.userName ?? '');

  useEffect(() => {
    setUserName(userInfo?.userName ?? '');
  }, [userInfo]);

  const initialUserName = userInfo?.userName ?? '';
  const canSave = userName.trim().length > 0 && userName !== initialUserName;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!canSave) return;

    // ✅ Update uniquement le userName
    await updateUserInfo({ userName });
    onClose();
  };

  const handleCancel = () => {
    setUserName(initialUserName);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <button
          className="modal__close"
          onClick={handleCancel}
          aria-label="Close modal"
        >
          x
        </button>

        <form className="user-page__form" onSubmit={handleSave}>
          <h2 className="user-page__form-title">Edit your profile</h2>

          {/* Username modifiable */}
          <div className="user-page__input-wrapper">
            <label htmlFor="userName" className="user-page__label">
              Username
            </label>
            <input
              type="text"
              id="userName"
              className="user-page__input"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              autoFocus
            />
          </div>

          {/* First Name non modifiable */}
          <div className="user-page__input-wrapper">
            <label htmlFor="firstName" className="user-page__label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="user-page__input"
              value={userInfo?.firstName ?? ''}
              disabled
              readOnly
            />
          </div>

          {/* Last Name non modifiable */}
          <div className="user-page__input-wrapper">
            <label htmlFor="lastName" className="user-page__label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="user-page__input"
              value={userInfo?.lastName ?? ''}
              disabled
              readOnly
            />
          </div>

          {/* Buttons */}
          <div className="user-page__form-actions">
            <button
              type="button"
              className="user-page__form-button user-page__form-button--secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="user-page__form-button"
              disabled={!canSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};