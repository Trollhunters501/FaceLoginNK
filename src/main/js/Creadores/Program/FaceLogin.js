script.addEventListener("Enable", function(){
  let TextFormat = Java.type("cn.nukkit.utils.TextFormat");
  const FaceTask = Class(Object, {
    HEX_SYMBOL: "e29688",
    TEXTFORMAT_RGB: [
      [0, 0, 0],
      [0, 0, 170],
      [0, 170, 0],
      [0, 170, 170],
      [170, 0, 0],
      [170, 0, 170],
      [255, 170, 0],
      [170, 170, 170],
      [85, 85, 85],
      [85, 85, 255],
      [85, 255, 85],
      [85, 255, 255],
      [255, 85, 85],
      [255, 85, 255],
      [255, 255, 85],
      [255, 255, 255]
    ],
    TEXTFORMAT_LIST: [
      TextFormat.BLACK,
      TextFormat.DARK_BLUE,
      TextFormat.DARK_GREEN,
      TextFormat.DARK_AQUA,
      TextFormat.DARK_RED,
      TextFormat.DARK_PURPLE,
      TextFormat.GOLD,
      TextFormat.GRAY,
      TextFormat.DARK_GRAY,
      TextFormat.BLUE,
      TextFormat.GREEN,
      TextFormat.AQUA,
      TextFormat.RED,
      TextFormat.LIGHT_PURPLE,
      TextFormat.YELLOW,
      TextFormat.WHITE
    ],
    messages: [],
    player: "",
    skindata: null,
    constructor: function(player, skindata, messages){
      this.player = player;
      this.skindata = skindata;
      this.messages = messages;
      return this;
    },
    rgbToTextFormat: function(r, g, b){
      let differenceList = [];
      let Double = java.lang.Double;
      for each(var value in this.TEXTFORMAT_RGB){
        let difference = Math.pow(r - value[0], 2) + Math.pow(g - value[1], 2) + Math.pow(b - value[2], 2);
        differenceList.push(difference);
      }
      let key = -1;
      let smallest = Double.MAX_VALUE;
      for(var i in differenceList){
        if(differenceList[i] < smallest){
          smallest = differenceList[i];
          key = i;
        }
      }
      return this.TEXTFORMAT_LIST[key];
    },
    onRun: function(){
      function Hex2Bin(thiz){
        if(thiz.length % 2 !== 0)return thiz;
        let bytes = [];
        for(let i = 0; i < thiz.length - 1; i += 2){
          let charCode = parseInt(thiz.substring(i, i + 2), 16);
          bytes.push(charCode);
        }
        return String.fromCharCode.apply(String, bytes)
        .replace(/\x00+$/g, '')
        .trim();
      }
      let symbol = Hex2Bin(this.HEX_SYMBOL);
      let strArray = [];
      let skinData = this.skindata;
      for(var y = 0; y < 8; y++){
        for(var x = 1; x < 9; x++){
          if(strArray[y] == null){
            strArray[y] = "";
          }
          let key = ((64 * y) + 8 + x) * 4;
          let red = skinData[key] & 0xFF;
          let green = skinData[key + 1] & 0xFF;
          let blue = skinData[key + 2] & 0xFF;
          let Format = this.rgbToTextFormat(red, green, blue);
          strArray[y] += Format + symbol;
        }
      }
      for(var k in this.messages){
        strArray[k] += " "+ this.messages[k].replaceAll("{NAME}", this.player);
      }
      return strArray.join("\n");
    }
  });
  let data = manager.createConfig(manager.getFile("FaceLoginNK", "messages.yml"), 2);
  let messages = data.getList("messages");
  function sendFace(player, msg){
    let task = new FaceTask().constructor(player.getName(), player.getSkin().getSkinData().data, msg);
    player.sendMessage(task.onRun());
  }
  script.addEventListener("PlayerJoinEvent", function(event){
    sendFace(event.getPlayer(), messages);
  });
});
