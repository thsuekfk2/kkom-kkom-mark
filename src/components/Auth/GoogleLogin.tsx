import { supabase } from "../../lib/supabase";
import { bookmarkService } from "../../service/bookmark.service";
import { useActions } from "../../store/bookmark";
import { useSession } from "../../store/user";

export const GoogleLogin = () => {
  const { updateList } = useActions();
  const { setSession } = useSession();

  const loadBookmarks = async () => {
    const { data } = await bookmarkService.fetch();
    updateList(data);
  };

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  };

  const googleLogin = async () => {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://${chrome.runtime.id}.chromiumapp.org`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    chrome.identity.launchWebAuthFlow(
      {
        url: data.url as string,
        interactive: true,
      },
      async (redirectUrl) => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        }
        if (redirectUrl) {
          const params = new URLSearchParams(redirectUrl.split("#")[1]);
          const accessToken = params.get("access_token");
          const refresh_token = params.get("refresh_token");

          if (accessToken && refresh_token) {
            chrome.storage.local.set({
              session: {
                access_token: accessToken,
                refresh_token: refresh_token,
              },
            });
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refresh_token,
            });

            const session = await getSession();
            setSession(session);
            await loadBookmarks();
          }
        }
      }
    );
  };

  return (
    <div className="absolute flex flex-col items-center justify-center w-full h-full gap-5">
      <div className="flex items-center justify-center w-5 h-5 rounded-full cursor-pointer bg-slate-100 left-5">
        <img src="/google.png" onClick={googleLogin} />
      </div>
      <span>구글 로그인 후 이용해주세요.</span>
    </div>
  );
};
