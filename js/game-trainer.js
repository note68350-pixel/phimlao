/**
 * ໂໝດຝຶກແປ້ນພິມ ແລະ ຕຳແໜ່ງນິ້ວມື (Keyboard Layout & Finger Trainer)
 * ແນະນຳຕຳແໜ່ງປຸ່ມກົດ ແລະ ນິ້ວມືທີ່ຖືກຕ້ອງຕາມຫຼັກການ Touch Typing
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

    this.updateTarget();
  }

  getCurrentTarget() {
    const wordObj = this.currentList[this.wordIdx];
    if (!wordObj) return null;
    const word = wordObj.word;
    const targetChar = word[this.charIdx];
    return {
      word: word,
      char: targetChar,
      charIdx: this.charIdx,
      hint: wordObj.hint || '',
      category: wordObj.category || ''
    };
  }

  handleInput(char) {
    const target = this.getCurrentTarget();
    if (!target) return;

    this.totalTyped++;
    if (char === target.char) {
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
            this.options.onComplete({
              totalTyped: this.totalTyped,
              accuracy: Math.round((this.correctCount / this.totalTyped) * 100)
            });
          }
          return;
        }
      }

      this.updateTarget();
    } else {
      this.errorCount++;
      sounds.playError();
      this.flashErrorKey();
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

    // ອັບເດດຂໍ້ຄວາມແນະນຳເທິງ UI
    const targetDisplay = document.getElementById('trainer-target-word');
    const fingerDisplay = document.getElementById('trainer-finger-hint');
    const shiftBadge = document.getElementById('trainer-shift-badge');

    if (targetDisplay) {
      let html = '';
      for (let i = 0; i < target.word.length; i++) {
        if (i < this.charIdx) {
          html += `<span class="char correct">${target.word[i]}</span>`;
        } else if (i === this.charIdx) {
          html += `<span class="char active-target">${target.word[i]}</span>`;
        } else {
          html += `<span class="char pending">${target.word[i]}</span>`;
        }
      }
      targetDisplay.innerHTML = html;
    }

    if (fingerDisplay) {
      fingerDisplay.textContent = fingerName ? `👉 ${fingerName}` : '';
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
      errors: this.errorCount
    };
  }
}
