import { supabase } from "../config/supabase.js";

export const authenticateUser = async (req, res, next) => {
  const [scheme, token] = req.headers.authorization?.split(" ") ?? [];

  if (scheme !== "Bearer" || !token)
    return res.status(401).json({ error: "Authorization token is missing." });

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user)
    return res.status(401).json({ error: "Unauthorized" });

  req.user = data.user;

  next();
};
