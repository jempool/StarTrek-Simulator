const REFRESH_RATE_OF_GAME = 1000/24 // milliseconds
const COLLISION_DETECTION_RATE = 250 // milliseconds

const BULLET_SPEED = 10
const INITIAL_BULLET_VISIBILITY = true
const BULLET_OFFSET = 18 // pixels
const BULLET_LIFE_TIME = 2000 // milliseconds
const WAIT_BETWEEN_SHOOTS = 200 // milliseconds

const STARSHIP_SPEED = 5
const STARSHIP_ROTATION_SPEED = 5
const INITIAL_STARSHIP_VISIBILITY = true
const POINTS_PER_SHOOT = 10
const DAMAGE_PER_SHOOT = 25
const INITIAL_HEALTH = 100 // health per life
const INITIAL_POINTS = 0
const INITIAL_LIVES = 3

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

  static get pointsPerShoot() {
    return POINTS_PER_SHOOT;
  }

  static get damagePerShoot() {
    return DAMAGE_PER_SHOOT;
  }

  static get initialHealth() {
    return INITIAL_HEALTH;
  }

  static get bulletLifeTime() {
    return BULLET_LIFE_TIME;
  }

  static get initialPoints() {
    return INITIAL_POINTS;
  }

  static get initialLives() {
    return INITIAL_LIVES;
  }

  static get starShipRotationSpeed() {
    return STARSHIP_ROTATION_SPEED;
  }

  static get waitBetweenShoots() {
    return WAIT_BETWEEN_SHOOTS;
  }
}
