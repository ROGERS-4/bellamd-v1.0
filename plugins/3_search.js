import axios from "axios"
import config from "../config.js"

const FOOTER = `
>ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ ʀᴏᴅɢᴇʀs
[🔗 View Channel](https://whatsapp.com/channel/0029VbBR3ib3LdQQlEG3vd1x)
`

export default {
    name: "search",
    cmd: ["google", "ggleimage", "unsplash", "yts", "lyrics", "lyricsv2", "spotifysearch", "apkmirror", "happymod", "tiktoksearch", "wallpaper", "weather"],
    category: "search",
    async handler(sock, msg, { text, args, reply }) {
        const [cmd, ...rest] = text.split(" ")
        const query = rest.join(" ")
        if (!query) return reply("Provide a search term." + FOOTER)

        const baseUrl = `${config.apiBase}/api/search/`

        try {
            const endpoint = {
                google: baseUrl + "google",
                ggleimage: baseUrl + "googleimage",
                unsplash: baseUrl + "unsplash",
                yts: baseUrl + "yts",
                lyrics: baseUrl + "lyrics",
                lyricsv2: baseUrl + "lyricsv2",
                spotifysearch: baseUrl