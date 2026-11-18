import express from "express";

const app = express();

app.use(express.json());

app.post("/api/temperature", (req, res) => {
  const { temperature } = req.body;

  console.log(`Received temperature: ${temperature} ֯°C`);

  res.status(200).json({
    message: "Temperature received successfully",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
