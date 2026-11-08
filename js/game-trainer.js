/**
 * ໂໝດຝຶກແປ້ນພິມ ແລະ ຕຳແໜ່ງນິ້ວມື (Keyboard Layout & Finger Trainer)
 * ປັບປຸງການລົງສີເຕັມໂຕ 100% ແຍກລະຫວ່າງພະຍັນຊະນະ ແລະ ສະຫຼະ ພ້ອມປຸ່ມ Tab ເລື່ອນຄຳສັບ
 */

class KeyboardTrainer {
  constructor(options = {}) {
    this.options = Object.assign({
      difficulty: 'easy',
      onProgress: null,
      onComplete: null
    }, options);

    this.currentList = [];
    this.wordIdx = 0;
    this.charIdx = 0;
    this.totalTyped = 0;
    this.correctCount = 0;
    this.errorCount = 0;
    this.mistypedWords = {};
    this.mistypedChars = {};
    this.pendingSwapChar = null;

    this.activeKeyElement = null;
    this.activeShiftElement = null;
  }

  init() {
    this.reset();
  }

  setDifficulty(diff) {
    this.options.difficulty = diff;
    this.reset();
  }

  clearHighlights() {
    document.querySelectorAll('.key.highlight-target, .key.highlight-shift, .key.key-active, .key.key-shake').forEach(el => {
      el.classList.remove('highlight-target', 'highlight-shift', 'key-active', 'key-shake');
    });
  }

  reset() {
    this.clearHighlights();
    const list = LAO_WORDS[this.options.difficulty] || LAO_WORDS.easy;
    this.currentList = [...list].sort(() => 0.5 - Math.random()).slice(0, 20);
    this.wordIdx = 0;
    this.charIdx = 0;
    this.pendingSwapChar = null;
    this.totalTyped = 0;
    this.correctCount = 0;
    this.errorCount = 0;
    this.mistypedWords = {};
    this.mistypedChars = {};

    this.updateTarget();
  }

  getCurrentTarget() {
    const wordObj = this.currentList[this.wordIdx];
    if (!wordObj) return null;
    const word = wordObj.word.normalize('NFC');

    let targetChar = '';
    let targetLen = 1;
    if (this.pendingSwapChar) {
      targetChar = this.pendingSwapChar;
      targetLen = targetChar.length;
    } else if (word.substring(this.charIdx, this.charIdx + 2) === 'ຫຼ') {
      targetChar = 'ຫຼ';
      targetLen = 2;
    } else {
      targetChar = word[this.charIdx] || '';
      targetLen = 1;
    }

    return {
      word: word,
      char: targetChar,
      charLen: targetLen,
      charIdx: this.charIdx,
      hint: wordObj.hint || '',
      category: wordObj.category || ''
    };
  }

  // ເລື່ອນໄປຄຳສັບຖັດໄປ (ເມື່ອກົດ Tab)
  advanceToNextWord() {
    this.clearHighlights();
    this.charIdx = 0;
    this.pendingSwapChar = null;
    this.wordIdx++;
    sounds.playWordComplete();

    if (this.wordIdx >= this.currentList.length) {
      sounds.playGameOver(true);
      if (this.options.onComplete) {
        this.options.onComplete({
          totalTyped: this.totalTyped,
          accuracy: this.totalTyped > 0 ? Math.round((this.correctCount / this.totalTyped) * 100) : 100
        });
      }
      return;
    }

    this.updateTarget();
    if (this.options.onProgress) {
      this.options.onProgress(this.getStats());
    }
  }

  // ລຶບຍ້ອນຫຼັງ 1 ຕົວອັກສອນ (ເມື່ອກົດ Backspace)
  handleBackspace() {
    this.pendingSwapChar = null;
    if (this.charIdx > 0) {
      const word = (this.currentList[this.wordIdx] && this.currentList[this.wordIdx].word) || '';
      if (this.charIdx >= 2 && word.substring(this.charIdx - 2, this.charIdx) === 'ຫຼ') {
        this.charIdx -= 2;
      } else {
        this.charIdx--;
      }
      this.updateTarget();
      sounds.playKeyClick();
    }
  }

  handleInput(char) {
    const target = this.getCurrentTarget();
    if (!target) return;

    this.totalTyped++;

    const normInput = char.normalize('NFC');
    const word = target.word;
    const normTarget = target.char.normalize('NFC');

    let isMatch = false;

    // 0. ກໍລະນີ target ແມ່ນ ຫຼ, ໝ, ໜ (ຫຼື ຜູ້ໃຊ້ພິມແຍກ ຫ+ລ, ຫ+ມ, ຫ+ນ):
    if (normTarget === 'ຫຼ') {
      if (normInput === 'ຫຼ' || canonicalizeLao(normInput) === 'ຫລ') {
        isMatch = true;
        this.charIdx += 2;
      } else if (normInput === 'ຫ') {
        isMatch = true;
        this.pendingSwapChar = 'ລ';
      }
    } else if (normTarget === 'ໝ') {
      if (normInput === 'ໝ' || canonicalizeLao(normInput) === 'ຫມ') {
        isMatch = true;
        this.charIdx += 1;
      } else if (normInput === 'ຫ') {
        isMatch = true;
        this.pendingSwapChar = 'ມ';
      }
    } else if (normTarget === 'ໜ') {
      if (normInput === 'ໜ' || canonicalizeLao(normInput) === 'ຫນ') {
        isMatch = true;
        this.charIdx += 1;
      } else if (normInput === 'ຫ') {
        isMatch = true;
        this.pendingSwapChar = 'ນ';
      }
    }
    // 1. ກວດສອບຖ້າມີ pendingSwapChar (ຜູ້ໃຊ້ພິມສະຫຼະ/ວັນນະຍຸດສະຫຼັບລຳດັບ)
    else if (this.pendingSwapChar) {
      if (normInput === this.pendingSwapChar || canonicalizeLao(normInput) === canonicalizeLao(this.pendingSwapChar)) {
        isMatch = true;
        this.pendingSwapChar = null;
        this.charIdx += 2; // ຂ້າມທັງສອງຕົວອັກສອນທີ່ພິມຄົບແລ້ວ
      }
    } 
    // 2. ກວດສອບຕົກກັບຕົວອັກສອນເປົ້າໝາຍປົກກະຕິ
    else if (normInput === normTarget || canonicalizeLao(normInput) === canonicalizeLao(normTarget)) {
      isMatch = true;
      this.charIdx += target.charLen || 1;
    }
    // 2.1 ກໍລະນີຜູ້ໃຊ້ພິມຕົວປະສົມສະຫຼະ-ວັນນະຍຸດ (ເຊັ່ນ ົ້, ັ້, ິ້, ີ້) ທີ່ກົງກັບ 2 ຕົວອັກສອນຖັດໄປ
    else if (this.charIdx + 1 < word.length && (normInput === word.substring(this.charIdx, this.charIdx + 2) || canonicalizeLao(normInput) === canonicalizeLao(word.substring(this.charIdx, this.charIdx + 2)))) {
      isMatch = true;
      this.charIdx += 2;
    }
    // 3. ກວດສອບກໍລະນີຜູ້ໃຊ້ພິມ ວັນນະຍຸດ/ສະຫຼະ ສະຫຼັບກັນ (ເຊັ່ນ ພິມ ຳ ກ່ອນ ້ ຫຼື ້ ກ່ອນ ຳ)
    else if (this.charIdx + 1 < word.length) {
      const nextChar = word[this.charIdx + 1].normalize('NFC');
      const isToneTarget = /[\u0EC8-\u0ECC]/.test(normTarget);
      const isVowelNext = /[\u0EB1\u0EB4-\u0EB9\u0EBB\u0ECD\u0EB2\u0EB3]/.test(nextChar);
      const isVowelTarget = /[\u0EB1\u0EB4-\u0EB9\u0EBB\u0ECD\u0EB2\u0EB3]/.test(normTarget);
      const isToneNext = /[\u0EC8-\u0ECC]/.test(nextChar);

      if ((normInput === nextChar || canonicalizeLao(normInput) === canonicalizeLao(nextChar)) &&
          ((isToneTarget && isVowelNext) || (isVowelTarget && isToneNext))) {
        isMatch = true;
        this.pendingSwapChar = normTarget; // ຕົວຖັດໄປທີ່ຕ້ອງພິມແມ່ນ normTarget
      }
    }
    // 4. ຮອງຮັບການພິມຕົວປະສົມ: ຫ + ມ -> ໝ, ຫ + ນ -> ໜ, ຫ + ລ -> ຫຼ
    else if (normTarget === 'ໝ' && normInput === 'ຫ') {
      isMatch = true;
      this.pendingSwapChar = 'ມ';
    } else if (normTarget === 'ໜ' && normInput === 'ຫ') {
      isMatch = true;
      this.pendingSwapChar = 'ນ';
    }

    if (isMatch) {
      this.correctCount++;
      sounds.playCorrectChar();

      // ຖ້າພິມຄົບຄຳສັບແລ້ວ
      if (this.charIdx >= word.length) {
        sounds.playWordComplete();
        this.charIdx = 0;
        this.pendingSwapChar = null;
        this.wordIdx++;

        if (this.wordIdx >= this.currentList.length) {
          this.clearHighlights();
          sounds.playGameOver(true);
          if (this.options.onComplete) {
            this.options.onComplete(this.getStats());
          }
          return;
        }
      }

      this.updateTarget();
    } else {
      this.errorCount++;
      sounds.playError();
      this.flashErrorKey();
      this.mistypedChars[char] = (this.mistypedChars[char] || 0) + 1;
      this.mistypedWords[target.word] = (this.mistypedWords[target.word] || 0) + 1;
    }

    if (this.options.onProgress) {
      this.options.onProgress(this.getStats());
    }
  }

  updateTarget() {
    const target = this.getCurrentTarget();
    if (!target) return;

    // ເຄຼຍໄຮໄລ້ເກົ່າ
    document.querySelectorAll('.key.highlight-target, .key.highlight-shift').forEach(el => {
      el.classList.remove('highlight-target', 'highlight-shift');
    });

    const keyInfo = getKeyboardInfoForChar(target.char);
    const fingerName = keyInfo ? (FINGER_NAMES_LAO[keyInfo.finger] || '') : '';

    if (keyInfo) {
      // ໄຮໄລ້ປຸ່ມຫຼັກ
      const keyEl = document.querySelector(`.key[data-code="${keyInfo.code}"]`);
      if (keyEl) {
        keyEl.classList.add('highlight-target');
      }

      // ຖ້າຕ້ອງກົດ Shift
      if (keyInfo.shift) {
        const shiftKeys = document.querySelectorAll('.key[data-code="ShiftLeft"], .key[data-code="ShiftRight"]');
        shiftKeys.forEach(s => s.classList.add('highlight-shift'));
      }
    }

    // ອັບເດດຂໍ້ຄວາມແນະນຳເທິງ UI ໂດຍລົງສີເຕັມໂຕ ບໍ່ຕັດສະຫຼະ
    const targetDisplay = document.getElementById('trainer-target-word');
    const fingerDisplay = document.getElementById('trainer-finger-hint');
    const shiftBadge = document.getElementById('trainer-shift-badge');

    if (targetDisplay) {
      const word = target.word;
      const typedPart = word.substring(0, this.charIdx);
      const remainingPart = word.substring(this.charIdx);

      // Single-Layer: ສ່ວນທີ່ພິມຖືກແລ້ວ (ສີຟ້າ) ຕາມດ້ວຍສ່ວນທີ່ຍັງບໍ່ທັນພິມ (ສີເທົາ) - ບໍ່ຊ້ອນ 2 ຊັ້ນ
      targetDisplay.innerHTML = `
        <div class="trainer-word-display" id="trainer-display-box">
          <span class="trainer-word-typed">${typedPart}</span><span class="trainer-word-remaining">${remainingPart}</span>
        </div>
      `;
    }

    if (fingerDisplay) {
      fingerDisplay.textContent = fingerName ? `👉 ${fingerName} (ກົດ: ${target.char})` : `ກົດ: ${target.char}`;
    }

    if (shiftBadge) {
      if (keyInfo && keyInfo.shift) {
        shiftBadge.style.display = 'inline-flex';
      } else {
        shiftBadge.style.display = 'none';
      }
    }
  }

  flashErrorKey() {
    const target = this.getCurrentTarget();
    if (!target) return;

    // ສັ່ນ ແລະ ຂຶ້ນສີແດງຢູ່ຄຳສັບເປົ້າໝາຍ
    const displayBox = document.getElementById('trainer-display-box');
    if (displayBox) {
      displayBox.classList.add('has-error');
      setTimeout(() => displayBox.classList.remove('has-error'), 350);
    }

    const keyInfo = getKeyboardInfoForChar(target.char);
    if (keyInfo) {
      const keyEl = document.querySelector(`.key[data-code="${keyInfo.code}"]`);
      if (keyEl) {
        keyEl.classList.add('key-shake');
        setTimeout(() => keyEl.classList.remove('key-shake'), 400);
      }
    }
  }

  getStats() {
    const accuracy = this.totalTyped > 0 ? Math.round((this.correctCount / this.totalTyped) * 100) : 100;
    return {
      wordProgress: `${this.wordIdx + 1} / ${this.currentList.length}`,
      accuracy: accuracy,
      totalTyped: this.totalTyped,
      errors: this.errorCount,
      mistypedWords: this.mistypedWords,
      mistypedChars: this.mistypedChars
    };
  }
}
