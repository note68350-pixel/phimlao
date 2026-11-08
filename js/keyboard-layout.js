/**
 * ຜັງແປ້ນພິມລາວ Saysettha / Windows Standard (kbdlao.dll)
 * ຮອງຮັບການແປງປຸ່ມ QWERTY -> ລາວ, ໄຮໄລ້ປຸ່ມ ແລະ ແນະນຳຕຳແໜ່ງນິ້ວມື
 */

const LAO_KEYBOARD_LAYOUT = {
  // ແຖວຕົວເລກ (Number Row)
  'Backquote': { normal: '`', shift: '~', finger: 'l-pinky', row: 0 },
  'Digit1':    { normal: '1', shift: 'ຢ', finger: 'l-pinky', row: 0 },
  'Digit2':    { normal: '2', shift: 'ຟ', finger: 'l-ring', row: 0 },
  'Digit3':    { normal: '3', shift: 'ໂ', finger: 'l-mid', row: 0 },
  'Digit4':    { normal: '4', shift: 'ຖ', finger: 'l-index', row: 0 },
  'Digit5':    { normal: '5', shift: 'ຸ', finger: 'l-index', row: 0 },
  'Digit6':    { normal: '6', shift: 'ູ', finger: 'r-index', row: 0 },
  'Digit7':    { normal: '7', shift: 'ຄ', finger: 'r-index', row: 0 },
  'Digit8':    { normal: '8', shift: 'ຕ', finger: 'r-mid', row: 0 },
  'Digit9':    { normal: '9', shift: 'ຈ', finger: 'r-ring', row: 0 },
  'Digit0':    { normal: '0', shift: 'ຂ', finger: 'r-pinky', row: 0 },
  'Minus':     { normal: '-', shift: 'ຊ', finger: 'r-pinky', row: 0 },
  'Equal':     { normal: '=', shift: 'ໍ', finger: 'r-pinky', row: 0 },

  // ແຖວເທິງ (Top Row)
  'KeyQ':      { normal: 'ົ', shift: 'ົ້', finger: 'l-pinky', row: 1 },
  'KeyW':      { normal: 'ໄ', shift: '0',  finger: 'l-ring', row: 1 },
  'KeyE':      { normal: 'ຳ', shift: '*',  finger: 'l-mid', row: 1 },
  'KeyR':      { normal: 'ພ', shift: '_',  finger: 'l-index', row: 1 },
  'KeyT':      { normal: 'ະ', shift: '+',  finger: 'l-index', row: 1 },
  'KeyY':      { normal: 'ິ', shift: 'ິ້', finger: 'r-index', row: 1 },
  'KeyU':      { normal: 'ີ', shift: 'ີ້', finger: 'r-index', row: 1 },
  'KeyI':      { normal: 'ຮ', shift: 'ຣ',  finger: 'r-mid', row: 1 },
  'KeyO':      { normal: 'ນ', shift: 'ໜ',  finger: 'r-ring', row: 1 },
  'KeyP':      { normal: 'ຍ', shift: 'ຽ',  finger: 'r-pinky', row: 1 },
  'BracketLeft':  { normal: 'ບ', shift: '{', finger: 'r-pinky', row: 1 },
  'BracketRight': { normal: 'ລ', shift: '}', finger: 'r-pinky', row: 1 },
  'Backslash':    { normal: '\\', shift: '|', finger: 'r-pinky', row: 1 },

  // ແຖວຫຼັກ (Home Row)
  'KeyA':      { normal: 'ັ', shift: 'ັ້', finger: 'l-pinky', row: 2 },
  'KeyS':      { normal: 'ຫ', shift: ';',  finger: 'l-ring', row: 2 },
  'KeyD':      { normal: 'ກ', shift: '.',  finger: 'l-mid', row: 2 },
  'KeyF':      { normal: 'ດ', shift: ',',  finger: 'l-index', row: 2 },
  'KeyG':      { normal: 'ເ', shift: ':',  finger: 'l-index', row: 2 },
  'KeyH':      { normal: '້', shift: '໊',  finger: 'r-index', row: 2 },
  'KeyJ':      { normal: '່', shift: '໋',  finger: 'r-index', row: 2 },
  'KeyK':      { normal: 'າ', shift: '!',  finger: 'r-mid', row: 2 },
  'KeyL':      { normal: 'ສ', shift: '?',  finger: 'r-ring', row: 2 },
  'Semicolon': { normal: 'ວ', shift: '"',  finger: 'r-pinky', row: 2 },
  'Quote':     { normal: 'ງ', shift: '\'', finger: 'r-pinky', row: 2 },

  // ແຖວລຸ່ມ (Bottom Row)
  'KeyZ':      { normal: 'ຜ', shift: '₭',  finger: 'l-pinky', row: 3 },
  'KeyX':      { normal: 'ປ', shift: '(',  finger: 'l-ring', row: 3 },
  'KeyC':      { normal: 'ແ', shift: 'ຯ',  finger: 'l-mid', row: 3 },
  'KeyV':      { normal: 'ອ', shift: 'x',  finger: 'l-index', row: 3 },
  'KeyB':      { normal: 'ຶ', shift: 'ຶ້', finger: 'l-index', row: 3 },
  'KeyN':      { normal: 'ື', shift: 'ື້', finger: 'r-index', row: 3 },
  'KeyM':      { normal: 'ທ', shift: 'ໆ',  finger: 'r-index', row: 3 },
  'Comma':     { normal: 'ມ', shift: 'ໝ',  finger: 'r-mid', row: 3 },
  'Period':    { normal: 'ໃ', shift: '$',  finger: 'r-ring', row: 3 },
  'Slash':     { normal: 'ຝ', shift: ')',  finger: 'r-pinky', row: 3 },

  // Space
  'Space':     { normal: ' ', shift: ' ',  finger: 'thumb', row: 4 }
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

// ຊື່ນິ້ວມືພາສາລາວ
const FINGER_NAMES_LAO = {
  'l-pinky': 'ນິ້ວກ້ອຍຊ້າຍ',
  'l-ring':  'ນິ້ວນາງຊ້າຍ',
  'l-mid':   'ນິ້ວກາງຊ້າຍ',
  'l-index': 'ນິ້ວຊີ້ຊ້າຍ',
  'thumb':   'ນິ້ວໂປ້ມື',
  'r-index': 'ນິ້ວຊີ້ຂວາ',
  'r-mid':   'ນິ້ວກາງຂວາ',
  'r-ring':  'ນິ້ວນາງຂວາ',
  'r-pinky': 'ນິ້ວກ້ອຍຂວາ'
};

/**
 * ຊອກຫາຂໍ້ມູນປຸ່ມກົດຈາກຕົວອັກສອນລາວ
 */
function getKeyboardInfoForChar(char) {
  return CHAR_TO_KEY_MAP[char] || null;
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
