class StarShip {   
  constructor(el, x = 0, y = 0, angle = 0, id) {
    this.el = el
    this.setState()
    this.setAngle(angle)
    this.setPosition(x, y)
    this.setVisibility(Settings.initialStarshipVisibility)
    this.speed = Settings.starshipSpeed
    this.ship_width = document.getElementsByClassName(this.el.className)[0].width
    this.ship_height = document.getElementsByClassName(this.el.className)[0].height
    this.radio = this.ship_height/2
    this.id = id
    this.health = Settings.initialHealth
    this.points = Settings.initialPoints
    this.lives = Settings.initialLives  
  }

  setState(go = 0, direction = 0) {
    this.state = { go, direction }
  }

  setAngle(angle) {
    this.angle = angle
    this.el.style.transform = `rotate(${angle}deg)`
  }

  setPosition(x, y) {

    const window_width= document.getElementById('galaxy').clientWidth - document.getElementById('team-score-board').clientWidth
    const window_height= document.getElementById('galaxy').clientHeight 

    const xAxisUpperLimitExceeded = x <= 0
    const yAxisUpperLimitExceeded = y <= 0
    const xAxisLowerLimitExceeded = x + this.ship_width >= window_width
    const yAxisLowerLimitExceeded = y + this.ship_height >= window_height

    const newXPosAtLowerLimit = window_width - (this.ship_width + 1)
    const newYPosAtLowerLimit = window_height - (this.ship_height + 1);
    const newXPosAtUpperLimit = 0
    const newYPosAtUpperLimit = 0

    if (xAxisUpperLimitExceeded) x = newXPosAtLowerLimit
    if (xAxisLowerLimitExceeded) x = newXPosAtUpperLimit

    if (yAxisUpperLimitExceeded) y = newYPosAtLowerLimit
    if (yAxisLowerLimitExceeded) y = newYPosAtUpperLimit

    this.x = x
    this.y = y

    this.el.style.left = `${x}px`
    this.el.style.top = `${y}px`

  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  getAngle(){
    return this.angle;
  }

  setHealth(health){
    this.health = health

    if (this.health <= 0) {
      this.health = Settings.initialHealth
      this.lives = this.lives - 1
    }
    
    if (this.lives === 0) {
      this.health = 0
      
    let thisShip = document.getElementById(this.id)
    thisShip.parentNode.removeChild(thisShip)
    

    if(ships[ID].lives === 0)
      document.getElementById('status').innerHTML = `Game Over`
    }
  }

  setPoints(points){
    this.points = points
  }

  setVisibility(visible) {
    this.el.style.visibility = visible ? 'visible' : 'hidden'
  }

 

  play(channel) {
    this.timer = setInterval(()=> {
      const { go, direction } = this.state  
      if (go === 0 && direction === 0) return;

      const rotationSpeed = Settings.starshipSpeed
      const angle = (this.angle + direction * rotationSpeed) % 360
      const x = this.x + Math.sin(this.angle / 360.0 * 2 * Math.PI) * go * this.speed
      const y = this.y - Math.cos(this.angle / 360.0 * 2 * Math.PI) * go * this.speed
  
      this.setPosition(x, y)
      this.setAngle(angle)

      client.publish(channel, { type: "Ship movement", id: ID, x: x, y: y, angle: angle })
    }, Settings.refreshRateOfGame )
  }



  
  static create(parent, imagePath, extraClass, x = 0, y = 0, angle = 0, id, teamStyle) {
    const img = document.createElement('img')
    img.className = `starship ${teamStyle} ${extraClass}`
    img.id = id
    img.src = imagePath
    img.id = id
    parent.appendChild(img)
   
    return new StarShip(img, x, y, angle, id)
  }
}