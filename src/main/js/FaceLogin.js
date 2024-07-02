script.addEventListener("Enable", function(){
  if(!script.getScriptByName("PHPEngineNK")){
    load("https://cdn.jsdelivr.net/gh/Trollhunters501/PHPEngineNK/src/Creadores%20Program/PHPEngineNK.js");
  }
  if(!script.getScriptByName("PHPEngineNK")){
    console.error("[FaceLoginNK] PHPEngineNK script could not be found");
    console.info("§cDisable FaceLoginNK...");
    return;
  }
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
      let double = Java.type("java.lang.");
      let differenceList = 
    }
  });
  let engPHP = new PHPEngineNK().build();
  let data = manager.createConfig(manager.getFile("FaceLoginNK", "messages.yml"), 2);
  let messages = data.getList("messages");
  function sendFace(player, msg){
    engPHP.put("player", player.getName());
    engPHP.put("skindata", player.getSkin().getSkinData().data);
    engPHP.put("messages", msg);
    engPHP.evalFile(manager.getFile("FaceLoginNK.php"));
  }
  script.addEventListener("PlayerJoinEvent", function(event){
    sendFace(event.getPlayer(), messages);
  });
});
