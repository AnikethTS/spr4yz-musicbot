import express from "express";
const server = express();

server.all("/", (req, res) => {
  res.send("Bot is running");
});

export default function keepAlive() {
  server.listen(process.env.PORT || 3000, () => {
    console.log("🌐 Keep-alive server started");
  });
}
