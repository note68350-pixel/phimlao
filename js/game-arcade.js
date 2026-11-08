/**
 * ໂໝດເກມຝົນຄຳສັບ (Falling Words Arcade - ZType Style)
 * ປັບປຸງ Canvas Clipping Mask ເພື່ອແຕ້ມພາສາລາວເຕັມຄຳ 100% ປ້ອງກັນສະຫຼະ ແລະ ວັນນະຍຸດເລື່ອນຫຼຸດ
 */

class ArcadeGame {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.options = Object.assign({
      difficulty: 'easy',
      onGameOver: null,
      onUpdate: null
    }, options);

    this.words = [];
    this.particles = [];
    this.activeWord = null; // ຄຳສັບທີ່ກຳລັງຖືກລັອກເປົ້າໝາຍ
    this.typedLength = 0;

    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.lives = 5;
    this.maxLives = 5;
    this.level = 1;
    this.wordsDestroyed = 0;

    this.spawnTimer = 0;
    this.spawnInterval = 2000; // ms
    this.fallSpeed = 0.8;

    this.isRunning = false;
    this.isPaused = false;
    this.lastTime = 0;
    this.animFrameId = null;

    this.resizeCanvas = this.resizeCanvas.bind(this);
    window.addEventListener('resize', this.resizeCanvas);
  }

  init() {
    this.resizeCanvas();
    this.reset();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height || 480;
  }

  setDifficulty(diff) {
    this.options.difficulty = diff;
    if (diff === 'easy') {
      this.fallSpeed = 0.6;
      this.spawnInterval = 2400;
    } else if (diff === 'medium') {
      this.fallSpeed = 0.9;
      this.spawnInterval = 2000;
    } else {
      this.fallSpeed = 1.2;
      this.spawnInterval = 1700;
    }
  }

  reset() {
    this.stop();
    this.words = [];
    this.particles = [];
    this.activeWord = null;
    this.typedLength = 0;
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.lives = this.maxLives;
    this.level = 1;
    this.wordsDestroyed = 0;
    this.setDifficulty(this.options.difficulty);

    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    if (this.options.onUpdate) {
      this.options.onUpdate(this.getStats());
    }
  }

  start() {
    if (this.isRunning) return;
    this.reset();
    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();
    this.animFrameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  stop() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  spawnWord() {
    const list = LAO_WORDS[this.options.difficulty] || LAO_WORDS.easy;
    const randomItem = list[Math.floor(Math.random() * list.length)];
    const wordText = randomItem.word;

    // ຄຳນວນຂະໜາດ ແລະ ຕຳແໜ່ງ X ບໍ່ໃຫ້ຕົກຂອບ
    const fontSize = 24;
    this.ctx.font = `bold ${fontSize}px "Noto Sans Lao", sans-serif`;
    const textWidth = this.ctx.measureText(wordText).width;

    const margin = 30;
    const maxX = Math.max(margin, this.canvas.width - textWidth - margin);
    const x = Math.floor(Math.random() * (maxX - margin)) + margin;

    this.words.push({
      text: wordText,
      hint: randomItem.hint || '',
      x: x,
      y: -20,
      width: textWidth,
      speed: this.fallSpeed * (0.8 + Math.random() * 0.4),
      color: '#38bdf8',
      id: Math.random()
    });
  }

  handleInput(char) {
    if (!this.isRunning || this.isPaused) return;

    sounds.init();

    // ຖ້າຍັງບໍ່ມີຄຳສັບທີ່ຖືກລັອກເປົ້າໝາຍ
    if (!this.activeWord) {
      // ຊອກຫາຄຳສັບທີ່ຂຶ້ນຕົ້ນດ້ວຍ char ນີ້ (ເລືອກຄຳທີ່ຢູ່ຕ່ຳສຸດກ່ອນ)
      const candidates = this.words.filter(w => w.text.startsWith(char));
      if (candidates.length > 0) {
        // ເອົາຄຳທີ່ໃກ້ເຖິງພື້ນທີ່ສຸດ
        candidates.sort((a, b) => b.y - a.y);
        this.activeWord = candidates[0];
        this.typedLength = 1;

        sounds.playCorrectChar();
        this.createHitParticles(this.activeWord.x, this.activeWord.y);

        if (this.typedLength >= this.activeWord.text.length) {
          this.destroyActiveWord();
        }
      } else {
        sounds.playError();
        this.combo = 0;
      }
    } else {
      // ກວດສອບຕົວອັກສອນຖັດໄປຂອງຄຳສັບທີ່ລັອກໄວ້
      const expectedChar = this.activeWord.text[this.typedLength];
      if (char === expectedChar) {
        this.typedLength++;
        sounds.playCorrectChar();
        this.createHitParticles(this.activeWord.x, this.activeWord.y);

        if (this.typedLength >= this.activeWord.text.length) {
          this.destroyActiveWord();
        }
      } else {
        sounds.playError();
        this.combo = 0;
      }
    }

    if (this.options.onUpdate) {
      this.options.onUpdate(this.getStats());
    }
  }

  destroyActiveWord() {
    sounds.playWordComplete();
    this.createExplosionParticles(this.activeWord.x + this.activeWord.width / 2, this.activeWord.y);

    this.combo++;
    if (this.combo > this.maxCombo) {
      this.maxCombo = this.combo;
    }
    if (this.combo % 5 === 0) {
      sounds.playCombo(this.combo);
    }

    const multiplier = 1 + Math.floor(this.combo / 5) * 0.5;
    this.score += Math.round(this.activeWord.text.length * 10 * multiplier);
    this.wordsDestroyed++;

    // ເພີ່ມລະດັບຄວາມໄວເມື່ອຍິງໄດ້ຫຼາຍຄຳ
    if (this.wordsDestroyed % 10 === 0) {
      this.level++;
      this.fallSpeed += 0.1;
      this.spawnInterval = Math.max(900, this.spawnInterval - 100);
    }

    this.words = this.words.filter(w => w !== this.activeWord);
    this.activeWord = null;
    this.typedLength = 0;
  }

  createHitParticles(x, y) {
    for (let i = 0; i < 6; i++) {
      this.particles.push({
        x: x + Math.random() * 20,
        y: y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: Math.random() * 3 + 2,
        color: '#22d3ee',
        alpha: 1
      });
    }
  }

  createExplosionParticles(x, y) {
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 2,
        color: ['#38bdf8', '#fbbf24', '#34d399', '#f43f5e'][Math.floor(Math.random() * 4)],
        alpha: 1
      });
    }
  }

  gameLoop(currentTime) {
    if (!this.isRunning) return;

    const dt = currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (!this.isPaused) {
      this.update(dt);
      this.render();
    }

    this.animFrameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  update(dt) {
    // ການເກີດຂອງຄຳສັບໃໝ່
    this.spawnTimer += dt;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnWord();
      this.spawnTimer = 0;
    }

    // ການເຄື່ອນທີ່ຂອງຄຳສັບ
    for (let i = this.words.length - 1; i >= 0; i--) {
      const w = this.words[i];
      w.y += w.speed;

      // ຖ້າຄຳສັບຕົກຮອດພື້ນລຸ່ມ
      if (w.y > this.canvas.height - 20) {
        sounds.playError();
        this.lives--;
        this.combo = 0;
        this.createExplosionParticles(w.x + w.width / 2, this.canvas.height - 20);

        if (this.activeWord === w) {
          this.activeWord = null;
          this.typedLength = 0;
        }

        this.words.splice(i, 1);

        if (this.lives <= 0) {
          this.gameOver();
          return;
        }
        if (this.options.onUpdate) {
          this.options.onUpdate(this.getStats());
        }
      }
    }

    // ອັບເດດອະນຸພາກ (Particles)
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.025;
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  render() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // ແຕ້ມເສັ້ນເຕືອນໄພເຂດອັນຕະລາຍດ້ານລຸ່ມ
    this.ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([6, 6]);
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvas.height - 25);
    this.ctx.lineTo(this.canvas.width, this.canvas.height - 25);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // ແຕ້ມຄຳສັບທີ່ກຳລັງຕົກ
    const fontSize = 24;
    this.ctx.font = `bold ${fontSize}px "Noto Sans Lao", sans-serif`;

    for (const w of this.words) {
      const isTargeted = (w === this.activeWord);

      // ແຕ້ມກອບໄຮໄລ້ຖ້າເປັນເປົ້າໝາຍ
      if (isTargeted) {
        this.ctx.fillStyle = 'rgba(14, 165, 233, 0.2)';
        this.ctx.strokeStyle = '#38bdf8';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.roundRect(w.x - 10, w.y - fontSize + 2, w.width + 20, fontSize + 16, 8);
        this.ctx.fill();
        this.ctx.stroke();

        // ແຕ້ມລຳແສງຍິງເປົ້າໝາຍ
        this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, this.canvas.height);
        this.ctx.lineTo(w.x + w.width / 2, w.y + 5);
        this.ctx.stroke();
      }

      // ແຕ້ມຂໍ້ຄວາມເຕັມຄຳ 100% ປ້ອງກັນສະຫຼະ ແລະ ວັນນະຍຸດເລື່ອນຫຼຸດ
      if (isTargeted && this.typedLength > 0) {
        // 1. ແຕ້ມຂໍ້ຄວາມເຕັມຄຳດ້ວຍສີເທົາ/ຟ້າ (ຊັ້ນພື້ນຫຼັງ)
        this.ctx.fillStyle = '#64748b';
        this.ctx.fillText(w.text, w.x, w.y);

        // 2. ໃຊ້ Canvas Clipping Mask ເພື່ອແຕ້ມສີຂຽວສະເພາະສ່ວນທີ່ພິມຖືກ (ໂດຍບໍ່ຕັດແຍກສະຫຼະ)
        const progressRatio = Math.min(1, this.typedLength / w.text.length);
        const highlightWidth = (w.width + 8) * progressRatio;

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(w.x - 4, w.y - fontSize - 6, highlightWidth, fontSize + 20);
        this.ctx.clip();

        // ແຕ້ມຂໍ້ຄວາມເຕັມຄຳຄືນໃໝ່ດ້ວຍສີຂຽວ
        this.ctx.fillStyle = '#34d399';
        this.ctx.fillText(w.text, w.x, w.y);
        this.ctx.restore();

        // 3. ແຕ້ມແຖບເສັ້ນຄວາມຄືບໜ້າການພິມຢູ່ກ້ອງຄຳສັບ
        this.ctx.fillStyle = '#34d399';
        this.ctx.fillRect(w.x, w.y + 6, w.width * progressRatio, 3);
      } else {
        this.ctx.fillStyle = isTargeted ? '#38bdf8' : '#f8fafc';
        this.ctx.fillText(w.text, w.x, w.y);
      }
    }

    // ແຕ້ມອະນຸພາກແສງ
    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  gameOver() {
    this.stop();
    sounds.playGameOver(false);
    if (this.options.onGameOver) {
      this.options.onGameOver(this.getStats());
    }
  }

  getStats() {
    return {
      score: this.score,
      combo: this.combo,
      maxCombo: this.maxCombo,
      lives: this.lives,
      maxLives: this.maxLives,
      level: this.level,
      wordsDestroyed: this.wordsDestroyed
    };
  }
}
