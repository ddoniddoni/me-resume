import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '@/game/config';
import {
  portfolioInteractables,
  type InteractableObject,
} from '@/game/interactions';
import type { PortfolioGameCallbacks } from '@/game/PhaserGame';

const PLAYER_SPEED = 250;
const INTERACTION_RADIUS = 78;
const TILE_SIZE = 32;
const PLAYER_START = {
  x: 480,
  y: 300,
};
const GAME_FONT =
  'Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Inter, sans-serif';

type MovementKeys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
};

type RenderedInteractable = {
  data: InteractableObject;
  marker: Phaser.GameObjects.Rectangle;
  pulse: Phaser.GameObjects.Arc;
};

export class PortfolioScene extends Phaser.Scene {
  private readonly callbacks: PortfolioGameCallbacks;
  private player?: Phaser.GameObjects.Container;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: MovementKeys;
  private enterKey?: Phaser.Input.Keyboard.Key;
  private hintText?: Phaser.GameObjects.Text;
  private renderedInteractables: RenderedInteractable[] = [];
  private nearestInteractable?: InteractableObject;

  constructor(callbacks: PortfolioGameCallbacks) {
    super('PortfolioScene');
    this.callbacks = callbacks;
  }

  create() {
    this.drawMap();
    this.renderInteractables();
    this.createPlayer();
    this.createControls();

    this.hintText = this.add
      .text(
        GAME_WIDTH / 2,
        GAME_HEIGHT - 28,
        'WASD 또는 방향키로 이동하고, 오브젝트 근처에서 Enter를 누르세요.',
        {
          color: '#0a0b0d',
          fontFamily: GAME_FONT,
          fontSize: '16px',
          fontStyle: '700',
        },
      )
      .setOrigin(0.5)
      .setDepth(5);
  }

  update(_time: number, delta: number) {
    this.movePlayer(delta);
    this.updateNearestInteractable();

    if (
      this.enterKey &&
      Phaser.Input.Keyboard.JustDown(this.enterKey) &&
      this.nearestInteractable
    ) {
      this.callbacks.onInteract(this.nearestInteractable);
    }
  }

  private drawMap() {
    const graphics = this.add.graphics();

    graphics.fillStyle(0x5faa64, 1);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    for (let y = 0; y < GAME_HEIGHT; y += TILE_SIZE) {
      for (let x = 0; x < GAME_WIDTH; x += TILE_SIZE) {
        const isAlt = (x / TILE_SIZE + y / TILE_SIZE) % 2 === 0;
        graphics.fillStyle(isAlt ? 0x65b96b : 0x57a95f, 1);
        graphics.fillRect(x, y, TILE_SIZE, TILE_SIZE);

        if ((x + y) % 96 === 0) {
          graphics.fillStyle(0x3f8f4f, 1);
          graphics.fillRect(x + 6, y + 10, 4, 4);
          graphics.fillRect(x + 20, y + 22, 4, 4);
        }
      }
    }

    graphics.fillStyle(0xd7bd7a, 1);
    graphics.fillRect(96, 256, 768, 64);
    graphics.fillRect(448, 96, 64, 384);
    graphics.fillRect(128, 160, 736, 48);
    graphics.fillRect(128, 400, 640, 48);

    graphics.fillStyle(0xb89b5c, 1);
    for (let x = 96; x <= 864; x += TILE_SIZE) {
      graphics.fillRect(x, 256, TILE_SIZE, 4);
      graphics.fillRect(x, 316, TILE_SIZE, 4);
    }
    for (let y = 96; y <= 480; y += TILE_SIZE) {
      graphics.fillRect(448, y, 4, TILE_SIZE);
      graphics.fillRect(508, y, 4, TILE_SIZE);
    }

    graphics.fillStyle(0x4f8fd9, 1);
    graphics.fillRect(0, 500, GAME_WIDTH, 60);
    graphics.fillStyle(0x7fb6f0, 1);
    for (let x = 0; x < GAME_WIDTH; x += 64) {
      graphics.fillRect(x + 12, 516, 28, 4);
      graphics.fillRect(x + 42, 544, 18, 4);
    }

    this.drawTrees(graphics);
    this.drawFence(graphics);

    this.add
      .text(22, 18, 'DDoni FRONTEND QUEST', {
        color: '#ffffff',
        fontFamily: GAME_FONT,
        fontSize: '16px',
        fontStyle: '900',
      })
      .setDepth(1);
  }

  private renderInteractables() {
    this.renderedInteractables = portfolioInteractables.map((interactable) => {
      this.drawStation(interactable);

      const marker = this.add
        .rectangle(interactable.x, interactable.y, 86, 72, 0xffffff, 0.001)
        .setStrokeStyle(0, 0x0052ff, 0)
        .setInteractive({ useHandCursor: true });

      const pulse = this.add
        .circle(interactable.x, interactable.y, INTERACTION_RADIUS, 0x0052ff, 0)
        .setStrokeStyle(2, 0x0052ff, 0)
        .setDepth(0);

      const labelWidth = Math.max(88, interactable.label.length * 13);
      this.add
        .rectangle(
          interactable.x,
          interactable.y + 52,
          labelWidth,
          24,
          0x0a0b0d,
          0.88,
        )
        .setDepth(2);

      this.add
        .text(interactable.x, interactable.y + 52, interactable.label, {
          align: 'center',
          color: '#ffffff',
          fontFamily: GAME_FONT,
          fontSize: '12px',
          fontStyle: '700',
        })
        .setOrigin(0.5)
        .setDepth(3);

      marker.on('pointerdown', () => {
        this.callbacks.onInteract(interactable);
      });

      return {
        data: interactable,
        marker,
        pulse,
      };
    });
  }

  private createPlayer() {
    const shadow = this.add.rectangle(0, 20, 30, 8, 0x0a0b0d, 0.28);
    const legs = this.add.rectangle(0, 14, 22, 12, 0x102a5c);
    const body = this.add
      .rectangle(0, 0, 26, 28, 0x0052ff)
      .setStrokeStyle(3, 0x0a0b0d);
    const face = this.add
      .rectangle(0, -15, 22, 18, 0xffd6b0)
      .setStrokeStyle(3, 0x0a0b0d);
    const hair = this.add.rectangle(0, -25, 26, 9, 0x2b1b12);
    const eyeLeft = this.add.rectangle(-5, -15, 3, 3, 0x0a0b0d);
    const eyeRight = this.add.rectangle(5, -15, 3, 3, 0x0a0b0d);

    this.player = this.add
      .container(PLAYER_START.x, PLAYER_START.y, [
        shadow,
        legs,
        body,
        face,
        hair,
        eyeLeft,
        eyeRight,
      ])
      .setDepth(4);
  }

  private createControls() {
    const keyboard = this.input.keyboard;

    if (!keyboard) {
      return;
    }

    this.cursors = keyboard.createCursorKeys();
    this.wasd = {
      up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
    this.enterKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  private movePlayer(delta: number) {
    if (!this.player || !this.cursors || !this.wasd) {
      return;
    }

    const left = this.cursors.left?.isDown || this.wasd.left.isDown;
    const right = this.cursors.right?.isDown || this.wasd.right.isDown;
    const up = this.cursors.up?.isDown || this.wasd.up.isDown;
    const down = this.cursors.down?.isDown || this.wasd.down.isDown;

    const xAxis = Number(right) - Number(left);
    const yAxis = Number(down) - Number(up);

    if (xAxis === 0 && yAxis === 0) {
      return;
    }

    const vector = new Phaser.Math.Vector2(xAxis, yAxis).normalize();
    const distance = (PLAYER_SPEED * delta) / 1000;
    const nextX = Phaser.Math.Clamp(
      this.player.x + vector.x * distance,
      120,
      GAME_WIDTH - 120,
    );
    const nextY = Phaser.Math.Clamp(
      this.player.y + vector.y * distance,
      130,
      GAME_HEIGHT - 105,
    );

    this.player.setPosition(nextX, nextY);
  }

  private updateNearestInteractable() {
    if (!this.player || !this.hintText) {
      return;
    }

    let nearest: InteractableObject | undefined;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const interactable of portfolioInteractables) {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        interactable.x,
        interactable.y,
      );

      if (distance < nearestDistance && distance <= INTERACTION_RADIUS) {
        nearest = interactable;
        nearestDistance = distance;
      }
    }

    this.nearestInteractable = nearest;
    this.hintText.setText(
      nearest
        ? `Enter를 눌러 ${nearest.label} 열기`
        : 'WASD 또는 방향키로 이동하고, 오브젝트 근처에서 Enter를 누르세요.',
    );

    for (const rendered of this.renderedInteractables) {
      const isNearest = rendered.data.id === nearest?.id;
      rendered.marker.setStrokeStyle(
        isNearest ? 4 : 0,
        0x0052ff,
        isNearest ? 1 : 0,
      );
      rendered.pulse.setStrokeStyle(2, 0x0052ff, isNearest ? 0.95 : 0);
    }
  }

  private drawTrees(graphics: Phaser.GameObjects.Graphics) {
    const treePositions = [
      [44, 88],
      [86, 116],
      [846, 74],
      [892, 118],
      [74, 424],
      [842, 470],
      [908, 438],
    ];

    for (const [x, y] of treePositions) {
      graphics.fillStyle(0x6b3f20, 1);
      graphics.fillRect(x + 10, y + 28, 12, 20);
      graphics.fillStyle(0x1f7f43, 1);
      graphics.fillRect(x, y + 12, 32, 24);
      graphics.fillRect(x + 6, y, 20, 20);
      graphics.fillStyle(0x35a852, 1);
      graphics.fillRect(x + 6, y + 16, 20, 8);
    }
  }

  private drawFence(graphics: Phaser.GameObjects.Graphics) {
    graphics.fillStyle(0x8b5a2b, 1);
    for (let x = 96; x <= 864; x += 32) {
      graphics.fillRect(x, 80, 8, 28);
      graphics.fillRect(x, 462, 8, 28);
    }
    graphics.fillRect(96, 88, 768, 6);
    graphics.fillRect(96, 470, 768, 6);
  }

  private drawStation(interactable: InteractableObject) {
    switch (interactable.id) {
      case 'projects':
        this.drawLaptop(interactable.x, interactable.y);
        return;
      case 'resume':
        this.drawResumeBoard(interactable.x, interactable.y);
        return;
      case 'components':
        this.drawLab(interactable.x, interactable.y);
        return;
      case 'performance':
        this.drawMonitor(interactable.x, interactable.y);
        return;
      case 'troubleshooting':
        this.drawTroubleRoom(interactable.x, interactable.y);
        return;
      case 'contact':
        this.drawTerminal(interactable.x, interactable.y);
        return;
    }
  }

  private drawLaptop(x: number, y: number) {
    this.add.rectangle(x, y + 18, 58, 16, 0x7b4a24).setDepth(1);
    this.add.rectangle(x, y - 2, 48, 34, 0x0a0b0d).setDepth(1);
    this.add.rectangle(x, y - 2, 36, 22, 0x0052ff).setDepth(2);
    this.add
      .text(x, y - 8, '</>', this.stationTextStyle())
      .setOrigin(0.5)
      .setDepth(3);
  }

  private drawResumeBoard(x: number, y: number) {
    this.add.rectangle(x - 28, y + 14, 8, 48, 0x7b4a24).setDepth(1);
    this.add.rectangle(x + 28, y + 14, 8, 48, 0x7b4a24).setDepth(1);
    this.add
      .rectangle(x, y - 10, 70, 44, 0xf2e2b8)
      .setStrokeStyle(3, 0x0a0b0d)
      .setDepth(2);
    this.add.rectangle(x, y - 10, 46, 26, 0xffffff).setDepth(3);
    this.add
      .text(x, y - 16, 'CV', this.stationTextStyle('#0a0b0d'))
      .setOrigin(0.5)
      .setDepth(4);
  }

  private drawLab(x: number, y: number) {
    this.add
      .rectangle(x, y, 72, 52, 0xeef0f3)
      .setStrokeStyle(3, 0x0a0b0d)
      .setDepth(1);
    this.add
      .rectangle(x, y - 32, 84, 18, 0x0052ff)
      .setStrokeStyle(3, 0x0a0b0d)
      .setDepth(2);
    this.add.rectangle(x - 20, y + 10, 14, 22, 0x7fb6f0).setDepth(2);
    this.add.rectangle(x + 20, y + 10, 14, 22, 0x7fb6f0).setDepth(2);
    this.add
      .text(x, y - 4, '{}', this.stationTextStyle('#0a0b0d'))
      .setOrigin(0.5)
      .setDepth(3);
  }

  private drawMonitor(x: number, y: number) {
    this.add.rectangle(x, y, 58, 42, 0x0a0b0d).setDepth(1);
    this.add.rectangle(x, y, 44, 28, 0x05b169).setDepth(2);
    this.add.rectangle(x, y + 30, 12, 20, 0x0a0b0d).setDepth(1);
    this.add.rectangle(x, y + 42, 42, 8, 0x0a0b0d).setDepth(1);
    this.add
      .text(x, y - 6, '60', this.stationTextStyle())
      .setOrigin(0.5)
      .setDepth(3);
  }

  private drawTroubleRoom(x: number, y: number) {
    this.add
      .rectangle(x, y, 72, 54, 0x3a2d2d)
      .setStrokeStyle(3, 0x0a0b0d)
      .setDepth(1);
    this.add
      .rectangle(x, y - 32, 82, 18, 0xcf202f)
      .setStrokeStyle(3, 0x0a0b0d)
      .setDepth(2);
    this.add.rectangle(x, y + 8, 36, 28, 0xf4b000).setDepth(2);
    this.add
      .text(x, y, '!', this.stationTextStyle('#0a0b0d'))
      .setOrigin(0.5)
      .setDepth(3);
  }

  private drawTerminal(x: number, y: number) {
    this.add
      .rectangle(x, y, 60, 50, 0x16181c)
      .setStrokeStyle(3, 0x0a0b0d)
      .setDepth(1);
    this.add.rectangle(x, y - 6, 42, 26, 0x7fb6f0).setDepth(2);
    this.add.rectangle(x, y + 26, 52, 12, 0x0a0b0d).setDepth(1);
    this.add
      .text(x, y - 12, '@', this.stationTextStyle('#0a0b0d'))
      .setOrigin(0.5)
      .setDepth(3);
  }

  private stationTextStyle(
    color = '#ffffff',
  ): Phaser.Types.GameObjects.Text.TextStyle {
    return {
      color,
      fontFamily: GAME_FONT,
      fontSize: '16px',
      fontStyle: '900',
    };
  }
}
