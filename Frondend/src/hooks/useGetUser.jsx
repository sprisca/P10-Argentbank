import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../utils/api";
import { setUserProfile } from "../store/userSlice";

export const useGetUser = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return; // ✅ évite appel API si pas connecté

    const fetchUserProfile = async () => {
      try {
        const result = await getUserProfile(token);

        dispatch(
          setUserProfile({
            firstName: result.body.firstName,
            lastName: result.body.lastName,
          })
        );
      } catch (error) {
        console.error("Erreur récupération profil :", error);
      }
    };

    fetchUserProfile();
  }, [token, dispatch]);
};