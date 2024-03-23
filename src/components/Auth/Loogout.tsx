import { supabase } from "../../lib/supabase";
import { useActions } from "../../store/bookmark";
import { useSession } from "../../store/user";
import { LogoutIcon } from "../Icons";

export const Logout = () => {
  const { updateList } = useActions();
  const { setSession } = useSession();

  const logout = async () => {
    await supabase.auth.signOut();
    chrome.storage.local.remove("session");
    setSession(null);
    updateList([]);
  };

  return (
    <LogoutIcon
      className="absolute right-0 m-2 cursor-pointer top-0"
      onClick={logout}
    />
  );
};
