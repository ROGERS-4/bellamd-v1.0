import axios from "axios"
import config from "../config.js"

const FOOTER = `
>ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ ʀᴏᴅɢᴇʀs
[🔗 View Channel](https://whatsapp.com/channel/0029VbBR3ib3LdQQlEG3vd1x)
`

export default {
    name: "tools",
    cmd: [
        "photoeditor", "upscale", "remini", "removebg",
        "removebgv2", "web2zip", "createqr", "readqr",
        "ttp", "fancy", "define", "emojimix", "ssweb",
        "ssphone", "sstab", "sspc"
    ],
    category: "tools",
    async handler(sock, msg, { text, args, reply }) {
        const [cmd, ...rest] = text.split(" ")
        const query = rest.join(" ")

        const baseUrl = `${config.apiBase}/api/tools/`

        if (["photoeditor", "upscale", "remini", "removebg", "removebgv2"].includes(cmd)) {
            await reply("🔸 This command needs an image helper. Please send an image with caption (will be added later)." + FOOTER)
        } else if (cmd === "web2zip") {
            if (!query) return reply("🔸 Provide a URL." + FOOTER)
            const url = `${baseUrl}web2zip?apikey=${config.apiKey}&url=${encodeURIComponent(query)}`
            const { data } = await axios.get(url)
            if (data.success && data.url) {
                await sock.sendMessage(msg.key.remoteJid, {
                    document: { url: data.url },
                    mimetype: "application/zip",
                    fileName: "site.zip",
                    caption: FOOTER
                })
            }
        } else if (cmd === "createqr") {
            if (!query) return reply("🔸 Provide text for the QR code." + FOOTER)
            const url = `${baseUrl}createqr?apikey=${config.apiKey}&query=${encodeURIComponent(query)}`
            const { data } = await axios.get(url)
            if (data.success && data.url) {
                await sock.sendMessage(msg.key.remoteJid, {
                    image: { url: data.url },
                    caption: FOOTER
                })
            }
        } else if (cmd === "readqr") {
            await reply("🔸 Reply to an image containing a QR code (image helper will be added later)." + FOOTER)
        } else if (["ttp", "fancy", "define", "emojimix"].includes(cmd)) {
            if (!query) return reply(`🔸 Provide text for ${cmd}.` + FOOTER)
            const innerParam = cmd === "emojimix" ? "emoji1" : "text"
            const innerValue = cmd === "emojimix" ? query.split(" ").slice(0, 2).join("&emoji2=") : query
            const url = `${baseUrl}${cmd}?apikey=${config.apiKey}&${innerParam}=${encodeURIComponent(innerValue)}`
            const { data } = await axios.get(url)
            if (data.success && data.result) {
                await reply(data.result + FOOTER)
            }
        } else if (["ssweb", "ssphone", "sstab", "sspc"].includes(cmd)) {
            if (!query) return reply("🔸 Provide a URL." + FOOTER)
            const url = `${baseUrl}${cmd}?apikey=${config.apiKey}&url=${encodeURIComponent(query)}`
            const { data } = await axios.get(url)
            if (data.success && data.url) {
                await sock.sendMessage(msg.key.remoteJid, {
                    image: { url: data.url },
                    caption: FOOTER
                })
            }
        }
    }
}