import { supabase } from "../lib/supabase";

export const bookmarkService = {
  create: async (currentUrl: string) => {
    const { data, error } = await supabase
      .from("url")
      .insert([{ url: currentUrl, description: "" }])
      .select();
    return { data, error };
  },
  delete: async (url: string) => {
    const { error } = await supabase.from("url").delete().eq("url", url);
    if (error) throw new Error(`에러!! ${error.message}`);
    return { error };
  },
  fetch: async () => {
    const { data, error } = await supabase
      .from("url")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(`에러!! ${error.message}`);
    return { data, error };
  },
  updateDescription: async (url: string, description: string) => {
    const { data, error } = await supabase
      .from("url")
      .update({
        description: description,
      })
      .eq("url", url);
    if (error) throw new Error(`에러!! ${error.message}`);
    return { data, error };
  },
  select: async (text: string) => {
    const { data, error } = await supabase
      .from("url")
      .select("*")
      .or(`url.ilike.*${text}*,description.ilike.*${text}*`)
      .order("created_at", { ascending: false });
    return { data, error };
  },
};
