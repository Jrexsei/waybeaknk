const Discord = require("discord.js")     
const client = new Discord.Client();       
const ayarlar = require("./ayarlar.json");
const fs = require("fs");              
require('./util/Loader.js')(client);     


client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection();  
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} Komut Yüklenecek.`);
  files.forEach(f => {                       
    let props = require(`./commands/${f}`);   
    console.log(`${props.config.name} Komutu Yüklendi.`);  
    client.commands.set(props.config.name, props); 
    props.config.aliases.forEach(alias => {          
      client.aliases.set(alias, props.config.name);  
    });
  });
})


//SAFE CODE TARAFINDAN PAYLAŞILMIŞTIR İZİNSİZ KULLANMAK, PAYLAŞMAK, DAĞITMAK YASAKTIR
//SAFE CODE AYRICALIKTIR!


client.login(ayarlar.token)






//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     

client.on("guildMemberAdd", member => { 
  const moment = require('moment');
const kanal = ayarlar.giriskanal;
let user = client.users.cache.get(member.id);
require("moment-duration-format");
  const tarih = new Date().getTime() - user.createdAt.getTime();  
const embed = new Discord.MessageEmbed()
let rol = ayarlar.kayıtsızRol
member.roles.add(rol)

var kontrol;
if (tarih < 1296000000) kontrol = '  Bu Kullanıcı **Şüpheli**'
if (tarih > 1296000000) kontrol = '  Kullanıcı **Güvenli**'
moment.locale("tr");
let kanal1 = client.channels.cache.find(x => x.id === kanal);
  let giris = new Discord.MessageEmbed()
  .setDescription(`
» •  Hoşgeldin ${member}

» •  Seninle birlikte **${member.guild.memberCount}** kişiyiz.

» • ૨ Tagımızı alarak ekibimize katılabilirsin.

» •  <@&${ayarlar.kayıtYetkilisi}> rolündekiler seninle ilgilenecektir.

» •   ${kontrol} 

» •  Hesabın Oluşturulma Tarihi: \n • \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`

» •  Ses teyit odasında kaydınızı yaptırabilirsiniz. 

» •  Yetkili Alım Var. 

`)
  .setImage('https://cdn.discordapp.com/attachments/795241924515594320/840870887506968576/unknown.png')
  .setTimestamp()
 
  
    client.channels.cache.find(x => x.id === kanal).send(`<@&${ayarlar.kayıtYetkilisi}> , ${member} `) 
client.channels.cache.find(x => x.id === kanal).send(giris)
});

//-----------------------HOŞ-GELDİN-MESAJI SON----------------------\\     

client.on("ready", async () => {
  client.user.setPresence({ activity: { type: "WATCHING", name: "૨ashew ♥ Gökmen" }, status: "idle" });
  let botVoiceChannel = client.channels.cache.get(ayarlar.botseskanali);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Ses Kanalına Bağlanamadım"));
});
 