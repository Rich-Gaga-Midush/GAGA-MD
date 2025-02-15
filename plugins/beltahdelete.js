const {
  zokou
} = require("../framework/zokou");
const fs = require('fs');
let antiDeleteActive = false;
zokou({
  'nomCom': "anti-delete",
  'categorie': "Vars",
  'reaction': '👽'
}, async (_0x2724ca, _0x2441ae, _0x4474cd) => {
  const {
    ms: _0x187494,
    arg: _0x302ecf
  } = _0x4474cd;
  if (_0x302ecf[0]) {
    const _0x2f9d55 = _0x302ecf[0].toLowerCase();
    if (_0x2f9d55 === 'on') {
      antiDeleteActive = true;
      await _0x2441ae.sendMessage(_0x2724ca, "The command anti-delete is for active.");
      return;
    } else {
      if (_0x2f9d55 === "off") {
        antiDeleteActive = false;
        await _0x2441ae.sendMessage(_0x2724ca, "The command anti-delete is for deactive.");
        return;
      }
    }
  }
  if (!antiDeleteActive) {
    await _0x2441ae.sendMessage(_0x2724ca, "La commande anti-delete est actuellement désactivée.");
    return;
  }
  if (_0x187494.message.protocolMessage && _0x187494.message.protocolMessage.type === 0 && conf.ADM.toLowerCase() === "yes") {
    if (_0x187494.key.fromMe || _0x187494.message.protocolMessage.key.fromMe) {
      console.log("Message supprimé me concernant");
      return;
    }
    console.log("Message supprimé");
    const _0x449738 = _0x187494.message.protocolMessage.key;
    try {
      const _0x1f5501 = fs.readFileSync("./store.json", "utf8");
      const _0xfe8d36 = JSON.parse(_0x1f5501);
      const _0x3bac3d = _0xfe8d36.messages[_0x449738.remoteJid];
      let _0x30ac67;
      for (let _0x264fbb = 0; _0x264fbb < _0x3bac3d.length; _0x264fbb++) {
        if (_0x3bac3d[_0x264fbb].key.id === _0x449738.id) {
          _0x30ac67 = _0x3bac3d[_0x264fbb];
          break;
        }
      }
      if (!_0x30ac67) {
        console.log("Message introuvable");
        return;
      }
      const _0x1baabb = _0x30ac67.key.participant.split('@')[0];
      const _0x5afb70 = " Anti-delete-message by Gaga md\nMessage from @" + _0x1baabb;
      const _0x11ca0b = {
        'image': {
          'url': "./media/deleted-message.jpg"
        },
        'caption': _0x5afb70,
        'mentions': [_0x30ac67.key.participant]
      };
      await _0x2441ae.sendMessage(idBot, _0x11ca0b);
      await _0x2441ae.sendMessage(idBot, {
        'forward': _0x30ac67
      }, {
        'quoted': _0x30ac67
      });
    } catch (_0x3f8fe5) {
      console.error(_0x3f8fe5);
    }
  }
});
