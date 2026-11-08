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

  reset() {
    const list = LAO_WORDS[this.options.difficulty] || LAO_WORDS.easy;
    this.currentList = [...list].sort(() => 0.5 - Math.random()).slice(0, 20);
    this.wordIdx = 0;
    this.charIdx = 0;
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
    const targetChar = word[this.charIdx];
    return {
      word: word,
      char: targetChar,
      charIdx: this.charIdx,
      hint: wordObj.hint || '',
      category: wordObj.category || ''
    };
  }

  // ເລື່ອນໄປຄຳສັບຖັດໄປ (ເມື່ອກົດ Tab)
  advanceToNextWord() {
    this.charIdx = 0;
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
    if (this.charIdx > 0) {
      this.charIdx--;
      this.updateTarget();
      sounds.playKeyClick();
    }
  }

  handleInput(char) {
    const target = this.getCurrentTarget();
    if (!target) return;

    this.totalTyped++;

    const normInput = char.normalize('NFC');
    const normTarget = target.char.normalize('NFC');

    // ປຽບທຽບດ້ວຍ canonicalizeLao
    if (normInput === normTarget || canonicalizeLao(normInput) === canonicalizeLao(normTarget)) {
      this.correctCount++;
      sounds.playCorrectChar();
      this.charIdx++;

      // ຖ້າພິມຄົບຄຳສັບແລ້ວ
      if (this.charIdx >= target.word.length) {
        sounds.playWordComplete();
        this.charIdx = 0;
        this.wordIdx++;

        if (this.wordIdx >= this.currentList.length) {
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

      // ຊັ້ນທີ 1 (Base): ຄຳສັບເຕັມສີເທົາ
      // ຊັ້ນທີ 2 (Overlay): ສ່ວນທີ່ພິມຖືກແລ້ວສີຟ້າເຕັມໂຕ 100% ບໍ່ຕັດເຄິ່ງສະຫຼະ
      targetDisplay.innerHTML = `
        <div class="trainer-word-display" id="trainer-display-box">
          <span class="trainer-word-base">${word}</span>
          <span class="trainer-word-overlay">${typedPart}</span>
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
