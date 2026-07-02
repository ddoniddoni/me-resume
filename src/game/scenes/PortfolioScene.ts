import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '@/game/config';
import type { PortfolioGameCallbacks } from '@/game/PhaserGame';
import { portfolioInteractables, type InteractableId } from '@/game/interactions';

const PLAYER_SPEED = 220;
const PLAYER_SCALE = 4;
const PLAYER_START = {
  x: 640,
  y: 368,
};
const TILE_SIZE = 16;
const GROUND_TILE_SCALE = 2;
const GROUND_TILE_SIZE = TILE_SIZE * GROUND_TILE_SCALE;
const FENCE_TILE_SCALE = 1.5;
const FENCE_TILE_SIZE = TILE_SIZE * FENCE_TILE_SCALE;
const FENCE_REGION_TILES = 9;
const FENCE_REGION_SIZE = FENCE_TILE_SIZE * FENCE_REGION_TILES;

const ASSETS = {
  chest: '/assets/games/Objects/Chest.png',
  fences: '/assets/games/Tilesets/Fences.png',
  grass: '/assets/games/Tilesets/Grass.png',
  grassBiome: '/assets/games/Objects/Basic_Grass_Biom_things.png',
  grassBiomeSheet: '/assets/games/Objects/Basic_Grass_Biom_things.png',
  player: '/assets/games/Characters/Basic%20Charakter%20Spritesheet.png',
} as const;

const grassFillFrameRows = [
  [55, 56, 57, 58, 59, 60],
  [66, 67, 68, 69, 70, 71],
] as const;
const fenceRegions = [
  { interactableId: 'resume', x: 302, y: 112 },
  { interactableId: 'career', x: 762, y: 112 },
  { interactableId: 'introduction', x: 302, y: 408 },
  { interactableId: 'contact', x: 762, y: 408 },
] as const;
const fenceHorizontalFrames = {
  bottom: [13, 14, 15],
  top: [1, 2, 3],
} as const;
const fencePostFrames = [0, 4, 8, 12] as const;
const flowerFrames: number[] = [25, 32, 33];
const BASE_FLOWER_COUNT = 7;
const BASE_TREE_COUNT = 4;
const regionContents = [
  {
    chest: { x: 148, y: 132 },
    flowerBonusMax: 2,
    treeBonusMax: 1,
  },
  {
    chest: { x: 112, y: 138 },
    flowerBonusMax: 3,
    treeBonusMax: 2,
  },
  {
    chest: { x: 152, y: 118 },
    flowerBonusMax: 5,
    treeBonusMax: 0,
  },
  {
    chest: { x: 84, y: 132 },
    flowerBonusMax: 1,
    treeBonusMax: 1,
  },
  {
    chest: { x: 150, y: 144 },
    flowerBonusMax: 4,
    treeBonusMax: 2,
  },
  {
    chest: { x: 104, y: 120 },
    flowerBonusMax: 6,
    treeBonusMax: 3,
  },
] as const;

type Direction = 'down' | 'left' | 'right' | 'up';

type MovementKeys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
};

const directionRows: Record<Direction, number> = {
  down: 0,
  left: 2,
  right: 3,
  up: 1,
};

export class PortfolioScene extends Phaser.Scene {
  private callbacks: PortfolioGameCallbacks;
  private lastEnteredRegionId?: InteractableId;
  private player?: Phaser.GameObjects.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: MovementKeys;
  private currentDirection: Direction = 'right';

  constructor(callbacks: PortfolioGameCallbacks) {
    super('PortfolioScene');
    this.callbacks = callbacks;
  }

  preload() {
    this.load.spritesheet('chest', ASSETS.chest, {
      frameHeight: 48,
      frameWidth: 48,
    });
    this.load.spritesheet('fences', ASSETS.fences, {
      frameHeight: TILE_SIZE,
      frameWidth: TILE_SIZE,
    });
    this.load.spritesheet('grass', ASSETS.grass, {
      frameHeight: TILE_SIZE,
      frameWidth: TILE_SIZE,
    });
    this.load.spritesheet('grassBiome', ASSETS.grassBiome, {
      frameHeight: TILE_SIZE,
      frameWidth: TILE_SIZE,
    });
    this.load.image('grassBiomeSheet', ASSETS.grassBiomeSheet);
    this.load.spritesheet('player', ASSETS.player, {
      frameHeight: 48,
      frameWidth: 48,
    });
  }

  create() {
    this.createGrassGround();
    this.createObjectFrames();
    this.createFenceRegions();
    this.createRegionContents();
    this.createAnimations();
    this.createPlayer();
    this.createControls();
  }

  update(_time: number, delta: number) {
    this.movePlayer(delta);
    this.checkRegionEntry();
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

  private createGrassGround() {
    const rows = Math.ceil(GAME_HEIGHT / GROUND_TILE_SIZE);
    const columns = Math.ceil(GAME_WIDTH / GROUND_TILE_SIZE);

    for (let row = 0; row < rows; row += 1) {
      const frameRow = grassFillFrameRows[row % grassFillFrameRows.length];

      for (let column = 0; column < columns; column += 1) {
        const frameIndex = frameRow[column % frameRow.length];

        this.add
          .image(column * GROUND_TILE_SIZE, row * GROUND_TILE_SIZE, 'grass', frameIndex)
          .setOrigin(0)
          .setScale(GROUND_TILE_SCALE)
          .setDepth(-100);
      }
    }
  }

  private createFenceRegions() {
    fenceRegions.forEach((region) => {
      this.createFenceRegion(region.x, region.y);
    });
  }

  private createFenceRegion(startX: number, startY: number) {
    const lastTile = FENCE_REGION_TILES - 1;

    for (let column = 0; column < FENCE_REGION_TILES; column += 1) {
      const topFrame = this.fenceHorizontalFrame('top', column, lastTile);
      const bottomFrame = this.fenceHorizontalFrame('bottom', column, lastTile);
      const x = startX + column * FENCE_TILE_SIZE;
      const bottomY = startY + lastTile * FENCE_TILE_SIZE;

      this.addFenceTile(x, startY, topFrame);
      this.addFenceTile(x, bottomY, bottomFrame);
    }

    for (let row = 1; row < lastTile; row += 1) {
      const frame = fencePostFrames[row % fencePostFrames.length];
      const y = startY + row * FENCE_TILE_SIZE;
      const rightX = startX + lastTile * FENCE_TILE_SIZE;

      this.addFenceTile(startX, y, frame);
      this.addFenceTile(rightX, y, frame);
    }
  }

  private fenceHorizontalFrame(
    edge: keyof typeof fenceHorizontalFrames,
    column: number,
    lastTile: number,
  ) {
    const [startFrame, middleFrame, endFrame] = fenceHorizontalFrames[edge];

    if (column === 0) {
      return startFrame;
    }

    if (column === lastTile) {
      return endFrame;
    }

    return middleFrame;
  }

  private addFenceTile(x: number, y: number, frame: number) {
    this.add
      .image(x, y, 'fences', frame)
      .setOrigin(0)
      .setScale(FENCE_TILE_SCALE)
      .setDepth(y + 10);
  }

  private createObjectFrames() {
    const grassBiomeTexture = this.textures.get('grassBiomeSheet');

    if (!grassBiomeTexture.has('roundTree')) {
      grassBiomeTexture.add('roundTree', 0, 16, 0, 32, 32);
    }
  }

  private createRegionContents() {
    fenceRegions.forEach((region, index) => {
      const content = regionContents[index % regionContents.length];

      this.createRegionSet(region.x, region.y, content, index);
    });
  }

  private createRegionSet(
    startX: number,
    startY: number,
    content: (typeof regionContents)[number],
    regionIndex: number,
  ) {
    this.createRegionTrees(startX, startY, content, regionIndex);

    this.add
      .image(startX + content.chest.x, startY + content.chest.y, 'chest', 0)
      .setScale(1.35)
      .setDepth(startY + content.chest.y + 18);

    this.createRegionFlowers(startX, startY, content, regionIndex);
  }

  private createRegionTrees(
    startX: number,
    startY: number,
    content: (typeof regionContents)[number],
    regionIndex: number,
  ) {
    const random = new Phaser.Math.RandomDataGenerator([`region-trees-${regionIndex}`]);
    const treeCount = BASE_TREE_COUNT + random.integerInRange(0, content.treeBonusMax);
    const trees: ReturnType<typeof this.randomTree>[] = [];

    for (let index = 0; index < treeCount; index += 1) {
      const tree = this.randomTree(random, content.chest, trees);

      trees.push(tree);
      this.add
        .image(startX + tree.x, startY + tree.y, 'grassBiomeSheet', 'roundTree')
        .setScale(tree.scale)
        .setDepth(startY + tree.y + 30);
    }
  }

  private randomTree(
    random: Phaser.Math.RandomDataGenerator,
    chest: (typeof regionContents)[number]['chest'],
    existingTrees: Array<{ x: number; y: number }>,
  ) {
    let scale = 1;
    let x = 0;
    let y = 0;

    for (let attempt = 0; attempt < 12; attempt += 1) {
      scale = random.realInRange(1.02, 1.24);
      x = random.integerInRange(54, 164);
      y = random.integerInRange(70, 148);

      const chestDistance = Phaser.Math.Distance.Between(x, y, chest.x, chest.y);
      const treeDistance = existingTrees.every(
        (tree) => Phaser.Math.Distance.Between(x, y, tree.x, tree.y) > 34,
      );

      if (chestDistance > 46 && treeDistance) {
        break;
      }
    }

    return {
      scale,
      x,
      y,
    };
  }

  private createRegionFlowers(
    startX: number,
    startY: number,
    content: (typeof regionContents)[number],
    regionIndex: number,
  ) {
    const random = new Phaser.Math.RandomDataGenerator([`region-flowers-${regionIndex}`]);
    const flowerCount = BASE_FLOWER_COUNT + random.integerInRange(0, content.flowerBonusMax);

    for (let index = 0; index < flowerCount; index += 1) {
      const flower = this.randomFlower(random, content.chest);

      this.add
        .image(startX + flower.x, startY + flower.y, 'grassBiome', flower.frame)
        .setScale(1.45)
        .setDepth(startY + flower.y);
    }
  }

  private randomFlower(
    random: Phaser.Math.RandomDataGenerator,
    chest: (typeof regionContents)[number]['chest'],
  ) {
    let x = 0;
    let y = 0;

    for (let attempt = 0; attempt < 8; attempt += 1) {
      x = random.integerInRange(58, 164);
      y = random.integerInRange(88, 170);

      const chestDistance = Phaser.Math.Distance.Between(x, y, chest.x, chest.y);

      if (chestDistance > 42) {
        break;
      }
    }

    return {
      frame: random.pick(flowerFrames),
      x,
      y,
    };
  }

  private createPlayer() {
    this.player = this.add
      .sprite(
        PLAYER_START.x,
        PLAYER_START.y,
        'player',
        directionRows[this.currentDirection] * 4 + 1,
      )
      .setOrigin(0.5, 0.78)
      .setScale(PLAYER_SCALE)
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

  private checkRegionEntry() {
    const player = this.player;

    if (!player) {
      return;
    }

    const enteredRegion = fenceRegions.find((region) =>
      Phaser.Geom.Rectangle.Contains(
        new Phaser.Geom.Rectangle(
          region.x,
          region.y,
          FENCE_REGION_SIZE,
          FENCE_REGION_SIZE,
        ),
        player.x,
        player.y,
      ),
    );

    if (!enteredRegion) {
      this.lastEnteredRegionId = undefined;
      return;
    }

    if (enteredRegion.interactableId === this.lastEnteredRegionId) {
      return;
    }

    const interactable = portfolioInteractables.find(
      (item) => item.id === enteredRegion.interactableId,
    );

    if (!interactable) {
      return;
    }

    this.lastEnteredRegionId = enteredRegion.interactableId;
    this.callbacks.onInteract(interactable);
  }

  private directionFromAxis(xAxis: number, yAxis: number): Direction {
    if (Math.abs(xAxis) > Math.abs(yAxis)) {
      return xAxis < 0 ? 'left' : 'right';
    }

    return yAxis < 0 ? 'up' : 'down';
  }
}
