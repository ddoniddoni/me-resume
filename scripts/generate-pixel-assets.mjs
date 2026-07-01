import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { deflateSync } from 'node:zlib';

const ROOT = process.cwd();
const TILE = 32;
const MAP_WIDTH = 40;
const MAP_HEIGHT = 23;

const colors = {
  transparent: [0, 0, 0, 0],
  ink: [16, 20, 27, 255],
  cream: [246, 240, 223, 255],
  white: [255, 255, 255, 255],
  blue: [0, 82, 255, 255],
  blueDark: [18, 58, 156, 255],
  grass: [88, 125, 85, 255],
  grassAlt: [83, 119, 81, 255],
  grassDark: [61, 96, 70, 255],
  path: [195, 164, 106, 255],
  pathLight: [211, 184, 125, 255],
  pathEdge: [142, 114, 68, 255],
  stone: [135, 144, 154, 255],
  stoneLight: [154, 163, 173, 255],
  water: [49, 92, 141, 255],
  waterLight: [110, 162, 202, 255],
  bridge: [125, 90, 50, 255],
  bridgeLight: [168, 121, 67, 255],
  roof: [43, 53, 80, 255],
  wall: [216, 212, 195, 255],
  wallShadow: [170, 164, 147, 255],
  green: [5, 168, 106, 255],
  red: [199, 59, 66, 255],
  yellow: [228, 180, 65, 255],
  glass: [159, 198, 217, 255],
  skin: [243, 197, 159, 255],
  hair: [42, 26, 18, 255],
  pants: [31, 47, 80, 255],
  leather: [77, 51, 36, 255],
};

class Bitmap {
  constructor(width, height, fill = colors.transparent) {
    this.width = width;
    this.height = height;
    this.data = new Uint8Array(width * height * 4);
    this.fillRect(0, 0, width, height, fill);
  }

  setPixel(x, y, color) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    const index = (y * this.width + x) * 4;
    this.data[index] = color[0];
    this.data[index + 1] = color[1];
    this.data[index + 2] = color[2];
    this.data[index + 3] = color[3];
  }

  fillRect(x, y, width, height, color) {
    for (let row = y; row < y + height; row += 1) {
      for (let column = x; column < x + width; column += 1) {
        this.setPixel(column, row, color);
      }
    }
  }

  outlineRect(x, y, width, height, color) {
    this.fillRect(x, y, width, 1, color);
    this.fillRect(x, y + height - 1, width, 1, color);
    this.fillRect(x, y, 1, height, color);
    this.fillRect(x + width - 1, y, 1, height, color);
  }
}

function ensureParent(path) {
  mkdirSync(dirname(path), { recursive: true });
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function writePng(path, bitmap) {
  ensureParent(path);
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(bitmap.width, 0);
  ihdr.writeUInt32BE(bitmap.height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const stride = bitmap.width * 4;
  const raw = Buffer.alloc((stride + 1) * bitmap.height);
  for (let y = 0; y < bitmap.height; y += 1) {
    raw[y * (stride + 1)] = 0;
    Buffer.from(bitmap.data.buffer, y * stride, stride).copy(
      raw,
      y * (stride + 1) + 1,
    );
  }

  writeFileSync(
    path,
    Buffer.concat([
      header,
      pngChunk('IHDR', ihdr),
      pngChunk('IDAT', deflateSync(raw, { level: 9 })),
      pngChunk('IEND', Buffer.alloc(0)),
    ]),
  );
}

function tileOrigin(index) {
  return {
    x: (index % 8) * TILE,
    y: Math.floor(index / 8) * TILE,
  };
}

function drawTile(bitmap, index, draw) {
  const origin = tileOrigin(index);
  draw(bitmap, origin.x, origin.y);
}

function generateTileset() {
  const bitmap = new Bitmap(256, 128);

  drawTile(bitmap, 0, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.grass);
    b.fillRect(x + 6, y + 9, 4, 8, colors.grassDark);
    b.fillRect(x + 22, y + 20, 4, 6, colors.grassDark);
  });
  drawTile(bitmap, 1, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.grassAlt);
    b.fillRect(x + 10, y + 10, 3, 3, colors.cream);
    b.fillRect(x + 14, y + 13, 3, 3, colors.yellow);
    b.fillRect(x + 24, y + 23, 4, 5, colors.grassDark);
  });
  drawTile(bitmap, 2, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.path);
    b.fillRect(x + 5, y + 7, 12, 3, colors.pathLight);
    b.fillRect(x + 18, y + 22, 10, 3, colors.pathLight);
  });
  drawTile(bitmap, 3, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.pathEdge);
    b.fillRect(x, y + 5, TILE, 22, colors.path);
    b.fillRect(x + 4, y + 12, 14, 3, colors.pathLight);
  });
  drawTile(bitmap, 4, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.stone);
    b.fillRect(x, y, TILE, 2, colors.stoneLight);
    b.fillRect(x + 1, y + 15, 30, 2, colors.stoneLight);
    b.fillRect(x + 14, y, 2, 15, colors.stoneLight);
  });
  drawTile(bitmap, 5, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.water);
    b.fillRect(x + 4, y + 9, 18, 3, colors.waterLight);
    b.fillRect(x + 13, y + 23, 15, 3, colors.waterLight);
  });
  drawTile(bitmap, 6, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.bridge);
    for (let i = 4; i < TILE; i += 8)
      b.fillRect(x + i, y, 3, TILE, colors.bridgeLight);
    b.fillRect(x, y + 6, TILE, 3, colors.ink);
    b.fillRect(x, y + 23, TILE, 3, colors.ink);
  });
  drawTile(bitmap, 7, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.stoneLight);
    b.fillRect(x, y + 30, TILE, 2, colors.stone);
    b.fillRect(x + 30, y, 2, TILE, colors.stone);
  });
  drawTile(bitmap, 8, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.grass);
    b.fillRect(x + 10, y + 9, 12, 18, colors.leather);
    b.fillRect(x + 2, y + 4, 28, 20, colors.grassDark);
    b.fillRect(x + 8, y, 16, 14, [43, 102, 58, 255]);
  });
  drawTile(bitmap, 9, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.grass);
    b.fillRect(x + 14, y + 7, 4, 22, colors.ink);
    b.fillRect(x + 6, y + 5, 20, 6, colors.ink);
    b.fillRect(x + 10, y + 7, 12, 4, colors.yellow);
  });
  drawTile(bitmap, 10, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.grass);
    b.fillRect(x + 2, y + 8, 28, 5, colors.leather);
    b.fillRect(x + 2, y + 17, 28, 5, colors.leather);
    b.fillRect(x + 5, y + 13, 3, 14, colors.ink);
    b.fillRect(x + 24, y + 13, 3, 14, colors.ink);
  });
  drawTile(bitmap, 11, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.grass);
    b.fillRect(x + 6, y + 8, 20, 3, colors.leather);
    b.fillRect(x + 6, y + 21, 20, 3, colors.leather);
    b.fillRect(x + 4, y + 12, 3, 9, colors.leather);
    b.fillRect(x + 25, y + 12, 3, 9, colors.leather);
  });
  drawTile(bitmap, 12, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.grass);
    b.fillRect(x + 4, y + 8, 24, 4, colors.ink);
    b.fillRect(x + 11, y + 12, 10, 16, colors.ink);
  });
  drawTile(bitmap, 13, (b, x, y) => {
    b.fillRect(x, y, TILE, TILE, colors.grass);
    b.fillRect(x + 6, y + 10, 20, 16, colors.cream);
    b.outlineRect(x + 6, y + 10, 20, 16, colors.ink);
    b.fillRect(x + 10, y + 15, 12, 3, colors.blue);
  });

  writePng(join(ROOT, 'public/assets/tiles/portfolio-campus.png'), bitmap);
}

function drawBuilding(bitmap, x, y, accent, icon) {
  bitmap.fillRect(x + 10, y + 80, 108, 12, [0, 0, 0, 50]);
  bitmap.fillRect(x + 2, y + 10, 124, 30, accent);
  bitmap.outlineRect(x + 2, y + 10, 124, 30, colors.ink);
  bitmap.fillRect(x + 12, y + 38, 104, 54, colors.wall);
  bitmap.fillRect(x + 12, y + 82, 104, 10, colors.wallShadow);
  bitmap.fillRect(x + 27, y + 50, 18, 20, colors.glass);
  bitmap.fillRect(x + 83, y + 50, 18, 20, colors.glass);
  bitmap.outlineRect(x + 27, y + 50, 18, 20, colors.ink);
  bitmap.outlineRect(x + 83, y + 50, 18, 20, colors.ink);
  bitmap.fillRect(x + 52, y + 60, 24, 32, colors.ink);
  bitmap.fillRect(x + 36, y + 18, 56, 14, colors.ink);
  drawIcon(bitmap, x + 64, y + 25, icon);
}

function drawIcon(bitmap, cx, cy, icon) {
  if (icon === 'code') {
    bitmap.fillRect(cx - 20, cy - 4, 5, 5, colors.cream);
    bitmap.fillRect(cx - 15, cy - 9, 5, 5, colors.cream);
    bitmap.fillRect(cx + 15, cy - 4, 5, 5, colors.cream);
    bitmap.fillRect(cx + 10, cy - 9, 5, 5, colors.cream);
    bitmap.fillRect(cx - 3, cy - 10, 5, 18, colors.cream);
  } else if (icon === 'cv') {
    bitmap.fillRect(cx - 14, cy - 9, 28, 18, colors.cream);
    bitmap.fillRect(cx - 8, cy - 3, 16, 3, colors.blue);
    bitmap.fillRect(cx - 8, cy + 4, 16, 3, colors.blue);
  } else if (icon === 'lab') {
    bitmap.fillRect(cx - 14, cy - 9, 10, 18, colors.cream);
    bitmap.fillRect(cx + 4, cy - 9, 10, 18, colors.cream);
    bitmap.fillRect(cx - 18, cy + 6, 36, 4, colors.cream);
  } else if (icon === 'perf') {
    bitmap.fillRect(cx - 16, cy + 7, 32, 4, colors.cream);
    bitmap.fillRect(cx - 12, cy + 1, 5, 10, colors.cream);
    bitmap.fillRect(cx - 2, cy - 6, 5, 17, colors.cream);
    bitmap.fillRect(cx + 8, cy - 12, 5, 23, colors.cream);
  } else if (icon === 'debug') {
    bitmap.fillRect(cx - 3, cy - 11, 6, 15, colors.cream);
    bitmap.fillRect(cx - 3, cy + 8, 6, 5, colors.cream);
  } else {
    bitmap.fillRect(cx - 10, cy - 8, 20, 16, colors.cream);
    bitmap.outlineRect(cx - 10, cy - 8, 20, 16, colors.ink);
    bitmap.fillRect(cx - 5, cy - 2, 10, 5, colors.blue);
  }
}

function generateStations() {
  const frameWidth = 128;
  const frameHeight = 112;
  const bitmap = new Bitmap(frameWidth * 6, frameHeight);
  const frames = [
    [colors.blue, 'code'],
    [colors.roof, 'cv'],
    [colors.green, 'lab'],
    [colors.blueDark, 'perf'],
    [colors.red, 'debug'],
    [[38, 49, 63, 255], 'contact'],
  ];

  frames.forEach(([accent, icon], index) => {
    drawBuilding(bitmap, index * frameWidth, 0, accent, icon);
  });

  writePng(join(ROOT, 'public/assets/sprites/stations.png'), bitmap);
}

function drawPlayerFrame(bitmap, x, y, direction, step) {
  const bob = step === 1 ? 1 : 0;
  bitmap.fillRect(x + 6, y + 42, 20, 4, [0, 0, 0, 70]);
  bitmap.fillRect(x + 10, y + 32 + bob, 5, 8, colors.ink);
  bitmap.fillRect(x + 18, y + 32 - bob, 5, 8, colors.ink);
  bitmap.fillRect(x + 9, y + 22, 14, 13, colors.pants);
  bitmap.fillRect(x + 7, y + 12, 18, 18, colors.blue);
  bitmap.outlineRect(x + 7, y + 12, 18, 18, colors.ink);
  bitmap.fillRect(x + 11, y + 5, 11, 10, colors.skin);
  bitmap.outlineRect(x + 11, y + 5, 11, 10, colors.ink);
  bitmap.fillRect(x + 9, y + 2, 15, 5, colors.hair);

  if (direction === 'left') {
    bitmap.fillRect(x + 11, y + 9, 2, 2, colors.ink);
    bitmap.fillRect(x + 6, y + 15, 4, 12, colors.leather);
  } else if (direction === 'right') {
    bitmap.fillRect(x + 20, y + 9, 2, 2, colors.ink);
    bitmap.fillRect(x + 22, y + 15, 4, 12, colors.leather);
  } else {
    bitmap.fillRect(x + 13, y + 9, 2, 2, colors.ink);
    bitmap.fillRect(x + 19, y + 9, 2, 2, colors.ink);
  }
}

function generatePlayer() {
  const frameWidth = 32;
  const frameHeight = 48;
  const bitmap = new Bitmap(frameWidth * 3, frameHeight * 4);
  const directions = ['down', 'left', 'right', 'up'];
  directions.forEach((direction, row) => {
    for (let frame = 0; frame < 3; frame += 1) {
      drawPlayerFrame(
        bitmap,
        frame * frameWidth,
        row * frameHeight,
        direction,
        frame,
      );
    }
  });
  writePng(join(ROOT, 'public/assets/sprites/player.png'), bitmap);
}

function gid(tileIndex) {
  return tileIndex + 1;
}

function rect(layer, x, y, width, height, tileIndex) {
  for (let row = y; row < y + height; row += 1) {
    for (let column = x; column < x + width; column += 1) {
      layer[row * MAP_WIDTH + column] = gid(tileIndex);
    }
  }
}

function generateMap() {
  const ground = Array.from({ length: MAP_WIDTH * MAP_HEIGHT }, (_, index) => {
    const x = index % MAP_WIDTH;
    const y = Math.floor(index / MAP_WIDTH);
    return gid((x * 7 + y * 11) % 9 === 0 ? 1 : 0);
  });
  const paths = Array(MAP_WIDTH * MAP_HEIGHT).fill(0);
  const decor = Array(MAP_WIDTH * MAP_HEIGHT).fill(0);

  rect(paths, 4, 10, 32, 3, 2);
  rect(paths, 18, 3, 4, 18, 2);
  rect(paths, 7, 6, 26, 2, 2);
  rect(paths, 7, 16, 26, 2, 2);
  rect(paths, 16, 9, 8, 5, 4);
  rect(paths, 18, 19, 4, 4, 6);
  rect(paths, 0, 20, MAP_WIDTH, 3, 5);

  [
    [1, 3],
    [3, 4],
    [35, 3],
    [37, 4],
    [1, 16],
    [3, 18],
    [35, 16],
    [37, 18],
  ].forEach(([x, y]) => {
    decor[y * MAP_WIDTH + x] = gid(8);
  });
  [
    [16, 8],
    [23, 8],
    [16, 14],
    [23, 14],
  ].forEach(([x, y]) => {
    decor[y * MAP_WIDTH + x] = gid(9);
  });
  [
    [12, 11],
    [25, 11],
  ].forEach(([x, y]) => {
    decor[y * MAP_WIDTH + x] = gid(10);
  });
  rect(decor, 5, 3, 30, 1, 11);
  rect(decor, 5, 18, 30, 1, 11);

  const map = {
    compressionlevel: -1,
    height: MAP_HEIGHT,
    infinite: false,
    layers: [
      {
        data: ground,
        height: MAP_HEIGHT,
        id: 1,
        name: 'Ground',
        opacity: 1,
        type: 'tilelayer',
        visible: true,
        width: MAP_WIDTH,
        x: 0,
        y: 0,
      },
      {
        data: paths,
        height: MAP_HEIGHT,
        id: 2,
        name: 'Paths',
        opacity: 1,
        type: 'tilelayer',
        visible: true,
        width: MAP_WIDTH,
        x: 0,
        y: 0,
      },
      {
        data: decor,
        height: MAP_HEIGHT,
        id: 3,
        name: 'Decor',
        opacity: 1,
        type: 'tilelayer',
        visible: true,
        width: MAP_WIDTH,
        x: 0,
        y: 0,
      },
    ],
    nextlayerid: 4,
    nextobjectid: 1,
    orientation: 'orthogonal',
    renderorder: 'right-down',
    tiledversion: '1.10.2',
    tileheight: TILE,
    tilesets: [
      {
        columns: 8,
        firstgid: 1,
        image: '../tiles/portfolio-campus.png',
        imageheight: 128,
        imagewidth: 256,
        margin: 0,
        name: 'portfolio-campus',
        spacing: 0,
        tilecount: 32,
        tileheight: TILE,
        tilewidth: TILE,
      },
    ],
    tilewidth: TILE,
    type: 'map',
    version: '1.10',
    width: MAP_WIDTH,
  };

  const path = join(ROOT, 'public/assets/maps/portfolio-campus.json');
  ensureParent(path);
  writeFileSync(path, `${JSON.stringify(map, null, 2)}\n`);
}

generateTileset();
generateStations();
generatePlayer();
generateMap();
