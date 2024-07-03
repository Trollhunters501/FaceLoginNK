script.addEventListener("Enable", function(){
  let TextFormat = Java.type("cn.nukkit.utils.TextFormat");
  const FaceTask = Class(Object, {
    SYMBOL: "\u2588",
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
      function arrayCopy(src, srcIndex, dest, destIndex, length){
        return Object.assign(dest, Array(destIndex).concat(src.slice(srcIndex, srcIndex + length)));
      }
      let symbol = this.SYMBOL;
      let strArray = [];
      let maxX = 8;
      let maxY = 8;
      let width = 64;
      let uv = 32;
      let skinData = this.skindata;
      switch(skinData.length){
        case 8192:
        case 16384:
          break;
        case 65536:
          maxX = maxY = 16;
          width = 128;
          uv = 64;
          break;
        default:
          break;
      }
      arrayCopy(skinData, (width * maxX * 4) - 4, skinData, (width * maxX * 4));
      for(var y = 0; y < maxY; y++){
        for(var x = 1; x < maxX; x++){
          if(strArray[y] == null){
            strArray[y] = "";
          }
          let key = ((width * y) + maxX + x) * 4;
          let key2 = ((width * y) + maxX + x + uv) * 4;
          let a = skinData[key2 + 3] & 0xFF;
          let Format;
          if(a >= 127){
            let red = skinData[key2] & 0xFF;
            let green = skinData[key2 + 1] & 0xFF;
            let blue = skinData[key2 + 2] & 0xFF;
            Format = this.rgbToTextFormat(red, green, blue);
          }else{
            let red = skinData[key] & 0xFF;
            let green = skinData[key + 1] & 0xFF;
            let blue = skinData[key + 2] & 0xFF;
            Format = this.rgbToTextFormat(red, green, blue);
          }
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
