/**
 * ລະບົບຄວບຄຸມຫຼັກຂອງເວັບເກມ "ພີມລາວ" (PhimLao Controller)
 * ຜັງແປ້ນພິມມາດຕະຖານແທ້ 100% ພ້ອມ ຫຼ, ໜ, ໝ, ຣ, ຽ, ຼ, ₭, ໆ, ຯ, ໊, ໋, ໌
 * ຮອງຮັບ Shift Dynamic, ປຸ່ມ Tab ເລື່ອນຄຳສັບ, ແລະ ແປງປຸ່ມ QWERTY ອັດຕະໂນມັດ
 */

class PhimLaoApp {
  constructor() {
    this.currentMode = 'speed'; // 'speed' | 'arcade' | 'trainer'
    this.difficulty = 'easy';
    this.autoTranslateLao = true; // ເປີດແປງປຸ່ມ QWERTY -> ລາວ ອັດຕະໂນມັດເປັນຄ່າເລີ່ມຕົ້ນ

    // ເປີດແປ້ນພິມສະເໝືອນທັງໃນຄອມ ແລະ ມືຖື ພ້ອມປັບຂະໜາດໃຫ້ພໍດີກັບຈໍໂທລະສັບ
    this.showKeyboard = true;
    this.isShiftActive = false; // ສະຖານະການກົດປຸ່ມ Shift
    this.lastProcessedTime = 0; // ປ້ອງກັນການກົດຊ້ຳ 2 ຄັ້ງ (Duplicate Event Guard)

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

    // Drawer Elements (ເມນູລີ້ນຊັກຕັ້ງຄ່າ)
    this.settingsDrawer = document.getElementById('settings-drawer');
    this.drawerBackdrop = document.getElementById('drawer-backdrop');
    this.drawerToggleBtn = document.getElementById('drawer-toggle-btn');
    this.drawerCloseBtn = document.getElementById('drawer-close-btn');
    this.drawerKbToggle = document.getElementById('drawer-kb-toggle');
    this.drawerSoundToggle = document.getElementById('drawer-sound-toggle');
    this.drawerAutoTranslateToggle = document.getElementById('drawer-autotranslate-toggle');
    this.drawerHighWpm = document.getElementById('drawer-high-wpm');
    this.drawerHighAcc = document.getElementById('drawer-high-acc');

    // Header Controls
    this.kbToggleBtn = document.getElementById('kb-visibility-toggle');
    this.autoTranslateToggle = document.getElementById('auto-translate-toggle');
    this.soundToggle = document.getElementById('sound-toggle');

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

    const rowCodes = [
      // Row 0
      ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
      // Row 1
      ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
      // Row 2
      ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
      // Row 3
      ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
      // Row 4
      ['Space']
    ];

    const specialLabels = {
      'Backspace': { qwerty: 'Bksp', width: 'w-backspace', label: 'Bksp ⌫' },
      'Tab': { qwerty: 'Tab', width: 'w-tab', label: 'Tab ⇥' },
      'CapsLock': { qwerty: 'Caps', width: 'w-caps', label: 'Caps ⇪' },
      'Enter': { qwerty: 'Enter', width: 'w-enter', label: 'Enter ↵' },
      'ShiftLeft': { qwerty: 'Shift', width: 'w-shift', label: 'Shift ⇧' },
      'ShiftRight': { qwerty: 'Shift', width: 'w-shift', label: 'Shift ⇧' },
      'Space': { qwerty: 'Space', width: 'w-space', label: 'ຍະຫວ່າງ (Spacebar)' }
    };

    this.virtualKeyboardEl.innerHTML = '';
    rowCodes.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'kb-row';

      row.forEach(code => {
        const special = specialLabels[code];
        const layoutInfo = LAO_KEYBOARD_LAYOUT[code] || {};
        const keyBtn = document.createElement('button');
        keyBtn.type = 'button';
        keyBtn.className = `key finger-${layoutInfo.finger || 'r-pinky'} ${special ? special.width : ''}`;
        keyBtn.dataset.code = code;
        keyBtn.dataset.normal = layoutInfo.normal || (special ? special.qwerty : '');
        keyBtn.dataset.shift = layoutInfo.shift || layoutInfo.normal || '';

        if (special) {
          keyBtn.innerHTML = `<span class="key-special">${special.label}</span>`;
        } else {
          keyBtn.innerHTML = `
            <span class="key-shift">${layoutInfo.shift !== layoutInfo.normal ? layoutInfo.shift : ''}</span>
            <span class="key-normal">${layoutInfo.normal}</span>
            <span class="key-qwerty">${layoutInfo.qwerty || ''}</span>
          `;
        }

        const triggerKey = (e) => {
          e.preventDefault();
          if (code === 'ShiftLeft' || code === 'ShiftRight' || code === 'CapsLock') {
            this.setShiftState(!this.isShiftActive);
            return;
          }
          this.handleVirtualKeyPress({
            code: code,
            normal: layoutInfo.normal || '',
            shift: layoutInfo.shift || ''
          });
        };

        keyBtn.addEventListener('pointerdown', (e) => {
          if (e.pointerType === 'touch') {
            triggerKey(e);
          }
        });
        keyBtn.addEventListener('click', (e) => {
          triggerKey(e);
        });

        rowDiv.appendChild(keyBtn);
      });

      this.virtualKeyboardEl.appendChild(rowDiv);
    });

    this.updateKeyboardVisibilityUI();
  }

  updateKeyboardVisibilityUI() {
    if (this.virtualKeyboardEl) {
      this.virtualKeyboardEl.style.display = this.showKeyboard ? 'flex' : 'none';
    }
    if (this.kbToggleBtn) {
      this.kbToggleBtn.classList.toggle('active', this.showKeyboard);
      this.kbToggleBtn.innerHTML = this.showKeyboard 
        ? '👁️ ແປ້ນພິມສະເໝືອນ (ເປີດ)' 
        : '👁️ ແປ້ນພິມສະເໝືອນ (ປິດ)';
    }
    if (this.drawerKbToggle) {
      this.drawerKbToggle.classList.toggle('active', this.showKeyboard);
      const span = this.drawerKbToggle.querySelector('.toggle-status');
      if (span) span.textContent = this.showKeyboard ? 'ເປີດ' : 'ປິດ';
    }
  }

  toggleVirtualKeyboard() {
    this.showKeyboard = !this.showKeyboard;
    this.updateKeyboardVisibilityUI();
  }

  updateSoundUI() {
    const isMuted = sounds.isMuted;
    if (this.soundToggle) {
      this.soundToggle.innerHTML = isMuted ? '🔇 ສຽງ: ປິດ' : '🔊 ສຽງ: ເປີດ';
      this.soundToggle.classList.toggle('muted', isMuted);
    }
    if (this.drawerSoundToggle) {
      this.drawerSoundToggle.classList.toggle('active', !isMuted);
      const span = this.drawerSoundToggle.querySelector('.toggle-status');
      if (span) span.textContent = isMuted ? 'ປິດ' : 'ເປີດ';
    }
  }

  toggleSound() {
    sounds.toggleMute();
    this.updateSoundUI();
  }

  updateAutoTranslateUI() {
    if (this.autoTranslateToggle) {
      this.autoTranslateToggle.classList.toggle('active', this.autoTranslateLao);
      this.autoTranslateToggle.textContent = this.autoTranslateLao 
        ? '🇱🇦 ແປ້ນພິມ: ອັດຕະໂນມັດ (ເປີດ)' 
        : '⌨️ ແປ້ນພິມ: ຕາມລະບົບ';
    }
    if (this.drawerAutoTranslateToggle) {
      this.drawerAutoTranslateToggle.classList.toggle('active', this.autoTranslateLao);
      const span = this.drawerAutoTranslateToggle.querySelector('.toggle-status');
      if (span) span.textContent = this.autoTranslateLao ? 'ເປີດ' : 'ປິດ';
    }
  }

  toggleAutoTranslate() {
    this.autoTranslateLao = !this.autoTranslateLao;
    this.updateAutoTranslateUI();
  }

  openDrawer() {
    if (this.settingsDrawer && this.drawerBackdrop) {
      this.settingsDrawer.classList.add('open');
      this.drawerBackdrop.classList.add('open');
      this.settingsDrawer.setAttribute('aria-hidden', 'false');
      this.syncDrawerStats();
    }
  }

  closeDrawer() {
    if (this.settingsDrawer && this.drawerBackdrop) {
      this.settingsDrawer.classList.remove('open');
      this.drawerBackdrop.classList.remove('open');
      this.settingsDrawer.setAttribute('aria-hidden', 'true');
    }
  }

  syncDrawerStats() {
    const bestWpm = localStorage.getItem('phimlao_best_wpm') || '0';
    if (this.drawerHighWpm) {
      this.drawerHighWpm.textContent = bestWpm;
    }
    if (this.drawerHighAcc) {
      this.drawerHighAcc.textContent = '100%';
    }
  }

  setShiftState(isShift) {
    if (this.isShiftActive === isShift) return;
    this.isShiftActive = isShift;

    // ໄຮໄລ້ກອບແປ້ນພິມ
    if (this.virtualKeyboardEl) {
      this.virtualKeyboardEl.classList.toggle('shift-mode', isShift);
    }

    // ກົດປຸ່ມ Shift ຄ້າງໄວ້
    document.querySelectorAll('.key[data-code="ShiftLeft"], .key[data-code="ShiftRight"]').forEach(el => {
      el.classList.toggle('shift-pressed', isShift);
    });

    // ສະຫຼັບຕົວອັກສອນເທິງປຸ່ມກົດທຸກປຸ່ມ (ຕົວ Shift ກາຍເປັນຕົວຫຼັກ ແລະ ຕົວ Normal ກາຍເປັນຕົວຮອງ)
    document.querySelectorAll('.key').forEach(keyEl => {
      const normal = keyEl.dataset.normal;
      const shift = keyEl.dataset.shift;
      if (!normal || ['Bksp', 'Tab', 'Caps', 'Enter', 'Shift', ' '].includes(normal)) return;

      const normalSpan = keyEl.querySelector('.key-normal');
      const shiftSpan = keyEl.querySelector('.key-shift');

      if (normalSpan && shiftSpan && shift && shift !== normal) {
        if (isShift) {
          normalSpan.textContent = shift;
          shiftSpan.textContent = normal;
        } else {
          normalSpan.textContent = normal;
          shiftSpan.textContent = shift;
        }
      }
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

    // Drawer Game Modes
    document.querySelectorAll('[data-drawer-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchMode(btn.dataset.drawerMode);
        this.closeDrawer();
      });
    });

    // Drawer (ເມນູລີ້ນຊັກ) Toggle & Close Listeners
    if (this.drawerToggleBtn) {
      this.drawerToggleBtn.addEventListener('click', () => this.openDrawer());
    }
    if (this.drawerCloseBtn) {
      this.drawerCloseBtn.addEventListener('click', () => this.closeDrawer());
    }
    if (this.drawerBackdrop) {
      this.drawerBackdrop.addEventListener('click', () => this.closeDrawer());
    }
    if (this.drawerKbToggle) {
      this.drawerKbToggle.addEventListener('click', () => this.toggleVirtualKeyboard());
    }
    if (this.drawerSoundToggle) {
      this.drawerSoundToggle.addEventListener('click', () => this.toggleSound());
    }
    if (this.drawerAutoTranslateToggle) {
      this.drawerAutoTranslateToggle.addEventListener('click', () => this.toggleAutoTranslate());
    }
    document.querySelectorAll('[data-drawer-diff]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchDifficulty(btn.dataset.drawerDiff);
      });
    });

    // Audio Mute Toggle (Header)
    if (this.soundToggle) {
      this.soundToggle.addEventListener('click', () => this.toggleSound());
    }

    // Auto-Translate Lao Keyboard Toggle (Header)
    if (this.autoTranslateToggle) {
      this.autoTranslateToggle.addEventListener('click', () => this.toggleAutoTranslate());
    }

    // Keyboard Visibility Toggle (Header)
    if (this.kbToggleBtn) {
      this.kbToggleBtn.addEventListener('click', () => this.toggleVirtualKeyboard());
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

    // Global Keydown & Keyup Listener
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    window.addEventListener('blur', () => this.clearAllVirtualKeyStates());

    // Focus mobile input ONLY on touch/mobile devices
    if (this.isMobile) {
      const handleMobileFocus = (e) => {
        if (!e.target.closest('button, input, select, textarea, a, .key, .settings-drawer, .btn-drawer-toggle, .drawer-backdrop')) {
          if (this.mobileInput) {
            this.mobileInput.focus();
          }
        }
      };
      document.addEventListener('click', handleMobileFocus);
      document.addEventListener('touchend', handleMobileFocus, { passive: true });
    }

    // Mobile input sink listener (with duplicate suppression)
    if (this.mobileInput) {
      this.mobileInput.addEventListener('beforeinput', (e) => {
        if (e.inputType === 'deleteContentBackward') {
          if (Date.now() - this.lastProcessedTime < 250) return;
          this.lastProcessedTime = Date.now();
          if (this.currentMode === 'speed') {
            this.speedGame.handleInput('', true, false);
          } else if (this.currentMode === 'trainer') {
            this.trainerGame.handleBackspace();
          }
        }
      });

      this.mobileInput.addEventListener('input', (e) => {
        // ຫາກ event ນີ້ເກີດພາຍຫຼັງ keydown ຫຼື virtual key ບໍ່ເກີນ 300ms ໃຫ້ຂ້າມທັນທີ (ປ້ອງກັນພິມ 1 ໂຕ ອອກ 2 ໂຕ ເຊັ່ນ ໝ ມ)
        if (Date.now() - this.lastProcessedTime < 300) {
          this.mobileInput.value = '';
          return;
        }

        const val = this.mobileInput.value;
        if (val && val.length > 0) {
          this.lastProcessedTime = Date.now();
          this.routeCharacterInput(val);
          this.mobileInput.value = '';
        }
      });
    }
  }

  handleKeyDown(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    // ຖ້າກຳລັງກົດປຸ່ມ Physical Keyboard, ໃຫ້ blur mobileInput ທັນທີ ເພື່ອປ້ອງກັນບໍ່ໃຫ້ຕົວອັກສອນເຂົ້າ mobileInput ຊ້ຳຊ້ອນ
    if (this.mobileInput && document.activeElement === this.mobileInput) {
      this.mobileInput.blur();
      this.mobileInput.value = '';
    }

    if (e.key === 'Shift') {
      this.setShiftState(true);
      return;
    }

    // ປຸ່ມ Tab: ເລື່ອນໄປຄຳສັບຖັດໄປ (Skip / Advance to next word)
    if (e.key === 'Tab') {
      e.preventDefault();
      this.lastProcessedTime = Date.now();
      if (this.currentMode === 'speed') {
        this.speedGame.advanceToNextWord(true);
      } else if (this.currentMode === 'trainer') {
        this.trainerGame.advanceToNextWord();
      }
      return;
    }

    // ປຸ່ມ Escape: ເລີ່ມເກມໃໝ່
    if (e.key === 'Escape') {
      e.preventDefault();
      this.lastProcessedTime = Date.now();
      this.restartCurrentGame();
      return;
    }

    // ປຸ່ມ Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      this.lastProcessedTime = Date.now();
      if (this.currentMode === 'speed') {
        this.speedGame.handleInput('', true, false);
      } else if (this.currentMode === 'trainer') {
        this.trainerGame.handleBackspace();
      }
      return;
    }

    // ປຸ່ມ Spacebar
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      this.lastProcessedTime = Date.now();
      if (this.mobileInput) {
        this.mobileInput.value = '';
      }
      if (this.currentMode === 'speed') {
        this.speedGame.handleInput('', false, true);
      } else if (this.currentMode === 'arcade') {
        this.arcadeGame.handleInput(' ');
      } else if (this.currentMode === 'trainer') {
        this.trainerGame.advanceToNextWord();
      }
      return;
    }

    // ເອັບເຟັກກົດປຸ່ມເທິງແປ້ນພິມສະເໝືອນ
    const keyEl = document.querySelector(`.key[data-code="${e.code}"]`);
    if (keyEl) {
      keyEl.classList.add('key-active');
      setTimeout(() => keyEl.classList.remove('key-active'), 150);
    }

    let char = e.key;
    const isShift = e.shiftKey || this.isShiftActive;

    // 1. ແປງລະຫັດ PUA ຈາກ Windows kbdlao.dll (U+F001 - U+F008) ເປັນຕົວອັກສອນລາວມາດຕະຖານ
    const PUA_TO_LAO = {
      '\uF001': 'ັ້',
      '\uF002': 'ຫຼ',
      '\uF003': 'ົ້',
      '\uF004': 'ໍ່',
      '\uF005': 'ື້',
      '\uF006': 'ີ້',
      '\uF007': 'ິ້',
      '\uF008': 'ຶ້'
    };
    if (PUA_TO_LAO[char]) {
      char = PUA_TO_LAO[char];
    }

    // 2. ຖ້າເປີດ autoTranslateLao:
    // ໃຫ້ແປງ e.code ຕາມຜັງແປ້ນພິມລາວໂດຍກົງສະເໝີ ເພື່ອໃຫ້ຮອງຮັບທັງ Normal ແລະ Shift 100% ຖືກຕ້ອງ
    if (this.autoTranslateLao) {
      const translated = translatePhysicalKeyToLao(e.code, isShift);
      if (translated) {
        char = translated;
      }
    } else {
      // 3. ຖ້າປິດ autoTranslateLao (ໂໝດຕາມລະບົບ):
      // ຫາກກົດ Shift ຄ້າງໄວ້ ແຕ່ລະບົບ OS ສົ່ງຕົວປົກກະຕິທີ່ບໍ່ໄດ້ Shift ມາ (ເຊັ່ນ ລ ແທນ ຫຼ, ຫຼື ົ ແທນ ົ້) ຫຼື ສົ່ງ PUA code
      if (isShift && LAO_KEYBOARD_LAYOUT[e.code]) {
        const layout = LAO_KEYBOARD_LAYOUT[e.code];
        if (layout.shift && layout.shift !== layout.normal) {
          if (char === layout.normal || (char && char.charCodeAt(0) >= 0xF000 && char.charCodeAt(0) <= 0xF00F)) {
            char = layout.shift;
          }
        }
      }
    }

    // ຖ້າເປັນຕົວອັກສອນລາວ ຫຼື ຕົວອັກສອນທີ່ຮອງຮັບ (ຮອງຮັບທັງຕົວດ່ຽວ ແລະ ຕົວປະສົມ shift ເຊັ່ນ ຫຼ, ົ້, ິ້)
    if (char && (isValidLaoChar(char[0]) || char === 'ຫຼ' || isNativeLaoChar(char))) {
      e.preventDefault();
      this.lastProcessedTime = Date.now();
      if (this.mobileInput) {
        this.mobileInput.value = '';
      }
      this.routeCharacterInput(char);
    }
  }

  handleKeyUp(e) {
    if (e.key === 'Shift') {
      this.setShiftState(false);
    }
    const keyEl = document.querySelector(`.key[data-code="${e.code}"]`);
    if (keyEl) {
      keyEl.classList.remove('key-active');
    }
  }

  handleVirtualKeyPress(keyInfo) {
    if (this.lastVirtualKeyPressTime && Date.now() - this.lastVirtualKeyPressTime < 120) {
      return;
    }
    this.lastVirtualKeyPressTime = Date.now();
    this.lastProcessedTime = Date.now();
    if (this.mobileInput) {
      this.mobileInput.value = '';
    }

    sounds.playKeyClick();
    const char = this.isShiftActive ? keyInfo.shift : keyInfo.normal;

    // ຖ້າກົດປຸ່ມເທິງ virtual keyboard ຂະນະທີ່ Shift active ຢູ່ ໃຫ້ປິດ Shift mode ທັນທີຫຼັງກົດ
    if (this.isShiftActive) {
      this.setShiftState(false);
    }

    if (char === 'Bksp') {
      if (this.currentMode === 'speed') {
        this.speedGame.handleInput('', true, false);
      } else if (this.currentMode === 'trainer') {
        this.trainerGame.handleBackspace();
      }
    } else if (char === ' ') {
      if (this.currentMode === 'speed') {
        this.speedGame.handleInput('', false, true);
      } else if (this.currentMode === 'arcade') {
        this.arcadeGame.handleInput(' ');
      } else if (this.currentMode === 'trainer') {
        this.trainerGame.advanceToNextWord();
      }
    } else if (char) {
      this.routeCharacterInput(char);
    }
  }

  routeCharacterInput(char) {
    if (!char) return;
    // ທຳຄວາມສະອາດຕົວອັກສອນ ແລະ ແປງຕົວອັກສອນໄທ/placeholder ໃຫ້ເປັນມາດຕະຖານລາວ (ບໍ່ແຍກຕົວປະສົມ ໝ, ໜ, ຫຼ ໃຫ້ແຕກເປັນ 2 ຕົວ)
    if (typeof normalizeIncomingChar === 'function') {
      char = normalizeIncomingChar(char);
    } else {
      char = char.replace(/[\u0020\u00A0\u200B\u25CC]/g, '');
    }
    if (!char) return;

    if (this.currentMode === 'speed') {
      this.speedGame.handleInput(char);
    } else if (this.currentMode === 'arcade') {
      this.arcadeGame.handleInput(char);
    } else if (this.currentMode === 'trainer') {
      this.trainerGame.handleInput(char);
    }
  }

  clearAllVirtualKeyStates() {
    document.querySelectorAll('.key').forEach(el => {
      el.classList.remove('highlight-target', 'highlight-shift', 'key-active', 'key-shake', 'shift-pressed');
    });
    this.isShiftActive = false;
    this.setShiftState(false);
  }

  switchMode(mode) {
    // 1. ຢຸດ ແລະ ເຄຼຍ Game ທຸກໂໝດທີ່ກຳລັງທຳງານ ເພື່ອບໍ່ໃຫ້ Timer ຄ້າງ ຫຼື Modal ແຈ້ງເຕືອນຂ້າມໂໝດ
    if (this.speedGame) {
      this.speedGame.stop();
    }
    if (this.arcadeGame) {
      this.arcadeGame.stop();
    }
    if (this.trainerGame && typeof this.trainerGame.reset === 'function') {
      this.trainerGame.reset();
    }

    // 2. ປິດ Result Modal ທັນທີຫາກກຳລັງສະແດງຢູ່
    if (this.resultModal) {
      this.resultModal.style.display = 'none';
    }

    this.currentMode = mode;
    this.clearAllVirtualKeyStates();

    document.querySelectorAll('[data-mode]').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
    });
    document.querySelectorAll('[data-drawer-mode]').forEach(b => {
      b.classList.toggle('active', b.dataset.drawerMode === mode);
    });

    this.speedPanel.style.display = (mode === 'speed') ? 'block' : 'none';
    this.arcadePanel.style.display = (mode === 'arcade') ? 'block' : 'none';
    this.trainerPanel.style.display = (mode === 'trainer') ? 'block' : 'none';

    // ຈັດການແຖບສະຖິຕິຕາມໂໝດ
    document.getElementById('stats-speed-bar').style.display = (mode === 'speed') ? 'flex' : 'none';
    document.getElementById('stats-arcade-bar').style.display = (mode === 'arcade') ? 'flex' : 'none';
    document.getElementById('stats-trainer-bar').style.display = (mode === 'trainer') ? 'flex' : 'none';

    // ເມື່ອສະຫຼັບໄປໂໝດ Arcade
    if (mode === 'arcade') {
      setTimeout(() => {
        this.arcadeGame.resizeCanvas();
        this.arcadeGame.start();
        this.arcadeGame.spawnWord();
      }, 60);
    } else if (mode === 'trainer') {
      this.restartCurrentGame();
      this.trainerGame.updateTarget();
    } else {
      this.restartCurrentGame();
    }
  }

  switchDifficulty(diff) {
    this.difficulty = diff;
    this.clearAllVirtualKeyStates();
    this.speedGame.setDifficulty(diff);
    this.arcadeGame.setDifficulty(diff);
    this.trainerGame.setDifficulty(diff);
    this.restartCurrentGame();

    // ຊິ້ງສະຖານະປຸ່ມລະດັບຄວາມຍາກທັງເທິງ Bar ແລະ ໃນ Drawer
    document.querySelectorAll('[data-diff]').forEach(b => {
      b.classList.toggle('active', b.dataset.diff === diff);
    });
    document.querySelectorAll('[data-drawer-diff]').forEach(b => {
      b.classList.toggle('active', b.dataset.drawerDiff === diff);
    });
  }

  restartCurrentGame() {
    if (this.resultModal) {
      this.resultModal.style.display = 'none';
    }
    this.clearAllVirtualKeyStates();

    if (this.currentMode === 'speed') {
      this.speedGame.reset();
    } else if (this.currentMode === 'arcade') {
      this.arcadeGame.start();
      this.arcadeGame.spawnWord();
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

  renderStarRating(stars, titleText) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      starsHtml += `<span class="star-glyph ${i <= stars ? 'filled' : 'empty'}">${i <= stars ? '★' : '☆'}</span>`;
    }
    return `
      <div class="star-rating-box">
        <div class="stars-row">${starsHtml}</div>
        <div class="star-rating-label">${stars} / 5 ດາວ • ${titleText}</div>
      </div>
    `;
  }

  renderMistakeAnalysis(mistypedWords, mistypedChars) {
    const wordEntries = Object.entries(mistypedWords || {}).sort((a, b) => b[1] - a[1]);
    const charEntries = Object.entries(mistypedChars || {}).sort((a, b) => b[1] - a[1]);

    let wordsHtml = '';
    if (wordEntries.length > 0) {
      wordsHtml = wordEntries.slice(0, 8).map(([word, cnt]) => `
        <span class="mistake-chip word-chip">
          <span class="chip-text">${word}</span>
          <span class="chip-count">${cnt} ເທື່ອ</span>
        </span>
      `).join('');
    } else {
      wordsHtml = `<span class="chip-perfect">✨ ບໍ່ມີຄຳສັບທີ່ພິມຜິດເລີຍ 100% ຖືກຕ້ອງ!</span>`;
    }

    let charsHtml = '';
    if (charEntries.length > 0) {
      charsHtml = charEntries.slice(0, 8).map(([ch, cnt]) => `
        <span class="mistake-chip char-chip">
          <span class="chip-text char-symbol">${ch}</span>
          <span class="chip-count">${cnt} ເທື່ອ</span>
        </span>
      `).join('');
    } else {
      charsHtml = `<span class="chip-perfect">✨ ພິມຖືກຕ້ອງທຸກຕົວອັກສອນ!</span>`;
    }

    return `
      <div class="mistake-analysis-container">
        <div class="analysis-block">
          <div class="analysis-header">❌ ຄຳສັບທີ່ພິມຜິດ:</div>
          <div class="chips-container">${wordsHtml}</div>
        </div>
        <div class="analysis-block">
          <div class="analysis-header">⚠️ ຕົວອັກສອນທີ່ພິມຜິດຫຼາຍທີ່ສຸດ:</div>
          <div class="chips-container">${charsHtml}</div>
        </div>
      </div>
    `;
  }

  showSpeedResults(stats) {
    const title = document.getElementById('result-title');
    const details = document.getElementById('result-details');

    const bestWpm = Math.max(stats.wpm, parseInt(localStorage.getItem('phimlao_best_wpm') || '0', 10));
    localStorage.setItem('phimlao_best_wpm', bestWpm);

    // ຄຳນວນດາວ 1-5 ດາວ ຈາກ WPM ແລະ ຄວາມຖືກຕ້ອງ
    const scoreIndex = stats.wpm * (stats.accuracy / 100);
    let stars = 1;
    let rank = 'ມືໃໝ່ຮຽນພິມ 🌱';

    if (scoreIndex >= 45 || (stats.wpm >= 55 && stats.accuracy >= 90)) {
      stars = 5;
      rank = 'ລະດັບເທບພິມໄວ ⚡👑';
    } else if (scoreIndex >= 28 || (stats.wpm >= 35 && stats.accuracy >= 85)) {
      stars = 4;
      rank = 'ລະດັບມືອາຊີບ 🚀';
    } else if (scoreIndex >= 18 || (stats.wpm >= 22 && stats.accuracy >= 80)) {
      stars = 3;
      rank = 'ລະດັບປານກາງ 👍';
    } else if (scoreIndex >= 10 || (stats.wpm >= 12 && stats.accuracy >= 70)) {
      stars = 2;
      rank = 'ລະດັບພໍໃຊ້ 💪';
    } else {
      stars = 1;
      rank = 'ມືໃໝ່ຮຽນພິມ 🌱';
    }

    if (title) title.textContent = '🎉 ສຳເລັດການທົດສອບຄວາມໄວ!';
    if (details) {
      details.innerHTML = `
        ${this.renderStarRating(stars, rank)}
        <div class="result-grid">
          <div class="res-card"><span class="val">${stats.wpm}</span><span class="lbl">WPM (ຄຳ/ນາທີ)</span></div>
          <div class="res-card"><span class="val">${stats.cpm}</span><span class="lbl">CPM (ຕົວອັກສອນ/ນາທີ)</span></div>
          <div class="res-card"><span class="val">${stats.accuracy}%</span><span class="lbl">ຄວາມຖືກຕ້ອງ</span></div>
          <div class="res-card"><span class="val">${bestWpm}</span><span class="lbl">WPM ສູງສຸດຂອງທ່ານ</span></div>
        </div>
        ${this.renderMistakeAnalysis(stats.mistypedWords, stats.mistypedChars)}
      `;
    }

    if (this.resultModal) this.resultModal.style.display = 'flex';
  }

  showArcadeResults(stats) {
    const title = document.getElementById('result-title');
    const details = document.getElementById('result-details');

    const bestScore = Math.max(stats.score, parseInt(localStorage.getItem('phimlao_best_arcade') || '0', 10));
    localStorage.setItem('phimlao_best_arcade', bestScore);

    let stars = 1;
    let rank = 'ມືໃໝ່ຝຶກຍິງ 🌱';
    if (stats.score >= 1500) {
      stars = 5;
      rank = 'ລະດັບເທບຍິງໄວ 💥👑';
    } else if (stats.score >= 1000) {
      stars = 4;
      rank = 'ລະດັບມືປືນອາຊີບ 🎯';
    } else if (stats.score >= 600) {
      stars = 3;
      rank = 'ລະດັບນັກຮົບປານກາງ 🛡️';
    } else if (stats.score >= 300) {
      stars = 2;
      rank = 'ລະດັບຝຶກຫັດ ⚔️';
    } else {
      stars = 1;
      rank = 'ມືໃໝ່ຝຶກຍິງ 🌱';
    }

    if (title) title.textContent = '💥 ຈົບເກມຝົນຄຳສັບ!';
    if (details) {
      details.innerHTML = `
        ${this.renderStarRating(stars, rank)}
        <div class="result-grid">
          <div class="res-card"><span class="val">${stats.score}</span><span class="lbl">ຄະແນນລວມ</span></div>
          <div class="res-card"><span class="val">${stats.maxCombo}x</span><span class="lbl">ຄອມໂບສູງສຸດ</span></div>
          <div class="res-card"><span class="val">${stats.wordsDestroyed}</span><span class="lbl">ຄຳສັບທີ່ຍິງໄດ້</span></div>
          <div class="res-card"><span class="val">${bestScore}</span><span class="lbl">ຄະແນນສູງສຸດ</span></div>
        </div>
        ${this.renderMistakeAnalysis(stats.mistypedWords, stats.mistypedChars)}
      `;
    }

    if (this.resultModal) this.resultModal.style.display = 'flex';
  }

  showTrainerResults(stats) {
    const title = document.getElementById('result-title');
    const details = document.getElementById('result-details');

    let stars = 1;
    let rank = 'ມືໃໝ່ຮຽນແປ້ນພິມ 🌱';
    if (stats.accuracy >= 98) {
      stars = 5;
      rank = 'ນິ້ວມືເທບ 100% 👑';
    } else if (stats.accuracy >= 92) {
      stars = 4;
      rank = 'ນິ້ວມືແມ້ນຢຳສູງ 🎯';
    } else if (stats.accuracy >= 85) {
      stars = 3;
      rank = 'ນິ້ວມືປານກາງ 👍';
    } else if (stats.accuracy >= 75) {
      stars = 2;
      rank = 'ນິ້ວມືພໍໃຊ້ 💪';
    } else {
      stars = 1;
      rank = 'ມືໃໝ່ຮຽນແປ້ນພິມ 🌱';
    }

    if (title) title.textContent = '🌟 ສຳເລັດບົດຝຶກແປ້ນພິມ!';
    if (details) {
      details.innerHTML = `
        ${this.renderStarRating(stars, rank)}
        <div class="result-grid">
          <div class="res-card"><span class="val">${stats.accuracy}%</span><span class="lbl">ຄວາມຖືກຕ້ອງ</span></div>
          <div class="res-card"><span class="val">${stats.totalTyped}</span><span class="lbl">ຕົວອັກສອນທີ່ພິມ</span></div>
        </div>
        ${this.renderMistakeAnalysis(stats.mistypedWords, stats.mistypedChars)}
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
    this.syncDrawerStats();
  }
}

// ເລີ່ມຕົ້ນລະບົບເມື່ອໂຫຼດໜ້າເວັບສຳເລັດ
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PhimLaoApp();
});
