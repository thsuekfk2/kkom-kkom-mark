import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface BookmarkListType {
  created_at: string;
  description: string;
  id: number;
  url: string;
}

export interface BookmarkState {
  current: {
    url: string;
    bookmarkPage: number;
  };
  list: BookmarkListType[][];
  actions: {
    current: {
      updateCurrentUrl: (num: string) => void;
      updateCurrentPage: (page: number) => void;
    };
    updateList: (data: BookmarkListType[]) => void;
  };
}

const splitArrayIntoSize = (array: object[], size: number) => {
  const tmpArray = [];
  for (let i = 0; i < array.length; i += size) {
    tmpArray.push(array.slice(i, i + size));
  }
  return tmpArray;
};

const useBookmarkStore = create<BookmarkState>()(
  immer((set, _) => ({
    current: {
      url: "",
      bookmarkPage: 0,
    },
    list: [],
    actions: {
      current: {
        updateCurrentUrl: (url) => {
          set((state) => {
            state.current.url = url;
          });
        },
        updateCurrentPage: (page) => {
          set((state) => {
            state.current.bookmarkPage = page;
          });
        },
      },
      updateList: (data) => {
        set((state) => ({
          ...state,
          list: splitArrayIntoSize(data, 8),
        }));
      },
    },
  }))
);

export const useBookmarkCurrent = () =>
  useBookmarkStore((state) => state.current);
export const useBookmarkListData = () =>
  useBookmarkStore((state) => state.list);
export const useActions = () => useBookmarkStore((state) => state.actions);
