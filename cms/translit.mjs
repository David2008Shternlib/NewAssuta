/**
 * Перевод русских имён врачей в латиницу.
 *
 * Простая транслитерация для израильских имён врёт: «Цви» стало бы «Tsvi»
 * вместо Zvi, «Шломо» — «Shlomo» верно, а «Хаим» — «Khaim» вместо Haim.
 * Поэтому сначала смотрим в словарь известных написаний, и только то,
 * чего в нём нет, транслитерируем по правилам.
 */

// Звания и обращения
const TITLES = {
  "профессор": "Prof.",
  "проф.": "Prof.",
  "доктор": "Dr.",
  "д-р": "Dr.",
  "др": "Dr.",
};

// Имена, где принятое написание отличается от механической транслитерации.
// Список собран по именам врачей клиники; дополняется при необходимости.
const NAMES = {
  // мужские имена
  "ави": "Avi", "авраам": "Avraham", "амир": "Amir", "арик": "Arik", "асаф": "Asaf",
  "барух": "Baruch", "борис": "Boris", "вивьян": "Vivian", "владислав": "Vladislav",
  "габриэль": "Gabriel", "габриель": "Gabriel", "гади": "Gadi", "гай": "Guy",
  "герман": "German", "гидеон": "Gideon", "гиди": "Gidi", "гиль": "Gil",
  "дан": "Dan", "даниэль": "Daniel", "давид": "David", "джек": "Jack", "дин": "Dean",
  "дов": "Dov", "дор": "Dor", "дрор": "Dror", "евгений": "Evgeny", "зеев": "Ze'ev",
  "зоар": "Zohar", "иван": "Ivan", "игаль": "Yigal", "идо": "Ido", "иегуда": "Yehuda",
  "илан": "Ilan", "илья": "Ilya", "иосиф": "Yosef", "йоав": "Yoav", "карлос": "Carlos",
  "константин": "Konstantin", "лев": "Lev", "леонид": "Leonid", "лирон": "Liron",
  "луис": "Luis", "маор": "Maor", "марат": "Marat", "марк": "Mark", "меир": "Meir",
  "михаэль": "Michael", "морси": "Morsi", "моше": "Moshe", "нафтали": "Naftali",
  "никола": "Nikola", "нир": "Nir", "ниссан": "Nissan", "оделия": "Odelia",
  "офер": "Ofer", "орен": "Oren", "ор": "Or", "пнина": "Pnina", "рам": "Ram",
  "ран": "Ran", "риад": "Riad", "рой": "Roy", "рон": "Ron", "ронен": "Ronen",
  "рони": "Roni", "сами": "Sami", "санто": "Santo", "хаим": "Haim", "ханох": "Hanoch",
  "хассан": "Hassan", "цви": "Zvi", "шимон": "Shimon", "шломо": "Shlomo",
  "шмуэль": "Shmuel", "эли": "Eli", "эран": "Eran", "эрвин": "Ervin", "эхуд": "Ehud",
  "эяль": "Eyal", "юрий": "Yuri", "юза": "Yuza", "яир": "Yair", "яков": "Yaakov",
  "ярон": "Yaron",
  // женские имена
  "анна": "Anna", "галина": "Galina", "двора": "Dvora", "диана": "Diana",
  "елена": "Elena", "илана": "Ilana", "ирена": "Irena", "ирина": "Irina",
  "мейталь": "Meital", "марина": "Marina", "наоми": "Naomi", "орит": "Orit",
  "рахель": "Rachel", "ронит": "Ronit", "светлана": "Svetlana", "тамар": "Tamar",
  "татьяна": "Tatiana", "шерон": "Sharon", "элла": "Ella", "юлия": "Yulia",
  "вероника": "Veronika",
  // фамилии европейского происхождения — пишутся не по транслитерации
  "коэн": "Cohen", "ашкенази": "Ashkenazi", "вайнбергер": "Weinberger",
  "вайнтруб": "Weintraub", "вайман": "Weiman", "штерн": "Stern",
  "моргенштерн": "Morgenstern", "гальперин": "Halperin", "блюменталь": "Blumenthal",
  "чернуха": "Chernukha", "гросман": "Grossman", "винклер": "Winkler",
  "хохберг": "Hochberg", "хен": "Chen", "голд": "Gold", "харэль": "Harel",
  "кайзерман": "Kaiserman", "иешуа": "Yeshua", "вольф": "Wolf", "флис": "Fliss",
  "зиппель": "Zippel", "бокштейн": "Bokstein", "левит": "Levit",
  "ицхаков": "Itzhakov", "житомирски": "Zhitomirski", "мацеевски": "Matzeevski",
  "менделевич": "Mendelevich", "мошкович": "Moshkovich", "стерник": "Sternik",
  "шиболет": "Shibolet", "падуа": "Padua", "зейлиг": "Zeilig", "банк": "Bank",
  "алькалай": "Alkalay", "рахмиэль": "Rachmiel", "сильфан": "Silfan",
  "хадад": "Hadad", "эльдор": "Eldor", "талисман": "Talisman", "арбель": "Arbel",
  "дотан": "Dotan", "липский": "Lipsky", "стефански": "Stefanski",
  "живелюк": "Zhivelyuk", "анук": "Anuk", "лаав": "Laav", "мораг": "Morag",
  "равив": "Raviv", "мозес": "Mozes", "каплан": "Kaplan", "крамер": "Kramer",
  "блехер": "Blecher", "калганов": "Kalganov", "менахем": "Menachem",
  "симанский": "Simansky", "сарид": "Sarid", "казанский": "Kazansky",
  "шакед": "Shaked", "пелес": "Peles", "давидович": "Davidovich",
  "горчак": "Gorchak", "тавди": "Tavdi", "гольдес": "Goldes",
  // фамилии с устоявшимся написанием
  "аронович": "Aronovich", "адерка": "Aderka", "алон": "Alon", "бахар": "Bahar",
  "банай": "Banai", "баниэль": "Baniel", "бен-бассат": "Ben-Bassat", "бикельс": "Bikels",
  "блашар": "Blashar", "гринберг": "Grinberg", "гутман": "Gutman", "гилади": "Giladi",
  "готфельд": "Gotfeld", "декель": "Dekel", "жителей": "Zhitelev", "инбар": "Inbar",
  "каспи": "Caspi", "каштан": "Kashtan", "керен": "Keren", "клаузнер": "Klausner",
  "коландер": "Kolander", "константини": "Constantini", "лейбович": "Leibovich",
  "лурье": "Lurie", "мацкин": "Matzkin", "меримский": "Merimsky", "морад": "Morad",
  "паппа": "Pappa", "пекарский": "Pekarsky", "рам": "Ram", "раанани": "Raanani",
  "рохкинд": "Rochkind", "теппер": "Tepper", "хайкин": "Haikin", "хефец": "Hefetz",
  "шапира": "Shapira", "шенкман": "Shenkman", "шехтер": "Shechter", "шнейбаум": "Schneebaum",
  "шпрехер": "Sprecher", "эльбаз": "Elbaz", "эльдар": "Eldar", "эльхасид": "Elhasid",
};

// Побуквенные правила — для всего, чего нет в словарях
const LETTERS = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "tz", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function translitWord(word) {
  const lower = word.toLowerCase();
  let out = "";
  for (let i = 0; i < lower.length; i++) {
    const ch = lower[i];
    if (ch === "-") { out += "-"; continue; }
    out += LETTERS[ch] ?? ch;
  }
  // заглавная после начала и после каждого дефиса
  return out.replace(/(^|-)([a-z])/g, (m, p, c) => p + c.toUpperCase());
}

/** Русское имя врача -> латиница. Возвращает { value, exact } */
export function translitName(ru) {
  if (!ru || typeof ru !== "string") return { value: "", exact: false };

  const words = ru.trim().split(/\s+/);
  const parts = [];
  let allKnown = true;

  for (const w of words) {
    const key = w.toLowerCase().replace(/[().,]/g, "");
    if (TITLES[key]) { parts.push(TITLES[key]); continue; }
    if (NAMES[key]) { parts.push(NAMES[key]); continue; }
    // слово в скобках оставляем как есть, транслитерируя содержимое
    allKnown = false;
    parts.push(translitWord(w));
  }

  return { value: parts.join(" ").replace(/\s+/g, " ").trim(), exact: allKnown };
}
