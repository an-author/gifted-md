(function(_0x36c325,_0x9c16da){const _0x11e768=_0x51bc,_0x393911=_0x36c325();while(!![]){try{const _0x5cf9d3=parseInt(_0x11e768(0x132))/0x1*(parseInt(_0x11e768(0x138))/0x2)+-parseInt(_0x11e768(0x12a))/0x3*(-parseInt(_0x11e768(0x10b))/0x4)+-parseInt(_0x11e768(0x122))/0x5+parseInt(_0x11e768(0x117))/0x6*(parseInt(_0x11e768(0x137))/0x7)+-parseInt(_0x11e768(0x13c))/0x8*(-parseInt(_0x11e768(0x118))/0x9)+parseInt(_0x11e768(0x133))/0xa+-parseInt(_0x11e768(0x12f))/0xb;if(_0x5cf9d3===_0x9c16da)break;else _0x393911['push'](_0x393911['shift']());}catch(_0x28143b){_0x393911['push'](_0x393911['shift']());}}}(_0x6839,0xe78fd));import _0x17c541 from'node-cron';import _0x2d3ff0 from'moment-timezone';function _0x6839(){const _0x1696b1=['\x20close*','\x20open*\x20or\x20*','admin','match','*Group\x20Only\x20Command!*','Group\x20successfully\x20opened.','reply','toLowerCase','hh:mm\x20A','54AboLIS','801tppLLV','Group\x20successfully\x20closed.','Africa/Nairobi','schedule','groupMetadata','from','Invalid\x20setting.\x20Use\x20\x22open\x22\x20to\x20open\x20the\x20group\x20and\x20\x22close\x22\x20to\x20close\x20the\x20group.\x0a\x0aExample:\x0a*','length','body','slice','2356770tIhKwu','format','Group\x20will\x20be\x20set\x20to\x20\x22','sendMessage','find','Please\x20specify\x20a\x20setting\x20(open/close)\x20and\x20optionally\x20a\x20time.\x0a\x0aExample:\x0a*','test','stop','120DegegG','\x20IST','split','sender','open','46048189OSWiZx','\x20IST.','groupSettingUpdate','20142YdFEfO','6486780yoZqut','close','Scheduling\x20','decodeJid','1320347zJlIOd','122TdLCoN','Error\x20during\x20scheduled\x20task\x20execution:','not_announcement','*Bot\x20is\x20Not\x20Admin!*','145832GwzZRb','startsWith','announcement','HH:mm','\x20*\x20*\x20*','\x22\x20at\x20','Invalid\x20time\x20format.\x20Use\x20HH:mm\x20AM/PM\x20format.\x0a\x0aExample:\x0a*','\x20open\x2004:00\x20PM*','Executing\x20scheduled\x20task\x20for\x20','group','An\x20error\x20occurred\x20while\x20updating\x20the\x20group\x20setting.','log','An\x20error\x20occurred\x20while\x20processing\x20the\x20command.','40872NNCUIt','user','Error:'];_0x6839=function(){return _0x1696b1;};return _0x6839();}let scheduledTasks={};const groupSetting=async(_0x48462b,_0x1082b3)=>{const _0x5cf1e8=_0x51bc;try{const _0x334f51=_0x48462b['body'][_0x5cf1e8(0x111)](/^[\\/!#.]/),_0xf79d23=_0x334f51?_0x334f51[0x0]:'/',_0x446c25=_0x48462b['body'][_0x5cf1e8(0x13d)](_0xf79d23)?_0x48462b[_0x5cf1e8(0x120)][_0x5cf1e8(0x121)](_0xf79d23[_0x5cf1e8(0x11f)])[_0x5cf1e8(0x12c)]('\x20')[0x0][_0x5cf1e8(0x115)]():'',_0x34be31=[_0x5cf1e8(0x107)];if(!_0x34be31['includes'](_0x446c25))return;if(!_0x48462b['isGroup'])return _0x48462b[_0x5cf1e8(0x114)](_0x5cf1e8(0x112));const _0x3e2eb1=await _0x1082b3[_0x5cf1e8(0x11c)](_0x48462b[_0x5cf1e8(0x11d)]),_0x2895a2=_0x3e2eb1['participants'],_0x536db0=await _0x1082b3[_0x5cf1e8(0x136)](_0x1082b3[_0x5cf1e8(0x10c)]['id']),_0x395d8b=_0x2895a2[_0x5cf1e8(0x126)](_0x6ae4b1=>_0x6ae4b1['id']===_0x536db0)?.[_0x5cf1e8(0x110)],_0x5a682a=_0x2895a2[_0x5cf1e8(0x126)](_0xc23fe9=>_0xc23fe9['id']===_0x48462b[_0x5cf1e8(0x12d)])?.[_0x5cf1e8(0x110)];if(!_0x395d8b)return _0x48462b[_0x5cf1e8(0x114)](_0x5cf1e8(0x13b));if(!_0x5a682a)return _0x48462b[_0x5cf1e8(0x114)]('*You\x20Are\x20Not\x20an\x20Admin!*');const _0x2d1f90=_0x48462b[_0x5cf1e8(0x120)]['slice'](_0xf79d23[_0x5cf1e8(0x11f)]+_0x446c25[_0x5cf1e8(0x11f)])['trim']()[_0x5cf1e8(0x12c)](/\s+/);if(_0x2d1f90[_0x5cf1e8(0x11f)]<0x1)return _0x48462b[_0x5cf1e8(0x114)](_0x5cf1e8(0x127)+(_0xf79d23+_0x446c25)+_0x5cf1e8(0x10f)+(_0xf79d23+_0x446c25)+'\x20open\x2004:00\x20PM*');const _0x49d05b=_0x2d1f90[0x0][_0x5cf1e8(0x115)](),_0x3bcb90=_0x2d1f90[_0x5cf1e8(0x121)](0x1)['join']('\x20');if(!_0x3bcb90){if(_0x49d05b===_0x5cf1e8(0x134))return await _0x1082b3['groupSettingUpdate'](_0x48462b[_0x5cf1e8(0x11d)],_0x5cf1e8(0x13e)),_0x48462b['reply'](_0x5cf1e8(0x119));else return _0x49d05b===_0x5cf1e8(0x12e)?(await _0x1082b3[_0x5cf1e8(0x131)](_0x48462b[_0x5cf1e8(0x11d)],'not_announcement'),_0x48462b[_0x5cf1e8(0x114)](_0x5cf1e8(0x113))):_0x48462b[_0x5cf1e8(0x114)](_0x5cf1e8(0x11e)+(_0xf79d23+_0x446c25)+_0x5cf1e8(0x10f)+(_0xf79d23+_0x446c25)+_0x5cf1e8(0x10e));}if(!/^\d{1,2}:\d{2}\s*(?:AM|PM)$/i[_0x5cf1e8(0x128)](_0x3bcb90))return _0x48462b[_0x5cf1e8(0x114)](_0x5cf1e8(0x104)+(_0xf79d23+_0x446c25)+_0x5cf1e8(0x105));const [_0x578f4f,_0x113d3f]=_0x2d3ff0(_0x3bcb90,['h:mm\x20A',_0x5cf1e8(0x116)])[_0x5cf1e8(0x123)](_0x5cf1e8(0x101))[_0x5cf1e8(0x12c)](':')['map'](Number),_0x2af7f3=_0x113d3f+'\x20'+_0x578f4f+_0x5cf1e8(0x102);console[_0x5cf1e8(0x109)](_0x5cf1e8(0x135)+_0x49d05b+'\x20at\x20'+_0x2af7f3+_0x5cf1e8(0x12b)),scheduledTasks[_0x48462b[_0x5cf1e8(0x11d)]]&&(scheduledTasks[_0x48462b[_0x5cf1e8(0x11d)]][_0x5cf1e8(0x129)](),delete scheduledTasks[_0x48462b['from']]),scheduledTasks[_0x48462b[_0x5cf1e8(0x11d)]]=_0x17c541[_0x5cf1e8(0x11b)](_0x2af7f3,async()=>{const _0x45feb5=_0x5cf1e8;try{console[_0x45feb5(0x109)](_0x45feb5(0x106)+_0x49d05b+'\x20at\x20'+_0x2d3ff0()[_0x45feb5(0x123)](_0x45feb5(0x101))+_0x45feb5(0x12b));if(_0x49d05b===_0x45feb5(0x134))await _0x1082b3[_0x45feb5(0x131)](_0x48462b['from'],'announcement'),await _0x1082b3[_0x45feb5(0x125)](_0x48462b[_0x45feb5(0x11d)],{'text':_0x45feb5(0x119)});else _0x49d05b===_0x45feb5(0x12e)&&(await _0x1082b3['groupSettingUpdate'](_0x48462b[_0x45feb5(0x11d)],_0x45feb5(0x13a)),await _0x1082b3['sendMessage'](_0x48462b[_0x45feb5(0x11d)],{'text':_0x45feb5(0x113)}));}catch(_0x177dd2){console['error'](_0x45feb5(0x139),_0x177dd2),await _0x1082b3[_0x45feb5(0x125)](_0x48462b[_0x45feb5(0x11d)],{'text':_0x45feb5(0x108)});}},{'timezone':_0x5cf1e8(0x11a)}),_0x48462b[_0x5cf1e8(0x114)](_0x5cf1e8(0x124)+_0x49d05b+_0x5cf1e8(0x103)+_0x3bcb90+_0x5cf1e8(0x130));}catch(_0x24ecdd){console['error'](_0x5cf1e8(0x10d),_0x24ecdd),_0x48462b['reply'](_0x5cf1e8(0x10a));}};function _0x51bc(_0x5e82d7,_0x47def2){const _0x683981=_0x6839();return _0x51bc=function(_0x51bcd8,_0x48cd98){_0x51bcd8=_0x51bcd8-0x101;let _0x34c4d1=_0x683981[_0x51bcd8];return _0x34c4d1;},_0x51bc(_0x5e82d7,_0x47def2);}export default groupSetting;
