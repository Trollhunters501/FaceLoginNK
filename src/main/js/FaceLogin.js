script.addEventListener("Enable", function(){
  if(!script.getScriptByName("PHPEngineNK")){
    load("https://cdn.jsdelivr.net/gh/Trollhunters501/PHPEngineNK/src/Creadores%20Program/PHPEngineNK.js");
  }
  if(!script.getScriptByName("PHPEngineNK")){
    console.error("[FaceLoginNK] PHPEngineNK script could not be found");
    console.info("§cDisable FaceLoginNK...");
    return;
  }
  let engPHP = new PHPEngineNK().build();
  let data = manager.createConfig(manager.getFile("FaceLoginNK", "messages.yml"), 2);
  let messages = data.getList("messages");
  function sendFace(player, msg){
    engPHP.put("player", player.getName());
    engPHP.put("skindata", player.getSkin().getSkinData());
    engPHP.put("messages", msg);
    engPHP.evalFile(manager.getFile("FaceLoginNK.php"));
  }
  script.addEventListener("PlayerJoinEvent", function(event){
    sendFace(event.getPlayer(), messages);
  });
});
