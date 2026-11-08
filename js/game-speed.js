/**
 * ໂໝດທົດສອບຄວາມໄວການພິມ (Speed Test Mode - Monkeytype Style)
 * ປັບປຸງການລົງສີເຕັມໂຕ 100% ແຍກລະຫວ່າງພະຍັນຊະນະ ແລະ ສະຫຼະ ພ້ອມປຸ່ມ Tab ເລື່ອນຄຳສັບ
 */

class SpeedTestGame {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = Object.assign({
      difficulty: 'easy',
      mode: 'time', // 'time' ຫຼື 'words'
      timeLimit: 30, // ວິນາທີ
      wordLimit: 25, // ຈຳນວນຄຳສັບ
      onFinish: null,
      onUpdate: null
    }, options);

    this.wordsList = [];
    this.currentWordIdx = 0;
    this.currentInput = '';
    this.history = [];

    this.startTime = null;
    this.timerInterval = null;
    this.timeLeft = this.options.timeLimit;
    this.isActive = false;
    this.isFinished = false;

    this.totalTypedChars = 0;
    this.correctChars = 0;
    this.errorChars = 0;
    this.mistypedWords = {};
    this.mistypedChars = {};
  }

  init() {
    this.reset();
  }

  setDifficulty(diff) {
    this.options.difficulty = diff;
    this.reset();
  }

  setMode(mode, val) {
    this.options.mode = mode;
    if (mode === 'time') {
      this.options.timeLimit = val;
      this.timeLeft = val;
    } else {
      this.options.wordLimit = val;
    }
    this.reset();
  }

  reset() {
    clearInterval(this.timerInterval);
    this.isActive = false;
    this.isFinished = false;
    this.startTime = null;
    this.currentWordIdx = 0;
    this.currentInput = '';
    this.history = [];
    this.totalTypedChars = 0;
    this.correctChars = 0;
    this.errorChars = 0;
    this.mistypedWords = {};
    this.mistypedChars = {};
    this.timeLeft = this.options.timeLimit;

    this.generateWords();
    this.render();
    if (this.options.onUpdate) {
      this.options.onUpdate(this.getStats());
    }
  }

  generateWords() {
    const rawList = LAO_WORDS[this.options.difficulty] || LAO_WORDS.easy;
    const count = this.options.mode === 'words' ? this.options.wordLimit : 60;
    
    const shuffled = [...rawList].sort(() => 0.5 - Math.random());
    this.wordsList = [];
    while (this.wordsList.length < count) {
      for (const item of shuffled) {
        if (this.wordsList.length >= count) break;
        this.wordsList.push(item.word.normalize('NFC'));
      }
    }
  }

  start() {
    if (this.isActive || this.isFinished) return;
    this.isActive = true;
    this.startTime = Date.now();

    if (this.options.mode === 'time') {
      this.timerInterval = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          this.timeLeft = 0;
          this.finish();
        }
        if (this.options.onUpdate) {
          this.options.onUpdate(this.getStats());
        }
      }, 1000);
    }
  }

  finish() {
    clearInterval(this.timerInterval);
    this.isActive = false;
    this.isFinished = true;
    sounds.playGameOver(true);

    const stats = this.getStats();
    if (this.options.onFinish) {
      this.options.onFinish(stats);
    }
  }

  // ເລື່ອນໄປຄຳສັບຖັດໄປ (ເມື່ອກົດ Space ຫຼື Tab)
  advanceToNextWord(isSkip = false) {
    if (this.isFinished) return;
    if (!this.isActive) this.start();

    // ຫາກຍັງບໍ່ທັນພິມຫຍັງ ແລະ ບໍ່ແມ່ນການກົດ Tab (ຂ້າມຄຳ) ໃຫ້ຢູ່ຄຳເດີມ
    if (!isSkip && this.currentInput.length === 0) {
      return;
    }

    const currentWord = this.wordsList[this.currentWordIdx];
    if (!currentWord) return;

    const normalizedInput = this.currentInput.normalize('NFC').trim();
    const normalizedTarget = currentWord.normalize('NFC').trim();

    // ປຽບທຽບດ້ວຍ canonicalizeLao ເພື່ອຮອງຮັບ ໝ<->ຫມ, ໜ<->ຫນ, ຫຼ<->ຫລ, ສະຫຼະ-ວັນນະຍຸດ
    const isWordCorrect = (canonicalizeLao(normalizedInput) === canonicalizeLao(normalizedTarget));
    this.history.push({
      expected: normalizedTarget,
      typed: normalizedInput,
      correct: isWordCorrect
    });

    const currentWordEl = document.getElementById(`speed-word-${this.currentWordIdx}`);
    if (currentWordEl) {
      currentWordEl.classList.remove('current', 'has-error');

      // ເຄຼຍ ແລະ ເຊື່ອງ overlay ຂອງຄຳສັບທີ່ພິມແລ້ວທັນທີ (ເພື່ອບໍ່ໃຫ້ caret | ຕົກຄ້າງ)
      const overlayEl = currentWordEl.querySelector('.word-overlay');
      if (overlayEl) {
        overlayEl.innerHTML = '';
        overlayEl.style.display = 'none';
      }

      const baseEl = currentWordEl.querySelector('.word-base');

      if (isWordCorrect) {
        currentWordEl.classList.add('word-correct');
        this.correctChars += normalizedTarget.length + 1;
        if (baseEl) {
          baseEl.textContent = normalizedTarget;
          baseEl.style.visibility = 'visible';
        }
        sounds.playWordComplete();
      } else {
        currentWordEl.classList.add('word-incorrect');
        this.errorChars += Math.max(1, Math.abs(normalizedTarget.length - normalizedInput.length));
        this.mistypedWords[normalizedTarget] = (this.mistypedWords[normalizedTarget] || 0) + 1;
        if (baseEl) {
          baseEl.textContent = normalizedInput.length > 0 ? normalizedInput : normalizedTarget;
          baseEl.style.visibility = 'visible';
        }
        sounds.playError();
      }
    }

    this.currentWordIdx++;
    this.currentInput = '';

    // ກວດສອບໂໝດຄົບຈຳນວນຄຳ
    if (this.options.mode === 'words' && this.currentWordIdx >= this.wordsList.length) {
      this.finish();
      return;
    }

    // ຖ້າໃກ້ໝົດລາຍການຄຳສັບໃນໂໝດເວລາ ໃຫ້ເພີ່ມອີກ
    if (this.currentWordIdx >= this.wordsList.length - 10) {
      const extra = [...LAO_WORDS[this.options.difficulty]].sort(() => 0.5 - Math.random());
      const extraStrings = [];
      for (const item of extra) {
        const norm = item.word.normalize('NFC');
        this.wordsList.push(norm);
        extraStrings.push(norm);
      }
      this.appendExtraWords(extraStrings);
    }

    // ໄຮໄລ້ຄຳຖັດໄປ
    const nextWordEl = document.getElementById(`speed-word-${this.currentWordIdx}`);
    if (nextWordEl) {
      nextWordEl.classList.add('current');
    }

    this.renderWord(this.currentWordIdx);
    this.scrollToCurrentWord();
    if (this.options.onUpdate) {
      this.options.onUpdate(this.getStats());
    }
  }

  handleInput(char, isBackspace = false, isSpace = false) {
    if (this.isFinished) return;

    if (!this.isActive) {
      this.start();
    }

    const currentWord = this.wordsList[this.currentWordIdx];
    if (!currentWord) return;

    if (isBackspace) {
      if (this.currentInput.length > 0) {
        if (this.currentInput.endsWith('ຫຼ')) {
          this.currentInput = this.currentInput.slice(0, -2);
        } else {
          this.currentInput = this.currentInput.slice(0, -1);
        }
        this.renderWord(this.currentWordIdx);
        sounds.playKeyClick();
      }
      return;
    }

    if (isSpace) {
      if (this.currentInput.length === 0) return;
      this.advanceToNextWord();
      return;
    }

    // ຈຳກັດຄວາມຍາວບໍ່ໃຫ້ພິມເກີນຄຳສັບເປົ້າໝາຍຫຼາຍເກີນໄປ (ປ້ອງກັນຕົວໜັງສືລົ້ນຕຳໃສ່ຄຳສັບຖັດໄປ)
    if (this.currentInput.length > currentWord.length + 2) {
      sounds.playError();
      return;
    }

    // ກໍລະນີພິມຕົວອັກສອນ
    this.totalTypedChars++;
    this.currentInput += char;

    const normalizedInput = this.currentInput.normalize('NFC');
    const normalizedTarget = currentWord.normalize('NFC');

    // ກວດສອບຄວາມຖືກຕ້ອງດ້ວຍ isLaoPrefixMatch (ຮອງຮັບທັງ ນ້ຳ ແລະ ນຳ້, ໝູ ແລະ ຫມູ)
    const isPrefixMatch = (typeof isLaoPrefixMatch === 'function')
      ? isLaoPrefixMatch(normalizedTarget, normalizedInput)
      : canonicalizeLao(normalizedTarget).startsWith(canonicalizeLao(normalizedInput));

    if (isPrefixMatch) {
      this.correctChars++;
      sounds.playCorrectChar();
    } else {
      this.errorChars++;
      sounds.playError();
      this.mistypedChars[char] = (this.mistypedChars[char] || 0) + 1;
      this.mistypedWords[normalizedTarget] = (this.mistypedWords[normalizedTarget] || 0) + 1;
    }

    this.renderWord(this.currentWordIdx);
    if (this.options.onUpdate) {
      this.options.onUpdate(this.getStats());
    }
  }

  getStats() {
    let elapsedMin = 0.01;
    if (this.startTime) {
      const now = this.isFinished ? (this.startTime + (this.options.timeLimit - this.timeLeft) * 1000) : Date.now();
      elapsedMin = Math.max((now - this.startTime) / 60000, 0.01);
    }

    const wpm = Math.round((this.correctChars / 5) / elapsedMin);
    const cpm = Math.round(this.correctChars / elapsedMin);
    const totalTyped = this.correctChars + this.errorChars;
    const accuracy = totalTyped > 0 ? Math.round((this.correctChars / totalTyped) * 100) : 100;

    return {
      wpm: Math.max(0, wpm),
      cpm: Math.max(0, cpm),
      accuracy: Math.min(100, Math.max(0, accuracy)),
      timeLeft: this.timeLeft,
      currentWord: this.currentWordIdx + 1,
      totalWords: this.options.mode === 'words' ? this.options.wordLimit : this.wordsList.length,
      correctChars: this.correctChars,
      errorChars: this.errorChars,
      mistypedWords: this.mistypedWords,
      mistypedChars: this.mistypedChars
    };
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const wordsWrapper = document.createElement('div');
    wordsWrapper.className = 'speed-words-wrapper';
    wordsWrapper.id = 'speed-words-stream';

    this.wordsList.forEach((word, idx) => {
      const wordSpan = this.createWordElement(word, idx);
      if (idx === this.currentWordIdx) {
        wordSpan.classList.add('current');
      }
      wordsWrapper.appendChild(wordSpan);
    });

    this.container.appendChild(wordsWrapper);
    this.renderWord(this.currentWordIdx);
  }

  createWordElement(word, idx) {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'speed-word';
    wordSpan.id = `speed-word-${idx}`;

    // ຊັ້ນທີ 1 (Base): ຄຳສັບເຕັມສີເທົາ (ບໍ່ຕັດແຍກສະຫຼະ)
    const baseSpan = document.createElement('span');
    baseSpan.className = 'word-base';
    baseSpan.textContent = word;
    wordSpan.appendChild(baseSpan);

    // ຊັ້ນທີ 2 (Overlay): ຂໍ້ຄວາມທີ່ພິມຖືກຕ້ອງ (ລົງສີເຕັມໂຕ ບໍ່ຕັດເຄິ່ງສະຫຼະ)
    const overlaySpan = document.createElement('span');
    overlaySpan.className = 'word-overlay';
    overlaySpan.textContent = '';
    wordSpan.appendChild(overlaySpan);

    return wordSpan;
  }

  appendExtraWords(extraWords) {
    const stream = document.getElementById('speed-words-stream');
    if (!stream) return;
    const startIndex = this.wordsList.length - extraWords.length;
    extraWords.forEach((word, idx) => {
      const el = this.createWordElement(word, startIndex + idx);
      stream.appendChild(el);
    });
  }

  renderWord(wordIdx) {
    const wordEl = document.getElementById(`speed-word-${wordIdx}`);
    if (!wordEl) return;

    const targetWord = (this.wordsList[wordIdx] || '').normalize('NFC');
    const input = this.currentInput.normalize('NFC');
    const overlayEl = wordEl.querySelector('.word-overlay');
    const baseEl = wordEl.querySelector('.word-base');

    wordEl.classList.remove('has-error');

    if (input.length === 0) {
      if (baseEl) {
        baseEl.textContent = targetWord;
        baseEl.style.visibility = 'visible';
      }
      if (overlayEl) {
        if (wordIdx === this.currentWordIdx) {
          overlayEl.style.display = 'inline-block';
          overlayEl.innerHTML = '<span class="word-caret"></span>';
        } else {
          overlayEl.style.display = 'none';
          overlayEl.innerHTML = '';
        }
        overlayEl.className = 'word-overlay';
      }
      return;
    }

    // ກວດສອບຄວາມຖືກຕ້ອງດ້ວຍ isLaoPrefixMatch
    const isPrefixMatch = (typeof isLaoPrefixMatch === 'function')
      ? isLaoPrefixMatch(targetWord, input)
      : canonicalizeLao(targetWord).startsWith(canonicalizeLao(input));

    if (isPrefixMatch) {
      // ພິມຖືກຕ້ອງ -> ລົງສີສະເພາະສ່ວນທີ່ພິມຖືກເຕັມໂຕ 100% ພ້ອມ Caret ຊີ້ບອກຕຳແໜ່ງ
      if (baseEl) {
        baseEl.textContent = targetWord;
        baseEl.style.visibility = 'visible';
      }
      if (overlayEl) {
        const matched = (typeof getMatchedTargetPrefix === 'function') 
          ? getMatchedTargetPrefix(targetWord, input) 
          : input;
        overlayEl.style.display = 'inline-block';
        overlayEl.innerHTML = `${matched}<span class="word-caret"></span>`;
        overlayEl.className = 'word-overlay match';
      }
    } else {
      // ພິມຜິດ -> ແຍກສ່ວນທີ່ພິມຖືກ (ສີຟ້າ) ແລະ ສ່ວນທີ່ພິມຜິດ (ສີແດງ) ຢ່າງຈະແຈ້ງ
      // ແລະ ເຊື່ອງຕົວອັກສອນ base ທີ່ຖືກ typed ທັບ ເພື່ອບໍ່ໃຫ້ເກີດການຊ້ອນກັນ (Double Rendering)
      wordEl.classList.add('has-error');

      // ຊອກຫາສ່ວນນຳໜ້າທີ່ພິມຖືກຕ້ອງຍາວທີ່ສຸດ
      let matched = '';
      let wrong = input;
      for (let i = input.length - 1; i >= 1; i--) {
        const sub = input.substring(0, i);
        if (typeof isLaoPrefixMatch === 'function' && isLaoPrefixMatch(targetWord, sub)) {
          matched = (typeof getMatchedTargetPrefix === 'function')
            ? getMatchedTargetPrefix(targetWord, sub)
            : sub;
          wrong = input.substring(i);
          break;
        }
      }

      if (overlayEl) {
        overlayEl.style.display = 'inline-block';
        overlayEl.innerHTML = `${matched}<span class="char-err">${wrong}</span><span class="word-caret error-caret"></span>`;
        overlayEl.className = 'word-overlay error';
      }

      if (baseEl) {
        // ເຊື່ອງ base text ຕາມຈຳນວນຕົວອັກສອນທີ່ພິມແລ້ວ ເພື່ອບໍ່ໃຫ້ຕົວສີແດງຊ້ອນທັບຕົວສີເທົາ
        const coveredLen = Math.min(matched.length + wrong.length, targetWord.length);
        const hiddenPart = targetWord.substring(0, coveredLen);
        const remainingPart = targetWord.substring(coveredLen);
        baseEl.innerHTML = `<span style="visibility:hidden">${hiddenPart}</span>${remainingPart}`;
      }
    }
  }

  scrollToCurrentWord() {
    const wordEl = document.getElementById(`speed-word-${this.currentWordIdx}`);
    if (!wordEl) return;
    const stream = document.getElementById('speed-words-stream');
    if (!stream) return;

    const streamTop = stream.offsetTop;
    const wordTop = wordEl.offsetTop - streamTop;

    // ຫາກຄຳສັບຢູ່ແຖວທີ 2 ຫຼື ເກີນນັ້ນ ໃຫ້ເລື່ອນ stream ຂຶ້ນເພື່ອໃຫ້ຄຳສັບປັດຈຸບັນຢູ່ແຖວທີ່ເຫັນໄດ້ຊັດເຈນ
    if (wordTop - stream.scrollTop >= 65) {
      stream.scrollTop = wordTop - 7;
    } else if (wordTop < stream.scrollTop) {
      stream.scrollTop = wordTop - 7;
    }
  }
}
