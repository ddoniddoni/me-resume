import Phaser from 'phaser';

export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 560;

export function createGameConfig(
  parent: HTMLElement,
  scene: Phaser.Scene,
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#f8fafc',
    scene,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    render: {
      antialias: true,
      pixelArt: false,
    },
  };
}
