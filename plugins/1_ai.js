import axios from "axios"
import config from "../config.js"

const FOOTER = `
>ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ ʀᴏᴅɢᴇʀs
[🔗 View Channel](https://whatsapp.com/channel/0029VbBR3ib3LdQQlEG3vd1x)
`

const AI_API_MAP = {
    blackbox: `${config.apiBase}/api/ai/ai?apikey=${config.apiKey}&q=`,
    gpt: `${config.apiBase}/api/ai/ai?apikey=${config.apiKey}&q=`,
    gpt4: `${config.apiBase}/api/ai/ai?apikey=${config.apiKey}&q=`,
    gpt4o: `${config.apiBase}/api/ai/gpt4o?apikey=${config.apiKey}&q=`,
    "gpt4o-mini": `${config.apiBase}/api/ai/gpt4o-mini?apikey=${config.apiKey}&q=`,
    letmegpt: `${config.apiBase}/api/ai/letmegpt?apikey=${config.apiKey}&q=`,
    deepseek: `${config.apiBase}/api/ai/ai?apikey=${config.apiKey}&q=deepseek+`,
    gemini: `${config.apiBase}/api/ai/ai?apikey=${config.apiKey}&q=gemini+`
}

export default {
    name: "ai",
    cmd: Object.keys(AI_API_MAP),
    category: "ai",
    async handler(sock, msg, { text, args, reply }) {
        const command = args[0]
        const query = text.slice(command.length + 1).trim()

        if (!query) return reply("Provide a question!")

        const api = AI_API_MAP[command] || AI_API_MAP.gpt
        const url = api + encodeURIComponent(query)

        try {
            const { data } = await axios.get(url)
            if (data.success && data.response) {
                await reply(data.response + FOOTER)
            } else {
                await reply("No response from AI API." + FOOTER)
            }
        } catch (err) {
            await reply("API error: " + err.message + FOOTER)
        }
    }
}