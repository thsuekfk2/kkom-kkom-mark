import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface UserState {
  session: {
    session: Session | null;
    setSession: (session: Session | null) => void;
  };
}

const useBookmarkStore = create<UserState>()(
  immer((set, _) => ({
    session: {
      session: null,
      setSession: (session) => {
        set((state) => {
          state.session.session = session;
        });
      },
    },
  }))
);

export const useSession = () => useBookmarkStore((state) => state.session);
