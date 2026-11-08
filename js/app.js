/**
 * ລະບົບຄວບຄຸມຫຼັກຂອງເວັບເກມ "ພີມລາວ" (PhimLao Controller)
 */

class PhimLaoApp {
  constructor() {
    this.currentMode = 'speed'; // 'speed' | 'arcade' | 'trainer'
    this.difficulty = 'easy';
    this.autoTranslateLao = false; // ແປງປຸ່ມ QWERTY ເປັນລາວອັດຕະໂນມັດ
    this.showKeyboard = true;

    this.speedGame = null;
    this.arcadeGame = null;
    this.trainerGame = null;

    this.initElements();
    this.initVirtualKeyboard();
    this.initGames();
    this.bindEvents();
    this.loadHighScores();
  }

  initElements() {
    this.mobileInput = document.getElementById('mobile-input-sink');
    this.speedPanel = document.getElementById('panel-speed');
    this.arcadePanel = document.getElementById('panel-arcade');
    this.trainerPanel = document.getElementById('panel-trainer');
    this.virtualKeyboardEl = document.getElementById('virtual-keyboard');

    // ສະຖິຕິເທິງແຖບ
    this.statWpm = document.getElementById('stat-wpm');
    this.statAccuracy = document.getElementById('stat-accuracy');
    this.statTimer = document.getElementById('stat-timer');
    this.statScore = document.getElementById('stat-score');
    this.statLives = document.getElementById('stat-lives');
    this.statCombo = document.getElementById('stat-combo');

    // Modals
    this.resultModal = document.getElementById('result-modal');
  }

  initVirtualKeyboard() {
    if (!this.virtualKeyboardEl) return;

    const keyboardRows = [
      // Row 0
      [
        { code: 'Backquote', qwerty: '`', normal: '`', shift: '~', finger: 'l-pinky' },
        { code: 'Digit1', qwerty: '1', normal: '1', shift: 'ຢ', finger: 'l-pinky' },
        { code: 'Digit2', qwerty: '2', normal: '2', shift: 'ຟ', finger: 'l-ring' },
        { code: 'Digit3', qwerty: '3', normal: '3', shift: 'ໂ', finger: 'l-mid' },
        { code: 'Digit4', qwerty: '4', normal: '4', shift: 'ຖ', finger: 'l-index' },
        { code: 'Digit5', qwerty: '5', normal: '5', shift: 'ຸ', finger: 'l-index' },
        { code: 'Digit6', qwerty: '6', normal: '6', shift: 'ູ', finger: 'r-index' },
        { code: 'Digit7', qwerty: '7', normal: '7', shift: 'ຄ', finger: 'r-index' },
        { code: 'Digit8', qwerty: '8', normal: '8', shift: 'ຕ', finger: 'r-mid' },
        { code: 'Digit9', qwerty: '9', normal: '9', shift: 'ຈ', finger: 'r-ring' },
        { code: 'Digit0', qwerty: '0', normal: '0', shift: 'ຂ', finger: 'r-pinky' },
        { code: 'Minus', qwerty: '-', normal: '-', shift: 'ຊ', finger: 'r-pinky' },
        { code: 'Equal', qwerty: '=', normal: '=', shift: 'ໍ', finger: 'r-pinky' },
        { code: 'Backspace', qwerty: 'Bksp', normal: 'Bksp', shift: 'Bksp', width: 'w-backspace', finger: 'r-pinky' }
      ],
      // Row 1
      [
        { code: 'Tab', qwerty: 'Tab', normal: 'Tab', shift: 'Tab', width: 'w-tab', finger: 'l-pinky' },
        { code: 'KeyQ', qwerty: 'Q', normal: 'ົ', shift: 'ົ້', finger: 'l-pinky' },
        { code: 'KeyW', qwerty: 'W', normal: 'ໄ', shift: '0', finger: 'l-ring' },
        { code: 'KeyE', qwerty: 'E', normal: 'ຳ', shift: '*', finger: 'l-mid' },
        { code: 'KeyR', qwerty: 'R', normal: 'ພ', shift: '_', finger: 'l-index' },
        { code: 'KeyT', qwerty: 'T', normal: 'ະ', shift: '+', finger: 'l-index' },
        { code: 'KeyY', qwerty: 'Y', normal: 'ິ', shift: 'ິ້', finger: 'r-index' },
        { code: 'KeyU', qwerty: 'U', normal: 'ີ', shift: 'ີ້', finger: 'r-index' },
        { code: 'KeyI', qwerty: 'I', normal: 'ຮ', shift: 'ຣ', finger: 'r-mid' },
        { code: 'KeyO', qwerty: 'O', normal: 'ນ', shift: 'ໜ', finger: 'r-ring' },
        { code: 'KeyP', qwerty: 'P', normal: 'ຍ', shift: 'ຽ', finger: 'r-pinky' },
        { code: 'BracketLeft', qwerty: '[', normal: 'ບ', shift: '{', finger: 'r-pinky' },
        { code: 'BracketRight', qwerty: ']', normal: 'ລ', shift: '}', finger: 'r-pinky' },
        { code: 'Backslash', qwerty: '\\', normal: '\\', shift: '|', finger: 'r-pinky' }
      ],
      // Row 2
      [
        { code: 'CapsLock', qwerty: 'Caps', normal: 'Caps', shift: 'Caps', width: 'w-caps', finger: 'l-pinky' },
        { code: 'KeyA', qwerty: 'A', normal: 'ັ', shift: 'ັ້', finger: 'l-pinky' },
        { code: 'KeyS', qwerty: 'S', normal: 'ຫ', shift: ';', finger: 'l-ring' },
        { code: 'KeyD', qwerty: 'D', normal: 'ກ', shift: '.', finger: 'l-mid' },
        { code: 'KeyF', qwerty: 'F', normal: 'ດ', shift: ',', finger: 'l-index' },
        { code: 'KeyG', qwerty: 'G', normal: 'ເ', shift: ':', finger: 'l-index' },
        { code: 'KeyH', qwerty: 'H', normal: '້', shift: '໊', finger: 'r-index' },
        { code: 'KeyJ', qwerty: 'J', normal: '່', shift: '໋', finger: 'r-index' },
        { code: 'KeyK', qwerty: 'K', normal: 'າ', shift: '!', finger: 'r-mid' },
        { code: 'KeyL', qwerty: 'L', normal: 'ສ', shift: '?', finger: 'r-ring' },
        { code: 'Semicolon', qwerty: ';', normal: 'ວ', shift: '"', finger: 'r-pinky' },
        { code: 'Quote', qwerty: '\'', normal: 'ງ', shift: '\'', finger: 'r-pinky' },
        { code: 'Enter', qwerty: 'Enter', normal: 'Enter', shift: 'Enter', width: 'w-enter', finger: 'r-pinky' }
      ],
      // Row 3
      [
        { code: 'ShiftLeft', qwerty: 'Shift', normal: 'Shift', shift: 'Shift', width: 'w-shift', finger: 'l-pinky' },
        { code: 'KeyZ', qwerty: 'Z', normal: 'ຜ', shift: '₭', finger: 'l-pinky' },
        { code: 'KeyX', qwerty: 'X', normal: 'ປ', shift: '(', finger: 'l-ring' },
        { code: 'KeyC', qwerty: 'C', normal: 'ແ', shift: 'ຯ', finger: 'l-mid' },
        { code: 'KeyV', qwerty: 'V', normal: 'ອ', shift: 'x', finger: 'l-index' },
        { code: 'KeyB', qwerty: 'B', normal: 'ຶ', shift: 'ຶ້', finger: 'l-index' },
        { code: 'KeyN', qwerty: 'N', normal: 'ື', shift: 'ື້', finger: 'r-index' },
        { code: 'KeyM', qwerty: 'M', normal: 'ທ', shift: 'ໆ', finger: 'r-index' },
        { code: 'Comma', qwerty: ',', normal: 'ມ', shift: 'ໝ', finger: 'r-mid' },
        { code: 'Period', qwerty: '.', normal: 'ໃ', shift: '$', finger: 'r-ring' },
        { code: 'Slash', qwerty: '/', normal: 'ຝ', shift: ')', finger: 'r-pinky' },
        { code: 'ShiftRight', qwerty: 'Shift', normal: 'Shift', shift: 'Shift', width: 'w-shift', finger: 'r-pinky' }
      ],
      // Row 4
      [
        { code: 'Space', qwerty: 'Space', normal: ' ', shift: ' ', width: 'w-space', finger: 'thumb' }
      ]
    ];

    this.virtualKeyboardEl.innerHTML = '';
    keyboardRows.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'kb-row';

      row.forEach(k => {
        const keyBtn = document.createElement('button');
        keyBtn.type = 'button';
        keyBtn.className = `key finger-${k.finger} ${k.width || ''}`;
        keyBtn.dataset.code = k.code;
        keyBtn.dataset.normal = k.normal;
        keyBtn.dataset.shift = k.shift;

        if (['Bksp', 'Tab', 'Caps', 'Enter', 'Shift'].includes(k.normal)) {
          keyBtn.innerHTML = `<span class="key-special">${k.qwerty}</span>`;
        } else if (k.code === 'Space') {
          keyBtn.innerHTML = `<span class="key-special">ຍະຫວ່າງ (Spacebar)</span>`;
        } else {
          keyBtn.innerHTML = `
            <span class="key-shift">${k.shift !== k.normal ? k.shift : ''}</span>
            <span class="key-normal">${k.normal}</span>
            <span class="key-qwerty">${k.qwerty}</span>
          `;
        }

        // ຮອງຮັບການກົດປຸ່ມເທິງໜ້າຈໍສຳລັບ Mobile / Touch
        keyBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleVirtualKeyPress(k);
        });

        rowDiv.appendChild(keyBtn);
      });

      this.virtualKeyboardEl.appendChild(rowDiv);
    });
  }

  initGames() {
    // 1. Speed Test Game
    this.speedGame = new SpeedTestGame('speed-words-container', {
      difficulty: this.difficulty,
      mode: 'time',
      timeLimit: 30,
      onUpdate: (stats) => this.updateSpeedStats(stats),
      onFinish: (stats) => this.showSpeedResults(stats)
    });
    this.speedGame.init();

    // 2. Arcade Game
    this.arcadeGame = new ArcadeGame('arcade-canvas', {
      difficulty: this.difficulty,
      onUpdate: (stats) => this.updateArcadeStats(stats),
      onGameOver: (stats) => this.showArcadeResults(stats)
    });
    this.arcadeGame.init();

    // 3. Trainer Game
    this.trainerGame = new KeyboardTrainer({
      difficulty: this.difficulty,
      onProgress: (stats) => this.updateTrainerStats(stats),
      onComplete: (stats) => this.showTrainerResults(stats)
    });
    this.trainerGame.init();
  }

  bindEvents() {
    // Switch Modes
    document.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.switchMode(btn.dataset.mode);
      });
    });

    // Switch Difficulty
    document.querySelectorAll('[data-diff]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-diff]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.switchDifficulty(btn.dataset.diff);
      });
    });

    // Time/Words settings for Speed mode
    document.querySelectorAll('[data-speed-setting]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-speed-setting]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const [mode, val] = btn.dataset.speedSetting.split(':');
        this.speedGame.setMode(mode, parseInt(val, 10));
      });
    });

    // Audio Mute Toggle
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        const isMuted = sounds.toggleMute();
        soundToggle.innerHTML = isMuted ? '🔇 ສຽງ: ປິດ' : '🔊 ສຽງ: ເປີດ';
        soundToggle.classList.toggle('muted', isMuted);
      });
    }

    // Auto-Translate Lao Keyboard Toggle (ສຳລັບຄອມທີ່ບໍ່ມີຄີບອດລາວ)
    const autoTranslateToggle = document.getElementById('auto-translate-toggle');
    if (autoTranslateToggle) {
      autoTranslateToggle.addEventListener('click', () => {
        this.autoTranslateLao = !this.autoTranslateLao;
        autoTranslateToggle.classList.toggle('active', this.autoTranslateLao);
        autoTranslateToggle.textContent = this.autoTranslateLao 
          ? '🇱🇦 ແປ້ນພິມ: ອັດຕະໂນມັດ (ເປີດ)' 
          : '⌨️ ແປ້ນພິມ: ຕາມລະບົບ';
      });
    }

    // Keyboard Visibility Toggle
    const kbToggle = document.getElementById('kb-visibility-toggle');
    if (kbToggle) {
      kbToggle.addEventListener('click', () => {
        this.showKeyboard = !this.showKeyboard;
        this.virtualKeyboardEl.style.display = this.showKeyboard ? 'flex' : 'none';
        kbToggle.classList.toggle('active', this.showKeyboard);
      });
    }

    // Restart Button
    document.querySelectorAll('.btn-restart-game').forEach(btn => {
      btn.addEventListener('click', () => this.restartCurrentGame());
    });

    // Modal Close / Play Again
    const playAgainBtn = document.getElementById('btn-play-again');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        this.resultModal.style.display = 'none';
        this.restartCurrentGame();
      });
    }

    // Global Keydown Listener
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Focus mobile input on tap to show mobile keyboard
    document.addEventListener('click', (e) => {
      if (!e.target.closest('button, input, select, textarea, a')) {
        if (this.mobileInput) {
          this.mobileInput.focus();
        }
      }
    });

    // Mobile input sink listener
    if (this.mobileInput) {
      this.mobileInput.addEventListener('input', (e) => {
        const val = this.mobileInput.value;
        if (val.length > 0) {
          const char = val[val.length - 1];
          this.routeCharacterInput(char);
          this.mobileInput.value = '';
        }
      });
    }
  }

  handleKeyDown(e) {
    // ຍົກເວັ້ນປຸ່ມຄວບຄຸມລະບົບ
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Tab') {
      e.preventDefault();
      this.restartCurrentGame();
      return;
    }

    // ເອັບເຟັກກົດປຸ່ມເທິງແປ້ນພິມສະເໝືອນ
    const keyEl = document.querySelector(`.key[data-code="${e.code}"]`);
    if (keyEl) {
      keyEl.classList.add('key-active');
      setTimeout(() => keyEl.classList.remove('key-active'), 150);
    }

    let char = e.key;

    // ຖ້າເປີດໂໝດ Auto-Translate Lao (ພິມ QWERTY ແລ້ວແປງເປັນ Saysettha Lao)
    if (this.autoTranslateLao) {
      const translated = translatePhysicalKeyToLao(e.code, e.shiftKey);
      if (translated) {
        char = translated;
      }
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      if (this.currentMode === 'speed') {
        this.speedGame.handleInput('', true, false);
      }
      return;
    }

    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      if (this.currentMode === 'speed') {
        this.speedGame.handleInput('', false, true);
      } else if (this.currentMode === 'arcade') {
        this.arcadeGame.handleInput(' ');
      } else if (this.currentMode === 'trainer') {
        this.trainerGame.handleInput(' ');
      }
      return;
    }

    // ຖ້າເປັນຕົວອັກສອນດ່ຽວ (ລວມທັງສະຫຼະລາວ ແລະ ວັນນະຍຸດ)
    if (char && char.length === 1 && isValidLaoChar(char)) {
      this.routeCharacterInput(char);
    }
  }

  handleVirtualKeyPress(keyInfo) {
    sounds.playKeyClick();
    const char = keyInfo.normal;
    if (char === 'Bksp') {
      if (this.currentMode === 'speed') {
        this.speedGame.handleInput('', true, false);
      }
    } else if (char === ' ') {
      if (this.currentMode === 'speed') {
        this.speedGame.handleInput('', false, true);
      } else if (this.currentMode === 'arcade') {
        this.arcadeGame.handleInput(' ');
      } else if (this.currentMode === 'trainer') {
        this.trainerGame.handleInput(' ');
      }
    } else if (char && char.length === 1) {
      this.routeCharacterInput(char);
    }
  }

  routeCharacterInput(char) {
    if (this.currentMode === 'speed') {
      this.speedGame.handleInput(char);
    } else if (this.currentMode === 'arcade') {
      this.arcadeGame.handleInput(char);
    } else if (this.currentMode === 'trainer') {
      this.trainerGame.handleInput(char);
    }
  }

  switchMode(mode) {
    this.currentMode = mode;

    this.speedPanel.style.display = mode === 'speed' ? 'block' : 'none';
    this.arcadePanel.style.display = mode === 'arcade' ? 'block' : 'none';
    this.trainerPanel.style.display = mode === 'trainer' ? 'block' : 'none';

    // ຈັດການແຖບສະຖິຕິຕາມໂໝດ
    document.getElementById('stats-speed-bar').style.display = mode === 'speed' ? 'flex' : 'none';
    document.getElementById('stats-arcade-bar').style.display = mode === 'arcade' ? 'flex' : 'none';
    document.getElementById('stats-trainer-bar').style.display = mode === 'trainer' ? 'flex' : 'none';

    this.restartCurrentGame();
  }

  switchDifficulty(diff) {
    this.difficulty = diff;
    this.speedGame.setDifficulty(diff);
    this.arcadeGame.setDifficulty(diff);
    this.trainerGame.setDifficulty(diff);
    this.restartCurrentGame();
  }

  restartCurrentGame() {
    if (this.resultModal) {
      this.resultModal.style.display = 'none';
    }

    if (this.currentMode === 'speed') {
      this.speedGame.reset();
    } else if (this.currentMode === 'arcade') {
      this.arcadeGame.start();
    } else if (this.currentMode === 'trainer') {
      this.trainerGame.reset();
    }
  }

  updateSpeedStats(stats) {
    if (this.statWpm) this.statWpm.textContent = stats.wpm;
    if (this.statAccuracy) this.statAccuracy.textContent = `${stats.accuracy}%`;
    if (this.statTimer) this.statTimer.textContent = `${stats.timeLeft}s`;
  }

  updateArcadeStats(stats) {
    if (this.statScore) this.statScore.textContent = stats.score;
    if (this.statLives) {
      let hearts = '';
      for (let i = 0; i < stats.maxLives; i++) {
        hearts += i < stats.lives ? '❤️' : '🖤';
      }
      this.statLives.textContent = hearts;
    }
    if (this.statCombo) this.statCombo.textContent = `${stats.combo}x`;
  }

  updateTrainerStats(stats) {
    const trainerProgress = document.getElementById('stat-trainer-progress');
    const trainerAcc = document.getElementById('stat-trainer-acc');
    if (trainerProgress) trainerProgress.textContent = stats.wordProgress;
    if (trainerAcc) trainerAcc.textContent = `${stats.accuracy}%`;
  }

  showSpeedResults(stats) {
    const title = document.getElementById('result-title');
    const details = document.getElementById('result-details');

    // ບັນທຶກສະຖິຕິສູງສຸດ
    const bestWpm = Math.max(stats.wpm, parseInt(localStorage.getItem('phimlao_best_wpm') || '0', 10));
    localStorage.setItem('phimlao_best_wpm', bestWpm);

    let rank = 'ມືໃໝ່ຮຽນພິມ 🌱';
    if (stats.wpm >= 60) rank = 'ລະດັບເທບພິມໄວ ⚡👑';
    else if (stats.wpm >= 40) rank = 'ລະດັບມືອາຊີບ 🚀';
    else if (stats.wpm >= 25) rank = 'ລະດັບປານກາງ 👍';

    if (title) title.textContent = '🎉 ສຳເລັດການທົດສອບຄວາມໄວ!';
    if (details) {
      details.innerHTML = `
        <div class="result-rank">${rank}</div>
        <div class="result-grid">
          <div class="res-card"><span class="val">${stats.wpm}</span><span class="lbl">WPM (ຄຳ/ນາທີ)</span></div>
          <div class="res-card"><span class="val">${stats.cpm}</span><span class="lbl">CPM (ຕົວອັກສອນ/ນາທີ)</span></div>
          <div class="res-card"><span class="val">${stats.accuracy}%</span><span class="lbl">ຄວາມຖືກຕ້ອງ</span></div>
          <div class="res-card"><span class="val">${bestWpm}</span><span class="lbl">WPM ສູງສຸດຂອງທ່ານ</span></div>
        </div>
      `;
    }

    if (this.resultModal) this.resultModal.style.display = 'flex';
  }

  showArcadeResults(stats) {
    const title = document.getElementById('result-title');
    const details = document.getElementById('result-details');

    const bestScore = Math.max(stats.score, parseInt(localStorage.getItem('phimlao_best_arcade') || '0', 10));
    localStorage.setItem('phimlao_best_arcade', bestScore);

    if (title) title.textContent = '💥 ຈົບເກມຝົນຄຳສັບ!';
    if (details) {
      details.innerHTML = `
        <div class="result-grid">
          <div class="res-card"><span class="val">${stats.score}</span><span class="lbl">ຄະແນນລວມ</span></div>
          <div class="res-card"><span class="val">${stats.maxCombo}x</span><span class="lbl">ຄອມໂບສູງສຸດ</span></div>
          <div class="res-card"><span class="val">${stats.wordsDestroyed}</span><span class="lbl">ຄຳສັບທີ່ຍິງໄດ້</span></div>
          <div class="res-card"><span class="val">${bestScore}</span><span class="lbl">ຄະແນນສູງສຸດ</span></div>
        </div>
      `;
    }

    if (this.resultModal) this.resultModal.style.display = 'flex';
  }

  showTrainerResults(stats) {
    const title = document.getElementById('result-title');
    const details = document.getElementById('result-details');

    if (title) title.textContent = '🌟 ສຳເລັດບົດຝຶກແປ້ນພິມ!';
    if (details) {
      details.innerHTML = `
        <div class="result-grid">
          <div class="res-card"><span class="val">${stats.accuracy}%</span><span class="lbl">ຄວາມຖືກຕ້ອງ</span></div>
          <div class="res-card"><span class="val">${stats.totalTyped}</span><span class="lbl">ຕົວອັກສອນທີ່ພິມ</span></div>
        </div>
      `;
    }

    if (this.resultModal) this.resultModal.style.display = 'flex';
  }

  loadHighScores() {
    const bestWpm = localStorage.getItem('phimlao_best_wpm') || '0';
    const topWpmEl = document.getElementById('top-wpm-badge');
    if (topWpmEl) {
      topWpmEl.textContent = `🏆 WPM ສູງສຸດ: ${bestWpm}`;
    }
  }
}

// ເລີ່ມຕົ້ນລະບົບເມື່ອໂຫຼດໜ້າເວັບສຳເລັດ
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PhimLaoApp();
});
