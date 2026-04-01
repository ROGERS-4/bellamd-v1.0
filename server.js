import makeWASocket, {
    useMultiFileAuthState,
    Browsers
} from "@whiskeysockets/baileys"
import { Boom } from "@hapi/boom"
import fs from "fs"
import path from "path"
import axios from "axios"
import config from "./config.js"

const FOOTER = `
>ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ ʀᴏᴅɢᴇʀs
[🔗 View Channel](https://whatsapp.com/channel/0029VbBR3ib3LdQQlEG3vd1x)
`

const PLUGINS_FOLDER = "./plugins"

async function loadPlugins() {
    const files = await fs.promises.readdir(PLUGINS_FOLDER)
    const plugins = []

    for (const file of files) {
        if (!file.endsWith(".js")) continue
        const filePath = path.join(PLUGINS_FOLDER, file)
        const plugin = await import(`./${filePath}`)
        if (plugin.default && plugin.default.cmd) {
            plugins.push(plugin.default)
        }
    }

    return plugins
}

async function startServer() {
    const { state, saveCreds } = await useMultiFileAuthState(config.authFolder)

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: Browsers.ubuntu("Chrome")
    })

    const plugins = await loadPlugins()

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update

        if (!sock.authState.creds.registered) {
            console.log("Waiting for QR/pairing code...")
        }

        if (connection === "close") {
            const shouldReconnect =
                (lastDisconnect?.error as Boom)?.output?.statusCode !== 401

            console.log("Disconnected:", lastDisconnect?.error?.message)
            if (shouldReconnect) {
                startServer()
            }
        } else if (connection === "open") {
            console.log("QUEEN BELLA MD connected ✅")
        }
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("messages.upsert", async ({ messages, type }) => {
        if (type !== "notify") return

        for (const msg of messages) {
            if (!msg.message || msg.key.fromMe) continue

            const from = msg.key.remoteJid
            const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ""

            const reply = async (txt) =>
                sock.sendMessage(from, { text: txt + FOOTER })

            const quotedReply = async (txt, options = {}) =>
                sock.sendMessage(from, {
                    text: txt + FOOTER,
                    ...options
                })

            const isCMD = text.startsWith(config.prefix)
            if (!isCMD) return

            const [cmd, ...args] = text
                .slice(config.prefix.length)
                .trim()
                .split(" ")
                .filter(Boolean)

            for (const plugin of plugins) {
                if (plugin.cmd.includes(cmd)) {
                    await plugin.handler(sock, msg, { text: text, args, config, reply, quotedReply })
                    break
                }
            }
        }
    })
}

startServer()