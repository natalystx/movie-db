import { useAppSelector, useAppDispatch } from "@/lib/redux/hook";
import {
  authSlice,
  createSessionAsync,
  getUserDetailsAsync,
} from "@/lib/redux/slices/authSlice";
import Session from "@/utils/Session";

import { useRef, useEffect } from "react";

export const useAuth = () => {
  const mounted = useRef(false);
  const user = useAppSelector(authSlice.selectors.selectUserDetail);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    if (user !== null) return;

    if (!Session.get().session_id) {
      dispatch(createSessionAsync());
    } else {
      dispatch(getUserDetailsAsync({ session_id: Session.get().session_id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted.current]);

  return {
    user,
  };
};
