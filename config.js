import { readFile, writeFile } from "fs/promises"

const config = {
    prefix: process.env.PREFIX || ".",
    ownerNumber: process.env.OWNER_NUMBER || "254123456789",
    botName: process.env.BOT_NAME || "QUEEN BELLA MD",
    timeZone: process.env.TIME_ZONE || "Africa/Nairobi",
    apiKey: process.env.APIKEY || "gifted",
    apiBase: process.env.API_BASE || "https://api.giftedtech.co.ke",
    port: parseInt(process.env.PORT) || 3000,
    authFolder: "auth"
}

export default config