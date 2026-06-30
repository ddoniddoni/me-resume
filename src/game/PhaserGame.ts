import Phaser from 'phaser';
import { createGameConfig } from '@/game/config';
import type { InteractableObject } from '@/game/interactions';
import { PortfolioScene } from '@/game/scenes/PortfolioScene';

export type PortfolioGameCallbacks = {
  onInteract: (interactable: InteractableObject) => void;
};

export function createPortfolioGame(
  parent: HTMLElement,
  callbacks: PortfolioGameCallbacks,
) {
  const scene = new PortfolioScene(callbacks);
  const config = createGameConfig(parent, scene);

  return new Phaser.Game(config);
}
