(function(_0x26e0a6,_0x5b93e4){const _0x2fa710=_0x1db4,_0x26cd5e=_0x26e0a6();while(!![]){try{const _0xdb0c16=parseInt(_0x2fa710(0x163))/0x1+parseInt(_0x2fa710(0x169))/0x2+parseInt(_0x2fa710(0x15b))/0x3*(parseInt(_0x2fa710(0x154))/0x4)+-parseInt(_0x2fa710(0x148))/0x5*(parseInt(_0x2fa710(0x16c))/0x6)+-parseInt(_0x2fa710(0x156))/0x7*(-parseInt(_0x2fa710(0x165))/0x8)+parseInt(_0x2fa710(0x14a))/0x9*(parseInt(_0x2fa710(0x153))/0xa)+-parseInt(_0x2fa710(0x158))/0xb*(parseInt(_0x2fa710(0x15e))/0xc);if(_0xdb0c16===_0x5b93e4)break;else _0x26cd5e['push'](_0x26cd5e['shift']());}catch(_0x458a26){_0x26cd5e['push'](_0x26cd5e['shift']());}}}(_0x1180,0x1f47a));function _0x1180(){const _0x5615d6=['split','results','pintdl','from','error','pint','14810xtYIQa','4LcYXvO','match','207305bOmNmc','includes','5309953QSTILR','startsWith','trim','564495ReKzei','data','get','12Jtyefa','title','\x20naruto','binary','Usage:\x20','111174kiYtvQ','arraybuffer','24bsdqVp','sendMessage','&limit=5','imageUrl','386684ZIrmHA','slice','Error\x20fetching\x20images:','61494IabgoV','length','React','50pkbDVf','body','801koiqzX','https://pinteresimage.nepcoderdevs.workers.dev/?query=','pintrestdl'];_0x1180=function(){return _0x5615d6;};return _0x1180();}import _0xec6fbf from'axios';function _0x1db4(_0x5d191b,_0xd6d195){const _0x118028=_0x1180();return _0x1db4=function(_0x1db4c5,_0x12ec07){_0x1db4c5=_0x1db4c5-0x148;let _0x3a41bd=_0x118028[_0x1db4c5];return _0x3a41bd;},_0x1db4(_0x5d191b,_0xd6d195);}const sleep=_0x51920a=>new Promise(_0x75ed18=>setTimeout(_0x75ed18,_0x51920a)),imageCommand=async(_0x10125d,_0xee6fda)=>{const _0x5036a4=_0x1db4,_0x57e248=_0x10125d[_0x5036a4(0x149)][_0x5036a4(0x155)](/^[\\/!#.]/),_0xe555a=_0x57e248?_0x57e248[0x0]:'/',_0x41d952=_0x10125d['body'][_0x5036a4(0x159)](_0xe555a)?_0x10125d[_0x5036a4(0x149)][_0x5036a4(0x16a)](_0xe555a['length'])[_0x5036a4(0x14d)]('\x20')[0x0]['toLowerCase']():'',_0x375220=_0x10125d[_0x5036a4(0x149)][_0x5036a4(0x16a)](_0xe555a['length']+_0x41d952[_0x5036a4(0x16d)])[_0x5036a4(0x15a)](),_0x3256da=_0x375220,_0x43ee51=['pintrest',_0x5036a4(0x152),_0x5036a4(0x14f),_0x5036a4(0x14c)];if(_0x43ee51[_0x5036a4(0x157)](_0x41d952)){if(!_0x3256da)return _0xee6fda['sendMessage'](_0x10125d['from'],{'text':_0x5036a4(0x162)+(_0xe555a+_0x41d952)+_0x5036a4(0x160)});try{await _0x10125d[_0x5036a4(0x16e)]('📥');const _0x2eee5b=await _0xec6fbf[_0x5036a4(0x15d)](_0x5036a4(0x14b)+encodeURIComponent(_0x3256da)+_0x5036a4(0x167)),_0x2b49ff=_0x2eee5b[_0x5036a4(0x15c)][_0x5036a4(0x14e)];if(_0x2b49ff['length']===0x0)return _0xee6fda[_0x5036a4(0x166)](_0x10125d[_0x5036a4(0x150)],{'text':'No\x20images\x20found\x20for\x20your\x20search\x20query.'});for(const _0x587b7b of _0x2b49ff){await sleep(0x1f4);const _0x4920b9=_0x587b7b[_0x5036a4(0x168)],_0x7d1cad=await _0xec6fbf['get'](_0x4920b9,{'responseType':_0x5036a4(0x164)}),_0x1e8320=Buffer[_0x5036a4(0x150)](_0x7d1cad[_0x5036a4(0x15c)],_0x5036a4(0x161));await _0xee6fda[_0x5036a4(0x166)](_0x10125d[_0x5036a4(0x150)],{'image':_0x1e8320,'caption':_0x587b7b[_0x5036a4(0x15f)]},{'quoted':_0x10125d}),await _0x10125d['React']('✅');}}catch(_0x248370){console[_0x5036a4(0x151)](_0x5036a4(0x16b),_0x248370),await _0xee6fda[_0x5036a4(0x166)](_0x10125d[_0x5036a4(0x150)],{'text':'Error\x20fetching\x20images.'});}}};export default imageCommand;
