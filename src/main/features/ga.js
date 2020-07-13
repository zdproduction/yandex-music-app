const { app } = require("electron");
const settings = require("electron-settings");
const Analytics = require("electron-google-analytics");
const analytics = new Analytics.default("UA-127383106-1");

let clientId = settings.get("gaClientId");

global.mainWindow.on("focus", () => {
  analytics
    .screen(
      app.name,
      app.getVersion(),
      "su.zdp.yandexmusicapp",
      "su.zdp.yandexmusicinstaller",
      "main",
      clientId
    )
    .then(response => {
      if (!clientId) {
        clientId = response.clientID;
        settings.set("gaClientId", clientId);
      }
    });
});
