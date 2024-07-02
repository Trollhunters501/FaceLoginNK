script.addEventListener("Enable", function(){
  if(!script.getScriptByName("PHPEngineNK")){
    load("https://cdn.jsdelivr.net/gh/Trollhunters501/PHPEngineNK/src/Creadores%20Program/PHPEngineNK.js");
  }
  if(!script.getScriptByName("PHPEngineNK")){
    console.error("[FaceLoginNK] PHPEngineNK script could not be found");
    console.info("§cDisable FaceLoginNK...");
    return;
  }
  let data = manager.createConfig(manager.getFile("FaceLoginNK", "messages.yml"), 2);
  let messages = data.getSection("messages").getAllMap();
});
