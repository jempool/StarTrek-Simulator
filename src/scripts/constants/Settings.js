const REFRESH_RATE_OF_GAME = 1000/24
const COLLISION_DETECTION_RATE = 250

const BULLET_SPEED = 10
const INITIAL_BULLET_VISIBILITY = true
const BULLET_OFFSET = 18

const STARSHIP_SPEED = 4
const INITIAL_STARSHIP_VISIBILITY = true

class Settings {  
  static get refreshRateOfGame() {
    return REFRESH_RATE_OF_GAME;
  }

  static get collisionDetectionRate() {
    return COLLISION_DETECTION_RATE;
  }

  static get bulletSpeed() {
    return BULLET_SPEED;
  }

  static get initialBulletVisibility() {
    return INITIAL_BULLET_VISIBILITY;
  }

  static get bulletOffset() {
    return BULLET_OFFSET;
  }

  static get starshipSpeed() {
    return STARSHIP_SPEED;
  }

  static get initialStarshipVisibility() {
    return INITIAL_STARSHIP_VISIBILITY;
  }

  // static get () {
  //   return ;
  // }
}
