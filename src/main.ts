import * as Phaser from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  private targetLocation: {x: number; y: number};
  private VELOCITY: number = 500;
 
  constructor() {
    super(sceneConfig);
    this.targetLocation = {x: 400, y: 400};
  }
 
  public create() {
    this.square = this.add.rectangle(400, 400, 100, 100, 0xFF0000) as any;
    this.physics.add.existing(this.square);
  }

  private isLessThan(a, b) {
    return b - a >= 10;
  }

  private isGreaterThan(a, b) {
    return a - b >= 10;
  }
 
  public update() {
    const pointer = this.input.activePointer;
    if (pointer.isDown) {
      this.targetLocation.x = pointer.x;
      this.targetLocation.y = pointer.y
    }

    if (this.isLessThan(this.square.x,this.targetLocation.x)) {
      this.square.body.setVelocityX(this.VELOCITY);
    } else if (this.isGreaterThan(this.square.x, this.targetLocation.x)) {
      this.square.body.setVelocityX(-this.VELOCITY);
    } else {
      this.square.body.setVelocityX(0);
    }

    if (this.isLessThan(this.square.y, this.targetLocation.y)) {
      this.square.body.setVelocityY(this.VELOCITY);
    } else if (this.isGreaterThan(this.square.y, this.targetLocation.y)) {
      this.square.body.setVelocityY(-this.VELOCITY);
    } else {
      this.square.body.setVelocityY(0);
    }
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Idle Game',
 
  type: Phaser.AUTO,
 
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
 
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
 
  parent: 'game',
  // backgroundColor: '#000000',
  scene:  GameScene,
};
 
export const game = new Phaser.Game(gameConfig);
