// Resist Discord Bot
// Visit https://resist.network
const { Client } = require('discord.js')
config = require('./config.json'),
os = require('os'),
mysql = require('mysql'),
fs = require('fs'),
ytdl = require('ytdl-core'),
cheerio = require('cheerio'),
snekfetch = require('snekfetch'),
querystring = require('querystring'),
moment = require('moment'),
express = require('express'),
path = require('path'),
request = require("request"),
http = require("http")
client = new Client()
var sys = require('util')
var exec = require('child_process').exec
var cluster = require('cluster')
var systemOS = os.platform()
var prettySize = require('prettysize')
var prettyMs = require('pretty-ms')
var ffmpeg = require('fluent-ffmpeg')
bot_prefix = config.bot_prefix
bot_passes = config.bot_passes
bot_nickname = config.bot_nickname
bot_admin_id = config.bot_admin_id
bot_token = config.bot_token
bot_web_port = config.bot_web_port || 5000
bot_web_title = config.bot_web_title
bot_web_favicon = config.bot_web_favicon
bot_logo_long = config.bot_logo_long
bot_logo_square = config.bot_logo_square
bot_icon_log = config.bot_icon_log
bot_icon_inet = config.bot_icon_inet
bot_emoji_logo = config.bot_emoji_logo
var bot_icon_about = config.bot_icon_about
var bot_icon_help = config.bot_icon_help
var bot_icon_ticket = config.bot_icon_ticket
var bot_icon_heart = config.bot_icon_heart
var discord_server_invite_link = config.discord_server_invite_link
discord_server_id = config.discord_server_id
var discord_category_id_support = config.discord_category_id_support
var discord_channel_id_log = config.discord_channel_id_log
var discord_channel_id_discord_log = config.discord_channel_id_discord_log
var discord_channel_id_welcome = config.discord_channel_id_welcome
var discord_channel_id_radio = config.discord_channel_id_radio
var discord_channel_id_botspam = config.discord_channel_id_botspam
var discord_auto_role_name = config.discord_auto_role_name
var discord_newuser_default_role_name = config.discord_newuser_default_role_name
var discord_server_support_role_id_one = config.discord_server_support_role_id_one
var discord_server_support_role_id_two = config.discord_server_support_role_id_two
var discord_invite_link = config.discord_invite_link
var modlist_link = config.modlist_link
var mysql_host = config.mysql_host
var mysql_user = config.mysql_user
var mysql_pass = config.mysql_pass
var mysql_database = config.mysql_database
var info_website = config.info_website
var info_copyright = config.info_copyright
var api_youtube_data = config.api_youtube_data
var api_google_shortener = config.api_google_url
var mm = require('musicmetadata')
var aliasesFile = "./aliases.yml"
var currentdate = new Date() 
var logTimestamp = "Resist.Network | " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()
var msgTimestamp = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()
let queue = {}
async function googleCommand(msg, args) {
let searchMessage = await msg.reply("`Querying the matrix for answers...`")
let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(msg.content)}`
return snekfetch.get(searchUrl).then((result) => {
    let $ = cheerio.load(result.text)
    let googleData = $('.r').first().find('a').first().attr('href')
    googleData = querystring.parse(googleData.replace('/url?', ''))
    searchMessage.edit("`Answer found, see attached.`\n "+googleData.q)
  }).catch((err) => {
    searchMessage.edit("`No results found!`")
  })
}
async function movieCommand(msg, args) {
let searchMessage = await msg.reply("`Querying the matrix for answers...`")
let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(msg.content)}`
return snekfetch.get(searchUrl).then((result) => {
    let $ = cheerio.load(result.text)
    let googleData = $('.r').first().find('a').first().attr('href')
    googleData = querystring.parse(googleData.replace('/url?', ''))
    searchMessage.edit("`Answer found, see attached.`\nhttps://Resist.Network/files/everlast.mp4")
  }).catch((err) => {
    searchMessage.edit("`No results found!`")
  })
}
var discordLog = function(msg,d,u,uid) {
  if(!u) { var u = bot_nickname }
  if(!uid) { var uid = "System" }
  client.channels.get(discord_channel_id_log).send({embed: {
    color: 0xff8000,
    author: {
      name: bot_nickname+" - Log Event",
      icon_url: bot_icon_about
    },
    fields: [{
      "name": "User Info",
      "value": u+" / "+uid
    }, {
      "name": "Log Data",
      "value": d
    }],
    timestamp: new Date(),
    footer: {
      text: info_copyright
    }
  }})
  var now = moment()
  var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z')
  console.log("["+formattedNow+"]["+u+"/"+uid+"] "+d+"\n")
}
var url = require('url')
var request = require('request')
var jsdom = require('jsdom')
function move(oldPath, newPath, callback) {
    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy()
            } else {
                console.log('Error moving file: '+err)
            }
            return
        }
        console.log('Moved the file to: '+newPath)
    })
    function copy() {
        var readStream = fs.createReadStream(oldPath)
        var writeStream = fs.createWriteStream(newPath)
        readStream.on('error', callback)
        writeStream.on('error', callback)
        readStream.on('close', function () {
            fs.unlink(oldPath, callback)
        })
        readStream.pipe(writeStream)
    }
}
function Result(options) {
  if (options === undefined || options === null) {
    options = {}
  }
  if (typeof options !== 'object') {
    throw new Error('options must be object')
  }
  ['title', 'url'].forEach(function(key) {
    if (!options.hasOwnProperty(key)) {
      options[key] = null
      return
    }

    if (typeof options[key] !== 'string') {
      throw new Error(key + ' must be string')
    }

    options[key] = options[key].trim()
  })
  ['se', 'le'].forEach(function(key) {
    if (!options.hasOwnProperty(key)) {
      options[key] = null
      return
    }

    if (typeof options[key] !== 'number') {
      throw new Error(key + ' must be number')
    }

    var n = options[key]
    if (Math.floor(n) !== Math.ceil(n)) {
      throw new Error(key + ' must be int')
    }
  })
  this.title = options.title
  this.url = options.url
  this.se = options.se  
  this.le = options.le  
}
function searchKat(query, callback) {
  if (typeof query !== 'string') {
    throw new Error('query must be string')
  }
  if (typeof callback !== 'function') {
    throw new Error('callback must be function')
  }
  var queryUrl = 'http://dwtorrent.com/usearch/' + encodeURIComponent(query) + '/'
  return request.get(queryUrl, function(err, response, body) {
    if (err) {
      return callback(err)
    }
    return jsdom.env(body, function(_, window) {
      var results = Array.prototype.slice.call(
        window.document.querySelectorAll('.data tr:not(.firstr)')
      ).map(function(row) {
        var ml = row.querySelector('.cellMainLink')
        var title = ml.textContent.trim()
        var torrentUrl = url.resolve(queryUrl, ml.getAttribute('href'))
        var stats = Array.prototype.slice.call(
          row.querySelectorAll('td'),
          -2
        ).map(el => parseInt(el.textContent, 10))
        var se = stats[0]
        var le = stats[1]
        return new Result({
          title: title,
          url: torrentUrl,
          se: se,
          le: le,
        })
      })
      return callback(null, results)
    })
  })
}
function searchPb(query, callback) {
  if (typeof query !== 'string') {
    throw new Error('query must be string')
  }
  if (typeof callback !== 'function') {
    throw new Error('callback must be function')
  }
  var searchUrl = 'https://thepiratebay.to/s/?q=' + encodeURIComponent(query) + '&page=0&orderby=99'
  return request.get(searchUrl, function(err, response, body) {
    if (err) {
      return callback(err)
    }
    return jsdom.env(body, function(_, window) {
      var results = Array.prototype.slice.call(
        window.document.querySelectorAll('#searchResult tr')
      ).map(function(row) {
        var titleLink = row.querySelector('.detName a')
        if (!titleLink) {
          return
        }
        var title = titleLink.textContent.trim()
        var torrentUrl = url.resolve(searchUrl, titleLink.getAttribute('href'))
        var stats = Array.prototype.slice.call(
          row.querySelectorAll('td'),
          -2
        ).map(el => parseInt(el.textContent, 10))
        var se = stats[0]
        var le = stats[1]
        return new Result({
          title: title,
          url: torrentUrl,
          se: se,
          le: le,
        })
      }).filter(r => !!r)
      return callback(null, results)
    })
  })
}
function radioNowPlaying(channel){
  http.get("http://t1000.Resist.Network:8000/status-json.xsl", function(res){
    var data = ''

    res.on('data', function (chunk){
      data += chunk
    })

    res.on('end',function(){
      var obj = JSON.parse(data)
    client.channels.get(channel).send("`Displaying current track and stream information..."+
      "`\n```css\nCurrent Track { "+obj.icestats.source.title.replace(/_/g, ' ').replace(/-/g,' ')+
      " }\nPeak Listeners { "+obj.icestats.source.listener_peak+" }\nCurrent Listeners { "+
      obj.icestats.source.listeners+" }\nCurrent Bit Rate { "+obj.icestats.source.bitrate+" }```")
    })
  })
  return true
}
function radioQueue(channel){
  http.get("http://t1000.Resist.Network:8000/status-json.xsl", function(res){
    var data = ''
    res.on('data', function (chunk){
      data += chunk
    })
    res.on('end',function(){
      var obj = JSON.parse(data)
      var title = obj.icestats.source.title
        .replace(/\/storage\/resist-discord-bot\/assets\/public\/music\//g,
        "").replace(/__/g, " ").replace(/_/g, " ")
      console.log("Current Track { "+title+" }")
      var sys = require('util')
      var exec = require('child_process').exec
      function puts(error, stdout, stderr) { 
        var playList = stdout.replace(/.mp3/g, "")
          .replace(/\/storage\/resist-discord-bot\/assets\/public\/music\//g, "")
          .replace(/__/g, " ").replace(/_/g, " ")
        var finalPlayList = playList.replace(title,"{ "+title+" }")
        client.channels.get(channel).send("`Displaying current radio queue...`\n```css\n"+
          finalPlayList+"```")
        return true
      }
      exec("cat /storage/listen.m3u", puts)
    })
  })
}
function radioRemove(channel){
  console.log("Starting radio remove...")
  http.get("http://t1000.Resist.Network:8000/status-json.xsl", function(res){
    var data = ''
    res.on('data', function (chunk){
      data += chunk
    })
    res.on('end',function(){
      var obj = JSON.parse(data)
      var title = obj.icestats.source.title + ".mp3"
      var titlePretty = obj.icestats.source.title
        .replace(/\/storage\/resist-discord-bot\/assets\/public\/music\//g, "")
        .replace(/__/g, " ").replace(/_/g, " ")
      var sys = require('util')
      var exec = require('child_process').exec
      function rmComplete() {
        exec("find /storage/resist-discord-bot/assets/public/music | grep .mp3 > /storage/listen.m3u")
        exec("pkill -10 ices && pkill -1 ices")
      }
      function puts() { 
        client.channels.get(channel).send("`Removed "+titlePretty+" from the radio queue!`")
        exec("find /storage/resist-discord-bot/assets/public/music | grep .mp3 > /storage/listen.m3u")
        console.log('Should have wrote a new playlist file...')
        exec("pkill -10 ices && pkill -1 ices")
        return true
      }
      exec("rm /storage/listen.m3urm -rf /storage/resist-discord-bot/assets/public/music/"+title+"", puts())      
    })
  })
}
function radioRemoveBackend(channel,player){
  console.log("Starting radio remove...")
  http.get("https://t1000.Resist.Network/status-json.xsl", function(res){
    var data = ''
    res.on('data', function (chunk){
      data += chunk
    })
    res.on('end',function(){
      var obj = JSON.parse(data)
      var title = obj.icestats.source.title + ".mp3"
      var titlePretty = obj.icestats.source.title
        .replace(/\/storage\/resist-discord-bot\/assets\/public\/music\//g, "")
        .replace(/__/g, " ").replace(/_/g, " ")
      var sys = require('util')
      var exec = require('child_process').exec
      function puts(error, stdout, stderr) { 
        client.channels.get(channel).send("`Player "+player+" removed "+titlePretty+
          " `from the radio queue`!")
        return true
      }
      exec("rm -rf /storage/resist-discord-bot/assets/public/music/"+title, puts)
      exec("pkill -10 ices && pkill -1 ices")
      setTimeout(function () {
        radioNowPlaying(discord_channel_id_botspam)
      }, 10000)       
    })
  })
}
var timed_out = false,
    timer     = setTimeout(function() {
        timed_out = true
    radioNowPlaying(discord_channel_id_botspam)
    }, (1000*60*3)) 
function A() {
    radioNowPlaying(discord_channel_id_botspam, function(result) { 
        if (result) {
             clearTimeout(timer)
             DONE()
        }else if (! timed_out ) {
            setTimeout(A, 1000) 
        }
    })
}
exports.searchKat = searchKat
exports.searchPb = searchPb
var readyLog = function(msg,d,u,uid) {
  if(!u) { var u = bot_nickname }
  if(!uid) { var uid = "System" }
  var sys = require('util')
  var exec = require('child_process').exec
  fs.readFile('.git/refs/heads/master', function(err, data) {
    var gitHash = data.toString().substr(null,8)
    console.log("Repository Hash: "+gitHash)
    console.log("---------------------------\n")
    client.channels.get(discord_channel_id_log).send("`Bot PID { "+process.pid+" }, Repo Hash { "+gitHash
      +" } started successfully!`")
  })
}
var restartMessage = function(msg,d,u,uid) {
  if(!u) { var u = bot_nickname }
  if(!uid) { var uid = "System" }
  msg.channel.send({embed: {
    color: 0xFF0000,
    author: {
      name: bot_nickname+" - Reboot",
      icon_url: bot_logo_square
    },
    description: bot_nickname+" is restarting now!\n\nThis process can take up to a minute. If it takes"+
     " longer check your console.",
    timestamp: new Date(),
    footer: {
      text: info_copyright
    }
  }})
}
function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
  } else {
    return text
  }
}
function sleep(time, callback) {
  var stop = new Date().getTime()
  while(new Date().getTime() < stop + time) {
    
  }
  callback()
}
function botReboot() {
  sleep(2000, function() {
  })
  process.exit()
}
const commands = {
'reload': (msg) => {
  if(msg.author.id !== config.bot_admin_id) return
  msg.channel.send("`Reloading and updating Bot PID: "+process.pid+", be right back!`")
  var gitHash
  fs.readFile('.git/refs/heads/master', function(err, data) {
    var gitHash = data.toString().substr(null,8)
    let host = msg.content.split(' ')[1]
    var sys = require('util')
    var exec = require('child_process').exec
    function puts(error, stdout, stderr) { 
    }
    if (systemOS === "win32") {
      exec("UnSupported OS !!", puts)
    } else {
      var lastChannel = msg.channel.id
      exec('echo "'+lastChannel+'" > /storage/resist-discord-bot/lastChannel')
      exec("/storage/resist-discord-bot/reload.sh &", puts)
    } 
  })
},'shutdown': (msg) => {
  if (msg.author.id == bot_admin_id) {
      process.exit()
  }
},'reboot': (msg) => {
  if (msg.author.id == bot_admin_id) {

    let host = msg.content.split(' ')[1]
    var sys = require('util')
    var exec = require('child_process').exec
    function puts(error, stdout, stderr) { 
      msg.channel.send("`"+stdout+"`")
    }
    if (systemOS === "win32") {
    } else {
      exec('echo "Rebooting the host system, be right back!"sudo reboot', puts)
    }
  }
},'purge': (msg) => {
  var message = msg
  let amount1 = msg.content.split(' ')[1]
  var amount = parseInt(amount1)+1
  var amountInt = parseInt(amount)+0
  if (!amount) { 
    message.channel.send(":exclamation: `You must specify an amount of messages!`")
  } else if (parseInt(amount1) > 50) {
    message.channel.send(":exclamation: `You must specify an amount under 50!`")
  } else {
    message.channel.bulkDelete(amount).then(message.channel.send("`Purged "+amount1+
      " message(s) from channel <#"+msg.channel.id+">!` ```css\nMessages Purged { "+amount1+
      " }\nChannel Purged { #"+msg.channel.name+" }\nUser { "+msg.author.username+"/"+msg.author.id+
      " }\n\nThis message will self destruct in 5 seconds...```")
      .then(msg => msg.delete(5000)).catch(err => console.log(err)))
  }
},'brag': (msg) => {
  var descriptionAbout = "`Our bots do things yours can't. Haha!`"
  msg.channel.send(descriptionAbout)
},'about': (msg) => {
  let message = msg
  let serverembed = "Server Name { "+message.guild.name+" }\nCreated On { "+ message.guild.createdAt+
    " }\nYou Joined On { "+message.member.joinedAt+" }\nTotal Members { "+message.guild.memberCount+" }"
  msg.channel.send("`Querying the answer to life, the universe, and everything...` ```css\n42 :)\n\n"+
    serverembed+"``` ```Custom Open Source Discord Bot built with [Node] and [Discord.js]"+
    " for our Minecraft community and server. For more information including current and planned features"+
    " visit the link above. Big Brother is Watching You!```")
},'sendnudes': (msg) => {
    msg.channel.send("`Well, I suppose its ok since I know you...`\n"+
    "https://i.dailymail.co.uk/i/pix/2015/07/15/15/2A8D0D2000000578-0-image-a-34_1436968980848.jpg")
},'announcement': (msg) => {
  let announcement = msg.content.split(/\s(.+)/)[1]
  msg.delete(1000)
  if (msg.author.id == bot_admin_id) {
    client.channels.get("515838337911750685").send(":loudspeaker: `"+announcement+"`").then(function (message) {
    }).catch(function() {
      })
  }
},'maintenance': (msg) => {
  let maintenance = msg.content.split(/\s(.+)/)[1]
  msg.delete(1000)
  if (msg.author.id == bot_admin_id) {
    msg.channel.send("`Performing maintenance on internal systems, expected ETA is "+maintenance+"!`")
  }
},'rules': (msg) => {
  if(msg.author.id !== config.bot_admin_id) return
  msg.delete(1000)
  msg.channel.send("`Initializing Resist.Network rules database provided by Derakel :P ...`"+
    "\n\n<:logo:525883770281132064> __**Resist.Network RULES**__ <:logo:525883770281132064>\n\n"+
    "**Member Rules\n===========================**\n```css\n#1 Respect the Decisions of the Staff."+
    " Do not undermine their authority.\n\n#2 We are an English speaking Community mostly. Support"+
    " cannot be guaranteed, but we will try.\n\n#3 DO NOT act in a Childish Behavior, CAUSE DRAMA or"+
    " TROLL other Members.\n\n#4 DO NOT Spam/Harass Channels with either Text, Microphone or Bots.\n\n#5"+
    " DO NOT excessively use capslock. (LOL or ROFL is fine)\n\n#6 DO NOT Advertise other Discords, Servers"+
    " and/or Communities without staff permission.\n\n#7 DO NOT bring conversations into the wrong Channels."+
    "\n\n#8 If you have a Complaint, Question or Issue use https://resist.network/community to submit a"+
    " topic.```\n**Staff Rules\n===========================**\n```css\n#1 Do not change Discord Settings"+
    " without Administrative Authorization.\n\n#2 Do not assume that you are above anyone or any Rules that"+
    " Members must follow.\n\n#3 Just because you 'can' do something, doesn't mean you should.```", {
    files: [
    "https://resist.network/wp-content/uploads/2019/01/textcrop.png"
  ]
  })
},'kick': (msg) => {
  let message = msg
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1)  
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if(!kUser) return message.channel.send("Can't find user!")
    let kReason = args.join(" ").slice(22)
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!")
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!")
    let kickChannel = message.guild.channels.find(`name`, "log-discord")
    if(!kickChannel) return message.channel.send("Can't find log channel.")
    message.guild.member(kUser).kick(kReason)
  if(kReason == "" || kReason == null) { 
    let kickEmbed = "<@"+message.author.id+">`(ID# "+message.author.id+") kicked user` "+kUser+"`(ID# "+
      message.author.id+") for no reason...`"
    kickChannel.send(kickEmbed)
  } else {
    let kickEmbed = "<@"+message.author.id+">`(ID# "+message.author.id+") kicked user` "+kUser+"`(ID# "+
      message.author.id+") for "+kReason+"...`"
    kickChannel.send(kickEmbed)
  }   
  return
},'ban': (msg) => {
  if(msg.author.id !== config.bot_admin_id) return
  let message = msg
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1)  
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if(!bUser) return message.channel.send("Can't find user!")
  let bReason = args.join(" ").slice(22)
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!")
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!")
    let incidentchannel = message.guild.channels.find(`name`, "log-discord")
    if(!incidentchannel) return message.channel.send("Can't find log channel.")
    message.guild.member(bUser).ban(bReason)
  if(bReason == "" || bReason == null) { 
    let banEmbed = "<@"+message.author.id+">`(ID# "+message.author.id+") banned user` "+bUser+"`(ID# "+
      message.author.id+") for no reason...`"
    incidentchannel.send(banEmbed)
  } else {
    let banEmbed = "<@"+message.author.id+">`(ID# "+message.author.id+") banned user` "+bUser+"`(ID# "+
      message.author.id+") for "+bReason+"...`"
    incidentchannel.send(banEmbed)
  } 
  return  
},'report': (msg) => {
  let message = msg
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1)  
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if(!rUser) return message.channel.send("Couldn't find user.")
    let rreason = args.join(" ").slice(22)
    let reportschannel = message.guild.channels.find(`name`, "log-discord")
    if(!reportschannel) return message.channel.send("Couldn't find log channel.")
  if(rreason == "" || rreason == null) { 
    let reportEmbed = "<@"+message.author.id+">`(ID# "+message.author.id+") reported user` "+rUser+"`(ID# "+
      message.author.id+") for no reason...`"
    reportschannel.send(reportEmbed)
  } else {
    let reportEmbed = "<@"+message.author.id+">`(ID# "+message.author.id+") reported user` "+rUser+"`(ID# "+
      message.author.id+") for "+rreason+"...`"
    reportschannel.send(reportEmbed)    
  }
  return  
},'motd': (msg) => {
  if(msg.author.id !== config.bot_admin_id) return
  msg.delete(1000)
  msg.channel.send("`Initializing Resist.Network...` ```prolog\nWelcome to the Resist.Network Minecraft"+
    " Community! We host our own custom Minecraft modpack and server. Scifi, Futuristic, CyberPunk themed"+
    " tech only survival pack. \n\nPlease check our chat channels, or visit our website at the link below"+
    " for the mod list, launcher information,\nconnect information and much much more.```\n\nGet it Now!  "+
    "[ https://Resist.Network ]\n\nJoin <#515836198368051203> for regular chat and to meet the community!\n"+
    "Use <#525842772247314442> for general help or open a ticket.\n\n**SERVER INFORMATION**```css\nModded"+
    " Minecraft Version { 1.12.2 }\nServer Stats { DEDICATED, 16GB RAM, SSD RAID, 8 CORE }\n```\n"+
    "**OPEN A SUPPORT TICKET** - **!open**\n```ldif\nCreates a private channel and staff will assist you when"+
    " they are available.\n\nFor immediate help, check out or other channels, or check out site for various"+
    " custom tweaks, recipes, and extended help topics.```\n**DOWNLOAD GAME** - **!download**\n```ldif\n"+
    "Provides the downloads for Windows, Linux and OSX players.```", {
    files: [
    "https://resist.network/wp-content/uploads/2019/01/textcrop.png"
  ]
  })
},'modlist': (msg) => {
    msg.channel.send("`Oh right, get it here...` "+modlist_link)
},'status' : (msg) => {
  var freeMem = prettySize(os.freemem())
  var totalMem = prettySize(os.totalmem())
  var milliSecUp = os.uptime() * 1000
  var upTime = prettyMs(milliSecUp, {verbose: true})
  msg.channel.send("`Querying bot node statistics...`\n```css\nMemory Usage: "+freeMem+" Free / "+totalMem+
    " Total \nBot OS/Arch: "+os.type()+" ("+os.arch()+")\nBot Node FQDN: "+os.hostname()+
    "\nBot Node Update: "+upTime+"```")
},'help': (msg) => {
  msg.channel.send("`RTFM eh? Go right ahead...` ```css\n.BOT_PLAYER\n!player [playerName] { Get the"+
  " information card for a player. }\n!time top { Get top playtimes for the server. }\n!time [playerName]"+
  " { Get a players time statistics. }\n!tps { Get current server TPS. }\n!open { Opens a support ticket with"+
  " staff. }\n\n.BOT_RADIO \n!radio add [searchTerm] { Get first result as a new radio track. }\n"+
  "!radio skip { Skip to the next track in the queue. }\n!radio remove { Removes currently playing track from "+
  "the queue. }\n!radio nowplaying { Shows currently playing live track information. }\n!radio queue { Shows"+
  " the current live radio queue and lineup. }\n\n.BOT_GOOGLE\n!google [searchTerm] { Search Google and return"+
  " first result. }\n\n.BOT_NETWORK_UTILITY\n!speedtest { Run a network speed test on bot host system. }\n"+
  "!nmap [hostName] { Perform a port scan on host/IP. }\n!ping [hostName] { Ping a host/IP. }\n"+
  "!nslookup [hostName] { Get domain name server information on a host/IP. }\n!dig [hostName] { Get"+
  " network dig information from a host/IP. }\n!traceroute [hostName] { Expose the network route of a"+
  " host/IP. }\n\n.BOT_MISCELLANEOUS\n!about { About this bot. }\n\n.BOT_ADMIN\n!motd { Posts an MOTD in"+
  " the channel assigned in config. }\n!announcement { Post an announcement in the News channel. }"+
  " \n!update { Perform full NPM and GitHub update. }\n!reboot { Reboots the host system. }\n!reload"+
  " { Updates GitHub and restarts the bot. }\n!eval { Evaluate bot functions and code. }```") 
},'ping': (msg) => {
  let host = msg.content.split(' ')[1]
  var mentionCommandAuthor = "<@"+msg.author.id+">"
  var sys = require('util')
  var exec = require('child_process').exec
  function puts(error, stdout, stderr) { 
    msg.channel.send(""+mentionCommandAuthor+" `I pinged "+host+
      " with a few packets, see attached...`\n```ldif\n"+stdout+"```") 
  }
  if (systemOS === "win32") {
    exec("ping -n 5 "+host, puts)
  } else {
    exec("ping -c 5 "+host, puts)
  }
},'tps': (msg) => {
  let host = msg.content.split(' ')[1]
  var sys = require('util')
  var exec = require('child_process').exec
  function puts(error, stdout, stderr) { 
    if(stdout == "") {
      msg.channel.send("`Querying game server overall health and ticks per second...` ```Well, I may"+
      " be artificial, but I am far from perfect. Error!```")     
    } else {
      msg.channel.send("`Querying game server overall health and ticks per second...` ```pre\n"+stdout+"```")
    }
  }
  exec("/bin/bash /storage/resist-discord-bot/tps.sh | iconv -f utf-8 -t utf-8 -c", puts)
},'download': (msg) => {
  msg.channel.send("`It's available on all platforms, get it here...`\n"+
    "https://github.com/resist-network/resist-launcher-pack/releases/latest")
},'webpage': (msg) => {
  //msg.delete(1000)
  let requestPage = msg.content.split(' ')[1]
  var sys = require('util')
  var exec = require('child_process').exec
  function puts(error, stdout, stderr) { 
    msg.channel.send("```"+stdout+"```")
  }
  msg.channel.send("`OK, text version coming right up!`")     
  if (systemOS === "win32") {
  } else {
    var page = "lynx "+requestPage+" --dump -nolist"
    exec(page, puts)
  }
},'speedtest': (msg) => {
  var mentionCommandAuthor = "<@"+msg.author.id+">"
  msg.channel.send("`Running speed test from bot host node, please wait...`")
  var sys = require('util')
  var exec = require('child_process').exec
  function puts(error, stdout, stderr) { 
    msg.channel.send(""+mentionCommandAuthor+" `Speed test result is complete, see attached.`\n```css\n"+
      stdout+"```") 
  }
  exec("/storage/resist-discord-bot/speedtest.sh", puts)
},'update': (msg) => {
  if(msg.author.id !== config.bot_admin_id) return
  msg.channel.send("`Starting update, please wait...`") 
  let host = msg.content.split(' ')[1]
  var sys = require('util')
  var exec = require('child_process').exec
  function puts(error, stdout, stderr) {
    msg.channel.send({embed: {
      color: 0xff8000,
      author: {
        name: bot_nickname+" - Self Update",
        icon_url: bot_logo_square
      },
      description: "```"+stdout+"```",
      timestamp: new Date(),
      footer: {
        text: info_copyright
      }
      }
    })
  }
  exec("cd /storage/resist-discord-bot/ git pull npm install", puts)
 },'nslookup': (msg) => {
  var mentionCommandAuthor = "<@"+msg.author.id+">"
  let host = msg.content.split(' ')[1]
  var sys = require('util')
  var exec = require('child_process').exec
  function puts(error, stdout, stderr) { 
    msg.channel.send(""+mentionCommandAuthor+" `Pinging name server lookup on "+host+
      "...`\n```css\n"+stdout+"```") 
  }
  exec("nslookup "+host, puts)
 },'dig': (msg) => {
  var mentionCommandAuthor = "<@"+msg.author.id+">"
  let host = msg.content.split(' ')[1]
  var sys = require('util')
  var exec = require('child_process').exec
  function puts(error, stdout, stderr) { 
    msg.channel.send(""+mentionCommandAuthor+" `Digging network registry information for "+host+
      "...`\n```css\n"+stdout+"```") 
  }
  exec("dig "+host, puts)
 },'gitdiff': (msg) => {
  if(msg.author.id !== config.bot_admin_id) return
  let which = msg.content.split(' ')[1]
  var sys = require('util')
  var exec = require('child_process').exec
  const main_computer = client.emojis.find("name", "main_computer")
  const main_minecraft = client.emojis.find("name", "main_minecraft")
  const warning = client.emojis.find("name", "warning")
  function puts(error, stdout, stderr) {
    var output = stdout.replace(/`/g, "")
    msg.channel.send("`Displaying recent cybernetic differences against revision #"+
      which+" of my code...` ```css\n"+output+"```")
  }
  if (!which || which == 0) {
    exec("git diff HEAD~1 --word-diff=plain | head -n 30", puts)
  } else {
    exec("git diff HEAD~"+which+" --word-diff=plain | head -n 30", puts)
  }
},'radio': (msg) => {
  let cmd = msg.content.split(' ')[1]
  switch(cmd) {
    case "skip":
      function skipDone(){
        radioNowPlaying(discord_channel_id_log)
      }
      exec("pkill -10 ices && pkill -1 ices", skipDone())
      msg.channel.send("`Skipping to the next radio track!`")   
      break
    case "remove":
      radioRemove(discord_channel_id_botspam)   
      break
    case "nowplaying":
      radioNowPlaying(discord_channel_id_botspam)
      break
    case "queue":
      exec("/storage/ices-start.sh pkill -1 ices")
      radioQueue(discord_channel_id_botspam)
      break     
    case "test":
      let testRaw = msg.content.split(' ')[2]
      msg.channel.send('Search String: '+testRaw)
      break
    case "wipe":
      if(msg.author.id !== config.bot_admin_id) return
      exec("rm -rf /storage/resist-discord-bot/assets/public/music/*.mp3")
      exec("cp -rf /storage/resist-discord-bot/assets/public/music-orig/*.mp3"+
        " /storage/resist-discord-bot/assets/public/music/.")
      exec("mv /storage/listen.m3u.orig /storage/listen.m3u")
      msg.channel.send("`Wiping radio queue...`")
      radioQueue(discord_channel_id_botspam)
      msg.channel.send(":white_check_mark:  `Radio queue wipe completed!`")
      exec("pkill -10 ices && pkill -1 ices")     
      break     
    case "play":
      const streamOptions = { seek: 0, volume: 1 }
      var voiceChannel = client.channels.get(discord_channel_id_radio)
      voiceChannel.join().then(connection => {
        console.log("Starting Resist.Network Radio Streamer....")
        client.channels.get(discord_channel_id_log).send("`Initializing the Resist.Network"+
          " media encoders and live radio...`")
        radioNowPlaying(discord_channel_id_botspam)

        const dispatcher = connection.playStream("https://resist.network/listen.mp3", streamOptions)
        dispatcher.on("end", end => {
          console.log("Main Resist.Network ICECAST Server has quit broadcasting!")
          client.channels.get(discord_channel_id_log).send("`Main Radio feed has quit broadcasting"+
            ", check the servers!`")
        })
      }).catch(err => console.log(err))
      break
    case "add":
      let searchRaw = msg.content.replace(msg.content.split(' ')[0], "").replace(msg.content.split(' ')[1],"")
      if(searchRaw == "" || !searchRaw) {
        msg.channel.send(":exclamation: `You need to supply a search term with !radio add [searchTerm]...`")  
        return true
      }
      console.log("Searching YouTube for"+searchRaw.substr(1)+"...")  
      var YouTube = require('youtube-node')
      var mentionCommandAuthor = "<@"+msg.author.id+">"
      var youTube = new YouTube()
      youTube.setKey(api_youtube_data)
      var prettySearchTerm = searchRaw
      var searchTerm = searchRaw.replace(/ /g, '+')
      youTube.search(searchRaw, 1, function(error, result) {
        if (error) {
          console.log(error)
        } else {
          var result = result
          result['items'].forEach(function (video) {
            var videoNamePretty = video.snippet.title       
            video.snippet.title = video.snippet.title.replace(/[^a-zA-Z0-9-_]/g, '_')
              .replace("_-_", "-").replace("__-__","-")
            var videoDownload = video.snippet.title
            var playerQueryIntro = "`Starting encoding for "+videoNamePretty+"...`\n`"+
              "You will be mentioned when it is complete and in the queue!`"
            msg.channel.send(playerQueryIntro)  
            var playerEmbed = {embed: {
              color: 0x000000,
              title: videoNamePretty,         
              "thumbnail": {
                "url": video.snippet.thumbnails.default.url,
              },
              description: "\n https://www.youtube.com/watch?v="+video.id.videoId+"\n```"+
                "dns\nYou will be notified (mentioned) when this download is complete and in the"+
                " radio queue!```"
            }}  
            var videoUrl = "https://www.youtube.com/watch?v="+video.id.videoId   
            var tempDir = "/storage/resist-discord-bot/assets/public/music/temp" 
            var musicDir = "/storage/resist-discord-bot/assets/public/music" 
            var videoReadableStream = ytdl(videoUrl, { filter: 'audioonly'})
            ytdl.getInfo(videoUrl, function(err, info){
              var videoName = info.title.replace('|','').replace(/[^a-zA-Z0-9-_]/g, '_')
                .replace("_-_", "-").replace("__-__","-")
              var videoWritableStream = fs.createWriteStream(tempDir + '/' + videoName + '.mp3') 
              var stream = videoReadableStream.pipe(videoWritableStream)
              var tempFile = tempDir + '/' + videoName + '.mp3'
              var mp3Path = musicDir + '/' + videoName + '.mp3'
              if (fs.existsSync(mp3Path)) {
              } else {
                stream.on('finish', function() {
                  ffmpeg(tempFile,{ speed: 8, preset: "ultrafast"})
                    .audioCodec('libmp3lame')
                    .save(mp3Path).on('end', function() {
                    fs.unlinkSync(tempFile)
                    function rmComplete() {
                      exec("find /storage/resist-discord-bot/assets/public/music |"+
                        " grep .mp3 > /storage/listen.m3u")
                    }
                    exec("rm /storage/listen.m3u")
                    exec("find /storage/resist-discord-bot/assets/public/music | "+
                      "grep .mp3 > /storage/listen.m3u")
                    console.log('Should have wrote a new playlist file...')
                    exec("pkill -10 ices && pkill -1 ices")                   
                    console.log('Done')
                    msg.channel.send(":white_check_mark: `Added request from ` "+
                      mentionCommandAuthor+" `titled "+videoNamePretty+
                      "!`\nListen Live in **#radio**, in Game or at -> "+
                      "https://Resist.Network/listen.mp3")  
                  })             
                })    
              }
            })              
          })
        }
      })  
      break
    default:
      break
  }
 },'nmap': (msg) => {
   //msg.delete(1000)
    let host = msg.content.split(' ')[1]
    var mentionCommandAuthor = "<@"+msg.author.id+">"
    var sys = require('util')
    var exec = require('child_process').exec
    const main_computer = client.emojis.find("name", "main_computer")
    const main_minecraft = client.emojis.find("name", "main_minecraft")
    function puts(error, stdout, stderr) {
      msg.channel.send(""+mentionCommandAuthor+" `Displaying port scan of "+host+
        "...` ```css\n"+stdout+"```")
    }
    exec("nmap -T4 -F -Pn "+host, puts)
},'traceroute': (msg) => {
    //msg.delete(1000)    
    let host = msg.content.split(' ')[1]
    var mentionCommandAuthor = "<@"+msg.author.id+">"
    msg.channel.send("`Tracing "+host+" through origin network... please wait...`")
    var sys = require('util')
    var exec = require('child_process').exec
    function puts(error, stdout, stderr) { 
      msg.channel.send(""+mentionCommandAuthor+" `Trace route result for "+host+
        " is complete, see attached.`\n```css\n"+stdout+"```") 
    }
     exec("traceroute "+host, puts)
},'open': (msg) => {
    var ticketID = parseInt(fs.readFileSync('ticketID').toString())     
    ticketID = ticketID +1
    var mentionCommandAuthor = "<@"+msg.author.id+">"
    msg.guild.createChannel('ticket-'+ticketID, 'text', [{ 
      id: discord_server_id, 
      denied: 0x400
    },{ 
      id: discord_server_support_role_id_one, 
      allowed: 0x400 
    },{ 
      id: discord_server_support_role_id_two, 
      allowed: 0x400 
    }]).then(channel => { 
      channel.setParent(discord_category_id_support) 
      channel.send(":question:  `Created secure support ticket #"+ticketID+", for `"+
        mentionCommandAuthor+" `...` ```css\nTICKET { #"+ticketID+" }\nPLAYER { "+
        msg.author.username+" }\n\nPlease type a description of the issue, and someone "+
        "will assist you shortly.\n\nUse [!close] to close the ticket once you are satisified!```")})
        .catch(error => console.log(error))
    msg.channel.send(":question:  `Opened Ticket #"+ticketID+" for "+msg.author.username+", an ` <@&"+
      discord_server_support_role_id_one+"> ` or ` <@&"+discord_server_support_role_id_two+
      "> ` will assist you there!`")
    fs.writeFile('ticketID', ticketID, function(err){ if(err) return console.log(err) 
  })
},'close': (msg) => {
    if(msg.channel.parent.id === discord_category_id_support) {
      msg.channel.send({embed: {
        color: 0xff8000,
        author: {
          name: bot_nickname+" - Support",
          icon_url: bot_logo_square
        },
        title: "Closing Support Ticket...",
        description: "Closing Ticket!",
             fields: [{
                "name": "Username",
                "value": msg.author.username
            }, {
                "name": "User ID",
                "value": msg.author.id
            }],
          timestamp: new Date(),
          footer: {
            text: info_copyright
          }
      }
      }).then(msg.channel.delete())
    } else {
      return
    }
},'google': (msg) => {
  var message = msg
  let searchTerm = msg.content.replace(msg.content.split(' ')[0], "")
  googleCommand(msg,searchTerm)
},'movie': (msg) => {
  var message = msg
  let searchTerm = msg.content.split
  movieCommand(msg,searchTerm)
},'eval': (msg) => {
  var message = msg
  const args = msg.content.split(' ').slice(1)
  if (message.content.startsWith(bot_prefix + "eval")) {
    if(msg.author.id !== config.bot_admin_id) return
    try {
      const code = args.join(" ")
      let evaled = eval(code)

      if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled)
      message.channel.send({embed: {
      color: 0xff8000,
      author: {
        name: bot_nickname+" - Code Evaluation",
        icon_url: bot_logo_square
      },
      description: "```"+clean(evaled)+"```",
      fields: [{ 
        "name": "Result", 
        "value": ":sunny: Code Evaluated Successfully!"
      }],
      timestamp: new Date(),
      footer: {
        text: info_copyright
      }
    }})
    } catch (err) {
      message.channel.send({embed: {
      color: 0xff8000,
      author: {
        name: bot_nickname+" - Code Evaluation",
        icon_url: bot_logo_square
      },
      fields: [{ "name": "Result", "value": ":exclamation: Code Evaluation Failure!"}],
      description: "```"+clean(err)+"```",
      timestamp: new Date(),
      footer: {
        text: info_copyright
      }
    }})
    }
  }
},'player': (msg) => {
  var message = msg
  let player = msg.content.split(' ')[1]
  if(!player) {
    msg.channel.send("`You must supply a player name!`")       
  } else { 
    var conPlayerQuery = mysql.createConnection({
        host: mysql_host,
        user: mysql_user,
        password: mysql_pass,
        database: mysql_database
    })
    conPlayerQuery.connect(err => {
      var now = moment()
      var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z')
      console.log("["+formattedNow+"]["+msg.author.username+"/"+msg.author.id+"] Queried "+player+"...\n")
      var playerQuery = "SELECT * FROM `site_users`, `accounts`, `luckperms_players`,"+
      " `rankup_player_stats` WHERE"+
      " site_users.user_login = '"+player+"' AND luckperms_players.username = '"+player+
      "' AND BINARY accounts.uid = luckperms_players.uuid AND BINARY"+
      " rankup_player_stats.uuid = accounts.uid";
      console.log(playerQuery)
      conPlayerQuery.query(playerQuery, function(err,rows) { 
        if(err) { console.log("MySQL Error: "+err) } 
        if (!rows[0]) {
          msg.channel.send("Player does not exist or I can't find enough data on them yet. Please"+
              " try again later.")
          return true
        }
        var mcUser = rows[0].user_login
        var xp_exp = rows[0].exp
        var xp_exp_to_level = rows[0].exp_to_level
        var xp_total_exp = rows[0].total_exp
        var xp_exp_lvl = rows[0].exp_lvl
        var bal = rows[0].credit_balance  
        var uuid = rows[0].uuid
        var joinDate = rows[0].JOIN_DATE.toString().replace('00:00:00 GMT-0500 (GMT-05:00)','')
        var minutesPlayed = Math.floor(rows[0].TIME_PLAYED / 60)
        var secondsPlayedRemainder = rows[0].TIME_PLAYED - minutesPlayed * 60;
        if(secondsPlayedRemainder == 1){
          var timePlayed = minutesPlayed + " Minutes and "+secondsPlayedRemainder+ " Second"
        }else{
          var timePlayed = minutesPlayed + " Minutes and "+secondsPlayedRemainder+ " Seconds"
        }
        var uuidSecure = uuid.substr(uuid.length - 6)
        var rank = ""
        if(rows[0].primary_group == "default") {
          var rank = "Citizen"
        }
        if(rows[0].primary_group == "independent") {
          var rank = "Independent"
        }
        if(rows[0].primary_group == "technician") {
          var rank = "Technician"
        }
        if(rows[0].primary_group == "operator") {
          var rank = "Operator"
        }         
        var sys = require('util')
        var exec = require('child_process').exec
        var playerQueryIntro = "`Displaying credentials for "+mcUser+"...`"
        var playerEmbed = {embed: {
          color: 0xff8000,
          author: {
            name: "Resist.Network - Identification Card",
            icon_url: "https://www.top5reviewed.com/wp-content/uploads/2016/07/"+
              "Fingerprint-Door-Lock-220x220.png"
          },
          "thumbnail": {
            "url": "https://visage.surgeplay.com/full/128/"+uuid,
          },
          description: "`Player Name` "+mcUser+"\n`Rank` "+rank+
            "\n`Secured UID` XX-"+uuidSecure+
            "\n\n:balloon: `Join Date` "+joinDate+
            "\n:alarm_clock: `Time Played` "+timePlayed+
            "\n<:Heart:532686774108160007> `Current Health` NA"+
            "\n<:credit:532687325101293579> `Credit Balance` "+bal,
        }}    
        msg.channel.send(playerQueryIntro, playerEmbed)
        conPlayerQuery.end()
      })
    })
  }
},'give': (msg) => {
  var message = msg
  let player = msg.content.split(' ')[1]
  let amount = msg.content.split(' ')[2]
  if(msg.author.id !== config.bot_admin_id) return
  if(!player) {
    msg.channel.send({embed: {
      color: 0xff8000,
      author: {
        name: bot_nickname+" - Player Awards",
        icon_url: bot_logo_square
      },
      description: "You must supply a player name!",        
      timestamp: new Date(),
      footer: {
        text: info_copyright
      }
    }
    })      
  } else {
    if(!amount) { amount = 5 }
    var con = mysql.createConnection({
      host: mysql_host,
      user: mysql_user,
      password: mysql_pass,
      database: mysql_database
    })
    con.connect(err => {
      con.query("SELECT * from xf_user where username = '"+player+"'", function(err,rows) { if(err) { 
        var now = moment()
        var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z')
        console.log("["+formattedNow+"]["+msg.author.username+"/"+msg.author.id+"] DB ERROR: "+err+"\n")  
      } 
      var mcUser = rows[0].username
      var mcRegistered = rows[0].regdate
      var mcWorld = rows[0].world
      var mcStatus = rows[0].mc_online_status
      var mcGameTime = rows[0].mc_game_time
      var mcPlayerLevel = rows[0].mc_player_level
      var mcCurrentXP = rows[0].mc_current_xp
      var mcTotalXP = rows[0].mc_total_xp
      var mcHealth = rows[0].mc_health
      var mcWallet = rows[0].mc_wallet
      var balance = parseInt(balance = 0)
      balance = balance+parseInt(mcWallet)
      balance = balance+parseInt(amount)
      con.query("UPDATE xf_user SET mc_wallet = '"+balance+"' WHERE username = '"+player+"'", 
        function(err,rows) { if(err) {
        var now = moment()
        var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z')
        console.log("["+formattedNow+"]["+msg.author.username+"/"+msg.author.id+"] DB ERROR: "+err+"\n")  
      } 
      msg.channel.send({embed: {
        color: 0xff8000,
        author: {
          name: bot_nickname+" - Player Awards",
          icon_url: bot_icon_about
        },
        "thumbnail": {
          "url": "https://minotar.net/body/"+mcUser+"/100.png"
        },     
        fields: [{
          "name": "Player Name",
          "value": ""+mcUser
        },
        {
          "name": "Old Balance",
          "value": ""+mcWallet
        },
        {
          "name": "New Balance",
          "value": ""+balance
        },{
          "name": "Awarded By / Amount",
          "value": ""+msg.author.username+" / "+amount
        }],       
        timestamp: new Date(),
        footer: {
          text: info_copyright
        }
      }})
      })
      var now = moment()
      var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z')
      console.log("["+formattedNow+"]["+msg.author.username+"/"+msg.author.id+"] Awarded "+mcUser+" "+
        amount+"...\n") 
      con.end()   
    })
    })
  }
}   
}
client.on('ready', () => {
  readyLog("",bot_nickname+" PID #"+process.pid+" is Ready!")
  console.log("\n\n")
  console.log(bot_nickname+" is ready for you!")
  console.log("---------------------------")
  const streamOptions = { seek: 0, volume: 1 }
  var voiceChannel = client.channels.get(discord_channel_id_radio)
  voiceChannel.join().then(connection => {
    console.log("Starting Resist.Network Live Radio Stream....")
    client.channels.get(discord_channel_id_log).send("`Initializing the Resist.Network media encoders and"+
      " live radio...`")
    radioNowPlaying(discord_channel_id_log)
    const stream = ffmpeg('https://Resist.Network/listen.mp3')
    const dispatcher = connection.playStream("https://resist.network/listen.mp3", streamOptions)
    dispatcher.on("end", end => {
      console.log("Main Resist.Network ICECAST Server has quit broadcasting!")
      client.channels.get(discord_channel_id_log).send("`Main Radio feed has quit broadcasting, check the"+
        " servers!`")
      //voiceChannel.leave()
    })
  }).catch(err => console.log(err))
})
client.on('message', msg => {
  //Main ALL Logging, needs this bot disabled before worth anything!
  if(msg.author.id !== config.bot_id) {
    console.log("["+logTimestamp+"] "+msg.author.username+"("+msg.author.id+") "+msg.content)
    client.channels.get(discord_channel_id_log).send("`"+msg.author.username+"("+msg.author.id+") "+
      msg.content+"`")
  }
  if (!msg.content.startsWith(bot_prefix)) { 
    //AI sequence here
    if(msg.content.indexOf('thank you bot') > -1 || 
      msg.content.indexOf('tank you bot') > -1 ||
      msg.content.indexOf('thank you bot') > -1 || 
      msg.content.indexOf('dank') > -1 || 
      msg.content.indexOf('thonk') > -1) {
      msg.channel.send('You are most welcome!')
    }
  } else {
    if (commands.hasOwnProperty(msg.content.toLowerCase().slice(bot_prefix.length).split(' ')[0])) {
      commands[msg.content.toLowerCase().slice(bot_prefix.length).split(' ')[0]](msg)
    }
  }
  
})
client.on('guildMemberAdd', member => {
  client.channels.get(discord_channel_id_discord_log).send("`Detected new player/human named "+
    member.user.tag+", ID#"+member.id+"...`")
    var role = member.guild.roles.find('name', 'Citizen')
    member.addRole(role)
})
client.login(bot_token)
express()
  .use(express.static(path.join(__dirname, 'assets/public')))
  .set('views', path.join(__dirname, 'assets/views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', { 
    'bot_web_title': bot_web_title,
    'bot_web_favicon': bot_web_favicon,
    'bot_nickname': bot_nickname,
    'bot_logo_long': bot_logo_long,
    'bot_logo_square': bot_logo_square,
    'info_website': info_website,
    'info_copyright': info_copyright,
    'discord_invite_link': discord_invite_link,
    'theme': 'default'
  })).listen(bot_web_port, () => console.log())
