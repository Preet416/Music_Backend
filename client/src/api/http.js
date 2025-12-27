import { supabase } from "../supabaseClient";

export async function authFetch(url, options = {}) {
  const { method = "GET", headers = {}, body } = options;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user?.id;

  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (userId) {
    finalHeaders["x-user-id"] = userId;
  }

  return fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });
}
