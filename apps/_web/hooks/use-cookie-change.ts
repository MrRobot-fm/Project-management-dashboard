import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useCookieChange = (cookieKey: string, eventName: string = "cookie:changed") => {
  const [cookieValue, setCookieValue] = useState(() => Cookies.get(cookieKey));

  useEffect(() => {
    const handleChange = () => {
      const newValue = Cookies.get(cookieKey);
      setCookieValue(newValue);
    };

    window.addEventListener(eventName, handleChange);
    return () => {
      window.removeEventListener(eventName, handleChange);
    };
  }, [cookieKey, eventName]);

  return cookieValue;
};
