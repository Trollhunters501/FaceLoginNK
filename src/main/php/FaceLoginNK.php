import cn.nukkit.Server;
import cn.nukkit.utils.TextFormat;
const HEX_SYMBOL = "e29688";
const TEXTFORMAT_RGB = [
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
];
const TEXTFORMAT_LIST = [
    TextFormat::BLACK,
    TextFormat::DARK_BLUE,
    TextFormat::DARK_GREEN,
    TextFormat::DARK_AQUA,
    TextFormat::DARK_RED,
    TextFormat::DARK_PURPLE,
    TextFormat::GOLD,
    TextFormat::GRAY,
    TextFormat::DARK_GRAY,
    TextFormat::BLUE,
    TextFormat::GREEN,
    TextFormat::AQUA,
    TextFormat::RED,
    TextFormat::LIGHT_PURPLE,
    TextFormat::YELLOW,
    TextFormat::WHITE
];
function rgbToTextFormat($r, $g, $b){
    $diferentList = [];
    foreach(TEXTFORMAT_RGB as $value){
        $difference = sqrt(pow($r - $value[0], 2) + pow($g - $value[1], 2) + pow($b - $value[2], 2));
        $diferentList[] = $difference;
    }
    $smallest = min($diferentList);
    $key = array_search($smallest, $diferentList);
    return TEXTFORMAT_LIST[$key];
}
$symbol = hex2bin(HEX_SYMBOL);
$strArray = [];
$skin = substr($skindata, ($pos = (64 * 8 * 4)) - 4, $pos);
