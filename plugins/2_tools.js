import axios from "axios"
import config from "../config.js"

const FOOTER = `
>ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ ʀᴏᴅɢᴇʀs
[🔗 View Channel](https://whatsapp.com/channel/0029VbBR3ib3LdQQlEG3vd1x)
`

async function getImageUrlFromMessage(msg, sock) {
    const media = msg.message?.imageMessage || msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage
    if (!media) return null
    const buffer = await sock.downloadMediaMessage(media)
    const blob = new Blob([buffer], { type: media.mimetype })
    const formData = new FormData()
    formData.append("file", blob, "image.jpg")

    const res = await fetch("https://api/files.giftedtech.co.ke/upload", {
        method: "POST",
        body: formData
    })
    const json = await res.json()
    return json.url
}

export default {
    name: "tools",
    cmd: [
        "photoeditor", "upscale", "remini", "removebg",
        "removebgv2", "web2zip", "createqr", "readqr",
        "ttp", "fancy", "define", "emojimix", "ssweb",
        "ssphone", "sstab", "sspc"
    ],
    category: "tools",
    async handler(sock, msg, { text, args, reply, quotedReply }) {
        const [cmd, ...rest] = text.split(" ")
        const query = rest.join(" ")

        const baseUrl = `${config.apiBase}/api/tools/`

        if (["photoeditor", "upscale", "remini", "removebg", "removebgv2"].includes(cmd)) {
            const url = await getImageUrlFromMessage(msg, sock)
            if (!url) return reply("Reply to an image or send an image with caption." + FOOTER)

            const endpoint = `${baseUrl}${cmd}?apikey=${config.apiKey}&url=${encodeURIComponent(url)}`
            if (cmd === "photoeditor") {
                if (!query) return reply("Provide a prompt after the command." + FOOTER)
                endpoint = `${baseUrl}photoeditor?apikey=${config.apiKey}&url=${encodeURIComponent(url)}&prompt=${encodeURIComponent(query)}`
            }

            const { data } = await axios.get(endpoint)
            if (data.success && data.url) {
                await sock.sendMessage(msg.key.remoteJid, {
                    image: { url: data.url },
                    caption: FOOTER
                })
            } else {
                await reply("No media returned." + FOOTER)
            }
        } else if (cmd === "web2zip") {
            if (!query) return reply("Provide a URL." + FOOTER)
            const { data } = await axios.get(`${baseUrl}web2zip?apikey=${config.apiKey}&url=${encodeURIComponent(query)}`)
            if (data.success && data.url) {
                await sock.sendMessage(msg.key.remoteJid, {
                    document: { url: data.url },
                    mimetype: "application/zip",
                    fileName: "site.zip",
                    caption: FOOTER
                })
            }
        } else if (cmd === "createqr") {
            if (!query) return reply("Provide text for the QR code." + FOOTER)
            const { data } = await axios.get(`${baseUrl}createqr?apikey=${config.apiKey}&query=${encodeURIComponent(query)}`)
            if (data.success && data.url) {
                await sock.sendMessage(msg.key.remoteJid, {
                    image: { url: data.url },
                    caption: FOOTER
                })
            }
        } else if (cmd === "readqr") {
            const url = await getImageUrlFromMessage(msg, sock)
            if (!url) return reply("Reply to an image containing QR code." + FOOTER)
            const { data } = await axios.get(`${baseUrl}readqr?apikey=${config.apiKey}&url=${encodeURIComponent(url)}`)
            if (data.success && data.text) {
                await reply("QR content: " + data.text + FOOTER)
            }
        } else if (["ttp", "fancy", "define", "emojimix"].includes(cmd)) {
            if (!query) return reply(`Provide text for ${cmd}.` + FOOTER)
            const param = cmd === "emojimix" ? "emoji1" : "text"
            const url = `${baseUrl}${cmd}?apikey=${config.apiKey}&${param}=${encodeURIComponent(query)}`
            const { data } = await axios.get(url)
            if (data.success && data.result) {
                await reply(data.result + FOOTER)
            }
        } else if (["ssweb", "ssphone", "sstab", "sspc"].includes(cmd)) {
            if (!query) return reply("Provide a URL." + FOOTER)
            const { data } = await axios.get(`${baseUrl}${cmd}?apikey=${config.apiKey}&url=${encodeURIComponent(query)}`)
            if (data.success && data.url) {
                await sock.sendMessage(msg.key.remoteJid, {
                    image: { url: data.url },
                    caption: FOOTER
                })
            }
        }
    }
}