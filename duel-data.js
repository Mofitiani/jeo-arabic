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

const DUEL_CREDITS = "الأعلام: flag-icons (MIT) · الصور: Twemoji (CC BY 4.0) وويكيميديا كومنز (المصوّر والرخصة تحت كل صورة)";

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
    ["Pikachu", "بيكاتشو", ["pikachu"]], ["Goku", "غوكو", ["جوكو", "goku"]], ["Naruto Uzumaki", "ناروتو", ["naruto"]],
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
  anime:         { mid: "Ash Ketchum|Sailor Moon (character)|Hello Kitty|Vegeta|Mewtwo", hard: "Astro Boy (character)|Light Yagami|Eren Yeager|Edward Elric|Totoro" },
  heroes:        { mid: "Captain America|Wonder Woman|Joker (character)|Hermione Granger|Darth Vader|Yoda|Jack Sparrow|Thanos", hard: "Gandalf|Black Panther (character)|Wolverine (character)|Lara Croft" }
});
