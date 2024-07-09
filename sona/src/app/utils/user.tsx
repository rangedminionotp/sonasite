import { useCookies } from "react-cookie";

export const useUser = () => {
  const [cookies] = useCookies(["user"]);
  return cookies.user;
};
