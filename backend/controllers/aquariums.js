import { supabase } from "../config/supabase.js";
import { cleanString } from "../utils/strings.js";

export const getAquariums = async (req, res) => {
  const { id } = req.user;

  const { data, error } = await supabase
    .from("aquariums")
    .select()
    .eq("user_id", id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
};

export const createAquarium = async (req, res) => {
  const { id } = req.user;
  const { name, description, sensorCode } = req.body;

  const clean = {
    name: cleanString(name),
    description: cleanString(description),
    sensorCode: cleanString(sensorCode),
  };

  if (!clean.name || !clean.sensorCode)
    return res
      .status(400)
      .json({ error: "Aquarium name and its sensor code are required." });

  const { data, error } = await supabase
    .from("aquariums")
    .insert({
      name: clean.name,
      description: clean.description,
      sensor_code: clean.sensorCode,
    })
    .select()
    .eq("user_id", id)
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
};
