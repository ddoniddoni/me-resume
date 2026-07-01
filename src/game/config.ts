import Phaser from 'phaser';

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 736;

export function createGameConfig(
  parent: HTMLElement,
  scene: Phaser.Scene,
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    transparent: true,
    scene,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    render: {
      antialias: false,
      pixelArt: true,
    },
  };
}
