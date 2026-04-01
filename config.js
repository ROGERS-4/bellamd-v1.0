const config = {
    prefix: process.env.PREFIX || ".",
    ownerNumber: process.env.OWNER_NUMBER || "254123456789",
    botName: process.env.BOT_NAME || "QUEEN BELLA MD",
    timeZone: process.env.TIME_ZONE || "Africa/Nairobi",
    apiKey: process.env.APIKEY || "gifted",
    apiBase: process.env.API_BASE || "https://api.giftedtech.co.ke",
    port: parseInt(process.env.PORT) || 3000,
    authFolder: process.env.AUTH_FOLDER || "auth",

    autoViewStatus: process.env.AUTO_VIEW_STATUS === "true",
    autoStatusReact: process.env.AUTO_STATUS_REACT === "true",
    autoStatusReactEmoji: process.env.AUTO_STATUS_REACT_EMOJI || "👍",
    mode: process.env.MODE || "public"
}

export default config