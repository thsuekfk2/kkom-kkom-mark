import { supabase } from "../lib/supabase";

export const bookmarkService = {
  create: async (currentUrl: string) => {
    const { error } = await supabase
      .from("url")
      .insert([{ url: currentUrl, description: "" }])
      .select();
    if (error) throw new Error(`에러!! ${error.message}`);
  },
  delete: async (url: string) => {
    const { error } = await supabase.from("url").delete().eq("url", url);
    if (error) throw new Error(`에러!! ${error.message}`);
  },
  fetch: async () => {
    const { data, error } = await supabase
      .from("url")
      .select("*")
      .order("id", { ascending: false });
    if (error) throw new Error(`에러!! ${error.message}`);
    return data;
  },
  updateDescription: async (url: string, description: string) => {
    const { error } = await supabase
      .from("url")
      .update({
        description: description,
      })
      .eq("url", url);
    if (error) throw new Error(`에러!! ${error.message}`);
  },
};
