import { createAuthClient } from "../config/supabase.js";
import { cleanString } from "../utils/strings.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const cleanEmail = cleanString(email);

  if (!cleanEmail || !password)
    return res.status(400).json({ error: "Email and password are required." });

  const { data, error } = await createAuthClient().auth.signInWithPassword({
    email: cleanEmail,
    password,
  });

  if (error) return res.status(401).json({ error: error.message });

  res
    .status(200)
    .json({ user: data.user, accessToken: data.session.access_token });
};
