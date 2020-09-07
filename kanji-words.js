const fs = require('fs');
const readline = require('readline');
const readEachLineSync = require('read-each-line-sync');

let args;
if (process.argv.length != 4) {
  console.log('USAGE: generate.js [idiomLength] [level]');
  process.exit(1);
} else {
  args = process.argv.slice(2);
}

const s1 = Array.from('一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六');
const s2a = Array.from('引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話');
const s3a = Array.from('悪安暗医委意育員院飲運泳駅央横屋温化荷界開階寒感漢館岸起期客究急級宮球去橋業曲局銀区苦具君係軽血決研県庫湖向幸港号根祭皿仕死使始指歯詩次事持式実写者主守取酒受州拾終習集住重宿所暑助昭消商章勝乗植申身神真深進世整昔全相送想息速族他打対待代第題炭短談着注柱丁帳調追定庭笛鉄転都度投豆島湯登等動童農波配倍箱畑発反坂板皮悲美鼻筆氷表秒病品負部服福物平返勉放味命面問役薬由油有遊予羊洋葉陽様落流旅両緑礼列練路和');
const s4a = Array.from('愛案以衣位茨印英栄媛塩岡億加果貨課芽賀改械害街各覚潟完官管関観願岐希季旗器機議求泣給挙漁共協鏡競極熊訓軍郡群径景芸欠結建健験固功好香候康佐差菜最埼材崎昨札刷察参産散残氏司試児治滋辞鹿失借種周祝順初松笑唱焼照城縄臣信井成省清静席積折節説浅戦選然争倉巣束側続卒孫帯隊達単置仲沖兆低底的典伝徒努灯働特徳栃奈梨熱念敗梅博阪飯飛必票標不夫付府阜富副兵別辺変便包法望牧末満未民無約勇要養浴利陸良料量輪類令冷例連老労録');
const s5a = Array.from('圧囲移因永営衛易益液演応往桜可仮価河過快解格確額刊幹慣眼紀基寄規喜技義逆久旧救居許境均禁句型経潔件険検限現減故個護効厚耕航鉱構興講告混査再災妻採際在財罪殺雑酸賛士支史志枝師資飼示似識質舎謝授修述術準序招証象賞条状常情織職制性政勢精製税責績接設絶祖素総造像増則測属率損貸態団断築貯張停提程適統堂銅導得毒独任燃能破犯判版比肥非費備評貧布婦武復複仏粉編弁保墓報豊防貿暴脈務夢迷綿輸余容略留領歴');
const s6a = Array.from('胃異遺域宇映延沿恩我灰拡革閣割株干巻看簡危机揮貴疑吸供胸郷勤筋系敬警劇激穴券絹権憲源厳己呼誤后孝皇紅降鋼刻穀骨困砂座済裁策冊蚕至私姿視詞誌磁射捨尺若樹収宗就衆従縦縮熟純処署諸除承将傷障蒸針仁垂推寸盛聖誠舌宣専泉洗染銭善奏窓創装層操蔵臓存尊退宅担探誕段暖値宙忠著庁頂腸潮賃痛敵展討党糖届難乳認納脳派拝背肺俳班晩否批秘俵腹奮並陛閉片補暮宝訪亡忘棒枚幕密盟模訳郵優預幼欲翌乱卵覧裏律臨朗論');
// https://okjiten.jp/7-tyuugakuseikanji.html
// 漢検4級
const j12a = Array.from('握扱依威偉為違緯維壱芋隠陰鋭影越援縁煙鉛汚押奥憶菓箇暇雅介壊戒皆較獲刈甘監汗歓勧乾鑑環含奇鬼祈輝幾儀戯詰脚却丘及朽拠巨距御驚凶恐響叫狭狂況仰駆屈掘繰傾恵迎撃肩堅遣兼軒圏剣玄誇鼓枯継互更荒抗攻稿香恒項豪込婚鎖歳彩載剤咲惨雌伺紫刺脂旨執芝煮斜釈寂狩朱趣需秀舟襲柔獣瞬巡旬盾紹召沼詳床称畳丈飾殖触浸震慎侵寝振薪陣尽尋吹是征姓井跡扇占鮮訴燥騒僧贈即俗耐替拓沢濁脱丹端嘆淡弾恥遅致蓄沖跳徴澄珍沈抵堤摘滴添殿途吐渡奴怒透唐桃盗塔到倒逃踏稲闘胴峠突鈍曇弐悩濃輩杯泊拍迫薄爆髪抜罰繁販搬範般盤被疲彼避尾微匹描浜敏怖膚浮腐敷普賦舞幅払噴柄壁捕舗峰抱砲肪坊忙冒傍帽凡盆漫慢妙眠矛霧娘茂網猛黙紋踊雄与誉腰溶躍謡翼雷頼絡欄離粒慮療隣涙隷麗齢暦劣烈恋露郎惑腕');
// 漢検3級
const j3a = Array.from('哀慰詠悦閲炎宴欧殴乙卸穏架佳華嫁餓怪悔塊概慨該穫隔郭岳掛滑勘肝貫敢緩冠換喚企軌棄棋忌既岐騎犠欺菊吉喫虐虚脅峡凝緊斤愚偶遇啓鶏携掲刑憩契鯨賢倹幻雇顧弧孤悟娯甲孔控拘郊硬綱巧坑慌絞酵克獄魂紺恨墾催債削錯搾撮擦暫施祉諮侍慈軸湿疾赦邪殊寿潤遵徐如晶掌鐘焦衝昇匠譲錠嬢冗嘱辱審伸辛粋炊遂衰穂酔随髄瀬牲婿請隻惜斥籍摂潜繕措阻粗礎双桑葬掃遭憎促賊逮胎怠滞袋滝託卓択諾奪胆鍛壇稚畜窒駐抽鋳彫超聴陳鎮墜訂帝締哲斗塗陶凍痘匿篤豚尿粘婆排陪縛伐帆伴藩畔蛮泌卑碑姫漂苗赴符封伏覆墳紛癖募慕簿崩芳胞縫倣邦飽奉妨乏謀膨房某墨没翻魔埋膜又魅滅免幽憂誘擁揚揺抑裸濫吏隆了猟陵糧厘零霊励裂錬廉炉漏廊浪楼湾');
const s2 = s1.concat(s2a);
const s3 = s2.concat(s3a);
const s4 = s3.concat(s4a);
const s5 = s4.concat(s5a);
const s6 = s5.concat(s6a);
const j12 = s6.concat(j12a);
const j3 = j12.concat(j3a);
const kanjiSets = [s1, s1, s2, s3, s4, s5, s6, j12, j3];
const threshold = 3999;
const filtering = true;

const idiomLength = parseInt(args[0]);
const level = parseInt(args[1]);
const kanjiSet = kanjiSets[level];
const dicts = [
  'Adverb.utf8.dic',
  'Adnominal.utf8.dic',
  'Noun.utf8.dic',
  'Noun.adjv.utf8.dic',
  'Noun.adverbal.utf8.dic',
  'Noun.verbal.utf8.dic',
  'Verb.utf8.dic',
];
const sexualList = fs.readFileSync('Sexual.txt', 'utf-8').split('\n');
const ignoreList = fs.readFileSync('ignore' + idiomLength + '.lst', 'utf-8').split('\n');

function getIdiomFromIPAdic(line) {
  var p11 = line.indexOf('見出し語 (') + 6;
  var p12 = line.slice(p11).indexOf(')');
  var [idiom, cost] = line.slice(p11, p11+p12).split(' ');
  var p21 = line.indexOf('(読み ') + 4;
  var p22 = line.slice(p21).indexOf(')');
  var yomi = line.slice(p21, p21+p22).split(' ')[0];
  return [idiom, yomi, parseInt(cost)];
}

function filter(idiom) {
  if (idiom.length == 2) {
    if (idiom[0] == idiom[1]) {
      return true;
    }
    if (/[一二三四五六七八九十百千万]/.test(idiom[0])) {  // 一目, 三文
      return true;
    }
  } else if (idiom.length == 3) {
    if (idiom[0] == idiom[1] && idiom[1] == idiom[2]) {
      return true;
    }
    if (/[前後中別率性度時可系用編市区町村郡港橋山岳川谷島寺]/.test(idiom[idiom.length-1])) {
      // どんな語句にも繋がる語尾、固有名詞になる語尾は削除  / TODO: 派駅川
      // 川→神奈川が消えることに注意
      return true;
    }
    if (/[左右東西南北内外者名様等共何的氏来他日歳毎板]/.test(idiom[idiom.length-1])) {
      // 問題としてつまらない (意味に変化がない) 語尾は削除  // TODO: 化上下
      return true;
    }
    if (/[各御元第別他]/.test(idiom[0])) {
      // 問題としてつまらない接頭辞は削除  // TODO: 当
      return true;
    }
    if (/^[一二三四五六七八九十百千万]{3}/.test(idiom)) {
      return true;
    }
    if (/[一二三四五六七八九十百千万何数][話章部節曲人点番回度年月日号円点曲色発歩枚条位級列社丁]/.test(idiom)) {
      return true;
    }
  }
  return false;
}


var idioms = {};
var yomis = {};
dicts.forEach(dict => {
  readEachLineSync('ipadic-2.7.0/' + dict, 'utf-8', (line) => {
    var included = true;
    var [idiom, yomi, cost] = getIdiomFromIPAdic(line);
    var chars = idiom.split('');
    if (idiom.length == idiomLength) {
      for (var i=0; i<chars.length; i++) {
        if (level < 9) {
          if (!kanjiSet.includes(chars[i])) {
            included = false;
          }
        } else {
          if (!/[\u4E00-\u9FFF]/.test(chars[i])) {  // すべての漢字から熟語を生成したいとき
            included = false;
          }
        }
      }
      if (included) {
        var filtered = false;
        if (filtering) {
          filtered = filter(idiom);
          if (filtered) {
            console.log(idiom);
          }
        }
        if (!filtered) {
          if (cost < threshold) {
            if (level == 9) {
              yomis[idiom] = yomi;  // 重複不許可
            }
            idioms[idiom] = true;
          }
        }
      }
    }
  });
});
for (var i=0; i<sexualList.length; i++) {
  if (idioms[sexualList[i]]) {
    console.log(sexualList[i]);
  }
  delete idioms[sexualList[i]];
}
for (var i=0; i<ignoreList.length; i++) {
  if (idioms[ignoreList[i]]) {
    console.log(ignoreList[i]);
  }
  delete idioms[ignoreList[i]];
}

fs.writeFileSync('dist/' + level + '.lst', Object.keys(idioms).join('\n'));
if (level == 9) {
  fs.writeFileSync('dist/yomi.json', JSON.stringify(yomis));
}

