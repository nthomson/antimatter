import * as colors from '../../lib/colors';
import * as helpers from '../../lib/helpers';
import config from '../../config';

import Matter from './Matter';

import level1 from '../../levels/level1';

const typeMap = {
  'matter': Matter
};


class Level {
  constructor() {
    this.objects = level1.map(o => new typeMap[o.type](o.color, o.x, o.y, o.r));

    [
      new Matter(colors.redMatter, 100, -150),
      new Matter(colors.blueMatter, 295, -25),
    ];
  }

  update(delta) {
    this.objects.forEach(object => {
      object.update(delta);

      if (object.exploded) {
        // Remove object from the level
        this.objects = this.objects.filter(item => item !== object);
      }
    });
  }

  checkCollision(ship) {
    // Check if ship collides with any Level objects
    
    // We only care about objects in view
    this.objects.filter(item => item.collidable()).forEach(item => {
      const blueMatter = ship.blueMatter();
      const redMatter = ship.redMatter();
      const blueAttractor = ship.blueAttractor();
      const redAttractor = ship.redAttractor();

      if (helpers.circleCollision(blueMatter, item)) {
        ship.blueArm.matterCollide(item);
        // item.explode();
      }

      if (helpers.circleCollision(blueAttractor, item)) {
        ship.blueArm.attractorCollide(item);
        // item.explode();
      }
      
      if (helpers.circleCollision(redMatter, item)) {
        ship.redArm.matterCollide(item);
        // item.explode();
      }

      if (helpers.circleCollision(redAttractor, item)) {
        ship.redArm.attractorCollide(item);
        // item.explode();
      }
    });
  }

  render(context) {
    this.objects.forEach(object => object.render(context));
  }
}

export default Level;