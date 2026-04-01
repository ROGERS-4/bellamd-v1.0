import config from "../config.js"

export default {
    name: "status",
    cmd: ["vv", "vv2", "autoviewstatus", "autostatusreact"],
    category: "status",
    async handler(sock, msg, { text, args, reply, config }) {
        const [cmd, arg] = text.split(" ")

        // 1. .autoviewstatus on/off
        if (cmd === "autoviewstatus") {
            const lower = (arg || "").toLowerCase()

            if (lower === "on") {
                process.env.AUTO_VIEW_STATUS = "true"
                config.autoViewStatus = true
                await reply("✅ Auto‑view status ENABLED (viewOnce messages will be auto‑opened).")
            } else if (lower === "off") {
                process.env.AUTO_VIEW_STATUS = "false"
                config.autoViewStatus = false
                await reply("✅ Auto‑view status DISABLED.")
            } else {
                await reply("🔸 Use: .autoviewstatus on / off")
            }
            return
        }

        // 2. .autostatusreact on/off
        if (cmd === "autostatusreact") {
            const lower = (arg || "").toLowerCase()

            if (lower === "on") {
                process.env.AUTO_STATUS_REACT = "true"
                config.autoStatusReact = true
                await reply("✅ Auto‑status‑react ENABLED (bot will auto‑react to status).")
            } else if (lower === "off") {
                process.env.AUTO_STATUS_REACT = "false"
                config.autoStatusReact = false
                await reply("✅ Auto‑status‑react DISABLED.")
            } else {
                await reply("🔸 Use: .autostatusreact on / off")
            }
            return
        }

        // 3. .vv and .vv2 (viewOnce / viewOnce2)
        const { extendedTextMessage } = msg.message || {}
        if (!extendedTextMessage) {
            await reply("🔸 Reply to a view‑once / media message with `.vv` or `.vv2`.")
            return
        }

        const contextInfo = extendedTextMessage.contextInfo
        if (!contextInfo?.quotedMessage) {
            await reply("🔸 No quoted media found in this message.")
            return
        }

        const quoted = contextInfo.quotedMessage

        // Build full “viewOnce” media key
        const key = {
            remoteJid: msg.key.remoteJid,
            participant: msg.key.participant,
            id: contextInfo.stanzaId,
            fromMe: false
        }

        if (quoted.videoMessage || quoted.imageMessage || quoted.documentMessage || quoted.audioMessage) {
            // vv (simple repost)
            if (cmd === "vv") {
                await sock.sendMessage(msg.key.remoteJid, {
                    forward: sock,
                    messages: [
                        {
                            key: key,
                            message: quoted
                        }
                    ]
                })
                await reply("📬 ViewOnce media reposted.")
            }

            // vv2 (force download and re‑send as normal media)
            if (cmd === "vv2") {
                let media, filename, mimetype, type

                if (quoted.videoMessage) {
                    media = quoted.videoMessage
                    type = "videoMessage"
                } else if (quoted.imageMessage) {
                    media = quoted.imageMessage
                    type = "imageMessage"
                } else if (quoted.audioMessage) {
                    media = quoted.audioMessage
                    type = "audioMessage"
                } else if (quoted.documentMessage) {
                    media = quoted.documentMessage
                    type = "documentMessage"
                }

                if (!media) {
                    await reply("🔸 Unsupported media type.")
                    return
                }

                const buffer = await sock.downloadMediaMessage(quoted)
                const caption = quoted.caption || ""

                if (type.startsWith("image")) {
                    await sock.sendMessage(msg.key.remoteJid, {
                        image: { buffer },
                        caption
                    })
                } else if (type.startsWith("video")) {
                    await sock.sendMessage(msg.key.remoteJid, {
                        video: { buffer },
                        caption
                    })
                } else if (type.startsWith("audio")) {
                    await sock.sendMessage(msg.key.remoteJid, {
                        audio: { buffer },
                        mimetype: "audio/mp4",
                        ptt: true
                    })
                } else if (type.startsWith("document")) {
                    const fileName = quoted.fileName || "downloaded_file"
                    await sock.sendMessage(msg.key.remoteJid, {
                        document: { buffer },
                        fileName,
                        mimetype: quoted.mimetype
                    })
                }

                await reply("📬 ViewOnce media downloaded and sent as normal media.")
            }
        } else {
            await reply("🔸 Media type not supported for `.vv2`.")
        }
    }
}