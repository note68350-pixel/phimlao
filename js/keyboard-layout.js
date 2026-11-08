/**
 * ຜັງແປ້ນພິມລາວມາດຕະຖານແທ້ 100% (Microsoft Windows KBDLAO.DLL & Saysettha)
 * ບັນຈຸຄົບທຸກຕົວອັກສອນ ລວມທັງ ຫຼ, ໜ, ໝ, ຣ, ຽ, ຼ, ₭, ໆ, ຯ, ໊, ໋, ໌
 */

const LAO_KEYBOARD_LAYOUT = {
  // ແຖວຕົວເລກ (Number Row)
  'Backquote':   { normal: '"', shift: '\'', qwerty: '`', finger: 'l-pinky', row: 0 },
  'Digit1':      { normal: 'ຢ', shift: '1',  qwerty: '1', finger: 'l-pinky', row: 0 },
  'Digit2':      { normal: 'ຟ', shift: '2',  qwerty: '2', finger: 'l-ring', row: 0 },
  'Digit3':      { normal: 'ໂ', shift: '3',  qwerty: '3', finger: 'l-mid', row: 0 },
  'Digit4':      { normal: 'ຖ', shift: '4',  qwerty: '4', finger: 'l-index', row: 0 },
  'Digit5':      { normal: 'ຸ', shift: '໌',  qwerty: '5', finger: 'l-index', row: 0 },
  'Digit6':      { normal: 'ູ', shift: 'ຼ',  qwerty: '6', finger: 'r-index', row: 0 },
  'Digit7':      { normal: 'ຄ', shift: '5',  qwerty: '7', finger: 'r-index', row: 0 },
  'Digit8':      { normal: 'ຕ', shift: '6',  qwerty: '8', finger: 'r-mid', row: 0 },
  'Digit9':      { normal: 'ຈ', shift: '7',  qwerty: '9', finger: 'r-ring', row: 0 },
  'Digit0':      { normal: 'ຂ', shift: '8',  qwerty: '0', finger: 'r-pinky', row: 0 },
  'Minus':       { normal: 'ຊ', shift: '9',  qwerty: '-', finger: 'r-pinky', row: 0 },
  'Equal':       { normal: 'ໍ', shift: 'ໍ່', qwerty: '=', finger: 'r-pinky', row: 0 },

  // ແຖວເທິງ (Top Row)
  'KeyQ':        { normal: 'ົ', shift: 'ົ້', qwerty: 'Q', finger: 'l-pinky', row: 1 },
  'KeyW':        { normal: 'ໄ', shift: '0',  qwerty: 'W', finger: 'l-ring', row: 1 },
  'KeyE':        { normal: 'ຳ', shift: '*',  qwerty: 'E', finger: 'l-mid', row: 1 },
  'KeyR':        { normal: 'ພ', shift: '_',  qwerty: 'R', finger: 'l-index', row: 1 },
  'KeyT':        { normal: 'ະ', shift: '+',  qwerty: 'T', finger: 'l-index', row: 1 },
  'KeyY':        { normal: 'ິ', shift: 'ິ້', qwerty: 'Y', finger: 'r-index', row: 1 },
  'KeyU':        { normal: 'ີ', shift: 'ີ້', qwerty: 'U', finger: 'r-index', row: 1 },
  'KeyI':        { normal: 'ຮ', shift: 'ຣ',  qwerty: 'I', finger: 'r-mid', row: 1 },
  'KeyO':        { normal: 'ນ', shift: 'ໜ',  qwerty: 'O', finger: 'r-ring', row: 1 },
  'KeyP':        { normal: 'ຍ', shift: 'ຽ',  qwerty: 'P', finger: 'r-pinky', row: 1 },
  'BracketLeft': { normal: 'ບ', shift: '-',  qwerty: '[', finger: 'r-pinky', row: 1 },
  'BracketRight':{ normal: 'ລ', shift: 'ຫຼ', qwerty: ']', finger: 'r-pinky', row: 1 },
  'Backslash':   { normal: '/', shift: '\\', qwerty: '\\', finger: 'r-pinky', row: 1 },

  // ແຖວຫຼັກ (Home Row)
  'KeyA':        { normal: 'ັ', shift: 'ັ້', qwerty: 'A', finger: 'l-pinky', row: 2 },
  'KeyS':        { normal: 'ຫ', shift: ';',  qwerty: 'S', finger: 'l-ring', row: 2 },
  'KeyD':        { normal: 'ກ', shift: '.',  qwerty: 'D', finger: 'l-mid', row: 2 },
  'KeyF':        { normal: 'ດ', shift: ',',  qwerty: 'F', finger: 'l-index', row: 2 },
  'KeyG':        { normal: 'ເ', shift: ':',  qwerty: 'G', finger: 'l-index', row: 2 },
  'KeyH':        { normal: '້', shift: '໊',  qwerty: 'H', finger: 'r-index', row: 2 },
  'KeyJ':        { normal: '່', shift: '໋',  qwerty: 'J', finger: 'r-index', row: 2 },
  'KeyK':        { normal: 'າ', shift: '!',  qwerty: 'K', finger: 'r-mid', row: 2 },
  'KeyL':        { normal: 'ສ', shift: '?',  qwerty: 'L', finger: 'r-ring', row: 2 },
  'Semicolon':   { normal: 'ວ', shift: '%',  qwerty: ';', finger: 'r-pinky', row: 2 },
  'Quote':       { normal: 'ງ', shift: '=',  qwerty: '\'', finger: 'r-pinky', row: 2 },

  // ແຖວລຸ່ມ (Bottom Row)
  'KeyZ':        { normal: 'ຜ', shift: '₭',  qwerty: 'Z', finger: 'l-pinky', row: 3 },
  'KeyX':        { normal: 'ປ', shift: '(',  qwerty: 'X', finger: 'l-ring', row: 3 },
  'KeyC':        { normal: 'ແ', shift: 'ຯ',  qwerty: 'C', finger: 'l-mid', row: 3 },
  'KeyV':        { normal: 'ອ', shift: 'x',  qwerty: 'V', finger: 'l-index', row: 3 },
  'KeyB':        { normal: 'ຶ', shift: 'ຶ້', qwerty: 'B', finger: 'l-index', row: 3 },
  'KeyN':        { normal: 'ື', shift: 'ື້', qwerty: 'N', finger: 'r-index', row: 3 },
  'KeyM':        { normal: 'ທ', shift: 'ໆ',  qwerty: 'M', finger: 'r-index', row: 3 },
  'Comma':       { normal: 'ມ', shift: 'ໝ',  qwerty: ',', finger: 'r-mid', row: 3 },
  'Period':      { normal: 'ໃ', shift: '$',  qwerty: '.', finger: 'r-ring', row: 3 },
  'Slash':       { normal: 'ຝ', shift: ')',  qwerty: '/', finger: 'r-pinky', row: 3 },

  // Space
  'Space':       { normal: ' ', shift: ' ',  qwerty: 'Space', finger: 'thumb', row: 4 }
};

// ສ້າງດັດສະນີຄົ້ນຫາປຸ່ມຈາກຕົວອັກສອນລາວ
const CHAR_TO_KEY_MAP = {};
for (const [code, info] of Object.entries(LAO_KEYBOARD_LAYOUT)) {
  if (info.normal) {
    CHAR_TO_KEY_MAP[info.normal] = { code, shift: false, finger: info.finger };
  }
  if (info.shift && info.shift !== info.normal) {
    CHAR_TO_KEY_MAP[info.shift] = { code, shift: true, finger: info.finger };
  }
}

// ບັນທຶກຕົວອັກສອນປະສົມພິເສດ (Ligatures & Combined Consonants)
CHAR_TO_KEY_MAP['ຫຼ'] = { code: 'BracketRight', shift: true, finger: 'r-pinky' };
CHAR_TO_KEY_MAP['\u0EBC'] = { code: 'Digit6', shift: true, finger: 'r-index' }; // ຼ
CHAR_TO_KEY_MAP['ໝ'] = { code: 'Comma', shift: true, finger: 'r-mid' };
CHAR_TO_KEY_MAP['ໜ'] = { code: 'KeyO', shift: true, finger: 'r-ring' };
CHAR_TO_KEY_MAP['ຣ'] = { code: 'KeyI', shift: true, finger: 'r-mid' };
CHAR_TO_KEY_MAP['ຽ'] = { code: 'KeyP', shift: true, finger: 'r-pinky' };
CHAR_TO_KEY_MAP['₭'] = { code: 'KeyZ', shift: true, finger: 'l-pinky' };
CHAR_TO_KEY_MAP['ໆ'] = { code: 'KeyM', shift: true, finger: 'r-index' };
CHAR_TO_KEY_MAP['ຯ'] = { code: 'KeyC', shift: true, finger: 'l-mid' };
CHAR_TO_KEY_MAP['໊'] = { code: 'KeyH', shift: true, finger: 'r-index' };
CHAR_TO_KEY_MAP['໋'] = { code: 'KeyJ', shift: true, finger: 'r-index' };
CHAR_TO_KEY_MAP['໌'] = { code: 'Digit5', shift: true, finger: 'l-index' };
CHAR_TO_KEY_MAP['ໍ່'] = { code: 'Equal', shift: true, finger: 'r-pinky' };

// ຊື່ນິ້ວມືພາສາລາວ
const FINGER_NAMES_LAO = {
  'l-pinky': 'ນິ້ວກ້ອຍຊ້າຍ',
  'l-ring':  'ນິ້ວນາງຊ້າຍ',
  'l-mid':   'ນິ້ວກາງຊ້າຍ',
  'l-index': 'ນິ້ວຊີ້ຊ້າຍ',
  'thumb':   'ນິ້ວໂປ້ມື (ຍະຫວ່າງ)',
  'r-index': 'ນິ້ວຊີ້ຂວາ',
  'r-mid':   'ນິ້ວກາງຂວາ',
  'r-ring':  'ນິ້ວນາງຂວາ',
  'r-pinky': 'ນິ້ວກ້ອຍຂວາ'
};

/**
 * ຊອກຫາຂໍ້ມູນປຸ່ມກົດຈາກຕົວອັກສອນລາວ
 */
function getKeyboardInfoForChar(char) {
  if (!char) return null;
  const norm = char.normalize('NFC');
  return CHAR_TO_KEY_MAP[norm] || CHAR_TO_KEY_MAP[char] || null;
}

/**
 * ແປງລະຫັດປຸ່ມ KeyboardEvent.code + Shift ເປັນຕົວອັກສອນລາວ (Saysettha Auto-Translator)
 */
function translatePhysicalKeyToLao(code, isShift) {
  const keyInfo = LAO_KEYBOARD_LAYOUT[code];
  if (!keyInfo) return null;
  return isShift ? keyInfo.shift : keyInfo.normal;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LAO_KEYBOARD_LAYOUT,
    CHAR_TO_KEY_MAP,
    FINGER_NAMES_LAO,
    getKeyboardInfoForChar,
    translatePhysicalKeyToLao
  };
}
