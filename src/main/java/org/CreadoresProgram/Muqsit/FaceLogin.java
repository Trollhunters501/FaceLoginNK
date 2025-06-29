/*
*
* Copyright (C) 2017 Muqsit Rayyan
*
*    ___                __             _  
*   / __\_ _  ___ ___  / /  ___   __ _(_)_ __
*  / _\/ _` |/ __/ _ \/ /  / _ \ / _` | | '_ \
* / / | (_| | (_|  __/ /__| (_) | (_| | | | | |
* \/   \__,_|\___\___\____/\___/ \__, |_|_| |_|
*                                |___/
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
*
* @author Muqsit Rayyan
* Twiter: http://twitter.com/muqsitrayyan
* GitHub: http://github.com/Muqsit
*
* Almost everything in this class belongs to Legoboy0215
* Twitter: http://twitter.com/Legoboy0215
* GitHub: http://github.com/legoboy0215
*
* Source: http://gist.github.com/legoboy0215/43282a636844bb0d1accbc91c3fc43f6
* This plugin is original from Pocketmine ported to Nukkit.
*/
package org.CreadoresProgram.Muqsit;
import cn.nukkit.utils.TextFormat;
import cn.nukkit.plugin.PluginBase;
import cn.nukkit.event.Listener;
import cn.nukkit.event.EventHandler;
import cn.nukkit.event.player.PlayerJoinEvent;
import java.io.File;
import java.util.List;
import cn.nukkit.utils.Config;
public class FaceLogin extends PluginBase implements Listener{
    public Config config;
    private static class FaceUtils{
        public static String SYMBOL = "\u2588";
        public static int[][] TEXTFORMAT_RGB = {
            {0, 0, 0},
            {0, 0, 170},
            {0, 170, 0},
            {0, 170, 170},
            {170, 0, 0},
            {170, 0, 170},
            {255, 170, 0},
            {170, 170, 170},
            {85, 85, 85},
            {85, 85, 255},
            {85, 255, 85},
            {85, 255, 255},
            {255, 85, 85},
            {255, 85, 255},
            {255, 255, 85},
            {255, 255, 255},
            {221, 214, 5},
            {227, 212, 209},
            {206, 202, 202},
            {68, 58, 59},
            {151, 22, 7},
            {180, 104, 77},
            {222, 177, 45},
            {17, 160, 54},
            {44, 186, 168},
            {33, 73, 123},
            {154, 92, 168},
            {234, 113, 19}
        };
        public static TextFormat[] TEXTFORMAT_LIST = {
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
            TextFormat.WHITE,
            getTextFormat("MINECOIN_GOLD", TextFormat.GOLD),
            getTextFormat("MATERIAL_QUARTZ", TextFormat.YELLOW),
            getTextFormat("MATERIAL_IRON", TextFormat.WHITE),
            getTextFormat("MATERIAL_NETHERITE", TextFormat.DARK_GRAY),
            getTextFormat("MATERIAL_REDSTONE", TextFormat.DARK_RED),
            getTextFormat("MATERIAL_COPPER", TextFormat.GOLD),
            getTextFormat("MATERIAL_GOLD", TextFormat.GOLD),
            getTextFormat("MATERIAL_EMERALD", TextFormat.GREEN),
            getTextFormat("MATERIAL_DIAMOND", TextFormat.AQUA),
            getTextFormat("MATERIAL_LAPIS", TextFormat.BLUE),
            getTextFormat("MATERIAL_AMETHYST", TextFormat.LIGHT_PURPLE),
            getTextFormat("MATERIAL_RESIN", TextFormat.GOLD)
        };
        private static TextFormat getTextFormat(String name, TextFormat fallback){
            try{
                return (TextFormat) Enum.valueOf(TextFormat.class, name);
            }catch(Exception ex){
                return fallback;
            }
        }
        public static TextFormat rgbToTextFormat(int r, int g, int b){
            double smallest = Double.MAX_VALUE;
            int key = -1;
            for(int i = 0; i < TEXTFORMAT_RGB.length; i++){
                int[] value = TEXTFORMAT_RGB[i];
                double difference = Math.pow(r - value[0], 2)
                    + Math.pow(g - value[1], 2)
                    + Math.pow(b - value[2], 2);
                if(difference < smallest){
                    smallest = difference;
                    key = i;
                }
            }
            return TEXTFORMAT_LIST[key];
        }
        public static String sendFace(String player, byte[] skinData, List<String>messages){
            int maxX = 8;
            int maxY = 8;
            int width = 64;
            int uv = 32;
            String[] strArray = new String[Math.max(maxY, messages.size())];
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
            skinData[(width * maxX * 4) - 4] = (byte) (width * maxX * 4);
            for(int y = 0; y < maxY; y++){
                for(int x = 1; x < maxX; x++){
                    if(strArray[y] == null){
                        strArray[y] = "";
                    }
                    int key = ((width * y) + maxX + x) * 4;
                    int key2 = ((width * y) + maxY + x + uv) * 4;
                    int a = skinData[key2 + 3] & 0xFF;
                    int red, green, blue;
                    if(a >= 127){
                        red = skinData[key2] & 0xFF;
                        green = skinData[key2 + 1] & 0xFF;
                        blue = skinData[key2 + 2] & 0xFF;
                    }else{
                        red = skinData[key] & 0xFF;
                        green = skinData[key + 1] & 0xFF;
                        blue = skinData[key + 2] & 0xFF;
                    }
                    TextFormat Format = rgbToTextFormat(red, green, blue);
                    strArray[y - 8] += Format.toString() + SYMBOL;
                }
            }
            for(int k = 0; k < messages.size(); k++){
                if(strArray[k] == null){
                    strArray[k] = "";
                }
                strArray[k] += "§r" + messages.get(k).replace("{NAME}", player);
            }
            return String.join("\n", strArray);
        }
    }
    @Override
    public void onLoad(){
        this.getDataFolder().mkdir();
        File messagesEx = new File(this.getDataFolder(), "messages.yml");
        if(!messagesEx.exists()){
            this.saveResource("messages.yml");
        }
        this.config = new Config(messagesEx, Config.YAML);
    }
    @Override
    public void onEnable(){
        this.getLogger().info("[FaceLogin] §eLoading...");
        this.getServer().getPluginManager().registerEvents(this, this);
        this.getLogger().info("[FaceLogin] §aEnabled!");
    }
    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event){
        event.getPlayer().sendMessage(FaceUtils.sendFace(event.getPlayer().getName(), event.getPlayer().getSkin().getSkinData().data, config.getStringList("messages")));
    }
}
