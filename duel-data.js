// مبارزة: picture categories. Each item is [picture, answer, [other accepted answers]].
// kind "flag": picture is an ISO country code (flag-icons). kind "emoji": picture is an emoji (shown as a Twemoji image).
const DUEL_CATS = [
  { id: "flags", name: "أعلام", kind: "flag", prompt: "علم أي دولة؟", items: [
    ["ps", "فلسطين", ["palestine"]], ["jo", "الأردن", ["اردن", "jordan"]], ["lb", "لبنان", ["lebanon"]], ["sy", "سوريا", ["سورية", "syria"]],
    ["eg", "مصر", ["egypt"]], ["sa", "السعودية", ["saudi"]], ["ae", "الإمارات", ["امارات", "uae"]], ["qa", "قطر", ["qatar"]],
    ["kw", "الكويت", ["kuwait"]], ["bh", "البحرين", ["bahrain"]], ["om", "عُمان", ["عمان", "oman"]], ["ye", "اليمن", ["yemen"]],
    ["iq", "العراق", ["iraq"]], ["ma", "المغرب", ["morocco"]], ["dz", "الجزائر", ["algeria"]], ["tn", "تونس", ["tunisia"]],
    ["ly", "ليبيا", ["libya"]], ["sd", "السودان", ["sudan"]], ["tr", "تركيا", ["turkey"]], ["ir", "إيران", ["ايران", "iran"]],
    ["jp", "اليابان", ["japan"]], ["cn", "الصين", ["china"]], ["kr", "كوريا الجنوبية", ["كوريا", "korea"]], ["in", "الهند", ["india"]],
    ["pk", "باكستان", ["pakistan"]], ["br", "البرازيل", ["brazil"]], ["ar", "الأرجنتين", ["ارجنتين", "argentina"]], ["mx", "المكسيك", ["mexico"]],
    ["us", "أمريكا", ["امريكا", "الولايات المتحدة", "usa"]], ["ca", "كندا", ["canada"]], ["gb", "بريطانيا", ["المملكة المتحدة", "انجلترا", "uk"]], ["fr", "فرنسا", ["france"]],
    ["de", "ألمانيا", ["المانيا", "germany"]], ["it", "إيطاليا", ["ايطاليا", "italy"]], ["es", "إسبانيا", ["اسبانيا", "spain"]], ["pt", "البرتغال", ["portugal"]],
    ["nl", "هولندا", ["netherlands"]], ["be", "بلجيكا", ["belgium"]], ["ch", "سويسرا", ["switzerland"]], ["se", "السويد", ["sweden"]],
    ["no", "النرويج", ["norway"]], ["gr", "اليونان", ["greece"]], ["ru", "روسيا", ["russia"]], ["ua", "أوكرانيا", ["اوكرانيا", "ukraine"]],
    ["za", "جنوب أفريقيا", ["جنوب افريقيا", "south africa"]], ["ng", "نيجيريا", ["nigeria"]], ["au", "أستراليا", ["استراليا", "australia"]], ["ie", "أيرلندا", ["ايرلندا", "ireland"]],
    ["cu", "كوبا", ["cuba"]], ["my", "ماليزيا", ["malaysia"]], ["id", "إندونيسيا", ["اندونيسيا", "indonesia"]], ["ca", "كندا", ["canada"]]
  ]},
  { id: "capitals", name: "عواصم", kind: "flag", prompt: "شو عاصمة هالدولة؟", items: [
    ["ps", "القدس", ["jerusalem"]], ["jo", "عمّان", ["عمان", "amman"]], ["lb", "بيروت", ["beirut"]], ["sy", "دمشق", ["الشام", "damascus"]],
    ["eg", "القاهرة", ["cairo"]], ["sa", "الرياض", ["riyadh"]], ["ae", "أبوظبي", ["ابو ظبي", "abu dhabi"]], ["qa", "الدوحة", ["doha"]],
    ["kw", "الكويت", ["kuwait"]], ["iq", "بغداد", ["baghdad"]], ["ma", "الرباط", ["rabat"]], ["dz", "الجزائر", ["algiers"]],
    ["tn", "تونس", ["tunis"]], ["ly", "طرابلس", ["tripoli"]], ["sd", "الخرطوم", ["khartoum"]], ["om", "مسقط", ["muscat"]],
    ["ye", "صنعاء", ["sanaa"]], ["bh", "المنامة", ["manama"]], ["tr", "أنقرة", ["انقرة", "ankara"]], ["ir", "طهران", ["tehran"]],
    ["jp", "طوكيو", ["tokyo"]], ["cn", "بكين", ["بيجين", "beijing"]], ["in", "نيودلهي", ["دلهي", "new delhi"]], ["fr", "باريس", ["paris"]],
    ["de", "برلين", ["berlin"]], ["it", "روما", ["rome"]], ["es", "مدريد", ["madrid"]], ["gb", "لندن", ["london"]],
    ["ru", "موسكو", ["moscow"]], ["us", "واشنطن", ["washington"]], ["ca", "أوتاوا", ["اوتاوا", "ottawa"]], ["br", "برازيليا", ["brasilia"]],
    ["ar", "بوينس آيرس", ["بوينس ايرس", "buenos aires"]], ["au", "كانبرا", ["canberra"]], ["gr", "أثينا", ["اثينا", "athens"]], ["pt", "لشبونة", ["lisbon"]],
    ["nl", "أمستردام", ["امستردام", "amsterdam"]], ["se", "ستوكهولم", ["stockholm"]], ["no", "أوسلو", ["اوسلو", "oslo"]], ["kr", "سيول", ["seoul"]]
  ]},
  { id: "animals", name: "حيوانات", kind: "emoji", prompt: "شو هالحيوان؟", items: [
    ["🦁", "أسد", ["سبع", "lion"]], ["🐯", "نمر", ["tiger"]], ["🐘", "فيل", ["elephant"]], ["🦒", "زرافة", ["giraffe"]],
    ["🦓", "حمار وحشي", ["زيبرا", "zebra"]], ["🐪", "جمل", ["ناقة", "camel"]], ["🐒", "قرد", ["سعدان", "monkey"]], ["🦍", "غوريلا", ["gorilla"]],
    ["🐻", "دب", ["bear"]], ["🐼", "باندا", ["panda"]], ["🐨", "كوالا", ["koala"]], ["🦘", "كنغر", ["كنجارو", "kangaroo"]],
    ["🐺", "ذئب", ["ديب", "wolf"]], ["🦊", "ثعلب", ["تعلب", "fox"]], ["🐰", "أرنب", ["rabbit"]], ["🐢", "سلحفاة", ["زلحفة", "turtle"]],
    ["🐍", "أفعى", ["حية", "ثعبان", "snake"]], ["🐊", "تمساح", ["crocodile"]], ["🦈", "قرش", ["سمكة قرش", "shark"]], ["🐬", "دلفين", ["دولفين", "dolphin"]],
    ["🐳", "حوت", ["whale"]], ["🐙", "أخطبوط", ["octopus"]], ["🦀", "سلطعون", ["سرطان البحر", "كابوريا", "crab"]], ["🦉", "بومة", ["owl"]],
    ["🦅", "نسر", ["عقاب", "eagle"]], ["🦜", "ببغاء", ["ببغا", "parrot"]], ["🐧", "بطريق", ["penguin"]], ["🦩", "فلامنغو", ["نحام", "flamingo"]],
    ["🐓", "ديك", ["rooster"]], ["🐄", "بقرة", ["cow"]], ["🐑", "خروف", ["غنمة", "نعجة", "sheep"]], ["🐐", "ماعز", ["عنزة", "معزة", "goat"]],
    ["🐴", "حصان", ["خيل", "فرس", "horse"]], ["🐱", "قطة", ["بسة", "قط", "cat"]], ["🐶", "كلب", ["dog"]], ["🐭", "فأر", ["فار", "mouse"]],
    ["🦔", "قنفذ", ["قنفد", "hedgehog"]], ["🦇", "خفاش", ["وطواط", "bat"]], ["🐝", "نحلة", ["bee"]], ["🦋", "فراشة", ["butterfly"]],
    ["🐜", "نملة", ["ant"]], ["🦂", "عقرب", ["scorpion"]], ["🐌", "حلزون", ["بزاق", "snail"]], ["🦎", "سحلية", ["حرذون", "lizard"]],
    ["🦛", "فرس النهر", ["hippo"]], ["🦏", "وحيد القرن", ["rhino"]], ["🦌", "غزال", ["أيل", "deer"]]
  ]},
  { id: "fruitveg", name: "فواكه وخضرة", kind: "emoji", prompt: "شو هاد؟", items: [
    ["🍎", "تفاحة", ["تفاح", "apple"]], ["🍐", "إجاص", ["انجاص", "كمثرى", "pear"]], ["🍊", "برتقالة", ["برتقال", "بردقان", "orange"]], ["🍋", "ليمونة", ["ليمون", "lemon"]],
    ["🍌", "موزة", ["موز", "banana"]], ["🍉", "بطيخة", ["بطيخ", "جبس", "watermelon"]], ["🍇", "عنب", ["grapes"]], ["🍓", "فراولة", ["فريز", "strawberry"]],
    ["🍒", "كرز", ["cherry"]], ["🍑", "دراق", ["خوخ", "peach"]], ["🥭", "مانجا", ["مانجو", "منجا", "mango"]], ["🍍", "أناناس", ["اناناس", "pineapple"]],
    ["🥥", "جوز الهند", ["جوز هند", "coconut"]], ["🥝", "كيوي", ["kiwi"]], ["🍅", "بندورة", ["طماطم", "tomato"]], ["🍆", "باذنجان", ["بتنجان", "eggplant"]],
    ["🥑", "أفوكادو", ["افوكادو", "avocado"]], ["🥦", "بروكلي", ["بروكولي", "broccoli"]], ["🥕", "جزر", ["جزرة", "carrot"]], ["🌽", "ذرة", ["درة", "عرنوس", "corn"]],
    ["🌶", "فلفل حار", ["فلفل", "شطة", "chili"]], ["🫑", "فليفلة", ["فلفل حلو", "فلفل اخضر", "pepper"]], ["🥒", "خيار", ["خيارة", "cucumber"]], ["🧄", "ثوم", ["توم", "garlic"]],
    ["🧅", "بصل", ["بصلة", "onion"]], ["🥔", "بطاطا", ["بطاطس", "potato"]], ["🍄", "فطر", ["مشروم", "mushroom"]], ["🫒", "زيتون", ["زيتونة", "olive"]],
    ["🥜", "فول سوداني", ["فستق", "peanut"]], ["🌰", "كستناء", ["chestnut"]], ["🫐", "توت", ["توت ازرق", "blueberry"]], ["🍈", "شمام", ["melon"]]
  ]},
  { id: "food", name: "أكل وشرب", kind: "emoji", prompt: "شو هاد؟", items: [
    ["🍕", "بيتزا", ["pizza"]], ["🍔", "برغر", ["همبرغر", "burger"]], ["🌭", "هوت دوغ", ["هوت دوج", "hot dog"]], ["🍟", "بطاطا مقلية", ["فرنش فرايز", "بطاطا", "fries"]],
    ["🧆", "فلافل", ["طعمية", "falafel"]], ["🥙", "شاورما", ["سندويشة", "شاورمة", "wrap"]], ["🥗", "سلطة", ["سلطه", "salad"]], ["🍝", "معكرونة", ["باستا", "مكرونة", "pasta"]],
    ["🍜", "نودلز", ["شوربة", "noodles"]], ["🍣", "سوشي", ["sushi"]], ["🍤", "جمبري", ["قريدس", "روبيان", "shrimp"]], ["🍩", "دونات", ["donut"]],
    ["🍪", "كوكيز", ["بسكويت", "cookie"]], ["🎂", "كعكة عيد ميلاد", ["كيك", "كعكة", "cake"]], ["🍫", "شوكولاتة", ["شوكولا", "chocolate"]], ["🍭", "مصاصة", ["لولي بوب", "lollipop"]],
    ["🍿", "بوشار", ["فشار", "popcorn"]], ["🍦", "بوظة", ["ايس كريم", "ايسكريم", "ice cream"]], ["☕", "قهوة", ["coffee"]], ["🍵", "شاي", ["تاي", "tea"]],
    ["🧃", "عصير", ["juice"]], ["🥛", "حليب", ["milk"]], ["🍯", "عسل", ["honey"]], ["🥐", "كرواسون", ["croissant"]],
    ["🥖", "باغيت", ["خبز فرنسي", "baguette"]], ["🧀", "جبنة", ["جبن", "cheese"]], ["🥚", "بيضة", ["بيض", "egg"]], ["🍳", "بيض مقلي", ["عجة", "بيض"]],
    ["🥞", "بان كيك", ["فطائر", "pancakes"]], ["🌮", "تاكو", ["taco"]], ["🫓", "خبز", ["خبز عربي", "كماج", "bread"]], ["🍬", "سكاكر", ["سكرة", "حلو", "candy"]]
  ]},
  { id: "sports", name: "رياضات", kind: "emoji", prompt: "شو هالرياضة؟", items: [
    ["⚽", "كرة القدم", ["كرة قدم", "فوتبول", "football"]], ["🏀", "كرة السلة", ["كرة سلة", "باسكيت", "basketball"]], ["🏈", "كرة القدم الأمريكية", ["امريكان فوتبول"]], ["⚾", "بيسبول", ["baseball"]],
    ["🎾", "تنس", ["تنس ارضي", "tennis"]], ["🏐", "كرة الطائرة", ["كرة طائرة", "فوليبول", "volleyball"]], ["🏉", "رغبي", ["رجبي", "rugby"]], ["🎱", "بلياردو", ["سنوكر", "billiards"]],
    ["🏓", "تنس الطاولة", ["بينغ بونغ", "بينج بونج", "ping pong"]], ["🏸", "ريشة طائرة", ["بادمنتون", "badminton"]], ["🥊", "ملاكمة", ["بوكس", "boxing"]], ["🥋", "كاراتيه", ["جودو", "تايكواندو", "فنون قتالية", "karate"]],
    ["⛳", "غولف", ["جولف", "golf"]], ["🏒", "هوكي", ["hockey"]], ["🤿", "غوص", ["diving"]], ["🏹", "رماية", ["قوس وسهم", "archery"]],
    ["⛷", "تزلج", ["تزلج على الثلج", "skiing"]], ["🏄", "ركوب الأمواج", ["سيرف", "surfing"]], ["🏊", "سباحة", ["swimming"]], ["🚴", "دراجات", ["ركوب الدراجة", "cycling"]],
    ["🏇", "فروسية", ["سباق خيل", "ركوب الخيل", "horse racing"]], ["🤺", "مبارزة", ["شيش", "fencing"]], ["🏋", "رفع أثقال", ["رفع اثقال", "حديد", "weightlifting"]], ["🧗", "تسلق", ["climbing"]],
    ["⛸", "تزلج على الجليد", ["تزحلق", "skating"]], ["🛹", "سكيت بورد", ["سكيت", "skateboard"]], ["🎳", "بولينغ", ["بولينج", "bowling"]], ["🏏", "كريكيت", ["cricket"]]
  ]},
  { id: "transport", name: "وسائل نقل", kind: "emoji", prompt: "شو هاد؟", items: [
    ["🚗", "سيارة", ["سياره", "car"]], ["🚕", "تكسي", ["تاكسي", "taxi"]], ["🚌", "باص", ["حافلة", "اتوبيس", "bus"]], ["🚑", "إسعاف", ["اسعاف", "سيارة اسعاف", "ambulance"]],
    ["🚒", "إطفائية", ["اطفائية", "سيارة اطفاء", "fire truck"]], ["🚓", "سيارة شرطة", ["شرطة", "police car"]], ["🚚", "شاحنة", ["تريلا", "كميون", "truck"]], ["🚜", "تراكتور", ["جرار", "tractor"]],
    ["🏍", "موتور", ["دراجة نارية", "موتوسيكل", "motorcycle"]], ["🚲", "بسكليت", ["دراجة", "عجلة", "bicycle"]], ["🛴", "سكوتر", ["scooter"]], ["🚂", "قطار", ["قطر", "train"]],
    ["🚇", "مترو", ["metro"]], ["✈", "طيارة", ["طائرة", "plane"]], ["🚁", "هليكوبتر", ["مروحية", "helicopter"]], ["🚀", "صاروخ", ["rocket"]],
    ["🛸", "صحن طائر", ["ufo"]], ["⛵", "قارب شراعي", ["مركب شراعي", "شراع", "sailboat"]], ["🚢", "سفينة", ["باخرة", "ship"]], ["🛶", "كاياك", ["قارب", "زورق", "canoe"]],
    ["🚡", "تلفريك", ["cable car"]], ["🛺", "توك توك", ["tuk tuk"]], ["🚤", "لنش", ["قارب سريع", "speedboat"]], ["🛻", "بيك أب", ["بيك اب", "بكب", "pickup"]],
    ["🏎", "سيارة سباق", ["فورمولا", "race car"]], ["🚐", "فان", ["ميكروباص", "van"]], ["🪂", "مظلة", ["باراشوت", "parachute"]]
  ]},
  { id: "nature", name: "طبيعة وطقس", kind: "emoji", prompt: "شو هاد؟", items: [
    ["☀", "شمس", ["sun"]], ["🌙", "هلال", ["قمر", "moon"]], ["⭐", "نجمة", ["نجم", "star"]], ["🌈", "قوس قزح", ["قوس المطر", "rainbow"]],
    ["☁", "غيمة", ["غيم", "سحابة", "cloud"]], ["⛈", "عاصفة", ["رعد", "storm"]], ["❄", "ثلج", ["تلج", "ندفة ثلج", "snow"]], ["🌪", "إعصار", ["اعصار", "زوبعة", "tornado"]],
    ["🌊", "موج", ["موجة", "بحر", "wave"]], ["🔥", "نار", ["fire"]], ["🌋", "بركان", ["volcano"]], ["🏔", "جبل", ["جبال", "mountain"]],
    ["🏜", "صحراء", ["desert"]], ["🏝", "جزيرة", ["island"]], ["🌵", "صبّار", ["صبار", "صبر", "cactus"]], ["🌳", "شجرة", ["شجر", "tree"]],
    ["🌴", "نخلة", ["palm"]], ["🍁", "ورقة شجر", ["ورقة", "leaf"]], ["🌻", "عباد الشمس", ["دوار الشمس", "sunflower"]], ["🌹", "وردة", ["ورد", "جوري", "rose"]],
    ["🌷", "توليب", ["زنبق", "tulip"]], ["💧", "نقطة مي", ["نقطة ماء", "مي", "drop"]], ["⚡", "برق", ["lightning"]], ["🌍", "الكرة الأرضية", ["الارض", "كوكب الارض", "earth"]],
    ["🌧", "مطر", ["شتي", "شتا", "rain"]], ["🌕", "بدر", ["قمر", "full moon"]]
  ]},
  { id: "home", name: "أشياء بالبيت", kind: "emoji", prompt: "شو هاد؟", items: [
    ["🛏", "تخت", ["سرير", "bed"]], ["🛋", "كنباية", ["كنبة", "صوفا", "sofa"]], ["🚪", "باب", ["door"]], ["🪑", "كرسي", ["chair"]],
    ["🚿", "دوش", ["دش", "shower"]], ["🛁", "بانيو", ["حوض استحمام", "bathtub"]], ["🧹", "مكنسة", ["مقشة", "broom"]], ["🧺", "سلة", ["سلة غسيل", "basket"]],
    ["🧼", "صابونة", ["صابون", "soap"]], ["🪥", "فرشاية سنان", ["فرشاة اسنان", "toothbrush"]], ["🔑", "مفتاح", ["key"]], ["🕯", "شمعة", ["candle"]],
    ["💡", "لمبة", ["مصباح", "ضو", "bulb"]], ["📺", "تلفزيون", ["تلفاز", "tv"]], ["📻", "راديو", ["مذياع", "radio"]], ["⏰", "منبه", ["ساعة منبه", "alarm clock"]],
    ["🧸", "دبدوب", ["دب", "teddy bear"]], ["🪞", "مراية", ["مرآة", "mirror"]], ["🪟", "شباك", ["نافذة", "window"]], ["🔨", "شاكوش", ["مطرقة", "hammer"]],
    ["✂", "مقص", ["scissors"]], ["📚", "كتب", ["كتاب", "books"]], ["☂", "شمسية", ["مظلة", "umbrella"]], ["🧦", "كلسات", ["جرابات", "جوارب", "socks"]],
    ["👓", "نظارة", ["نظارات", "glasses"]], ["🪴", "نبتة", ["زريعة", "plant"]], ["🔦", "بيل", ["كشاف", "flashlight"]], ["🧲", "مغناطيس", ["magnet"]],
    ["🪣", "سطل", ["دلو", "bucket"]]
  ]}
];
// The flags list has Canada twice; keep each picture once
DUEL_CATS.forEach(c => { const seen = new Set(); c.items = c.items.filter(it => !seen.has(it[0]) && seen.add(it[0])); });

const DUEL_CREDITS = "الأعلام: flag-icons (MIT) · الشعارات: Simple Icons (CC0) · الصور: Twemoji (CC BY 4.0) وويكيميديا كومنز (المصوّر والرخصة تحت كل صورة)";

// Difficulty: items not listed are easy. A round deals easy → medium → hard (shuffled within each level).
const DUEL_LEVELS = {
  flags:     { mid: "ae qa kw iq ma dz tn ye ar mx in kr pt nl ru ch gr au se no ir pk", hard: "bh om ly sd be ua za ng ie cu my id" },
  capitals:  { mid: "ae qa ma tn ru us cn tr gr nl pt ir dz ly", hard: "om ye bh sd in ca br ar au se no kr" },
  animals:   { mid: "🦓 🦍 🐼 🐨 🦘 🐺 🦊 🐢 🐊 🦈 🐬 🐳 🐙 🦉 🦅 🦜 🐧 🐓 🐑 🐐 🐭 🐝 🦋 🐜", hard: "🦀 🦩 🦔 🦇 🦂 🐌 🦎 🦛 🦏 🦌" },
  fruitveg:  { mid: "🍐 🍒 🍑 🍍 🥝 🍆 🌽 🧄 🫒 🥭 🥑 🍄 🥥", hard: "🥦 🌶 🫑 🥜 🌰 🫐 🍈" },
  food:      { mid: "🌭 🥙 🥗 🍝 🍜 🍣 🍩 🍪 🧃 🍯 🥐 🫓 🍭 🍬", hard: "🍤 🥖 🍳 🥞 🌮" },
  sports:    { mid: "⚾ 🏓 🏸 🥋 ⛳ 🚴 🏇 ⛷ 🏄 🎱 🎳", hard: "🏈 🏉 🏒 🤿 🏹 🤺 🏋 🧗 ⛸ 🛹 🏏" },
  transport: { mid: "🚒 🚓 🚚 🚜 🚁 🚀 🚇 🛴 ⛵ 🚐", hard: "🛸 🛶 🚡 🛺 🚤 🛻 🏎 🪂" },
  nature:    { mid: "⛈ 🌊 🌋 🏔 🏜 🏝 🌵 🍁 🌧 🌍", hard: "🌪 🌻 🌷 💧 ⚡ 🌕" },
  home:      { mid: "🛋 🚿 🛁 🧹 🧼 🪥 🕯 💡 📻 ⏰ 🧸 🪞 🪟 🔨 🧦", hard: "🧺 🪴 🔦 🧲 🪣" }
};
// 0 easy, 1 medium, 2 hard
function itemLevel(catId, key) {
  const L = DUEL_LEVELS[catId]; if (!L) return 0;
  if (L.hard.split(" ").includes(key)) return 2;
  if (L.mid.split(" ").includes(key)) return 1;
  return 0;
}

// Photo categories from Wikimedia Commons, looked up on Wikidata by English name at game time.
// kind "wiki": the item's picture is the name to look up; prop P18 = photo of the person, P154 = logo.
// Only freely licensed files live on Commons; the photographer and licence are shown under each picture.
DUEL_CATS.push(
  { id: "footballers", name: "نجوم كرة القدم", kind: "wiki", prop: "P18", prompt: "مين هاللاعب؟", items: [
    ["Mohamed Salah", "محمد صلاح", ["صلاح", "salah"]], ["Lionel Messi", "ميسي", ["ليونيل ميسي", "messi"]], ["Cristiano Ronaldo", "رونالدو", ["كريستيانو", "ronaldo"]],
    ["Neymar", "نيمار", ["neymar"]], ["Kylian Mbappé", "مبابي", ["كيليان مبابي", "mbappe"]], ["Zinedine Zidane", "زيدان", ["زين الدين زيدان", "zidane"]],
    ["Riyad Mahrez", "رياض محرز", ["محرز", "mahrez"]], ["Achraf Hakimi", "أشرف حكيمي", ["حكيمي", "hakimi"]], ["Karim Benzema", "بنزيما", ["كريم بنزيما", "benzema"]],
    ["Erling Haaland", "هالاند", ["هولاند", "haaland"]], ["Luka Modrić", "مودريتش", ["لوكا مودريتش", "modric"]], ["Robert Lewandowski", "ليفاندوفسكي", ["lewandowski"]],
    ["Kevin De Bruyne", "دي بروين", ["كيفين دي بروين", "de bruyne"]], ["Ronaldinho", "رونالدينيو", ["ronaldinho"]], ["Pelé", "بيليه", ["pele"]],
    ["Diego Maradona", "مارادونا", ["maradona"]], ["David Beckham", "بيكهام", ["ديفيد بيكهام", "beckham"]], ["Zlatan Ibrahimović", "زلاتان", ["إبراهيموفيتش", "zlatan"]],
    ["Thierry Henry", "تييري هنري", ["هنري", "henry"]], ["Andrés Iniesta", "إنييستا", ["انيستا", "iniesta"]], ["Sadio Mané", "ساديو ماني", ["ماني", "mane"]],
    ["Yassine Bounou", "ياسين بونو", ["بونو", "bounou"]], ["Hakim Ziyech", "حكيم زياش", ["زياش", "ziyech"]], ["Mesut Özil", "مسعود أوزيل", ["أوزيل", "ozil"]],
    ["Kaká", "كاكا", ["kaka"]], ["Virgil van Dijk", "فان دايك", ["van dijk"]]
  ]},
  { id: "arabstars", name: "مشاهير عرب", kind: "wiki", prop: "P18", prompt: "مين هاد؟", items: [
    ["Fairuz", "فيروز", ["fairuz"]], ["Umm Kulthum", "أم كلثوم", ["ام كلثوم"]], ["Abdel Halim Hafez", "عبد الحليم حافظ", ["عبد الحليم", "العندليب"]],
    ["Amr Diab", "عمرو دياب", ["عمرو دياب", "amr diab"]], ["Nancy Ajram", "نانسي عجرم", ["نانسي"]], ["Haifa Wehbe", "هيفاء وهبي", ["هيفا وهبي", "هيفا"]],
    ["Elissa (singer)", "إليسا", ["اليسا"]], ["Kadim Al Sahir", "كاظم الساهر", ["كاظم"]], ["Mohammed Assaf", "محمد عساف", ["عساف"]],
    ["Adel Emam", "عادل إمام", ["عادل امام"]], ["Omar Sharif", "عمر الشريف", ["عمر شريف"]], ["Mahmoud Darwish", "محمود درويش", ["درويش"]],
    ["Naguib Mahfouz", "نجيب محفوظ", ["محفوظ"]], ["Zaha Hadid", "زها حديد", ["زها"]], ["Rami Malek", "رامي مالك", ["rami malek"]],
    ["Bella Hadid", "بيلا حديد", ["bella hadid"]], ["Gigi Hadid", "جيجي حديد", ["gigi hadid"]], ["Ramy Youssef", "رامي يوسف", ["ramy youssef"]],
    ["Ahmed Zewail", "أحمد زويل", ["زويل"]], ["Edward Said", "إدوارد سعيد", ["ادوارد سعيد"]], ["Wael Kfoury", "وائل كفوري", ["وائل"]],
    ["Ragheb Alama", "راغب علامة", ["راغب"]], ["Majida El Roumi", "ماجدة الرومي", ["ماجدة"]], ["Assala Nasri", "أصالة نصري", ["أصالة", "اصالة"]],
    ["Mohamed Mounir", "محمد منير", ["منير"]], ["Duraid Lahham", "دريد لحام", ["دريد", "غوار"]]
  ]},
  { id: "worldstars", name: "مشاهير عالميين", kind: "wiki", prop: "P18", prompt: "مين هاد؟", items: [
    ["Michael Jackson", "مايكل جاكسون", ["michael jackson"]], ["Beyoncé", "بيونسيه", ["beyonce"]], ["Taylor Swift", "تايلور سويفت", ["taylor swift"]],
    ["Rihanna", "ريهانا", ["rihanna"]], ["Ed Sheeran", "إد شيران", ["ed sheeran"]], ["Adele", "أديل", ["adele"]],
    ["Shakira", "شاكيرا", ["shakira"]], ["Leonardo DiCaprio", "ليوناردو دي كابريو", ["دي كابريو", "dicaprio"]], ["Tom Cruise", "توم كروز", ["tom cruise"]],
    ["Will Smith", "ويل سميث", ["will smith"]], ["Dwayne Johnson", "ذا روك", ["دواين جونسون", "the rock"]], ["Brad Pitt", "براد بيت", ["brad pitt"]],
    ["Jackie Chan", "جاكي شان", ["jackie chan"]], ["Keanu Reeves", "كيانو ريفز", ["keanu reeves"]], ["Oprah Winfrey", "أوبرا وينفري", ["اوبرا", "oprah"]],
    ["Albert Einstein", "أينشتاين", ["اينشتاين", "einstein"]], ["Elon Musk", "إيلون ماسك", ["ماسك", "musk"]], ["Bill Gates", "بيل غيتس", ["بيل جيتس", "bill gates"]],
    ["Steve Jobs", "ستيف جوبز", ["steve jobs"]], ["Nelson Mandela", "نيلسون مانديلا", ["مانديلا", "mandela"]], ["Muhammad Ali", "محمد علي", ["محمد علي كلاي", "كلاي"]],
    ["Usain Bolt", "يوسين بولت", ["بولت", "bolt"]], ["Serena Williams", "سيرينا ويليامز", ["سيرينا", "serena"]], ["Charlie Chaplin", "شارلي شابلن", ["شابلن", "chaplin"]],
    ["Mr. Bean", "مستر بين", ["روان أتكينسون", "rowan atkinson", "mr bean"]], ["Morgan Freeman", "مورغان فريمان", ["morgan freeman"]]
  ]},
  { id: "logos", name: "شعارات", kind: "wiki", prop: "P154", prompt: "شعار مين؟", items: [
    ["Apple Inc.", "آبل", ["ابل", "apple"]], ["Nike, Inc.", "نايكي", ["nike"]], ["Adidas", "أديداس", ["اديداس", "adidas"]],
    ["Coca-Cola", "كوكا كولا", ["كولا", "coca cola"]], ["Pepsi", "بيبسي", ["pepsi"]], ["McDonald's", "ماكدونالدز", ["ماك", "mcdonalds"]],
    ["Starbucks", "ستاربكس", ["starbucks"]], ["YouTube", "يوتيوب", ["youtube"]], ["Instagram", "إنستغرام", ["انستا", "انستغرام", "instagram"]],
    ["WhatsApp", "واتساب", ["واتس", "whatsapp"]], ["Netflix", "نتفليكس", ["netflix"]], ["Amazon (company)", "أمازون", ["امازون", "amazon"]],
    ["Samsung", "سامسونج", ["سامسونغ", "samsung"]], ["Toyota", "تويوتا", ["toyota"]], ["Mercedes-Benz", "مرسيدس", ["mercedes"]],
    ["BMW", "بي إم دبليو", ["بي ام", "bmw"]], ["Volkswagen", "فولكس فاغن", ["فولكس", "volkswagen"]], ["Ferrari", "فيراري", ["ferrari"]],
    ["Shell plc", "شل", ["shell"]], ["IKEA", "إيكيا", ["ايكيا", "ikea"]], ["Lego", "ليغو", ["ليجو", "lego"]],
    ["Spotify", "سبوتيفاي", ["spotify"]], ["Microsoft", "مايكروسوفت", ["microsoft"]], ["Puma (brand)", "بوما", ["puma"]],
    ["KFC", "كنتاكي", ["kfc"]], ["Google", "غوغل", ["جوجل", "google"]], ["Audi", "أودي", ["اودي", "audi"]], ["Olympic Games", "الأولمبياد", ["الالعاب الاولمبية", "اولمبياد", "olympics"]]
  ]}
);
Object.assign(DUEL_LEVELS, {
  footballers: { mid: "Riyad Mahrez|Achraf Hakimi|Karim Benzema|Erling Haaland|Luka Modrić|Robert Lewandowski|Kevin De Bruyne|David Beckham|Zlatan Ibrahimović|Sadio Mané|Yassine Bounou", hard: "Thierry Henry|Andrés Iniesta|Hakim Ziyech|Mesut Özil|Kaká|Virgil van Dijk|Pelé|Diego Maradona" },
  arabstars: { mid: "Elissa (singer)|Kadim Al Sahir|Mohammed Assaf|Adel Emam|Omar Sharif|Mahmoud Darwish|Wael Kfoury|Ragheb Alama|Bella Hadid|Gigi Hadid", hard: "Naguib Mahfouz|Zaha Hadid|Rami Malek|Ramy Youssef|Ahmed Zewail|Edward Said|Majida El Roumi|Assala Nasri|Mohamed Mounir|Duraid Lahham" },
  worldstars: { mid: "Ed Sheeran|Adele|Leonardo DiCaprio|Tom Cruise|Brad Pitt|Keanu Reeves|Oprah Winfrey|Bill Gates|Steve Jobs|Usain Bolt", hard: "Nelson Mandela|Serena Williams|Charlie Chaplin|Morgan Freeman|Dwayne Johnson|Taylor Swift" },
  logos: { mid: "Samsung|Toyota|Mercedes-Benz|BMW|Volkswagen|Ferrari|IKEA|Lego|Spotify|Puma (brand)", hard: "Shell plc|Audi|Olympic Games|KFC|Microsoft" }
});
// Photo categories list names with "|" (names contain spaces); emoji/flag ones with spaces
const _itemLevel = itemLevel;
itemLevel = function (catId, key) {
  const L = DUEL_LEVELS[catId]; if (!L) return 0;
  const sep = L.hard.includes("|") || L.mid.includes("|") ? "|" : " ";
  if (L.hard.split(sep).includes(key)) return 2;
  if (L.mid.split(sep).includes(key)) return 1;
  return 0;
};

// Character categories: pictures from each character's English Wikipedia article, fetched by the TV at game time.
// kind "wikipage": the item's picture is the article title. Nothing is stored in this repo except the titles.
DUEL_CATS.push(
  { id: "oldcartoons", name: "كرتون زمان", kind: "wikipage", prompt: "مين هالشخصية؟", items: [
    ["Captain Tsubasa", "كابتن ماجد", ["ماجد", "تسوباسا"]], ["UFO Robot Grendizer", "غرندايزر", ["جريندايزر", "غريندايزر", "grendizer"]],
    ["Jimmy Kudo", "كونان", ["المحقق كونان", "شينيتشي", "كودو"]], ["Heidi, Girl of the Alps", "هايدي", ["heidi"]],
    ["Future Boy Conan", "عدنان ولينا", ["عدنان", "لينا"]], ["Nobody's Boy: Remi", "ريمي", ["remi"]],
    ["Doraemon (character)", "دورايمون", ["دوريمون", "doraemon"]], ["Maya the Bee", "زينة", ["النحلة زينة", "مايا", "زينة ونحول"]],
    ["Popeye", "باباي", ["بوباي", "popeye"]], ["Tom Cat", "توم", ["توم وجيري", "tom"]], ["Jerry Mouse", "جيري", ["توم وجيري", "jerry"]],
    ["The Smurfs", "السنافر", ["سنافر", "سنفور", "smurfs"]], ["Hamtaro", "هامتارو", ["hamtaro"]], ["Mowgli", "ماوكلي", ["موغلي", "mowgli"]],
    ["Pinocchio", "بينوكيو", ["pinocchio"]], ["Alice (Alice's Adventures in Wonderland)", "أليس", ["اليس", "أليس في بلاد العجائب", "alice"]]
  ]},
  { id: "worldcartoons", name: "كرتون عالمي", kind: "wikipage", prompt: "مين هالشخصية؟", items: [
    ["Mickey Mouse", "ميكي ماوس", ["ميكي", "mickey"]], ["SpongeBob SquarePants (character)", "سبونج بوب", ["سبونج بوب", "spongebob"]],
    ["Bugs Bunny", "باغز باني", ["بقز باني", "bugs bunny"]], ["Homer Simpson", "هومر سيمبسون", ["هومر", "homer"]], ["Bart Simpson", "بارت سيمبسون", ["بارت", "bart"]],
    ["Scooby-Doo (character)", "سكوبي دو", ["سكوبي", "scooby"]], ["Shrek (character)", "شريك", ["شريك", "shrek"]], ["Elsa (Frozen)", "إلسا", ["السا", "elsa"]],
    ["Buzz Lightyear", "باز", ["باز لايتيير", "buzz"]], ["Sheriff Woody", "وودي", ["woody"]], ["Simba", "سيمبا", ["simba"]],
    ["Winnie-the-Pooh", "ويني الدبدوب", ["ويني", "بو", "pooh"]], ["Garfield (character)", "غارفيلد", ["جارفيلد", "garfield"]],
    ["Donald Duck", "دونالد داك", ["البطوط", "بطوط", "donald"]], ["Goofy", "غوفي", ["بندق", "goofy"]], ["Olaf (Frozen)", "أولاف", ["اولاف", "olaf"]],
    ["Stitch (Lilo & Stitch)", "ستيتش", ["stitch"]], ["Minions (Despicable Me)", "المينيونز", ["مينيونز", "minions"]], ["Aladdin (Disney character)", "علاء الدين", ["علاء الدين", "aladdin"]],
    ["Peppa Pig", "بيبا", ["بيبا بيغ", "peppa"]]
  ]},
  { id: "anime", name: "أنمي", kind: "wikipage", prompt: "مين هالشخصية؟", items: [
    ["Pikachu", "بيكاتشو", ["pikachu"]], ["Tanjiro Kamado", "تانجيرو", ["tanjiro"]], ["Goku", "غوكو", ["جوكو", "goku"]], ["Naruto Uzumaki", "ناروتو", ["naruto"]],
    ["Monkey D. Luffy", "لوفي", ["luffy"]], ["Ash Ketchum", "آش", ["اش", "ساتوشي", "ash"]], ["Sailor Moon (character)", "سيلر مون", ["sailor moon"]],
    ["Astro Boy (character)", "أسترو بوي", ["استرو", "astro boy"]], ["Hello Kitty", "هالو كيتي", ["hello kitty"]], ["Light Yagami", "لايت ياغامي", ["لايت", "light"]],
    ["Eren Yeager", "إيرين", ["ايرين", "eren"]], ["Vegeta", "فيجيتا", ["vegeta"]], ["Mewtwo", "ميوتو", ["mewtwo"]],
    ["Edward Elric", "إدوارد إلريك", ["ادوارد", "edward"]], ["Totoro", "توتورو", ["totoro"]]
  ]},
  { id: "heroes", name: "أبطال وشخصيات أفلام", kind: "wikipage", prompt: "مين هالشخصية؟", items: [
    ["Spider-Man", "سبايدرمان", ["الرجل العنكبوت", "spiderman"]], ["Batman", "باتمان", ["الرجل الوطواط", "batman"]], ["Superman", "سوبرمان", ["superman"]],
    ["Iron Man", "آيرون مان", ["ايرون مان", "الرجل الحديدي", "iron man"]], ["Captain America", "كابتن أمريكا", ["كابتن امريكا", "captain america"]],
    ["Hulk", "هالك", ["hulk"]], ["Wonder Woman", "وندر وومان", ["المرأة الخارقة", "wonder woman"]], ["Joker (character)", "الجوكر", ["جوكر", "joker"]],
    ["Harry Potter (character)", "هاري بوتر", ["هاري", "harry potter"]], ["Hermione Granger", "هيرميون", ["هرمايني", "hermione"]],
    ["Darth Vader", "دارث فيدر", ["darth vader"]], ["Yoda", "يودا", ["yoda"]], ["Jack Sparrow", "جاك سبارو", ["jack sparrow"]],
    ["Gandalf", "غاندالف", ["جاندالف", "gandalf"]], ["Thanos", "ثانوس", ["thanos"]], ["Black Panther (character)", "بلاك بانثر", ["النمر الأسود", "black panther"]],
    ["Wolverine (character)", "وولفرين", ["wolverine"]], ["Mario", "ماريو", ["mario"]], ["Sonic the Hedgehog (character)", "سونيك", ["sonic"]],
    ["Lara Croft", "لارا كروفت", ["lara croft"]]
  ]}
);
Object.assign(DUEL_LEVELS, {
  oldcartoons:   { mid: "Heidi, Girl of the Alps|Nobody's Boy: Remi|Doraemon (character)|Maya the Bee|The Smurfs|Popeye", hard: "Future Boy Conan|Hamtaro|Mowgli|Alice (Alice's Adventures in Wonderland)" },
  worldcartoons: { mid: "Scooby-Doo (character)|Buzz Lightyear|Sheriff Woody|Garfield (character)|Goofy|Olaf (Frozen)|Stitch (Lilo & Stitch)", hard: "Winnie-the-Pooh|Aladdin (Disney character)|Peppa Pig|Minions (Despicable Me)" },
  anime:         { mid: "Ash Ketchum|Sailor Moon (character)|Hello Kitty|Vegeta|Mewtwo", hard: "Astro Boy (character)|Light Yagami|Eren Yeager|Edward Elric|Totoro|Tanjiro Kamado" },
  heroes:        { mid: "Captain America|Wonder Woman|Joker (character)|Hermione Granger|Darth Vader|Yoda|Jack Sparrow|Thanos", hard: "Gandalf|Black Panther (character)|Wolverine (character)|Lara Croft" }
});

// More photo categories (titles only; pictures load from Wikipedia / Wikimedia Commons at game time)
DUEL_CATS.push(
  { id: "maps", name: "حزّر الدولة من الخريطة", kind: "wiki", prop: "P242", prompt: "شو هالدولة؟", items: [
    ["Italy", "إيطاليا", ["ايطاليا", "italy"]], ["Chile", "تشيلي", ["chile"]], ["Japan", "اليابان", ["japan"]], ["Egypt", "مصر", ["egypt"]],
    ["Saudi Arabia", "السعودية", ["saudi"]], ["Brazil", "البرازيل", ["brazil"]], ["India", "الهند", ["india"]], ["Australia", "أستراليا", ["استراليا", "australia"]],
    ["Canada", "كندا", ["canada"]], ["Mexico", "المكسيك", ["mexico"]], ["France", "فرنسا", ["france"]], ["Spain", "إسبانيا", ["اسبانيا", "spain"]],
    ["Turkey", "تركيا", ["turkey"]], ["United Kingdom", "بريطانيا", ["المملكة المتحدة", "uk"]], ["Norway", "النرويج", ["norway"]], ["Morocco", "المغرب", ["morocco"]],
    ["Libya", "ليبيا", ["libya"]], ["Somalia", "الصومال", ["somalia"]], ["Madagascar", "مدغشقر", ["madagascar"]], ["Iceland", "آيسلندا", ["ايسلندا", "iceland"]],
    ["New Zealand", "نيوزيلندا", ["new zealand"]], ["Indonesia", "إندونيسيا", ["اندونيسيا", "indonesia"]], ["Argentina", "الأرجنتين", ["ارجنتين", "argentina"]], ["South Africa", "جنوب أفريقيا", ["جنوب افريقيا", "south africa"]],
    ["Greece", "اليونان", ["greece"]], ["Sudan", "السودان", ["sudan"]], ["Iraq", "العراق", ["iraq"]], ["Yemen", "اليمن", ["yemen"]],
    ["Oman", "عُمان", ["عمان", "oman"]], ["Mongolia", "منغوليا", ["mongolia"]]
  ]},
  { id: "landmarks", name: "معالم العالم", kind: "wikipage", prompt: "شو هالمَعلم؟", items: [
    ["Eiffel Tower", "برج إيفل", ["ايفل", "برج ايفل"]], ["Burj Khalifa", "برج خليفة", ["خليفة"]], ["Taj Mahal", "تاج محل", ["taj mahal"]], ["Colosseum", "الكولوسيوم", ["كولوسيوم", "المدرج الروماني"]],
    ["Petra", "البتراء", ["بترا", "petra"]], ["Great Pyramid of Giza", "الأهرامات", ["الاهرامات", "الهرم", "اهرامات الجيزة"]], ["Dome of the Rock", "قبة الصخرة", ["قبة الصخرة المشرفة"]], ["Statue of Liberty", "تمثال الحرية", ["الحرية"]],
    ["Big Ben", "بيغ بن", ["بيج بن", "big ben"]], ["Great Wall of China", "سور الصين العظيم", ["سور الصين"]], ["Sydney Opera House", "دار أوبرا سيدني", ["اوبرا سيدني"]], ["Christ the Redeemer (statue)", "تمثال المسيح الفادي", ["المسيح الفادي", "ريو"]],
    ["Machu Picchu", "ماتشو بيتشو", ["machu picchu"]], ["Leaning Tower of Pisa", "برج بيزا المائل", ["برج بيزا", "بيزا"]], ["Hagia Sophia", "آيا صوفيا", ["ايا صوفيا"]], ["Alhambra", "قصر الحمراء", ["الحمراء", "alhambra"]],
    ["Sagrada Família", "ساغرادا فاميليا", ["ساجرادا فاميليا", "sagrada familia"]], ["Stonehenge", "ستونهنج", ["stonehenge"]], ["Mount Rushmore", "جبل راشمور", ["راشمور"]], ["Golden Gate Bridge", "جسر البوابة الذهبية", ["جولدن جيت", "golden gate"]],
    ["Tower Bridge", "جسر البرج", ["تاور بريدج", "tower bridge"]], ["Neuschwanstein Castle", "قلعة نويشفانشتاين", ["نويشفانشتاين"]], ["Angkor Wat", "أنغكور وات", ["انغكور وات", "angkor"]], ["Chichen Itza", "تشيتشن إيتزا", ["تشيتشن ايتزا"]],
    ["Moai", "تماثيل جزيرة الفصح", ["جزيرة الفصح", "موآي", "moai"]], ["Saint Basil's Cathedral", "كاتدرائية القديس باسيل", ["القديس باسيل"]], ["Great Sphinx of Giza", "أبو الهول", ["ابو الهول", "sphinx"]], ["Al-Aqsa Mosque", "المسجد الأقصى", ["الاقصى", "المسجد الاقصى"]],
    ["Atomium", "أتوميوم", ["اتوميوم", "atomium"]], ["Petronas Towers", "برجا بتروناس", ["بتروناس", "petronas"]]
  ]},
  { id: "palcities", name: "مدن فلسطين", kind: "wikipage", prompt: "شو هالمدينة؟", items: [
    ["Jerusalem", "القدس", ["قدس"]], ["Nablus", "نابلس", []], ["Hebron", "الخليل", ["خليل"]], ["Bethlehem", "بيت لحم", []],
    ["Ramallah", "رام الله", ["رام الله"]], ["Jenin", "جنين", []], ["Jericho", "أريحا", ["اريحا"]], ["Gaza City", "غزة", ["غزه"]],
    ["Haifa", "حيفا", []], ["Jaffa", "يافا", []], ["Acre, Israel", "عكا", []], ["Nazareth", "الناصرة", ["ناصرة"]],
    ["Tulkarm", "طولكرم", []], ["Qalqilya", "قلقيلية", []], ["Safed", "صفد", []], ["Tiberias", "طبريا", []],
    ["Lod", "اللد", ["لد"]], ["Ramla", "الرملة", ["رملة"]], ["Beersheba", "بئر السبع", ["بير السبع"]], ["Khan Yunis", "خان يونس", []]
  ]},
  { id: "ourdishes", name: "أكلات من عنّا", kind: "wikipage", prompt: "شو هالأكلة؟", items: [
    ["Maqluba", "مقلوبة", []], ["Musakhan", "مسخن", []], ["Knafeh", "كنافة", ["كنافه"]], ["Mansaf", "منسف", []],
    ["Falafel", "فلافل", ["طعمية"]], ["Hummus", "حمص", ["حمص بطحينة"]], ["Shakshouka", "شكشوكة", []], ["Kibbeh", "كبة", ["كبه"]],
    ["Mujaddara", "مجدرة", ["مجدّرة"]], ["Fattoush", "فتوش", []], ["Tabbouleh", "تبولة", []], ["Baklava", "بقلاوة", []],
    ["Qatayef", "قطايف", []], ["Ful medames", "فول مدمس", ["فول"]], ["Shawarma", "شاورما", []], ["Manakish", "مناقيش", ["منقوشة", "منقوشة زعتر"]],
    ["Mulukhiyah", "ملوخية", []], ["Kofta", "كفتة", []], ["Fatteh", "فتة", ["فته"]], ["Maamoul", "معمول", []],
    ["Mahshi", "محشي", ["كوسا محشي", "ورق عنب"]], ["Sfiha", "صفيحة", ["صفيحه", "لحم بعجين"]]
  ]},
  { id: "instruments", name: "آلات موسيقية", kind: "wikipage", prompt: "شو هالآلة؟", items: [
    ["Oud", "عود", []], ["Qanun (instrument)", "قانون", []], ["Goblet drum", "دربكة", ["طبلة", "دربوكة"]], ["Ney", "ناي", []],
    ["Riq", "رق", ["دف"]], ["Buzuq", "بزق", []], ["Rebab", "ربابة", ["رباب"]], ["Violin", "كمان", ["كمنجة"]],
    ["Accordion", "أكورديون", ["اكورديون"]], ["Harp", "هارب", ["قيثارة"]], ["Bagpipes", "قربة", ["مزمار القربة", "bagpipes"]], ["Sitar", "سيتار", []],
    ["Didgeridoo", "ديدجيريدو", []], ["Saxophone", "ساكسفون", ["ساكس"]], ["Trumpet", "ترومبيت", ["بوق"]], ["Xylophone", "إكسيليفون", ["اكسيليفون", "زيلوفون"]],
    ["Banjo", "بانجو", []], ["Cello", "تشيلو", []], ["Tabla", "طبلة هندية", ["تبلا"]], ["Mijwiz", "مجوز", ["مجوز"]], ["Piano", "بيانو", []], ["Guitar", "غيتار", ["جيتار", "قيتار"]]
  ]},
  { id: "oddanimals", name: "حيوانات غريبة", kind: "wikipage", prompt: "شو هالحيوان؟", items: [
    ["Axolotl", "أكسولوتل", ["اكسولوتل", "سمندل مكسيكي"]], ["Pangolin", "بنغولين", ["آكل النمل الحرشفي", "بانجولين"]], ["Aye-aye", "آي آي", ["اي اي", "aye aye"]], ["Okapi", "أوكابي", ["اوكابي"]],
    ["Narwhal", "نروال", ["كركدن البحر", "narwhal"]], ["Blobfish", "سمكة البلوب", ["بلوب فيش", "blobfish"]], ["Tarsier", "ترسير", ["تارسير"]], ["Shoebill", "أبو مركوب", ["ابو مركوب"]],
    ["Fennec fox", "فنك", ["ثعلب الفنك", "فنيك"]], ["Capybara", "كابيبارا", []], ["Platypus", "خلد الماء", ["بلاتيبوس", "منقار البط"]], ["Star-nosed mole", "الخلد نجمي الأنف", ["خلد نجمي"]],
    ["Tapir", "تابير", ["تابير"]], ["Quokka", "كوكا", ["quokka"]], ["Sloth", "كسلان", ["حيوان الكسلان"]], ["Mantis shrimp", "جمبري السرعوف", ["روبيان السرعوف"]],
    ["Komodo dragon", "تنين كومودو", ["كومودو"]], ["Saiga antelope", "ظبي السايغا", ["سايغا"]], ["Proboscis monkey", "القرد الخرطومي", ["قرد خرطومي", "قرد الانف"]], ["Red panda", "الباندا الحمراء", ["باندا حمراء"]],
    ["Chameleon", "حرباء", ["حربا"]], ["Pufferfish", "سمكة منتفخة", ["سمكة البالون", "سمكة النفاخ"]]
  ]},
  { id: "cars", name: "سيارات من الشارع", kind: "wikipage", prompt: "شو هالسيارة؟", items: [
    ["Volkswagen Beetle", "فولكس فاغن بيتل", ["خنفسة", "فولكس", "بيتل"]], ["Mini", "ميني", ["ميني كوبر"]], ["Ford Mustang", "موستانغ", ["موستنج", "mustang"]], ["Toyota Land Cruiser", "لاند كروزر", ["لاندكروزر", "جكسار"]],
    ["Humvee", "همر", ["هامر", "hummer"]], ["Mercedes-Benz G-Class", "جي كلاس", ["مرسيدس جي", "جي كلاس"]], ["Lamborghini Countach", "لامبورغيني", ["لامبورجيني", "كونتاش"]], ["DeLorean DMC-12", "ديلوريان", ["delorean"]],
    ["Fiat 500", "فيات 500", ["فيات"]], ["Tesla Model S", "تيسلا", ["تسلا", "tesla"]], ["Range Rover", "رينج روفر", ["رنج"]], ["Nissan Patrol", "باترول", ["نيسان باترول"]],
    ["Toyota Hilux", "هايلكس", ["هيلوكس", "بكب تويوتا"]], ["Mercedes-Benz W123", "مرسيدس", ["مرسيدس 230", "مرسيدس تكسي"]], ["Peugeot 404", "بيجو 404", ["بيجو"]], ["Volkswagen Type 2", "فولكس باص", ["فان فولكس", "باص فولكس"]],
    ["Toyota Corolla", "كورولا", ["تويوتا كورولا"]]
  ]},
  { id: "paintings", name: "لوحات مشهورة", kind: "wikipage", prompt: "شو اسم اللوحة أو مين رسمها؟", items: [
    ["Mona Lisa", "الموناليزا", ["موناليزا", "دافنشي", "ليوناردو"]], ["The Starry Night", "ليلة النجوم", ["الليلة المرصعة بالنجوم", "فان غوخ", "فان جوخ"]], ["The Scream", "الصرخة", ["مونك"]],
    ["Girl with a Pearl Earring", "الفتاة ذات القرط اللؤلؤي", ["الفتاة ذات القرط", "فيرمير"]], ["The Last Supper (Leonardo)", "العشاء الأخير", ["العشاء الاخير", "دافنشي"]], ["The Birth of Venus", "مولد فينوس", ["ولادة فينوس", "بوتيتشيلي"]],
    ["Guernica (Picasso)", "غيرنيكا", ["جيرنيكا", "بيكاسو"]], ["The Persistence of Memory", "إصرار الذاكرة", ["الساعات الذائبة", "دالي"]], ["The Kiss (Klimt)", "القبلة", ["كليمت"]],
    ["American Gothic", "القوطية الأمريكية", ["القوطية الامريكية", "غرانت وود"]], ["The Great Wave off Kanagawa", "الموجة العظيمة", ["موجة كاناغاوا", "هوكوساي"]], ["The Creation of Adam", "خلق آدم", ["خلق ادم", "مايكل أنجلو", "مايكل انجلو"]],
    ["Las Meninas", "وصيفات الشرف", ["لاس مينيناس", "فيلاسكيز"]], ["The Night Watch", "دورية الليل", ["حراسة الليل", "رامبرانت"]], ["Sunflowers (Van Gogh series)", "عباد الشمس", ["دوار الشمس", "فان غوخ", "فان جوخ"]],
    ["Impression, Sunrise", "انطباع شروق الشمس", ["انطباع", "مونيه", "مونه"]]
  ]},
  { id: "dress", name: "أزياء تقليدية", kind: "wikipage", prompt: "شو هاللبس؟", items: [
    ["Keffiyeh", "كوفية", ["حطة", "شماغ", "حطة وعقال"]], ["Thawb", "ثوب", ["دشداشة", "ثوب رجالي"]], ["Kimono", "كيمونو", []], ["Sari", "ساري", []],
    ["Kilt", "كيلت", ["تنورة اسكتلندية"]], ["Dirndl", "دريندل", []], ["Hanbok", "هانبوك", []], ["Sombrero", "سومبريرو", []],
    ["Fez", "طربوش", ["طربوش"]], ["Turban", "عمامة", ["عمة"]], ["Abaya", "عباءة", ["عباية"]], ["Poncho", "بونشو", []],
    ["Lederhosen", "ليدرهوزن", []], ["Qipao", "تشيباو", ["شيونغسام"]], ["Palestinian costumes", "ثوب فلسطيني مطرز", ["ثوب مطرز", "تطريز", "ثوب فلاحي"]], ["Kaftan", "قفطان", []],
    ["Burnous", "برنس", ["برنوس"]]
  ]}
);
Object.assign(DUEL_LEVELS, {
  maps:        { mid: "Mexico|Spain|Turkey|United Kingdom|Norway|Morocco|Libya|Somalia|New Zealand|Greece|Argentina", hard: "Madagascar|Iceland|Indonesia|South Africa|Sudan|Iraq|Yemen|Oman|Mongolia|Chile" },
  landmarks:   { mid: "Sydney Opera House|Christ the Redeemer (statue)|Machu Picchu|Hagia Sophia|Alhambra|Golden Gate Bridge|Tower Bridge|Petronas Towers|Moai", hard: "Sagrada Família|Stonehenge|Mount Rushmore|Neuschwanstein Castle|Angkor Wat|Chichen Itza|Saint Basil's Cathedral|Atomium" },
  palcities:   { mid: "Hebron|Ramallah|Jenin|Jericho|Acre, Israel|Nazareth", hard: "Tulkarm|Qalqilya|Safed|Tiberias|Lod|Ramla|Beersheba|Khan Yunis" },
  ourdishes:   { mid: "Shakshouka|Kibbeh|Mujaddara|Fattoush|Qatayef|Ful medames|Manakish|Mulukhiyah|Kofta", hard: "Fatteh|Maamoul|Mahshi|Sfiha|Musakhan" },
  instruments: { mid: "Qanun (instrument)|Ney|Riq|Accordion|Harp|Cello|Xylophone", hard: "Buzuq|Rebab|Bagpipes|Sitar|Didgeridoo|Banjo|Tabla|Mijwiz" },
  oddanimals:  { mid: "Axolotl|Narwhal|Fennec fox|Pangolin|Okapi|Tapir|Quokka|Blobfish", hard: "Aye-aye|Tarsier|Shoebill|Star-nosed mole|Mantis shrimp|Saiga antelope|Proboscis monkey" },
  cars:        { mid: "Mercedes-Benz G-Class|Lamborghini Countach|Range Rover|Nissan Patrol|Toyota Hilux|Fiat 500|Toyota Corolla", hard: "DeLorean DMC-12|Mercedes-Benz W123|Peugeot 404|Volkswagen Type 2" },
  paintings:   { mid: "Girl with a Pearl Earring|The Last Supper (Leonardo)|The Birth of Venus|Guernica (Picasso)|The Persistence of Memory|The Creation of Adam", hard: "The Kiss (Klimt)|American Gothic|The Great Wave off Kanagawa|Las Meninas|The Night Watch|Impression, Sunrise|Sunflowers (Van Gogh series)" },
  dress:       { mid: "Kilt|Sari|Sombrero|Fez|Turban|Abaya|Poncho|Kaftan", hard: "Dirndl|Hanbok|Lederhosen|Qipao|Burnous|Palestinian costumes" }
});

// ======================================================================
// Overhaul: specific categories, themes, and cleaner photos.
// kind "item": an English Wikipedia title → its Wikidata item → photo (P18), logo (P154) or map (P242) on Commons.
// kind "wikipage" stays only for fictional characters (lead picture of their Wikipedia article).
// ======================================================================
(function () {
  // Broad people categories are replaced by specific ones below
  ["arabstars", "worldstars", "footballers", "logos"].forEach(id => { const i = DUEL_CATS.findIndex(c => c.id === id); if (i >= 0) DUEL_CATS.splice(i, 1); });
  // Non-character photo categories switch to curated Wikidata photos
  DUEL_CATS.forEach(c => {
    if (c.kind === "wiki") { c.kind = "item"; }
    if (c.kind === "wikipage" && !["oldcartoons", "worldcartoons", "anime", "heroes"].includes(c.id)) { c.kind = "item"; c.prop = "P18"; }
  });
  const tag = (id, mid, hard) => { DUEL_LEVELS[id] = { mid: mid.join("|"), hard: hard.join("|") }; };
  const people = (id, name, prompt, rows, mid, hard) => { DUEL_CATS.push({ id, name, kind: "item", prop: "P18", prompt, items: rows }); tag(id, mid, hard); };

  people("egyptcinema", "نجوم السينما المصرية", "مين هالنجم؟", [
    ["Adel Emam", "عادل إمام", ["عادل امام", "الزعيم"]], ["Omar Sharif", "عمر الشريف", ["عمر شريف"]], ["Ahmed Zaki", "أحمد زكي", ["احمد زكي"]],
    ["Faten Hamama", "فاتن حمامة", ["فاتن"]], ["Soad Hosny", "سعاد حسني", ["سعاد"]], ["Ahmed Helmy", "أحمد حلمي", ["احمد حلمي"]],
    ["Mohamed Henedi", "محمد هنيدي", ["هنيدي"]], ["Karim Abdel Aziz", "كريم عبد العزيز", ["كريم"]], ["Mona Zaki", "منى زكي", ["منى"]],
    ["Yousra", "يسرا", []], ["Nour El-Sherif", "نور الشريف", []], ["Mahmoud Abdel Aziz", "محمود عبد العزيز", []],
    ["Hend Sabry", "هند صبري", ["هند"]], ["Ahmed Ezz (actor)", "أحمد عز", ["احمد عز"]], ["Mohamed Ramadan (actor)", "محمد رمضان", ["رمضان"]],
    ["Ismail Yassine", "إسماعيل ياسين", ["اسماعيل ياسين"]], ["Rushdy Abaza", "رشدي أباظة", ["رشدي اباظة"]], ["Yehia El-Fakharany", "يحيى الفخراني", ["الفخراني"]]
  ], ["Ahmed Helmy", "Mohamed Henedi", "Karim Abdel Aziz", "Mona Zaki", "Yousra", "Hend Sabry", "Ahmed Ezz (actor)", "Mohamed Ramadan (actor)"],
     ["Nour El-Sherif", "Mahmoud Abdel Aziz", "Ismail Yassine", "Rushdy Abaza", "Yehia El-Fakharany", "Faten Hamama"]);

  people("syriandrama", "نجوم الدراما السورية", "مين هالنجم؟", [
    ["Duraid Lahham", "دريد لحام", ["دريد", "غوار"]], ["Bassem Yakhour", "باسم ياخور", ["ياخور"]], ["Taim Hasan", "تيم حسن", ["تيم"]],
    ["Kosai Khauli", "قصي خولي", ["قصي"]], ["Abed Fahd", "عابد فهد", ["عابد"]], ["Jamal Suliman", "جمال سليمان", ["جمال"]],
    ["Sulaf Fawakherji", "سلاف فواخرجي", ["سلاف"]], ["Amal Arafa", "أمل عرفة", ["امل عرفة"]], ["Kinda Alloush", "كندة علوش", ["كندة"]],
    ["Mona Wassef", "منى واصف", ["منى واصف"]], ["Ayman Zeidan", "أيمن زيدان", ["ايمن زيدان"]], ["Bassam Kousa", "بسام كوسا", ["بسام"]],
    ["Ghassan Massoud", "غسان مسعود", ["غسان"]], ["Nihad Qal'i", "نهاد قلعي", ["حسني البورظان"]], ["Yasser Al-Azma", "ياسر العظمة", ["مرايا"]]
  ], ["Kosai Khauli", "Abed Fahd", "Jamal Suliman", "Sulaf Fawakherji", "Amal Arafa", "Kinda Alloush"],
     ["Mona Wassef", "Ayman Zeidan", "Bassam Kousa", "Ghassan Massoud", "Nihad Qal'i", "Yasser Al-Azma"]);

  people("lebsingers", "مطربين لبنانيين", "مين هالمطرب؟", [
    ["Fairuz", "فيروز", []], ["Wadih El Safi", "وديع الصافي", ["وديع"]], ["Sabah (singer)", "صباح", ["الشحرورة"]],
    ["Majida El Roumi", "ماجدة الرومي", ["ماجدة"]], ["Nancy Ajram", "نانسي عجرم", ["نانسي"]], ["Haifa Wehbe", "هيفاء وهبي", ["هيفا"]],
    ["Elissa (singer)", "إليسا", ["اليسا"]], ["Ragheb Alama", "راغب علامة", ["راغب"]], ["Wael Kfoury", "وائل كفوري", ["وائل"]],
    ["Assi El Hallani", "عاصي الحلاني", ["عاصي"]], ["Melhem Barakat", "ملحم بركات", ["ملحم"]], ["Marwan Khoury", "مروان خوري", ["مروان"]],
    ["Myriam Fares", "ميريام فارس", ["ميريام"]], ["Najwa Karam", "نجوى كرم", ["نجوى"]], ["Nawal Al Zoghbi", "نوال الزغبي", ["نوال"]],
    ["Carole Samaha", "كارول سماحة", ["كارول"]], ["Ziad Rahbani", "زياد الرحباني", ["زياد"]], ["Marcel Khalife", "مارسيل خليفة", ["مارسيل"]]
  ], ["Wadih El Safi", "Sabah (singer)", "Majida El Roumi", "Ragheb Alama", "Wael Kfoury", "Najwa Karam"],
     ["Assi El Hallani", "Melhem Barakat", "Marwan Khoury", "Nawal Al Zoghbi", "Carole Samaha", "Ziad Rahbani", "Marcel Khalife"]);

  people("gulfstars", "نجوم الخليج", "مين هالنجم؟", [
    ["Mohammed Abdu", "محمد عبده", ["فنان العرب"]], ["Abdul Majeed Abdullah", "عبد المجيد عبد الله", ["عبدالمجيد"]], ["Rashed Al Majed", "راشد الماجد", ["راشد"]],
    ["Nabeel Shuail", "نبيل شعيل", ["نبيل"]], ["Hussain Al Jassmi", "حسين الجسمي", ["الجسمي"]], ["Ahlam (singer)", "أحلام", ["احلام"]],
    ["Balqees Fathi", "بلقيس", ["بلقيس فتحي"]], ["Abdulhussain Abdulredha", "عبد الحسين عبد الرضا", ["عبدالحسين"]], ["Nasser Al-Qasabi", "ناصر القصبي", ["القصبي"]],
    ["Hayat Al-Fahad", "حياة الفهد", ["حياة"]], ["Souad Abdullah", "سعاد عبد الله", ["سعاد عبدالله"]], ["Talal Maddah", "طلال مداح", ["طلال"]],
    ["Abdallah Al Rowaished", "عبدالله الرويشد", ["الرويشد"]], ["Aseel Abu Bakr", "أصيل أبو بكر", ["اصيل"]], ["Majid Al Mohandis", "ماجد المهندس", ["المهندس"]]
  ], ["Nabeel Shuail", "Hussain Al Jassmi", "Ahlam (singer)", "Balqees Fathi", "Majid Al Mohandis"],
     ["Abdulhussain Abdulredha", "Nasser Al-Qasabi", "Hayat Al-Fahad", "Souad Abdullah", "Talal Maddah", "Abdallah Al Rowaished", "Aseel Abu Bakr"]);

  people("palart", "فن وثقافة فلسطينية", "مين هاد؟", [
    ["Mohammed Assaf", "محمد عساف", ["عساف"]], ["Mahmoud Darwish", "محمود درويش", ["درويش"]], ["Ghassan Kanafani", "غسان كنفاني", ["كنفاني"]],
    ["Edward Said", "إدوارد سعيد", ["ادوارد سعيد"]], ["Hiam Abbass", "هيام عباس", ["هيام"]], ["Saleh Bakri", "صالح بكري", ["صالح"]],
    ["Mohammad Bakri", "محمد بكري", ["بكري"]], ["Elia Suleiman", "إيليا سليمان", ["ايليا"]], ["Hany Abu-Assad", "هاني أبو أسعد", ["ابو اسعد"]],
    ["Reem Banna", "ريم بنا", ["ريم"]], ["Mona Hatoum", "منى حاطوم", ["حاطوم"]], ["Bella Hadid", "بيلا حديد", ["بيلا"]],
    ["Gigi Hadid", "جيجي حديد", ["جيجي"]], ["Fadwa Tuqan", "فدوى طوقان", ["فدوى"]], ["Samih al-Qasim", "سميح القاسم", ["سميح"]],
    ["Ali Suliman", "علي سليمان", []], ["Elyanna", "إليانا", ["اليانا"]], ["Saint Levant", "سانت ليفانت", ["saint levant"]]
  ], ["Edward Said", "Hiam Abbass", "Elia Suleiman", "Bella Hadid", "Gigi Hadid", "Fadwa Tuqan", "Samih al-Qasim"],
     ["Saleh Bakri", "Mohammad Bakri", "Hany Abu-Assad", "Reem Banna", "Mona Hatoum", "Ali Suliman", "Elyanna", "Saint Levant"]);

  people("hollywood", "هوليوود", "مين هالنجم؟", [
    ["Leonardo DiCaprio", "دي كابريو", ["ليوناردو", "dicaprio"]], ["Tom Cruise", "توم كروز", []], ["Brad Pitt", "براد بيت", []], ["Angelina Jolie", "أنجلينا جولي", ["انجلينا"]],
    ["Johnny Depp", "جوني ديب", []], ["Will Smith", "ويل سميث", []], ["Denzel Washington", "دينزل واشنطن", ["دنزل"]], ["Morgan Freeman", "مورغان فريمان", ["مورجان فريمان"]],
    ["Meryl Streep", "ميريل ستريب", []], ["Scarlett Johansson", "سكارليت جوهانسون", []], ["Robert Downey Jr.", "روبرت داوني جونيور", ["داوني"]], ["Keanu Reeves", "كيانو ريفز", []],
    ["Zendaya", "زندايا", []], ["Tom Hanks", "توم هانكس", []], ["Jennifer Lawrence", "جينيفر لورانس", []], ["Margot Robbie", "مارغو روبي", ["مارجو روبي"]],
    ["Ryan Reynolds", "رايان رينولدز", []], ["Chris Hemsworth", "كريس هيمسورث", []], ["Nicole Kidman", "نيكول كيدمان", []], ["Al Pacino", "آل باتشينو", ["ال باتشينو"]]
  ], ["Johnny Depp", "Denzel Washington", "Meryl Streep", "Scarlett Johansson", "Robert Downey Jr.", "Zendaya", "Margot Robbie", "Ryan Reynolds"],
     ["Jennifer Lawrence", "Chris Hemsworth", "Nicole Kidman", "Al Pacino", "Morgan Freeman"]);

  people("popstars", "نجوم البوب العالمي", "مين هالمغني؟", [
    ["Michael Jackson", "مايكل جاكسون", []], ["Beyoncé", "بيونسيه", []], ["Taylor Swift", "تايلور سويفت", []], ["Rihanna", "ريهانا", []],
    ["Ed Sheeran", "إد شيران", ["اد شيران"]], ["Adele", "أديل", ["اديل"]], ["Shakira", "شاكيرا", []], ["Justin Bieber", "جاستن بيبر", ["بيبر"]],
    ["Billie Eilish", "بيلي آيليش", ["بيلي ايليش"]], ["Ariana Grande", "أريانا غراندي", ["اريانا"]], ["Lady Gaga", "ليدي غاغا", ["ليدي جاجا"]], ["Bruno Mars", "برونو مارس", []],
    ["The Weeknd", "ذا ويكند", ["ويكند"]], ["Dua Lipa", "دوا ليبا", []], ["Eminem", "إيمينيم", ["امينيم"]], ["Madonna", "مادونا", []],
    ["Elvis Presley", "إلفيس بريسلي", ["الفيس"]], ["Freddie Mercury", "فريدي ميركوري", ["فريدي"]], ["Bob Marley", "بوب مارلي", []], ["Celine Dion", "سيلين ديون", []]
  ], ["Billie Eilish", "Ariana Grande", "Lady Gaga", "Bruno Mars", "The Weeknd", "Dua Lipa", "Eminem", "Madonna"],
     ["Elvis Presley", "Freddie Mercury", "Bob Marley", "Celine Dion"]);

  people("creators", "يوتيوبرز ومؤثرين", "مين هاد؟", [
    ["MrBeast", "مستر بيست", ["mr beast"]], ["PewDiePie", "بيوديباي", ["pewdiepie"]], ["Khaby Lame", "خابي لام", ["khaby"]], ["KSI", "كي إس آي", ["ksi"]],
    ["Logan Paul", "لوغان بول", ["logan paul"]], ["Joe Hattab", "جو حطاب", ["حطاب"]], ["Anas Bukhash", "أنس بوخش", ["انس بوخش"]], ["Ahmad Al-Shugairi", "أحمد الشقيري", ["الشقيري"]],
    ["Bassem Youssef", "باسم يوسف", ["باسم"]], ["Kim Kardashian", "كيم كارداشيان", []], ["Cristiano Ronaldo", "رونالدو", ["كريستيانو"]], ["Huda Kattan", "هدى قطان", ["هدى بيوتي"]],
    ["Casey Neistat", "كيسي نايستات", []], ["Markiplier", "ماركيبلاير", []], ["Dude Perfect", "ديود بيرفكت", []]
  ], ["Logan Paul", "Joe Hattab", "Anas Bukhash", "Kim Kardashian", "Huda Kattan"],
     ["Casey Neistat", "Markiplier", "Dude Perfect", "Ahmad Al-Shugairi", "KSI"]);

  people("arabplayers", "لاعبين عرب", "مين هاللاعب؟", [
    ["Mohamed Salah", "محمد صلاح", ["صلاح"]], ["Riyad Mahrez", "رياض محرز", ["محرز"]], ["Achraf Hakimi", "أشرف حكيمي", ["حكيمي"]], ["Yassine Bounou", "ياسين بونو", ["بونو"]],
    ["Hakim Ziyech", "حكيم زياش", ["زياش"]], ["Sofyan Amrabat", "سفيان أمرابط", ["امرابط"]], ["Mohamed Aboutrika", "محمد أبو تريكة", ["ابو تريكة"]], ["Youssef En-Nesyri", "يوسف النصيري", ["النصيري"]],
    ["Omar Abdulrahman", "عموري", ["عمر عبد الرحمن"]], ["Salem Al-Dawsari", "سالم الدوسري", ["الدوسري"]], ["Younis Mahmoud", "يونس محمود", ["يونس"]], ["Sami Al-Jaber", "سامي الجابر", ["الجابر"]],
    ["Essam El Hadary", "عصام الحضري", ["الحضري"]], ["Ismaël Bennacer", "إسماعيل بن ناصر", ["بن ناصر"]], ["Wessam Abou Ali", "وسام أبو علي", ["ابو علي"]], ["Oday Dabbagh", "عدي الدباغ", ["الدباغ"]],
    ["Mohamed Zidan", "محمد زيدان", []], ["Ahmed Hossam Mido", "ميدو", ["احمد حسام"]]
  ], ["Hakim Ziyech", "Sofyan Amrabat", "Mohamed Aboutrika", "Youssef En-Nesyri", "Omar Abdulrahman", "Salem Al-Dawsari"],
     ["Younis Mahmoud", "Sami Al-Jaber", "Essam El Hadary", "Ismaël Bennacer", "Wessam Abou Ali", "Oday Dabbagh", "Mohamed Zidan", "Ahmed Hossam Mido"]);

  people("footballnow", "نجوم الكرة اليوم", "مين هاللاعب؟", [
    ["Lionel Messi", "ميسي", ["ليونيل ميسي"]], ["Cristiano Ronaldo", "رونالدو", ["كريستيانو"]], ["Kylian Mbappé", "مبابي", []], ["Erling Haaland", "هالاند", ["هولاند"]],
    ["Vinícius Júnior", "فينيسيوس", ["فينيسيوس جونيور"]], ["Jude Bellingham", "بيلينغهام", ["بيلينجهام"]], ["Harry Kane", "هاري كين", ["كين"]], ["Robert Lewandowski", "ليفاندوفسكي", []],
    ["Kevin De Bruyne", "دي بروين", []], ["Neymar", "نيمار", []], ["Luka Modrić", "مودريتش", []], ["Virgil van Dijk", "فان دايك", []],
    ["Lamine Yamal", "لامين يامال", ["يامال"]], ["Pedri", "بيدري", []], ["Jamal Musiala", "موسيالا", []], ["Bukayo Saka", "ساكا", []],
    ["Son Heung-min", "سون هيونغ مين", ["سون"]], ["Rodri", "رودري", []], ["Antoine Griezmann", "غريزمان", ["جريزمان"]], ["Mohamed Salah", "محمد صلاح", ["صلاح"]]
  ], ["Vinícius Júnior", "Jude Bellingham", "Harry Kane", "Robert Lewandowski", "Kevin De Bruyne", "Luka Modrić", "Lamine Yamal"],
     ["Virgil van Dijk", "Pedri", "Jamal Musiala", "Bukayo Saka", "Son Heung-min", "Rodri", "Antoine Griezmann"]);

  people("legends", "أساطير الكرة", "مين هالأسطورة؟", [
    ["Pelé", "بيليه", []], ["Diego Maradona", "مارادونا", []], ["Zinedine Zidane", "زيدان", ["زين الدين زيدان"]], ["Ronaldo (Brazilian footballer)", "رونالدو الظاهرة", ["رونالدو", "الظاهرة"]],
    ["Ronaldinho", "رونالدينيو", []], ["Franz Beckenbauer", "بيكنباور", []], ["Johan Cruyff", "كرويف", []], ["Paolo Maldini", "مالديني", []],
    ["Thierry Henry", "تييري هنري", ["هنري"]], ["David Beckham", "بيكهام", []], ["Kaká", "كاكا", []], ["Andrés Iniesta", "إنييستا", ["انيستا"]],
    ["Xavi", "تشافي", ["شافي"]], ["Francesco Totti", "توتي", []], ["Gianluigi Buffon", "بوفون", []], ["Ferenc Puskás", "بوشكاش", []],
    ["Eusébio", "أوزيبيو", ["اوزيبيو"]], ["George Best", "جورج بيست", []], ["Roberto Baggio", "باجيو", ["باجو"]], ["Zlatan Ibrahimović", "زلاتان", ["ابراهيموفيتش"]]
  ], ["Franz Beckenbauer", "Johan Cruyff", "Paolo Maldini", "Kaká", "Andrés Iniesta", "Xavi", "Francesco Totti", "Gianluigi Buffon"],
     ["Ferenc Puskás", "Eusébio", "George Best", "Roberto Baggio"]);

  people("coaches", "مدربين", "مين هالمدرب؟", [
    ["Pep Guardiola", "غوارديولا", ["بيب", "جوارديولا"]], ["Jürgen Klopp", "كلوب", ["يورغن كلوب"]], ["José Mourinho", "مورينيو", []], ["Carlo Ancelotti", "أنشيلوتي", ["انشيلوتي"]],
    ["Alex Ferguson", "فيرغسون", ["فيرجسون", "السير أليكس"]], ["Arsène Wenger", "فينغر", ["فينجر"]], ["Diego Simeone", "سيميوني", []], ["Antonio Conte", "كونتي", []],
    ["Hassan Shehata", "حسن شحاتة", ["المعلم"]], ["Walid Regragui", "وليد الركراكي", ["الركراكي"]], ["Mikel Arteta", "أرتيتا", ["ارتيتا"]], ["Xabi Alonso", "تشابي ألونسو", ["ألونسو"]],
    ["Hansi Flick", "هانزي فليك", ["فليك"]], ["Thomas Tuchel", "توخيل", []], ["Luis Enrique", "لويس إنريكي", ["انريكي"]]
  ], ["Alex Ferguson", "Arsène Wenger", "Diego Simeone", "Antonio Conte", "Walid Regragui"],
     ["Hassan Shehata", "Mikel Arteta", "Xabi Alonso", "Hansi Flick", "Thomas Tuchel", "Luis Enrique"]);

  // Niche photo categories
  DUEL_CATS.push({ id: "arablandmarks", name: "معالم عربية", kind: "item", prop: "P18", prompt: "شو هالمَعلم؟", items: [
    ["Petra", "البتراء", ["بترا"]], ["Dome of the Rock", "قبة الصخرة", []], ["Al-Aqsa Mosque", "المسجد الأقصى", ["الاقصى"]], ["Burj Khalifa", "برج خليفة", []],
    ["Great Pyramid of Giza", "الأهرامات", ["الاهرامات", "الهرم"]], ["Great Sphinx of Giza", "أبو الهول", ["ابو الهول"]], ["Baalbek", "بعلبك", ["قلعة بعلبك"]], ["Jeita Grotto", "مغارة جعيتا", ["جعيتا"]],
    ["Umayyad Mosque", "الجامع الأموي", ["المسجد الاموي"]], ["Wadi Rum", "وادي رم", []], ["Hassan II Mosque", "مسجد الحسن الثاني", ["الحسن الثاني"]], ["Chefchaouen", "شفشاون", []],
    ["Sheikh Zayed Grand Mosque", "جامع الشيخ زايد", ["مسجد الشيخ زايد"]], ["Hegra (Mada'in Salih)", "مدائن صالح", ["الحجر"]], ["Krak des Chevaliers", "قلعة الحصن", ["قلعة الفرسان"]], ["Citadel of Aleppo", "قلعة حلب", []],
    ["Jerash", "جرش", []], ["Carthage", "قرطاج", []], ["Kingdom Centre", "برج المملكة", []], ["Church of the Nativity", "كنيسة المهد", []]
  ]});
  tag("arablandmarks", ["Baalbek", "Jeita Grotto", "Umayyad Mosque", "Wadi Rum", "Hassan II Mosque", "Sheikh Zayed Grand Mosque", "Church of the Nativity"],
      ["Chefchaouen", "Hegra (Mada'in Salih)", "Krak des Chevaliers", "Citadel of Aleppo", "Jerash", "Carthage", "Kingdom Centre"]);
  // World landmarks no longer repeat the Arab ones
  const lm = DUEL_CATS.find(c => c.id === "landmarks");
  lm.items = lm.items.filter(it => !["Petra", "Dome of the Rock", "Al-Aqsa Mosque", "Burj Khalifa", "Great Pyramid of Giza", "Great Sphinx of Giza"].includes(it[0]));

  DUEL_CATS.push({ id: "birds", name: "طيور", kind: "item", prop: "P18", prompt: "شو هالطير؟", items: [
    ["Palestine sunbird", "عصفور الشمس الفلسطيني", ["عصفور الشمس"]], ["Eurasian hoopoe", "هدهد", ["الهدهد"]], ["European bee-eater", "وروار", ["الوروار"]], ["Common kingfisher", "رفراف", ["صياد السمك"]],
    ["Barn owl", "بومة", ["بومة الحظائر"]], ["Griffon vulture", "نسر", ["النسر الاسمر"]], ["Greater flamingo", "فلامنغو", ["نحام"]], ["Indian peafowl", "طاووس", []],
    ["Great white pelican", "بجع", ["بجعة"]], ["White stork", "لقلق", ["اللقلق"]], ["Toco toucan", "طوقان", ["توكان"]], ["Kiwi (bird)", "كيوي", []],
    ["Common ostrich", "نعامة", []], ["Atlantic puffin", "بفن", ["البفن"]], ["Bald eagle", "نسر أصلع", ["النسر الاصلع"]], ["Sulphur-crested cockatoo", "كوكاتو", []],
    ["Mute swan", "بجعة بيضاء", ["تم", "بجعة"]], ["European robin", "أبو الحناء", ["ابو الحنا", "روبن"]], ["Emperor penguin", "بطريق", ["البطريق"]], ["Scarlet macaw", "ببغاء المكاو", ["مكاو", "ببغاء"]]
  ]});
  tag("birds", ["European bee-eater", "Common kingfisher", "Griffon vulture", "Great white pelican", "White stork", "Toco toucan", "Kiwi (bird)"],
      ["Palestine sunbird", "Atlantic puffin", "Sulphur-crested cockatoo", "European robin", "Scarlet macaw"]);

  DUEL_CATS.push({ id: "vintage", name: "أغراض زمان", kind: "item", prop: "P18", prompt: "شو هاد؟", items: [
    ["Cassette tape", "كاسيت", ["شريط كاسيت", "شريط"]], ["Floppy disk", "فلوبي", ["ديسكيت", "قرص مرن"]], ["Walkman", "ووكمان", []], ["Rotary dial", "تلفون أبو قرص", ["تلفون قديم", "هاتف بقرص"]],
    ["VHS", "فيديو كاسيت", ["شريط فيديو", "vhs"]], ["Game Boy", "غيم بوي", ["جيم بوي"]], ["Polaroid camera", "بولارويد", ["كاميرا فورية"]], ["Typewriter", "آلة كاتبة", ["الة كاتبة"]],
    ["Phonograph", "غراموفون", ["فونوغراف", "حاكي"]], ["Pager", "بيجر", ["بليب"]], ["Nokia 3310", "نوكيا 3310", ["نوكيا"]], ["Atari 2600", "أتاري", ["اتاري"]],
    ["Tamagotchi", "تاماغوتشي", ["تماغوتشي"]], ["Rubik's Cube", "مكعب روبيك", ["روبيك"]], ["Kerosene lamp", "لمبة كاز", ["قنديل", "سراج"]], ["Primus stove", "بابور", ["بابور كاز", "بريموس"]],
    ["Cathode-ray tube", "تلفزيون قديم", ["شاشة"]], ["Slide projector", "بروجكتر", ["عارض شرائح"]], ["Compact Disc", "سي دي", ["cd", "قرص مدمج"]], ["Sega Genesis", "سيغا", ["سيجا"]]
  ]});
  tag("vintage", ["Walkman", "Rotary dial", "VHS", "Polaroid camera", "Typewriter", "Pager", "Atari 2600", "Compact Disc"],
      ["Phonograph", "Tamagotchi", "Kerosene lamp", "Primus stove", "Cathode-ray tube", "Slide projector", "Sega Genesis"]);

  DUEL_CATS.push({ id: "applogos", name: "شعارات تطبيقات", kind: "item", prop: "P154", prompt: "شعار أي تطبيق؟", items: [
    ["WhatsApp", "واتساب", ["واتس"]], ["Instagram", "إنستغرام", ["انستا", "انستغرام"]], ["TikTok", "تيك توك", []], ["Snapchat", "سناب شات", ["سناب"]],
    ["Telegram (software)", "تلغرام", ["تيليجرام"]], ["YouTube", "يوتيوب", []], ["Spotify", "سبوتيفاي", []], ["Netflix", "نتفليكس", []],
    ["Uber", "أوبر", ["اوبر"]], ["Facebook", "فيسبوك", []], ["Twitter", "تويتر", ["اكس", "x"]], ["Discord", "ديسكورد", []],
    ["Pinterest", "بنترست", []], ["Google Maps", "خرائط جوجل", ["خرائط غوغل"]], ["Gmail", "جيميل", []], ["Shazam (application)", "شازام", []],
    ["Duolingo", "دولينجو", ["دوولينغو"]], ["Zoom (software)", "زوم", []], ["Microsoft Teams", "تيمز", ["مايكروسوفت تيمز"]], ["LinkedIn", "لينكدإن", ["لينكد ان"]]
  ]});
  tag("applogos", ["Telegram (software)", "Spotify", "Uber", "Discord", "Pinterest", "Google Maps", "Gmail"], ["Shazam (application)", "Duolingo", "Zoom (software)", "Microsoft Teams", "LinkedIn"]);

  DUEL_CATS.push({ id: "carlogos", name: "شعارات سيارات", kind: "item", prop: "P154", prompt: "شعار أي سيارة؟", items: [
    ["Mercedes-Benz", "مرسيدس", []], ["BMW", "بي إم دبليو", ["بي ام"]], ["Toyota", "تويوتا", []], ["Volkswagen", "فولكس فاغن", ["فولكس"]],
    ["Audi", "أودي", ["اودي"]], ["Ferrari", "فيراري", []], ["Lamborghini", "لامبورغيني", ["لامبورجيني"]], ["Porsche", "بورش", []],
    ["Hyundai", "هيونداي", ["هونداي"]], ["Kia", "كيا", []], ["Honda", "هوندا", []], ["Nissan", "نيسان", []],
    ["Mitsubishi Motors", "ميتسوبيشي", []], ["Subaru", "سوبارو", []], ["Peugeot", "بيجو", []], ["Renault", "رينو", []],
    ["Chevrolet", "شفروليه", ["شيفروليه"]], ["Ford Motor Company", "فورد", []], ["Tesla, Inc.", "تيسلا", ["تسلا"]], ["Maserati", "مازيراتي", []]
  ]});
  tag("carlogos", ["Lamborghini", "Porsche", "Hyundai", "Kia", "Honda", "Nissan", "Peugeot"], ["Mitsubishi Motors", "Subaru", "Renault", "Chevrolet", "Maserati"]);

  // Arab flags: a quick subset of the flags list
  const flags = DUEL_CATS.find(c => c.id === "flags");
  DUEL_CATS.push({ id: "arabflags", name: "أعلام عربية", kind: "flag", prompt: "علم أي دولة؟", items: flags.items.filter(it => "ps jo lb sy eg sa ae qa kw bh om ye iq ma dz tn ly sd".split(" ").includes(it[0])) });
  tag("arabflags", ["ae", "qa", "kw", "iq", "ma", "dz", "tn", "ye"], ["bh", "om", "ly", "sd"]);
  DUEL_LEVELS.arabflags = { mid: "ae qa kw iq ma dz tn ye", hard: "bh om ly sd" };
})();

// Themes: the two players pick one before each match; the match offers 8 random categories from it
const DUEL_THEMES = [
  { id: "mix", name: "منوّع" }, { id: "arab", name: "من عنّا" }, { id: "sport", name: "رياضة" }, { id: "screen", name: "شاشة ونجوم" },
  { id: "world", name: "عالم وسفر" }, { id: "culture", name: "فن وثقافة" }, { id: "brands", name: "ماركات وأغراض" }, { id: "kids", name: "للصغار" }
];
const CAT_THEMES = {
  flags: ["world"], capitals: ["world"], arabflags: ["arab", "world"], maps: ["world"], landmarks: ["world"], arablandmarks: ["arab", "world"],
  palcities: ["arab"], ourdishes: ["arab", "culture"], instruments: ["culture"], oddanimals: ["world"], birds: ["world", "kids"],
  cars: ["brands"], carlogos: ["brands"], applogos: ["brands"], vintage: ["brands", "culture"], paintings: ["culture"], dress: ["culture", "world"],
  oldcartoons: ["arab", "screen", "kids"], worldcartoons: ["screen", "kids"], anime: ["screen"], heroes: ["screen"],
  egyptcinema: ["arab", "screen"], syriandrama: ["arab", "screen"], lebsingers: ["arab", "screen"], gulfstars: ["arab", "screen"], palart: ["arab", "culture"],
  hollywood: ["screen"], popstars: ["screen"], creators: ["screen"],
  arabplayers: ["sport", "arab"], footballnow: ["sport"], legends: ["sport"], coaches: ["sport"],
  animals: ["kids"], fruitveg: ["kids"], food: ["kids"], sports: ["kids", "sport"], transport: ["kids"], nature: ["kids"], home: ["kids"]
};
DUEL_CATS.forEach(c => { c.themes = CAT_THEMES[c.id] || ["kids"]; });
// منوّع = everything except the kids-only sets
const themeCats = themeId => DUEL_CATS.filter(c => themeId === "mix" ? !(c.themes.length === 1 && c.themes[0] === "kids") : c.themes.includes(themeId));

// More sport, culture and brand categories so every theme has at least 8
(function () {
  const add = (c, themes, mid, hard) => { c.themes = themes; DUEL_CATS.push(c); DUEL_LEVELS[c.id] = { mid: mid.join("|"), hard: hard.join("|") }; };
  add({ id: "clubs", name: "شعارات أندية", kind: "item", prop: "P154", prompt: "شعار أي نادي؟", items: [
    ["Real Madrid CF", "ريال مدريد", ["الريال"]], ["FC Barcelona", "برشلونة", ["البارسا"]], ["Manchester United F.C.", "مانشستر يونايتد", ["اليونايتد", "مان يونايتد"]], ["Liverpool F.C.", "ليفربول", []],
    ["Juventus FC", "يوفنتوس", ["اليوفي"]], ["FC Bayern Munich", "بايرن ميونخ", ["البايرن"]], ["Chelsea F.C.", "تشيلسي", []], ["Arsenal F.C.", "آرسنال", ["ارسنال"]],
    ["Paris Saint-Germain F.C.", "باريس سان جيرمان", ["باريس", "psg"]], ["Manchester City F.C.", "مانشستر سيتي", ["السيتي", "مان سيتي"]], ["AC Milan", "ميلان", ["اي سي ميلان"]], ["Inter Milan", "إنتر ميلان", ["انتر"]],
    ["Al Ahly SC", "الأهلي المصري", ["الاهلي"]], ["Zamalek SC", "الزمالك", []], ["Al Hilal SFC", "الهلال", []], ["Al Nassr FC", "النصر", []],
    ["Borussia Dortmund", "دورتموند", ["بوروسيا دورتموند"]], ["Atlético Madrid", "أتلتيكو مدريد", ["اتلتيكو"]], ["Raja CA", "الرجاء", ["الرجاء البيضاوي"]], ["Espérance Sportive de Tunis", "الترجي", ["الترجي التونسي"]]
  ]}, ["sport", "brands"], ["Juventus FC", "Chelsea F.C.", "Arsenal F.C.", "Paris Saint-Germain F.C.", "AC Milan", "Al Ahly SC", "Al Hilal SFC", "Al Nassr FC"],
     ["Inter Milan", "Zamalek SC", "Borussia Dortmund", "Atlético Madrid", "Raja CA", "Espérance Sportive de Tunis"]);

  add({ id: "athletes", name: "أبطال رياضات تانية", kind: "item", prop: "P18", prompt: "مين هالبطل؟", items: [
    ["Muhammad Ali", "محمد علي كلاي", ["محمد علي"]], ["Michael Jordan", "مايكل جوردان", ["جوردان"]], ["LeBron James", "ليبرون جيمس", ["ليبرون"]], ["Usain Bolt", "يوسين بولت", ["بولت"]],
    ["Roger Federer", "فيدرر", ["روجر فيدرر"]], ["Rafael Nadal", "نادال", []], ["Novak Djokovic", "ديوكوفيتش", []], ["Serena Williams", "سيرينا ويليامز", ["سيرينا"]],
    ["Lewis Hamilton", "لويس هاميلتون", ["هاميلتون"]], ["Michael Schumacher", "شوماخر", []], ["Mike Tyson", "مايك تايسون", ["تايسون"]], ["Ons Jabeur", "أنس جابر", ["انس جابر"]],
    ["Tiger Woods", "تايغر وودز", ["تايجر وودز"]], ["Michael Phelps", "مايكل فيلبس", ["فيلبس"]], ["Kobe Bryant", "كوبي براينت", ["كوبي"]], ["Hicham El Guerrouj", "هشام الكروج", ["الكروج"]],
    ["Khabib Nurmagomedov", "حبيب نورمحمدوف", ["حبيب"]], ["Simone Biles", "سيمون بايلز", []], ["Max Verstappen", "فيرستابن", []], ["Mutaz Essa Barshim", "معتز برشم", ["برشم"]]
  ]}, ["sport"], ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Serena Williams", "Lewis Hamilton", "Michael Schumacher", "Mike Tyson", "Kobe Bryant"],
     ["Ons Jabeur", "Tiger Woods", "Michael Phelps", "Hicham El Guerrouj", "Khabib Nurmagomedov", "Simone Biles", "Max Verstappen", "Mutaz Essa Barshim"]);

  add({ id: "stadiums", name: "ملاعب", kind: "item", prop: "P18", prompt: "شو هالملعب؟", items: [
    ["Santiago Bernabéu Stadium", "سانتياغو برنابيو", ["البرنابيو", "برنابيو"]], ["Camp Nou", "كامب نو", []], ["Old Trafford", "أولد ترافورد", ["اولد ترافورد"]], ["Anfield", "آنفيلد", ["انفيلد"]],
    ["Wembley Stadium", "ويمبلي", []], ["Maracanã Stadium", "ماراكانا", []], ["San Siro", "سان سيرو", []], ["Allianz Arena", "أليانز أرينا", ["اليانز ارينا"]],
    ["Signal Iduna Park", "سيغنال إيدونا بارك", ["ملعب دورتموند"]], ["Lusail Stadium", "استاد لوسيل", ["لوسيل"]], ["Al Bayt Stadium", "استاد البيت", ["البيت"]], ["Cairo International Stadium", "استاد القاهرة", []],
    ["King Fahd International Stadium", "استاد الملك فهد", ["ملعب الملك فهد"]], ["Stade Mohammed V", "مركب محمد الخامس", ["محمد الخامس"]], ["La Bombonera", "لا بومبونيرا", ["بومبونيرا"]], ["Estadio Azteca", "أزتيكا", ["ازتيكا"]]
  ]}, ["sport", "world"], ["Wembley Stadium", "Maracanã Stadium", "San Siro", "Allianz Arena", "Lusail Stadium"],
     ["Signal Iduna Park", "Al Bayt Stadium", "Cairo International Stadium", "King Fahd International Stadium", "Stade Mohammed V", "La Bombonera", "Estadio Azteca"]);

  add({ id: "foodbrands", name: "ماركات أكل وشرب", kind: "item", prop: "P154", prompt: "شعار أي ماركة؟", items: [
    ["Coca-Cola", "كوكا كولا", ["كولا"]], ["Pepsi", "بيبسي", []], ["McDonald's", "ماكدونالدز", ["ماك"]], ["KFC", "كنتاكي", ["kfc"]],
    ["Starbucks", "ستاربكس", []], ["Burger King", "برغر كنغ", ["برجر كنج"]], ["Nutella", "نوتيلا", []], ["Red Bull", "ريد بول", []],
    ["Nestlé", "نستله", ["نستلة"]], ["Pizza Hut", "بيتزا هت", []], ["Domino's", "دومينوز", []], ["Subway (restaurant)", "صب واي", []],
    ["Lay's", "ليز", ["شيبس ليز"]], ["Kinder (brand)", "كيندر", []], ["Almarai", "المراعي", []], ["Heinz", "هاينز", []],
    ["Dunkin'", "دانكن", ["دانكن دونتس"]], ["Baskin-Robbins", "باسكن روبنز", []], ["Costa Coffee", "كوستا", ["كوستا كوفي"]], ["Nescafé", "نسكافيه", []]
  ]}, ["brands"], ["Starbucks", "Burger King", "Nutella", "Red Bull", "Nestlé", "Pizza Hut", "Domino's", "Nescafé"],
     ["Subway (restaurant)", "Lay's", "Kinder (brand)", "Almarai", "Heinz", "Dunkin'", "Baskin-Robbins", "Costa Coffee"]);

  add({ id: "fashion", name: "ماركات أزياء", kind: "item", prop: "P154", prompt: "شعار أي ماركة؟", items: [
    ["Nike, Inc.", "نايكي", ["نايك"]], ["Adidas", "أديداس", ["اديداس"]], ["Puma (brand)", "بوما", []], ["Gucci", "غوتشي", ["جوتشي", "قوتشي"]],
    ["Chanel", "شانيل", []], ["Louis Vuitton", "لويس فيتون", []], ["Zara (retailer)", "زارا", []], ["H&M", "إتش آند إم", ["h&m", "اتش اند ام"]],
    ["Rolex", "رولكس", []], ["Lacoste", "لاكوست", []], ["Versace", "فيرساتشي", []], ["Prada", "برادا", []],
    ["Under Armour", "أندر آرمر", ["اندر ارمر"]], ["New Balance", "نيو بالانس", []], ["Ralph Lauren Corporation", "رالف لورين", ["بولو"]], ["Converse (shoe company)", "كونفرس", []]
  ]}, ["brands"], ["Gucci", "Chanel", "Louis Vuitton", "Zara (retailer)", "Rolex", "Lacoste"],
     ["Versace", "Prada", "Under Armour", "New Balance", "Ralph Lauren Corporation", "Converse (shoe company)"]);

  add({ id: "gadgets", name: "أجهزة", kind: "item", prop: "P18", prompt: "شو هالجهاز؟", items: [
    ["IPhone (1st generation)", "آيفون", ["ايفون", "iphone"]], ["PlayStation 2", "بلايستيشن 2", ["بلاي ستيشن", "بلايستيشن"]], ["Nintendo Switch", "نينتندو سويتش", ["سويتش"]], ["Xbox 360", "إكس بوكس", ["اكس بوكس"]],
    ["Apple Watch", "ساعة أبل", ["ابل ووتش"]], ["AirPods", "إيربودز", ["ايربودز"]], ["IPod", "آيبود", ["ايبود"]], ["BlackBerry", "بلاكبيري", []],
    ["Kindle", "كيندل", []], ["Segway", "سيغواي", ["سيجواي"]], ["GoPro", "غو برو", ["جو برو"]], ["Oculus Rift", "نظارة واقع افتراضي", ["vr", "اوكولوس"]],
    ["Amazon Echo", "أمازون إيكو", ["اليكسا", "ايكو"]], ["Nintendo 64", "نينتندو 64", ["نينتندو"]], ["Sony Walkman", "ووكمان", []], ["DJI Mavic", "درون", ["طائرة درون"]]
  ]}, ["brands"], ["Apple Watch", "AirPods", "IPod", "BlackBerry", "Kindle", "Nintendo 64"],
     ["Segway", "GoPro", "Oculus Rift", "Amazon Echo", "Sony Walkman", "DJI Mavic"]);

  // Extra theme tags for existing categories
  const more = { landmarks: ["culture"], arablandmarks: ["culture"], lebsingers: ["culture"], egyptcinema: ["culture"], transport: ["brands"], home: ["brands"] };
  DUEL_CATS.forEach(c => (more[c.id] || []).forEach(t => c.themes.includes(t) || c.themes.push(t)));
})();

// ======================================================================
// Logos as checked symbols (duel-icons.js), no wordmarks. Character categories removed: their
// pictures came unchecked from Wikipedia and were often wrong.
// ======================================================================
(function () {
  ["oldcartoons", "worldcartoons", "anime", "heroes", "clubs", "foodbrands", "fashion", "applogos", "carlogos"].forEach(id => {
    const i = DUEL_CATS.findIndex(c => c.id === id); if (i >= 0) DUEL_CATS.splice(i, 1);
  });
  const add = (c, themes, mid, hard) => { c.kind = "icon"; c.themes = themes; DUEL_CATS.push(c); DUEL_LEVELS[c.id] = { mid: mid.join("|"), hard: hard.join("|") }; };
  add({ id: "applogos", name: "شعارات تطبيقات", prompt: "شعار أي تطبيق؟", items: [
    ["whatsapp", "واتساب", ["واتس"]], ["instagram", "إنستغرام", ["انستا", "انستغرام"]], ["tiktok", "تيك توك", []], ["snapchat", "سناب شات", ["سناب"]],
    ["telegram", "تلغرام", ["تيليجرام"]], ["youtube", "يوتيوب", []], ["spotify", "سبوتيفاي", []], ["netflix", "نتفليكس", []],
    ["facebook", "فيسبوك", []], ["discord", "ديسكورد", []], ["pinterest", "بنترست", []], ["googlemaps", "خرائط جوجل", ["خرائط غوغل", "جوجل ماب", "maps"]],
    ["gmail", "جيميل", []], ["shazam", "شازام", []], ["duolingo", "دولينجو", ["دوولينغو"]], ["airbnb", "إير بي إن بي", ["اير بي ان بي"]],
    ["paypal", "باي بال", []], ["apple", "أبل", ["ابل", "آبل"]], ["android", "أندرويد", ["اندرويد"]], ["googlechrome", "كروم", ["جوجل كروم", "chrome"]],
    ["firefox", "فايرفوكس", []], ["safari", "سفاري", []], ["twitch", "تويتش", []], ["reddit", "ريديت", []],
    ["waze", "ويز", []], ["messenger", "ماسنجر", []], ["dropbox", "دروب بوكس", []], ["threads", "ثريدز", []],
    ["signal", "سيغنال", ["سجنال"]], ["wechat", "وي تشات", []], ["tinder", "تيندر", []], ["googledrive", "جوجل درايف", ["درايف", "drive"]],
    ["googlephotos", "صور جوجل", ["جوجل فوتوز", "photos"]], ["applemusic", "أبل ميوزك", ["ابل ميوزك"]], ["soundcloud", "ساوند كلاود", []], ["vimeo", "فيميو", []],
    ["tumblr", "تمبلر", []], ["quora", "كورا", []], ["wikipedia", "ويكيبيديا", []], ["github", "جيت هب", ["غيت هب"]],
    ["steam", "ستيم", []], ["playstation", "بلايستيشن", ["بلاي ستيشن", "سوني"]], ["bluetooth", "بلوتوث", []], ["googleplay", "جوجل بلاي", ["بلاي ستور", "play store"]],
    ["appstore", "آب ستور", ["اب ستور", "app store"]], ["icloud", "آي كلاود", ["اي كلاود"]], ["trello", "تريلو", []], ["notion", "نوشن", []]
  ]}, ["brands"], ["telegram", "spotify", "netflix", "discord", "pinterest", "googlemaps", "gmail", "shazam", "duolingo", "android", "googlechrome", "firefox", "safari", "messenger", "playstation", "bluetooth", "googleplay", "appstore"],
     ["airbnb", "paypal", "twitch", "reddit", "waze", "dropbox", "threads", "signal", "wechat", "tinder", "googledrive", "googlephotos", "applemusic", "soundcloud", "vimeo", "tumblr", "quora", "wikipedia", "github", "steam", "icloud", "trello", "notion"]);

  add({ id: "carlogos", name: "شعارات سيارات", prompt: "شعار أي سيارة؟", items: [
    ["toyota", "تويوتا", []], ["volkswagen", "فولكس فاغن", ["فولكس", "فولكس واجن"]], ["audi", "أودي", ["اودي"]], ["ferrari", "فيراري", []],
    ["lamborghini", "لامبورغيني", ["لامبورجيني"]], ["hyundai", "هيونداي", ["هونداي"]], ["honda", "هوندا", []], ["mitsubishi", "ميتسوبيشي", []],
    ["subaru", "سوبارو", []], ["renault", "رينو", []], ["chevrolet", "شفروليه", ["شيفروليه", "شفر"]], ["tesla", "تيسلا", ["تسلا"]],
    ["maserati", "مازيراتي", []], ["mazda", "مازدا", []], ["citroen", "ستروين", ["سيتروين"]], ["bugatti", "بوغاتي", ["بوجاتي"]],
    ["bentley", "بنتلي", []], ["skoda", "سكودا", []], ["seat", "سيات", []], ["opel", "أوبل", ["اوبل"]],
    ["cadillac", "كاديلاك", []], ["infiniti", "إنفينيتي", ["انفينيتي"]], ["suzuki", "سوزوكي", []], ["dacia", "داتشيا", ["داسيا"]], ["polestar", "بولستار", []]
  ]}, ["brands"], ["lamborghini", "hyundai", "mitsubishi", "subaru", "renault", "chevrolet", "maserati", "mazda"],
     ["citroen", "bugatti", "bentley", "skoda", "seat", "opel", "cadillac", "infiniti", "suzuki", "dacia", "polestar"]);

  add({ id: "brandlogos", name: "شعارات ماركات", prompt: "شعار أي ماركة؟", items: [
    ["nike", "نايكي", ["نايك"]], ["adidas", "أديداس", ["اديداس"]], ["puma", "بوما", []], ["jordan", "جوردان", ["اير جوردان"]],
    ["newbalance", "نيو بالانس", []], ["underarmour", "أندر آرمر", ["اندر ارمر"]], ["reebok", "ريبوك", []], ["mcdonalds", "ماكدونالدز", ["ماك"]],
    ["starbucks", "ستاربكس", []], ["redbull", "ريد بول", []], ["shell", "شل", []], ["mastercard", "ماستركارد", ["ماستر كارد"]],
    ["target", "تارغت", ["تارجت"]], ["linux", "لينكس", []], ["ubuntu", "أوبونتو", ["اوبونتو"]], ["nvidia", "إنفيديا", ["انفيديا"]],
    ["huawei", "هواوي", []], ["xiaomi", "شاومي", []], ["nba", "إن بي إيه", ["ان بي ايه", "دوري السلة الأمريكي"]], ["beats", "بيتس", []]
  ]}, ["brands"], ["puma", "jordan", "newbalance", "underarmour", "reebok", "shell", "mastercard", "huawei"],
     ["target", "linux", "ubuntu", "nvidia", "xiaomi", "nba", "beats"]);
})();

// English answers for the categories whose keys aren't English names (emoji and capitals); "|" separates alternatives
const DUEL_EN = {
  capitals: { ps: "Jerusalem|Al Quds", jo: "Amman", lb: "Beirut", sy: "Damascus", eg: "Cairo", sa: "Riyadh", ae: "Abu Dhabi", qa: "Doha", kw: "Kuwait City|Kuwait", iq: "Baghdad", ma: "Rabat", dz: "Algiers", tn: "Tunis", ly: "Tripoli", sd: "Khartoum", om: "Muscat", ye: "Sanaa", bh: "Manama", tr: "Ankara", ir: "Tehran", jp: "Tokyo", cn: "Beijing", in: "New Delhi|Delhi", fr: "Paris", de: "Berlin", it: "Rome", es: "Madrid", gb: "London", ru: "Moscow", us: "Washington|Washington DC", ca: "Ottawa", br: "Brasilia", ar: "Buenos Aires", au: "Canberra", gr: "Athens", pt: "Lisbon", nl: "Amsterdam", se: "Stockholm", no: "Oslo", kr: "Seoul" },
  animals: { "🦁": "lion", "🐯": "tiger", "🐘": "elephant", "🦒": "giraffe", "🦓": "zebra", "🐪": "camel", "🐒": "monkey", "🦍": "gorilla", "🐻": "bear", "🐼": "panda", "🐨": "koala", "🦘": "kangaroo", "🐺": "wolf", "🦊": "fox", "🐰": "rabbit|bunny", "🐢": "turtle|tortoise", "🐍": "snake", "🐊": "crocodile|alligator", "🦈": "shark", "🐬": "dolphin", "🐳": "whale", "🐙": "octopus", "🦀": "crab", "🦉": "owl", "🦅": "eagle", "🦜": "parrot", "🐧": "penguin", "🦩": "flamingo", "🐓": "rooster", "🐄": "cow", "🐑": "sheep", "🐐": "goat", "🐴": "horse", "🐱": "cat", "🐶": "dog", "🐭": "mouse", "🦔": "hedgehog", "🦇": "bat", "🐝": "bee", "🦋": "butterfly", "🐜": "ant", "🦂": "scorpion", "🐌": "snail", "🦎": "lizard", "🦛": "hippo|hippopotamus", "🦏": "rhino|rhinoceros", "🦌": "deer" },
  fruitveg: { "🍎": "apple", "🍐": "pear", "🍊": "orange", "🍋": "lemon", "🍌": "banana", "🍉": "watermelon", "🍇": "grapes|grape", "🍓": "strawberry", "🍒": "cherry|cherries", "🍑": "peach", "🥭": "mango", "🍍": "pineapple", "🥥": "coconut", "🥝": "kiwi", "🍅": "tomato", "🍆": "eggplant|aubergine", "🥑": "avocado", "🥦": "broccoli", "🥕": "carrot", "🌽": "corn", "🌶": "chili|hot pepper", "🫑": "bell pepper|pepper", "🥒": "cucumber", "🧄": "garlic", "🧅": "onion", "🥔": "potato", "🍄": "mushroom", "🫒": "olive|olives", "🥜": "peanut|peanuts", "🌰": "chestnut", "🫐": "blueberry|blueberries", "🍈": "melon" },
  food: { "🍕": "pizza", "🍔": "burger|hamburger", "🌭": "hot dog", "🍟": "fries|french fries", "🧆": "falafel", "🥙": "shawarma|wrap", "🥗": "salad", "🍝": "pasta|spaghetti", "🍜": "noodles|ramen", "🍣": "sushi", "🍤": "shrimp|prawn", "🍩": "donut|doughnut", "🍪": "cookie|cookies", "🎂": "birthday cake|cake", "🍫": "chocolate", "🍭": "lollipop", "🍿": "popcorn", "🍦": "ice cream", "☕": "coffee", "🍵": "tea", "🧃": "juice", "🥛": "milk", "🍯": "honey", "🥐": "croissant", "🥖": "baguette", "🧀": "cheese", "🥚": "egg", "🍳": "fried egg", "🥞": "pancakes|pancake", "🌮": "taco", "🫓": "bread|flatbread", "🍬": "candy|sweets" },
  sports: { "⚽": "football|soccer", "🏀": "basketball", "🏈": "american football", "⚾": "baseball", "🎾": "tennis", "🏐": "volleyball", "🏉": "rugby", "🎱": "billiards|pool|snooker", "🏓": "table tennis|ping pong", "🏸": "badminton", "🥊": "boxing", "🥋": "karate|martial arts|judo", "⛳": "golf", "🏒": "hockey|ice hockey", "🤿": "diving|scuba", "🏹": "archery", "⛷": "skiing", "🏄": "surfing", "🏊": "swimming", "🚴": "cycling", "🏇": "horse riding|horse racing", "🤺": "fencing", "🏋": "weightlifting", "🧗": "climbing", "⛸": "ice skating|skating", "🛹": "skateboarding|skateboard", "🎳": "bowling", "🏏": "cricket" },
  transport: { "🚗": "car", "🚕": "taxi|cab", "🚌": "bus", "🚑": "ambulance", "🚒": "fire truck|fire engine", "🚓": "police car", "🚚": "truck|lorry", "🚜": "tractor", "🏍": "motorcycle|motorbike", "🚲": "bicycle|bike", "🛴": "scooter", "🚂": "train", "🚇": "metro|subway|underground", "✈": "airplane|plane", "🚁": "helicopter", "🚀": "rocket", "🛸": "ufo|flying saucer", "⛵": "sailboat", "🚢": "ship", "🛶": "kayak|canoe", "🚡": "cable car", "🛺": "tuk tuk|rickshaw", "🚤": "speedboat|motorboat", "🛻": "pickup|pickup truck", "🏎": "race car|racing car", "🚐": "van|minibus", "🪂": "parachute" },
  nature: { "☀": "sun", "🌙": "crescent|moon", "⭐": "star", "🌈": "rainbow", "☁": "cloud", "⛈": "storm|thunderstorm", "❄": "snow|snowflake", "🌪": "tornado", "🌊": "wave", "🔥": "fire", "🌋": "volcano", "🏔": "mountain", "🏜": "desert", "🏝": "island", "🌵": "cactus", "🌳": "tree", "🌴": "palm tree|palm", "🍁": "leaf|maple leaf", "🌻": "sunflower", "🌹": "rose", "🌷": "tulip", "💧": "water drop|drop", "⚡": "lightning", "🌍": "earth|globe", "🌧": "rain", "🌕": "full moon|moon" },
  home: { "🛏": "bed", "🛋": "sofa|couch", "🚪": "door", "🪑": "chair", "🚿": "shower", "🛁": "bathtub|bath", "🧹": "broom", "🧺": "basket", "🧼": "soap", "🪥": "toothbrush", "🔑": "key", "🕯": "candle", "💡": "light bulb|bulb", "📺": "tv|television", "📻": "radio", "⏰": "alarm clock|clock", "🧸": "teddy bear|teddy", "🪞": "mirror", "🪟": "window", "🔨": "hammer", "✂": "scissors", "📚": "books", "☂": "umbrella", "🧦": "socks", "👓": "glasses", "🪴": "plant", "🔦": "flashlight|torch", "🧲": "magnet", "🪣": "bucket" }
};
const PEOPLE_CATS = ["egyptcinema", "syriandrama", "lebsingers", "gulfstars", "palart", "hollywood", "popstars", "creators", "arabplayers", "footballnow", "legends", "coaches", "athletes"];
