import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../store/userSlice';
import { updateUserProfile } from '../utils/api.js';

export const useUpdateUserInfo = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  return async (updatedData) => {
    try {
      const res = await updateUserProfile(token, updatedData);

      // ✅ MERGE: res.body + updatedData (updatedData prioritaire)
      const payload = {
        ...(res?.body ?? {}),
        ...updatedData,
      };

      dispatch(setUserProfile(payload));
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};