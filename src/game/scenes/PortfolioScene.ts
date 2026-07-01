import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '@/game/config';
import {
  portfolioInteractables,
  type InteractableObject,
} from '@/game/interactions';
import type { PortfolioGameCallbacks } from '@/game/PhaserGame';

const PLAYER_SPEED = 260;
const INTERACTION_RADIUS = 108;
const PLAYER_START = {
  x: 640,
  y: 388,
};
const GAME_FONT =
  'Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, ui-sans-serif, system-ui, sans-serif';

const ASSETS = {
  map: '/assets/maps/portfolio-campus.json',
  player: '/assets/sprites/player.png',
  stations: '/assets/sprites/stations.png',
  tiles: '/assets/tiles/portfolio-campus.png',
} as const;

const colors = {
  ink: 0x10141b,
  cream: 0xf6f0df,
  blue: 0x0052ff,
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
  marker: Phaser.GameObjects.Rectangle;
  pulse: Phaser.GameObjects.Rectangle;
  sprite: Phaser.GameObjects.Sprite;
};

const stationFrames: Record<InteractableObject['id'], number> = {
  projects: 0,
  resume: 1,
  components: 2,
  performance: 3,
  troubleshooting: 4,
  contact: 5,
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
    this.load.image('campusTiles', ASSETS.tiles);
    this.load.tilemapTiledJSON('campusMap', ASSETS.map);
    this.load.spritesheet('player', ASSETS.player, {
      frameHeight: 48,
      frameWidth: 32,
    });
    this.load.spritesheet('stations', ASSETS.stations, {
      frameHeight: 112,
      frameWidth: 128,
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
    const map = this.make.tilemap({ key: 'campusMap' });
    const tileset = map.addTilesetImage('portfolio-campus', 'campusTiles');

    if (!tileset) {
      throw new Error('portfolio-campus tileset을 불러오지 못했습니다.');
    }

    map.createLayer('Ground', tileset, 0, 0)?.setDepth(0);
    map.createLayer('Paths', tileset, 0, 0)?.setDepth(1);
    map.createLayer('Decor', tileset, 0, 0)?.setDepth(4);

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

  private createAnimations() {
    (Object.keys(directionRows) as Direction[]).forEach((direction) => {
      const row = directionRows[direction];
      this.anims.create({
        frameRate: 8,
        frames: this.anims.generateFrameNumbers('player', {
          end: row * 3 + 2,
          start: row * 3,
        }),
        key: `walk-${direction}`,
        repeat: -1,
      });
    });
  }

  private renderInteractables() {
    this.renderedInteractables = portfolioInteractables.map((interactable) => {
      const sprite = this.add
        .sprite(
          interactable.x,
          interactable.y + 54,
          'stations',
          stationFrames[interactable.id],
        )
        .setOrigin(0.5, 1)
        .setDepth(interactable.y);

      const marker = this.add
        .rectangle(
          interactable.x,
          interactable.y + 12,
          144,
          124,
          0xffffff,
          0.001,
        )
        .setStrokeStyle(0, colors.blue, 0)
        .setInteractive({ useHandCursor: true })
        .setDepth(interactable.y + 3);

      const pulse = this.add
        .rectangle(
          interactable.x,
          interactable.y + 12,
          158,
          136,
          colors.blue,
          0,
        )
        .setStrokeStyle(4, colors.blue, 0)
        .setDepth(interactable.y + 2);

      const labelWidth = Math.max(112, interactable.label.length * 13);
      const labelBg = this.add
        .rectangle(
          interactable.x,
          interactable.y + 88,
          labelWidth,
          28,
          colors.ink,
          0.92,
        )
        .setStrokeStyle(2, colors.cream, 0.32)
        .setDepth(95);

      const labelText = this.add
        .text(interactable.x, interactable.y + 88, interactable.label, {
          align: 'center',
          color: '#f6f0df',
          fontFamily: GAME_FONT,
          fontSize: '13px',
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
        sprite,
      };
    });
  }

  private createPlayer() {
    this.player = this.add
      .sprite(PLAYER_START.x, PLAYER_START.y, 'player', 1)
      .setOrigin(0.5, 1)
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
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 54, 780, 56, colors.ink, 0.9)
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
      this.player.setFrame(directionRows[this.currentDirection] * 3 + 1);
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
        this.player.y - 24,
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
      rendered.pulse.setStrokeStyle(4, colors.blue, isNearest ? 0.95 : 0);
      rendered.labelBg.setFillStyle(
        isNearest ? colors.blue : colors.ink,
        isNearest ? 0.96 : 0.92,
      );
      rendered.labelText.setColor(isNearest ? '#ffffff' : '#f6f0df');
      rendered.sprite.setTint(isNearest ? 0xffffff : 0xffffff);
    }
  }
}
