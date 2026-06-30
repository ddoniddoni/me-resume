import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '@/game/config';
import {
  portfolioInteractables,
  type InteractableObject,
} from '@/game/interactions';
import type { PortfolioGameCallbacks } from '@/game/PhaserGame';

const PLAYER_SPEED = 260;
const INTERACTION_RADIUS = 92;
const TILE_SIZE = 32;
const PLAYER_START = {
  x: 640,
  y: 382,
};
const GAME_FONT =
  'Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Inter, sans-serif';

const palette = {
  grass: 0x587d55,
  grassAlt: 0x537751,
  grassDark: 0x3d6046,
  path: 0xc3a46a,
  pathEdge: 0x8e7244,
  stone: 0x87909a,
  stoneDark: 0x5d6670,
  ink: 0x10141b,
  white: 0xf6f0df,
  blue: 0x0052ff,
  blueDark: 0x123a9c,
  roof: 0x2b3550,
  roofLight: 0x435174,
  wall: 0xd8d4c3,
  wallShadow: 0xaaa493,
  green: 0x05a86a,
  red: 0xc73b42,
  yellow: 0xe4b441,
  water: 0x315c8d,
  waterLight: 0x6ea2ca,
};

type MovementKeys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
};

type RenderedInteractable = {
  data: InteractableObject;
  marker: Phaser.GameObjects.Rectangle;
  pulse: Phaser.GameObjects.Rectangle;
  labelBg: Phaser.GameObjects.Rectangle;
  labelText: Phaser.GameObjects.Text;
};

export class PortfolioScene extends Phaser.Scene {
  private readonly callbacks: PortfolioGameCallbacks;
  private player?: Phaser.GameObjects.Container;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: MovementKeys;
  private enterKey?: Phaser.Input.Keyboard.Key;
  private hintBox?: Phaser.GameObjects.Rectangle;
  private hintText?: Phaser.GameObjects.Text;
  private renderedInteractables: RenderedInteractable[] = [];
  private nearestInteractable?: InteractableObject;
  private facing: 'left' | 'right' = 'right';

  constructor(callbacks: PortfolioGameCallbacks) {
    super('PortfolioScene');
    this.callbacks = callbacks;
  }

  create() {
    this.drawMap();
    this.renderInteractables();
    this.createPlayer();
    this.createControls();
    this.createHintHud();
  }

  update(time: number, delta: number) {
    this.movePlayer(time, delta);
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

    this.drawGrass(graphics);
    this.drawWater(graphics);
    this.drawPaths(graphics);
    this.drawCentralPlaza(graphics);
    this.drawCampusDetails(graphics);

    this.add
      .text(28, 24, 'DDONI FRONTEND QUEST', {
        color: '#f6f0df',
        fontFamily: GAME_FONT,
        fontSize: '18px',
        fontStyle: '900',
      })
      .setShadow(2, 2, '#10141b', 0, true, true)
      .setDepth(2);
  }

  private drawGrass(graphics: Phaser.GameObjects.Graphics) {
    graphics.fillStyle(palette.grass, 1);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    for (let y = 0; y < GAME_HEIGHT; y += TILE_SIZE) {
      for (let x = 0; x < GAME_WIDTH; x += TILE_SIZE) {
        const isAlt = (x / TILE_SIZE + y / TILE_SIZE) % 2 === 0;
        graphics.fillStyle(isAlt ? palette.grass : palette.grassAlt, 1);
        graphics.fillRect(x, y, TILE_SIZE, TILE_SIZE);

        if ((x * 3 + y * 5) % 224 === 0) {
          graphics.fillStyle(palette.grassDark, 0.7);
          graphics.fillRect(x + 8, y + 12, 4, 8);
          graphics.fillRect(x + 20, y + 18, 4, 6);
        }
      }
    }
  }

  private drawWater(graphics: Phaser.GameObjects.Graphics) {
    graphics.fillStyle(palette.water, 1);
    graphics.fillRect(0, 630, GAME_WIDTH, 90);
    graphics.fillStyle(0x244e7c, 1);
    graphics.fillRect(0, 630, GAME_WIDTH, 8);

    graphics.fillStyle(palette.waterLight, 0.8);
    for (let x = 0; x < GAME_WIDTH; x += 84) {
      graphics.fillRect(x + 18, 654, 34, 4);
      graphics.fillRect(x + 48, 692, 24, 4);
    }

    this.drawBridge(graphics, 582, 606);
  }

  private drawBridge(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
  ) {
    graphics.fillStyle(0x7d5a32, 1);
    graphics.fillRect(x, y, 116, 78);
    graphics.fillStyle(0xa87943, 1);
    for (let plankX = x + 8; plankX < x + 112; plankX += 18) {
      graphics.fillRect(plankX, y + 4, 8, 70);
    }
    graphics.fillStyle(0x5a3c22, 1);
    graphics.fillRect(x, y + 12, 116, 6);
    graphics.fillRect(x, y + 58, 116, 6);
  }

  private drawPaths(graphics: Phaser.GameObjects.Graphics) {
    this.drawPath(graphics, 120, 332, 1040, 76);
    this.drawPath(graphics, 596, 116, 88, 536);
    this.drawPath(graphics, 220, 214, 836, 60);
    this.drawPath(graphics, 220, 526, 820, 60);

    graphics.fillStyle(palette.pathEdge, 1);
    for (let x = 120; x <= 1160; x += TILE_SIZE) {
      graphics.fillRect(x, 332, TILE_SIZE, 5);
      graphics.fillRect(x, 403, TILE_SIZE, 5);
    }
    for (let y = 116; y <= 650; y += TILE_SIZE) {
      graphics.fillRect(596, y, 5, TILE_SIZE);
      graphics.fillRect(679, y, 5, TILE_SIZE);
    }
  }

  private drawPath(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    graphics.fillStyle(palette.pathEdge, 1);
    graphics.fillRect(x - 6, y - 6, width + 12, height + 12);
    graphics.fillStyle(palette.path, 1);
    graphics.fillRect(x, y, width, height);

    graphics.fillStyle(0xd1b87d, 0.55);
    for (let tileX = x + 12; tileX < x + width; tileX += 48) {
      for (let tileY = y + 10; tileY < y + height; tileY += 32) {
        graphics.fillRect(tileX, tileY, 16, 4);
      }
    }
  }

  private drawCentralPlaza(graphics: Phaser.GameObjects.Graphics) {
    graphics.fillStyle(palette.stoneDark, 1);
    graphics.fillRect(520, 292, 240, 156);
    graphics.fillStyle(palette.stone, 1);
    graphics.fillRect(532, 304, 216, 132);

    for (let y = 304; y < 436; y += 24) {
      for (let x = 532; x < 748; x += 32) {
        graphics.fillStyle((x + y) % 64 === 0 ? 0x9aa3ad : 0x808892, 1);
        graphics.fillRect(x, y, 30, 22);
      }
    }

    graphics.fillStyle(palette.ink, 0.32);
    graphics.fillRect(568, 372, 146, 16);
    graphics.fillStyle(palette.blue, 1);
    graphics.fillRect(578, 326, 124, 46);
    graphics.fillStyle(palette.white, 1);
    graphics.fillRect(590, 338, 100, 22);
  }

  private drawCampusDetails(graphics: Phaser.GameObjects.Graphics) {
    this.drawTreeLine(graphics);
    this.drawLamp(graphics, 538, 286);
    this.drawLamp(graphics, 742, 286);
    this.drawLamp(graphics, 538, 458);
    this.drawLamp(graphics, 742, 458);
    this.drawBench(graphics, 792, 352);
    this.drawBench(graphics, 420, 386);
    this.drawFence(graphics);
  }

  private renderInteractables() {
    this.renderedInteractables = portfolioInteractables.map((interactable) => {
      this.drawStation(interactable);

      const marker = this.add
        .rectangle(interactable.x, interactable.y, 142, 118, 0xffffff, 0.001)
        .setStrokeStyle(0, palette.blue, 0)
        .setInteractive({ useHandCursor: true })
        .setDepth(9);

      const pulse = this.add
        .rectangle(interactable.x, interactable.y, 154, 130, palette.blue, 0)
        .setStrokeStyle(4, palette.blue, 0)
        .setDepth(8);

      const labelWidth = Math.max(112, interactable.label.length * 13);
      const labelBg = this.add
        .rectangle(
          interactable.x,
          interactable.y + 76,
          labelWidth,
          28,
          palette.ink,
          0.92,
        )
        .setStrokeStyle(2, 0xf6f0df, 0.3)
        .setDepth(10);

      const labelText = this.add
        .text(interactable.x, interactable.y + 76, interactable.label, {
          align: 'center',
          color: '#f6f0df',
          fontFamily: GAME_FONT,
          fontSize: '13px',
          fontStyle: '800',
        })
        .setOrigin(0.5)
        .setDepth(11);

      marker.on('pointerdown', () => {
        this.callbacks.onInteract(interactable);
      });

      return {
        data: interactable,
        marker,
        pulse,
        labelBg,
        labelText,
      };
    });
  }

  private createPlayer() {
    const shadow = this.add.rectangle(0, 24, 34, 9, palette.ink, 0.24);
    const leftShoe = this.add.rectangle(-8, 21, 8, 7, palette.ink);
    const rightShoe = this.add.rectangle(8, 21, 8, 7, palette.ink);
    const pants = this.add.rectangle(0, 13, 28, 18, 0x1f2f50);
    const coat = this.add
      .rectangle(0, -5, 32, 34, palette.blue)
      .setStrokeStyle(3, palette.ink);
    const collar = this.add.rectangle(0, -16, 18, 8, palette.white);
    const bag = this.add.rectangle(20, 2, 9, 24, 0x4d3324);
    const face = this.add
      .rectangle(0, -30, 26, 22, 0xf3c59f)
      .setStrokeStyle(3, palette.ink);
    const hairTop = this.add.rectangle(0, -43, 30, 10, 0x2a1a12);
    const hairSide = this.add.rectangle(-14, -34, 6, 14, 0x2a1a12);
    const eyeLeft = this.add.rectangle(-6, -30, 3, 3, palette.ink);
    const eyeRight = this.add.rectangle(6, -30, 3, 3, palette.ink);

    this.player = this.add
      .container(PLAYER_START.x, PLAYER_START.y, [
        shadow,
        leftShoe,
        rightShoe,
        pants,
        coat,
        collar,
        bag,
        face,
        hairTop,
        hairSide,
        eyeLeft,
        eyeRight,
      ])
      .setDepth(20);
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

  private createHintHud() {
    this.hintBox = this.add
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 54, 760, 56, palette.ink, 0.9)
      .setStrokeStyle(3, palette.white, 0.75)
      .setDepth(30);

    this.hintText = this.add
      .text(
        GAME_WIDTH / 2,
        GAME_HEIGHT - 54,
        'WASD 또는 방향키로 이동하고, 가까운 오브젝트에서 Enter를 누르세요.',
        {
          align: 'center',
          color: '#f6f0df',
          fontFamily: GAME_FONT,
          fontSize: '16px',
          fontStyle: '800',
        },
      )
      .setOrigin(0.5)
      .setDepth(31);
  }

  private movePlayer(time: number, delta: number) {
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
      this.player.setScale(this.facing === 'left' ? -1 : 1, 1);
      return;
    }

    if (xAxis !== 0) {
      this.facing = xAxis < 0 ? 'left' : 'right';
    }

    const vector = new Phaser.Math.Vector2(xAxis, yAxis).normalize();
    const distance = (PLAYER_SPEED * delta) / 1000;
    const stepBob = Math.sin(time / 80) * 1.5;
    const nextX = Phaser.Math.Clamp(
      this.player.x + vector.x * distance,
      72,
      GAME_WIDTH - 72,
    );
    const nextY = Phaser.Math.Clamp(
      this.player.y + vector.y * distance,
      96,
      GAME_HEIGHT - 96,
    );

    this.player.setPosition(nextX, nextY + stepBob);
    this.player.setScale(this.facing === 'left' ? -1 : 1, 1);
    this.player.setDepth(20 + Math.round(nextY / 100));
  }

  private updateNearestInteractable() {
    if (!this.player || !this.hintText || !this.hintBox) {
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
        ? `Enter - ${nearest.label} 열기`
        : 'WASD 또는 방향키로 이동하고, 가까운 오브젝트에서 Enter를 누르세요.',
    );
    this.hintBox.setStrokeStyle(
      3,
      nearest ? palette.blue : palette.white,
      nearest ? 1 : 0.75,
    );

    for (const rendered of this.renderedInteractables) {
      const isNearest = rendered.data.id === nearest?.id;
      rendered.marker.setStrokeStyle(
        isNearest ? 4 : 0,
        palette.blue,
        isNearest ? 1 : 0,
      );
      rendered.pulse.setStrokeStyle(4, palette.blue, isNearest ? 0.95 : 0);
      rendered.labelBg.setFillStyle(
        isNearest ? palette.blue : palette.ink,
        isNearest ? 0.96 : 0.92,
      );
      rendered.labelText.setColor(isNearest ? '#ffffff' : '#f6f0df');
    }
  }

  private drawStation(interactable: InteractableObject) {
    switch (interactable.id) {
      case 'projects':
        this.drawStudio(
          interactable.x,
          interactable.y,
          'PROJECT',
          palette.blue,
        );
        this.drawLaptop(interactable.x, interactable.y + 8);
        return;
      case 'resume':
        this.drawStudio(interactable.x, interactable.y, 'RESUME', palette.roof);
        this.drawResumeBoard(interactable.x, interactable.y + 8);
        return;
      case 'components':
        this.drawStudio(interactable.x, interactable.y, 'LAB', palette.green);
        this.drawComponentIcon(interactable.x, interactable.y + 8);
        return;
      case 'performance':
        this.drawStudio(
          interactable.x,
          interactable.y,
          'PERF',
          palette.blueDark,
        );
        this.drawMonitor(interactable.x, interactable.y + 8);
        return;
      case 'troubleshooting':
        this.drawStudio(interactable.x, interactable.y, 'DEBUG', palette.red);
        this.drawTroubleIcon(interactable.x, interactable.y + 8);
        return;
      case 'contact':
        this.drawStudio(interactable.x, interactable.y, 'CONTACT', 0x26313f);
        this.drawTerminal(interactable.x, interactable.y + 8);
        return;
    }
  }

  private drawStudio(x: number, y: number, sign: string, accent: number) {
    this.add.rectangle(x + 8, y + 20, 128, 82, palette.ink, 0.28).setDepth(2);
    this.add
      .rectangle(x, y - 20, 142, 36, accent)
      .setStrokeStyle(3, palette.ink)
      .setDepth(3);
    this.add.rectangle(x, y, 126, 64, palette.wall).setDepth(3);
    this.add.rectangle(x, y + 28, 126, 10, palette.wallShadow).setDepth(3);
    this.add.rectangle(x - 38, y + 4, 22, 24, 0x9fc6d9).setDepth(4);
    this.add.rectangle(x + 38, y + 4, 22, 24, 0x9fc6d9).setDepth(4);
    this.add.rectangle(x, y + 18, 24, 30, palette.ink).setDepth(4);
    this.add.rectangle(x, y - 20, 92, 20, palette.ink, 0.82).setDepth(4);
    this.add
      .text(x, y - 21, sign, {
        color: '#f6f0df',
        fontFamily: GAME_FONT,
        fontSize: sign.length > 6 ? '10px' : '12px',
        fontStyle: '900',
      })
      .setOrigin(0.5)
      .setDepth(5);
  }

  private drawLaptop(x: number, y: number) {
    this.add.rectangle(x, y + 22, 58, 12, palette.ink).setDepth(5);
    this.add.rectangle(x, y + 6, 46, 30, palette.ink).setDepth(5);
    this.add.rectangle(x, y + 6, 34, 20, palette.blue).setDepth(6);
    this.add
      .text(x, y + 1, '</>', this.stationTextStyle())
      .setOrigin(0.5)
      .setDepth(7);
  }

  private drawResumeBoard(x: number, y: number) {
    this.add.rectangle(x, y + 10, 54, 34, palette.white).setDepth(5);
    this.add.rectangle(x, y + 10, 38, 22, 0xffffff).setDepth(6);
    this.add
      .text(x, y + 4, 'CV', this.stationTextStyle('#10141b'))
      .setOrigin(0.5)
      .setDepth(7);
  }

  private drawComponentIcon(x: number, y: number) {
    this.add.rectangle(x - 22, y + 8, 26, 28, 0x9fc6d9).setDepth(5);
    this.add.rectangle(x + 22, y + 8, 26, 28, 0x9fc6d9).setDepth(5);
    this.add.rectangle(x, y + 8, 22, 22, palette.white).setDepth(6);
    this.add
      .text(x, y + 2, '{}', this.stationTextStyle('#10141b'))
      .setOrigin(0.5)
      .setDepth(7);
  }

  private drawMonitor(x: number, y: number) {
    this.add.rectangle(x, y + 6, 58, 38, palette.ink).setDepth(5);
    this.add.rectangle(x, y + 6, 44, 24, palette.green).setDepth(6);
    this.add.rectangle(x, y + 33, 12, 14, palette.ink).setDepth(5);
    this.add
      .text(x, y, '99', this.stationTextStyle())
      .setOrigin(0.5)
      .setDepth(7);
  }

  private drawTroubleIcon(x: number, y: number) {
    this.add.rectangle(x, y + 7, 44, 34, palette.yellow).setDepth(5);
    this.add.rectangle(x, y + 7, 30, 22, 0xf7d468).setDepth(6);
    this.add
      .text(x, y, '!', this.stationTextStyle('#10141b'))
      .setOrigin(0.5)
      .setDepth(7);
  }

  private drawTerminal(x: number, y: number) {
    this.add.rectangle(x, y + 8, 50, 42, palette.ink).setDepth(5);
    this.add.rectangle(x, y + 3, 34, 22, 0x9fc6d9).setDepth(6);
    this.add
      .text(x, y - 3, '@', this.stationTextStyle('#10141b'))
      .setOrigin(0.5)
      .setDepth(7);
  }

  private drawTreeLine(graphics: Phaser.GameObjects.Graphics) {
    const positions = [
      [50, 96],
      [96, 126],
      [152, 72],
      [1112, 92],
      [1170, 130],
      [1208, 78],
      [54, 528],
      [96, 580],
      [1128, 520],
      [1188, 564],
    ];

    for (const [x, y] of positions) {
      this.drawTree(graphics, x, y);
    }
  }

  private drawTree(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
  ) {
    graphics.fillStyle(0x644526, 1);
    graphics.fillRect(x + 15, y + 34, 14, 28);
    graphics.fillStyle(0x244f35, 1);
    graphics.fillRect(x, y + 16, 44, 30);
    graphics.fillRect(x + 7, y, 30, 28);
    graphics.fillStyle(0x3f7a48, 1);
    graphics.fillRect(x + 8, y + 18, 28, 8);
    graphics.fillRect(x + 16, y + 4, 14, 8);
  }

  private drawLamp(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
  ) {
    graphics.fillStyle(palette.ink, 1);
    graphics.fillRect(x - 3, y, 6, 36);
    graphics.fillRect(x - 12, y - 8, 24, 10);
    graphics.fillStyle(palette.yellow, 1);
    graphics.fillRect(x - 7, y - 5, 14, 6);
  }

  private drawBench(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
  ) {
    graphics.fillStyle(0x6d4a2c, 1);
    graphics.fillRect(x, y, 72, 10);
    graphics.fillRect(x, y + 17, 72, 9);
    graphics.fillStyle(palette.ink, 1);
    graphics.fillRect(x + 8, y + 10, 5, 24);
    graphics.fillRect(x + 58, y + 10, 5, 24);
  }

  private drawFence(graphics: Phaser.GameObjects.Graphics) {
    graphics.fillStyle(0x7c5631, 1);
    for (let x = 180; x <= 1100; x += 36) {
      graphics.fillRect(x, 108, 8, 28);
      graphics.fillRect(x, 594, 8, 28);
    }
    graphics.fillRect(180, 116, 928, 6);
    graphics.fillRect(180, 602, 928, 6);
  }

  private stationTextStyle(
    color = '#f6f0df',
  ): Phaser.Types.GameObjects.Text.TextStyle {
    return {
      color,
      fontFamily: GAME_FONT,
      fontSize: '16px',
      fontStyle: '900',
    };
  }
}
