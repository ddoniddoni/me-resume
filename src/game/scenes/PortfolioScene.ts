import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '@/game/config';
import {
  portfolioInteractables,
  type InteractableObject,
} from '@/game/interactions';
import type { PortfolioGameCallbacks } from '@/game/PhaserGame';

const PLAYER_SPEED = 220;
const INTERACTION_RADIUS = 92;
const PLAYER_START = {
  x: 640,
  y: 408,
};
const GAME_FONT =
  'Pretendard, Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, ui-sans-serif, system-ui, sans-serif';

const ASSETS = {
  bridge: '/assets/games/Objects/Wood_Bridge.png',
  chest: '/assets/games/Objects/Chest.png',
  fences: '/assets/games/Tilesets/Fences.png',
  furniture: '/assets/games/Objects/Basic_Furniture.png',
  grass: '/assets/games/Tilesets/Grass.png',
  paths: '/assets/games/Objects/Paths.png',
  plants: '/assets/games/Objects/Basic_Plants.png',
  player: '/assets/games/Characters/Basic%20Charakter%20Spritesheet.png',
  tools: '/assets/games/Objects/Basic_tools_and_meterials.png',
  water: '/assets/games/Tilesets/Water.png',
} as const;

const colors = {
  blue: 0x0052ff,
  cream: 0xf6f0df,
  dark: 0x2f4330,
  ink: 0x10141b,
  meadow: 0x80b75c,
  moss: 0x557846,
  white: 0xffffff,
};

type Direction = 'down' | 'left' | 'right' | 'up';

type MovementKeys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
};

type RenderedInteractable = {
  data: InteractableObject;
  labelBg: Phaser.GameObjects.Rectangle;
  labelText: Phaser.GameObjects.Text;
  marker: Phaser.GameObjects.Ellipse;
  pulse: Phaser.GameObjects.Ellipse;
};

const directionRows: Record<Direction, number> = {
  down: 0,
  left: 1,
  right: 2,
  up: 3,
};

export class PortfolioScene extends Phaser.Scene {
  private readonly callbacks: PortfolioGameCallbacks;
  private player?: Phaser.GameObjects.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: MovementKeys;
  private enterKey?: Phaser.Input.Keyboard.Key;
  private hintBox?: Phaser.GameObjects.Rectangle;
  private hintText?: Phaser.GameObjects.Text;
  private renderedInteractables: RenderedInteractable[] = [];
  private nearestInteractable?: InteractableObject;
  private currentDirection: Direction = 'down';

  constructor(callbacks: PortfolioGameCallbacks) {
    super('PortfolioScene');
    this.callbacks = callbacks;
  }

  preload() {
    this.load.image('bridge', ASSETS.bridge);
    this.load.image('grass', ASSETS.grass);
    this.load.image('paths', ASSETS.paths);
    this.load.image('water', ASSETS.water);
    this.load.spritesheet('chest', ASSETS.chest, {
      frameHeight: 16,
      frameWidth: 16,
    });
    this.load.spritesheet('fences', ASSETS.fences, {
      frameHeight: 16,
      frameWidth: 16,
    });
    this.load.spritesheet('furniture', ASSETS.furniture, {
      frameHeight: 16,
      frameWidth: 16,
    });
    this.load.spritesheet('plants', ASSETS.plants, {
      frameHeight: 16,
      frameWidth: 16,
    });
    this.load.spritesheet('player', ASSETS.player, {
      frameHeight: 48,
      frameWidth: 48,
    });
    this.load.spritesheet('tools', ASSETS.tools, {
      frameHeight: 16,
      frameWidth: 16,
    });
  }

  create() {
    this.createMap();
    this.createAnimations();
    this.renderInteractables();
    this.createPlayer();
    this.createControls();
    this.createHintHud();
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

  private createMap() {
    this.add
      .tileSprite(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2,
        GAME_WIDTH,
        GAME_HEIGHT,
        'grass',
      )
      .setDepth(0)
      .setTileScale(2.2, 2.2);

    this.add
      .rectangle(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2,
        GAME_WIDTH,
        GAME_HEIGHT,
        0x325b36,
        0.16,
      )
      .setDepth(1);

    this.add
      .tileSprite(GAME_WIDTH / 2, 402, GAME_WIDTH - 184, 92, 'paths')
      .setDepth(2)
      .setAlpha(0.98)
      .setTileScale(1.9, 1.9);
    this.add
      .tileSprite(640, 358, 126, 420, 'paths')
      .setDepth(2)
      .setAlpha(0.96)
      .setTileScale(1.9, 1.9);
    this.add
      .tileSprite(236, 402, 132, 258, 'paths')
      .setDepth(2)
      .setAlpha(0.96)
      .setTileScale(1.9, 1.9);
    this.add
      .tileSprite(944, 424, 136, 280, 'paths')
      .setDepth(2)
      .setAlpha(0.96)
      .setTileScale(1.9, 1.9);

    this.add
      .tileSprite(1118, 604, 268, 84, 'water')
      .setDepth(3)
      .setTileScale(2.8, 2.8);
    this.add.image(1118, 560, 'bridge').setScale(2.1).setDepth(28);

    this.createFenceLine(104, 126, 9, 'horizontal');
    this.createFenceLine(956, 126, 9, 'horizontal');
    this.createFenceLine(104, 626, 9, 'horizontal');
    this.createFenceLine(120, 182, 8, 'vertical');
    this.createFenceLine(1154, 168, 9, 'vertical');

    this.scatterPlants();

    this.add
      .text(28, 24, 'DDONI FRONTEND QUEST', {
        color: '#f6f0df',
        fontFamily: GAME_FONT,
        fontSize: '18px',
        fontStyle: '900',
      })
      .setShadow(2, 2, '#10141b', 0, true, true)
      .setDepth(90);
  }

  private createFenceLine(
    startX: number,
    startY: number,
    count: number,
    direction: 'horizontal' | 'vertical',
  ) {
    for (let index = 0; index < count; index += 1) {
      const x = startX + (direction === 'horizontal' ? index * 32 : 0);
      const y = startY + (direction === 'vertical' ? index * 32 : 0);

      this.add
        .sprite(x, y, 'fences', direction === 'horizontal' ? 1 : 4)
        .setScale(2)
        .setDepth(y);
    }
  }

  private scatterPlants() {
    const decorations = [
      { frame: 0, x: 182, y: 218 },
      { frame: 1, x: 220, y: 246 },
      { frame: 2, x: 382, y: 154 },
      { frame: 6, x: 792, y: 160 },
      { frame: 7, x: 846, y: 188 },
      { frame: 3, x: 1076, y: 236 },
      { frame: 8, x: 1120, y: 278 },
      { frame: 1, x: 356, y: 622 },
      { frame: 2, x: 760, y: 618 },
      { frame: 7, x: 1066, y: 690 },
    ];

    decorations.forEach((decoration) => {
      this.add
        .sprite(decoration.x, decoration.y, 'plants', decoration.frame)
        .setScale(2)
        .setDepth(decoration.y);
    });
  }

  private createAnimations() {
    (Object.keys(directionRows) as Direction[]).forEach((direction) => {
      const row = directionRows[direction];

      this.anims.create({
        frameRate: 8,
        frames: this.anims.generateFrameNumbers('player', {
          end: row * 4 + 3,
          start: row * 4,
        }),
        key: `walk-${direction}`,
        repeat: -1,
      });
    });
  }

  private renderInteractables() {
    this.renderedInteractables = portfolioInteractables.map((interactable) => {
      this.renderInteractableObject(interactable);

      const marker = this.add
        .ellipse(
          interactable.x,
          interactable.y + 8,
          116,
          72,
          colors.white,
          0.001,
        )
        .setStrokeStyle(0, colors.blue, 0)
        .setInteractive({ useHandCursor: true })
        .setDepth(interactable.y + 24);

      const pulse = this.add
        .ellipse(interactable.x, interactable.y + 8, 132, 84, colors.blue, 0)
        .setStrokeStyle(4, colors.blue, 0)
        .setDepth(interactable.y + 23);

      const labelWidth = Math.max(104, interactable.label.length * 12);
      const labelBg = this.add
        .rectangle(
          interactable.x,
          interactable.y + 68,
          labelWidth,
          27,
          colors.ink,
          0.9,
        )
        .setStrokeStyle(2, colors.cream, 0.32)
        .setDepth(95);

      const labelText = this.add
        .text(interactable.x, interactable.y + 68, interactable.label, {
          align: 'center',
          color: '#f6f0df',
          fontFamily: GAME_FONT,
          fontSize: '12px',
          fontStyle: '800',
        })
        .setOrigin(0.5)
        .setDepth(96);

      marker.on('pointerdown', () => {
        this.callbacks.onInteract(interactable);
      });

      return {
        data: interactable,
        labelBg,
        labelText,
        marker,
        pulse,
      };
    });
  }

  private renderInteractableObject(interactable: InteractableObject) {
    this.add
      .ellipse(interactable.x, interactable.y + 34, 92, 28, 0x17311e, 0.32)
      .setDepth(interactable.y - 2);

    switch (interactable.id) {
      case 'projects':
        this.add
          .sprite(interactable.x - 24, interactable.y + 14, 'furniture', 30)
          .setScale(2.4)
          .setDepth(interactable.y);
        this.add
          .sprite(interactable.x + 20, interactable.y + 8, 'tools', 0)
          .setScale(2.2)
          .setDepth(interactable.y + 1);
        this.add
          .rectangle(
            interactable.x + 20,
            interactable.y - 20,
            38,
            24,
            colors.ink,
            0.9,
          )
          .setStrokeStyle(3, colors.blue, 0.9)
          .setDepth(interactable.y + 2);
        break;
      case 'resume':
        this.add
          .sprite(interactable.x - 26, interactable.y + 20, 'fences', 4)
          .setScale(2.4)
          .setDepth(interactable.y);
        this.add
          .sprite(interactable.x + 26, interactable.y + 20, 'fences', 4)
          .setScale(2.4)
          .setDepth(interactable.y);
        this.add
          .rectangle(
            interactable.x,
            interactable.y - 14,
            76,
            48,
            colors.cream,
            0.96,
          )
          .setStrokeStyle(4, colors.ink, 0.9)
          .setDepth(interactable.y + 2);
        this.add
          .rectangle(
            interactable.x,
            interactable.y - 24,
            46,
            5,
            colors.blue,
            0.95,
          )
          .setDepth(interactable.y + 3);
        this.add
          .rectangle(
            interactable.x,
            interactable.y - 8,
            52,
            4,
            colors.moss,
            0.86,
          )
          .setDepth(interactable.y + 3);
        break;
      case 'components':
        this.add
          .sprite(interactable.x - 26, interactable.y + 16, 'furniture', 6)
          .setScale(2.6)
          .setDepth(interactable.y);
        this.add
          .sprite(interactable.x + 8, interactable.y + 12, 'plants', 4)
          .setScale(2.4)
          .setDepth(interactable.y + 2);
        this.add
          .sprite(interactable.x + 36, interactable.y + 16, 'tools', 2)
          .setScale(2.2)
          .setDepth(interactable.y + 3);
        break;
      case 'performance':
        this.add
          .sprite(interactable.x - 28, interactable.y + 14, 'furniture', 24)
          .setScale(2.5)
          .setDepth(interactable.y);
        this.add
          .rectangle(
            interactable.x + 18,
            interactable.y - 16,
            44,
            28,
            colors.ink,
            0.9,
          )
          .setStrokeStyle(3, colors.meadow, 0.95)
          .setDepth(interactable.y + 2);
        this.add
          .line(
            interactable.x + 18,
            interactable.y - 16,
            -14,
            6,
            -4,
            -3,
            colors.meadow,
            0.95,
          )
          .setLineWidth(3)
          .setDepth(interactable.y + 3);
        this.add
          .line(
            interactable.x + 18,
            interactable.y - 16,
            -4,
            -3,
            6,
            5,
            colors.meadow,
            0.95,
          )
          .setLineWidth(3)
          .setDepth(interactable.y + 3);
        this.add
          .line(
            interactable.x + 18,
            interactable.y - 16,
            6,
            5,
            16,
            -8,
            colors.meadow,
            0.95,
          )
          .setLineWidth(3)
          .setDepth(interactable.y + 3);
        break;
      case 'troubleshooting':
        this.add
          .sprite(interactable.x - 18, interactable.y + 16, 'chest', 0)
          .setScale(2.8)
          .setDepth(interactable.y);
        this.add
          .sprite(interactable.x + 28, interactable.y + 12, 'tools', 4)
          .setScale(2.4)
          .setDepth(interactable.y + 2);
        this.add
          .rectangle(
            interactable.x + 2,
            interactable.y - 24,
            42,
            26,
            colors.ink,
            0.88,
          )
          .setStrokeStyle(3, 0xffcc4d, 0.95)
          .setDepth(interactable.y + 3);
        this.add
          .text(interactable.x + 2, interactable.y - 25, '!', {
            align: 'center',
            color: '#ffcc4d',
            fontFamily: GAME_FONT,
            fontSize: '22px',
            fontStyle: '900',
          })
          .setOrigin(0.5)
          .setDepth(interactable.y + 4);
        break;
      case 'contact':
        this.add
          .sprite(interactable.x - 24, interactable.y + 16, 'furniture', 12)
          .setScale(2.5)
          .setDepth(interactable.y);
        this.add
          .rectangle(
            interactable.x + 18,
            interactable.y - 14,
            42,
            32,
            colors.ink,
            0.92,
          )
          .setStrokeStyle(3, colors.blue, 0.95)
          .setDepth(interactable.y + 2);
        this.add
          .rectangle(
            interactable.x + 18,
            interactable.y - 14,
            24,
            5,
            colors.blue,
            0.95,
          )
          .setDepth(interactable.y + 3);
        break;
    }
  }

  private createPlayer() {
    this.player = this.add
      .sprite(PLAYER_START.x, PLAYER_START.y, 'player', 1)
      .setOrigin(0.5, 0.78)
      .setScale(2.15)
      .setDepth(PLAYER_START.y + 20);
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
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 54, 780, 56, colors.ink, 0.88)
      .setStrokeStyle(3, colors.cream, 0.75)
      .setDepth(100);

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
      .setDepth(101);
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
      this.player.anims.stop();
      this.player.setFrame(directionRows[this.currentDirection] * 4 + 1);
      return;
    }

    const nextDirection = this.directionFromAxis(xAxis, yAxis);
    this.currentDirection = nextDirection;
    this.player.anims.play(`walk-${nextDirection}`, true);

    const vector = new Phaser.Math.Vector2(xAxis, yAxis).normalize();
    const distance = (PLAYER_SPEED * delta) / 1000;
    const nextX = Phaser.Math.Clamp(
      this.player.x + vector.x * distance,
      48,
      GAME_WIDTH - 48,
    );
    const nextY = Phaser.Math.Clamp(
      this.player.y + vector.y * distance,
      92,
      GAME_HEIGHT - 48,
    );

    this.player.setPosition(nextX, nextY);
    this.player.setDepth(nextY + 20);
  }

  private directionFromAxis(xAxis: number, yAxis: number): Direction {
    if (Math.abs(xAxis) > Math.abs(yAxis)) {
      return xAxis < 0 ? 'left' : 'right';
    }

    return yAxis < 0 ? 'up' : 'down';
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
        this.player.y - 18,
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
      nearest ? colors.blue : colors.cream,
      nearest ? 1 : 0.75,
    );

    for (const rendered of this.renderedInteractables) {
      const isNearest = rendered.data.id === nearest?.id;
      rendered.marker.setStrokeStyle(
        isNearest ? 4 : 0,
        colors.blue,
        isNearest ? 1 : 0,
      );
      rendered.pulse.setStrokeStyle(4, colors.blue, isNearest ? 0.92 : 0);
      rendered.labelBg.setFillStyle(
        isNearest ? colors.blue : colors.ink,
        isNearest ? 0.96 : 0.9,
      );
      rendered.labelText.setColor(isNearest ? '#ffffff' : '#f6f0df');
    }
  }
}
