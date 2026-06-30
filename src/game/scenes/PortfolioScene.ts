import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '@/game/config';
import {
  portfolioInteractables,
  type InteractableObject,
} from '@/game/interactions';
import type { PortfolioGameCallbacks } from '@/game/PhaserGame';

const PLAYER_SPEED = 250;
const INTERACTION_RADIUS = 78;
const PLAYER_START = {
  x: 480,
  y: 300,
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
  pulse: Phaser.GameObjects.Arc;
};

export class PortfolioScene extends Phaser.Scene {
  private readonly callbacks: PortfolioGameCallbacks;
  private player?: Phaser.GameObjects.Arc;
  private playerHighlight?: Phaser.GameObjects.Arc;
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
        'Move with WASD / Arrow Keys. Press Enter near an object.',
        {
          color: '#0f172a',
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
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

    graphics.fillStyle(0xf8fafc, 1);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    graphics.lineStyle(1, 0xdbe4ef, 0.7);
    for (let x = 40; x < GAME_WIDTH; x += 40) {
      graphics.lineBetween(x, 0, x, GAME_HEIGHT);
    }
    for (let y = 40; y < GAME_HEIGHT; y += 40) {
      graphics.lineBetween(0, y, GAME_WIDTH, y);
    }

    graphics.fillStyle(0xe2e8f0, 1);
    graphics.fillRoundedRect(74, 82, 812, 398, 18);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRoundedRect(95, 105, 770, 354, 14);

    graphics.lineStyle(4, 0x0f172a, 1);
    graphics.strokeRoundedRect(95, 105, 770, 354, 14);

    graphics.lineStyle(3, 0x38bdf8, 0.85);
    graphics.strokeRoundedRect(130, 140, 700, 284, 10);

    this.add
      .text(128, 118, 'DDoni Frontend Quest Map', {
        color: '#0f172a',
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        fontSize: '18px',
        fontStyle: '900',
      })
      .setDepth(1);
  }

  private renderInteractables() {
    this.renderedInteractables = portfolioInteractables.map((interactable) => {
      const marker = this.add
        .rectangle(interactable.x, interactable.y, 108, 58, 0xffffff)
        .setStrokeStyle(3, 0x0f172a)
        .setInteractive({ useHandCursor: true });

      const pulse = this.add
        .circle(interactable.x, interactable.y, INTERACTION_RADIUS, 0x38bdf8, 0)
        .setStrokeStyle(2, 0x38bdf8, 0)
        .setDepth(0);

      this.add
        .text(interactable.x, interactable.y, this.iconFor(interactable.id), {
          color: '#0f172a',
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          fontSize: '20px',
          fontStyle: '900',
        })
        .setOrigin(0.5)
        .setDepth(2);

      this.add
        .text(interactable.x, interactable.y + 48, interactable.label, {
          align: 'center',
          color: '#334155',
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          fontSize: '13px',
          fontStyle: '700',
        })
        .setOrigin(0.5, 0)
        .setDepth(2);

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
    this.player = this.add
      .circle(PLAYER_START.x, PLAYER_START.y, 18, 0xf4b942)
      .setStrokeStyle(4, 0x0f172a)
      .setDepth(4);

    this.playerHighlight = this.add
      .circle(PLAYER_START.x + 6, PLAYER_START.y - 6, 5, 0xffffff)
      .setDepth(5);
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
    this.playerHighlight?.setPosition(nextX + 6, nextY - 6);
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
        ? `Press Enter to open ${nearest.label}.`
        : 'Move with WASD / Arrow Keys. Press Enter near an object.',
    );

    for (const rendered of this.renderedInteractables) {
      const isNearest = rendered.data.id === nearest?.id;
      rendered.marker.setStrokeStyle(
        isNearest ? 4 : 3,
        isNearest ? 0x0891b2 : 0x0f172a,
      );
      rendered.pulse.setStrokeStyle(2, 0x38bdf8, isNearest ? 0.95 : 0);
    }
  }

  private iconFor(id: InteractableObject['id']) {
    const icons: Record<InteractableObject['id'], string> = {
      projects: '</>',
      resume: 'CV',
      components: '{}',
      performance: 'ms',
      troubleshooting: '!',
      contact: '@',
    };

    return icons[id];
  }
}
