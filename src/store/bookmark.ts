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
    bookmarkInfo: BookmarkListType | null;
  };
  list: {
    allList: BookmarkListType[];
    list: BookmarkListType[][] | null;
  };
  actions: {
    current: {
      updateCurrentUrl: (num: string) => void;
      updateCurrentPage: (page: number) => void;
    };
    updateList: (data: BookmarkListType[]) => void;
    searchList: (data: BookmarkListType[]) => void;
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
      bookmarkInfo: null,
    },
    list: {
      allList: [],
      list: null,
    },
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
          list: {
            list: splitArrayIntoSize(data, 7),
            allList: data,
          },
        }));
        set((state) => {
          const nowBookmarkUrl = data.filter(
            (data) => data.url === state.current.url
          );
          if (nowBookmarkUrl.length > 0) {
            state.current.bookmarkInfo = nowBookmarkUrl[0];
          } else {
            state.current.bookmarkInfo = null;
          }
        });
      },
      searchList: (data) => {
        set((state) => ({
          ...state,
          current: {
            ...state.current,
            bookmarkPage: 0,
          },
          list: {
            list: splitArrayIntoSize(data, 7),
            allList: data,
          },
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
