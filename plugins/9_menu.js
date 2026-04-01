import config from "../config.js"

const menuText = `
╭══ ⋊⋊ 𝐐𝐔𝐄𝐄𝐍 𝐁𝐄𝐋𝐋𝐀 𝐌𝐃 ⋉⋉ ═⊷
┃❍ *Mᴏᴅᴇ:*  ${config.mode}
┃❍ *Pʀᴇғɪx:*  [ ${config.prefix} ]
┃❍ *Usᴇʀ:*  ${config.botName} User
┃❍ *Pʟᴜɢɪɴs:*  279
┃❍ *Vᴇʀsɪᴏɴ:*  1.0.0
┃❍ *Uᴘᴛɪᴍᴇ:*  0d 0h 0m 00s
┃❍ *Tɪᴍᴇ Nᴏᴡ:*  00:00:00 am/pm
┃❍ *Dᴀᴛᴇ Tᴏᴅᴀʏ:*  00/00/0000
┃❍ *Tɪᴍᴇ Zᴏɴᴇ:*  ${config.timeZone}
┃❍ *Sᴇʀᴠᴇʀ Rᴀᴍ:*  000.00 MB/0.00 GB
╰═════════════════⊷

╭━━━━❮ *𝙰𝙸* ❯━⊷ 
┃◇ .gpt
┃◇ .gpt4
┃◇ .gpt4o
┃◇ .gpt4o-mini
┃◇ .letmegpt
┃◇ .deepseek
┃◇ .gemini
┃◇ .blackbox
╰━━━━━━━━━━━━━━━━━⊷

╭━━━━❮ *𝚃𝙾𝙾𝙻𝚂* ❯━⊷ 
┃◇ .photoeditor
┃◇ .upscale
┃◇ .remini
┃◇ .removebg
┃◇ .removebgv2
┃◇ .web2zip
┃◇ .createqr
┃◇ .readqr
┃◇ .ttp
┃◇ .fancy
┃◇ .define
┃◇ .emojimix
┃◇ .ssweb
┃◇ .ssphone
┃◇ .sstab
┃◇ .sspc
╰━━━━━━━━━━━━━━━━━⊷

╭━━━━❮ *𝚂𝙴𝙰𝚁𝙲𝙷* ❯━⊷ 
┃◇ .google
┃◇ .ggleimage
┃◇ .yts
┃◇ .lyrics
┃◇ .lyricsv2
┃◇ .spotifysearch
┃◇ .apkmirror
┃◇ .happymod
┃◇ .tiktoksearch
┃◇ .wallpaper
┃◇ .weather
╰━━━━━━━━━━━━━━━━━⊷

╭━━━━❮ *𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁* ❯━⊷ 
┃◇ .play
┃◇ .ytdl
┃◇ .ytdlv2
┃◇ .ytdown
┃◇ .ytmp3
┃◇ .ytmp4
┃◇ .ytv
┃◇ .facebook
┃◇ .tiktok
┃◇ .spotifydl
┃◇ .instadl
┃◇ .gdrivedl
┃◇ .mediafire
┃◇ .xnxxdl
┃◇ .xvideosdl
┃◇ .aio
╰━━━━━━━━━━━━━━━━━⊷

╭━━━━❮ *𝚂𝚃𝙰𝙻𝙺𝙴𝚁* ❯━⊷ 
┃◇ .gitstalk
┃◇ .twitterstalk
┃◇ .wachannel
┃◇ .ipstalk
┃◇ .npmstalk
┃◇ .tiktokstalk
┃◇ .igstalk
╰━━━━━━━━━━━━━━━━━⊷

╭━━━━❮ *𝙵𝚄𝙽* ❯━⊷ 
┃◇ .jokes
┃◇ .advice
┃◇ .truth
┃◇ .quotes
┃◇ .shayari
┃◇ .valentines
┃◇ .love
┃◇ .goodnight
┃◇ .thankyou
╰━━━━━━━━━━━━━━━━━⊷
`

export default {
    name: "menu",
    cmd: ["menu", "list"],
    category: "general",
    async handler(sock, msg, { reply }) {
        await reply(menuText)
    }
}