import type { AuthBindings } from "@refinedev/core";
import { supabase } from "../lib/supabaseClient";

export const authProvider: AuthBindings = {
  login: async ({ email }) => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      return { success: false, error };
    }
    return { success: true, redirectTo: "/" };
  },
  logout: async () => {
    await supabase.auth.signOut();
    return { success: true, redirectTo: "/login" };
  },
  check: async () => {
    const { data } = await supabase.auth.getSession();
    return {
      authenticated: !!data.session,
      redirectTo: data.session ? undefined : "/login",
    };
  },
  getIdentity: async () => {
    const { data } = await supabase.auth.getUser();
    return data.user
      ? { id: data.user.id, name: data.user.email ?? "User" }
      : null;
  },
  onError: async () => ({ error: new Error("Auth error") }),
};
