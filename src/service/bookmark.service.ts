const getBookmarks = (): any[] =>
  JSON.parse(localStorage.getItem("bookmarks") || "[]");

const saveBookmarks = (bookmarks: any[]): void => {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};

export const bookmarkService = {
  create: async (currentUrl: string) => {
    const bookmarks = getBookmarks();
    const newBookmark = {
      url: currentUrl,
      description: "",
      created_at: new Date().toISOString(),
    };
    saveBookmarks([...bookmarks, newBookmark]);
    return { data: newBookmark, error: null };
  },

  delete: async (url: string) => {
    const bookmarks = getBookmarks();
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.url !== url
    );
    saveBookmarks(updatedBookmarks);
    return { error: null };
  },

  fetch: async () => {
    const bookmarks = getBookmarks();
    const sortedBookmarks = bookmarks.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return { data: sortedBookmarks, error: null };
  },

  updateDescription: async (url: string, description: string) => {
    const bookmarks = getBookmarks();
    const updatedBookmarks = bookmarks.map((bookmark) =>
      bookmark.url === url ? { ...bookmark, description } : bookmark
    );
    saveBookmarks(updatedBookmarks);
    return {
      data: updatedBookmarks.find((bookmark) => bookmark.url === url),
      error: null,
    };
  },

  select: async (text: string) => {
    const bookmarks = getBookmarks();
    const filteredBookmarks = bookmarks.filter(
      (bookmark) =>
        bookmark.url.includes(text) || bookmark.description.includes(text)
    );
    const sortedBookmarks = filteredBookmarks.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return { data: sortedBookmarks, error: null };
  },
};
