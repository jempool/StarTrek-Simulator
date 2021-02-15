class Bullet {
  constructor(el, x = 0, y = 0, angle = 0, id, fakeBullet) {
    this.el = el
    this.setState()
    this.setAngle(angle)
    this.setPosition(x, y)
    this.setVisibility(true)
    this.id = id
    this.speed = 10
    this.width = document.getElementsByClassName(this.el.className)[0].width
    this.height = document.getElementsByClassName(this.el.className)[0].height
    this.radio = this.height/2
    this.fakeBullet = fakeBullet // true/false
  }

  setState(go = 0, direction = 0) {
    this.state = { go, direction }
  }

  setAngle(angle) {
    this.angle = angle
    this.el.style.transform = `rotate(${angle}deg)`
  }

  setPosition(x, y) {     
    const bulletInDOM = document.getElementsByClassName(this.el.className)[0]
    
    if(bulletInDOM === undefined){      
    
      this.stop();      

    } else {
    
      const window_width = document.getElementById('galaxy').clientWidth - document.getElementById('leaderboard').clientWidth
      const window_height = document.getElementById('galaxy').clientHeight

      const xAxisUpperLimitExceeded = x <= 0
      const yAxisUpperLimitExceeded = y <= 0
      const xAxisLowerLimitExceeded = x + this.width >= window_width
      const yAxisLowerLimitExceeded = y + this.height >= window_height

      const newXPosAtLowerLimit = window_width - (this.width + 1)
      const newYPosAtLowerLimit = window_height - (this.height + 1)
      const newXPosAtUpperLimit = 0
      const newYPosAtUpperLimit = 0

      if (xAxisUpperLimitExceeded) x = newXPosAtLowerLimit
      if (xAxisLowerLimitExceeded) x = newXPosAtUpperLimit

      if (yAxisUpperLimitExceeded) y = newYPosAtLowerLimit
      if (yAxisLowerLimitExceeded) y = newYPosAtUpperLimit 
      
      this.x = x
      this.y = y

      this.el.style.left = `${x + 18}px`
      this.el.style.top = `${y + 18}px`
    }
  }

  setVisibility(visible) {
    if (visible) {
      this.el.style.visibility = 'none'
    
    } else {
      this.el.style.visibility = 'hidden'
    }
  }


  play() {
    this.timer = setInterval(()=> { 
      const { go, direction } = this.state 

      const angle = (this.angle + direction) % 360
      const x = this.x + Math.sin(this.angle / 360.0 * 2 * Math.PI) * go * this.speed
      const y = this.y - Math.cos(this.angle / 360.0 * 2 * Math.PI) * go * this.speed
  
      this.setPosition(x, y)
      this.setAngle(angle)
      this.detectCollision()
    }, 1000/24)
  }

  detectCollision(){
    const listPlayers = StarShip.players
    setTimeout( () => {
      listPlayers.forEach(player => {        
        if (this.haveCollided(this, player)){
          this.setVisibility(false)
          this.stop()
          this.setPosition(0,0)
          
          const isNotMyOwnTeam = players[player.id].team != TEAM
          const isNotFakeBullet = !this.fakeBullet
          const shooterStillAlive = ships[ID] != undefined
          const targetStillAlive = ships[player.id] != undefined
          
          // Calculating points and health after collision
          if(isNotMyOwnTeam && isNotFakeBullet && shooterStillAlive && targetStillAlive){ 
            this.updatePointsAndHealth (ID, player.id)
          }
        } 
      })
    },250)
  }

  haveCollided(bullet, player) {
    return Math.hypot(player.x - bullet.x, player.y - bullet.y) < player.radio + bullet.radio
  }

  updatePointsAndHealth (myId, enemyId){        
    ships[myId].points += 10
    ships[enemyId].health -= 25 
    
    // 'Shooter' status after shooting
    client.publish(channel, { 
      type: "Ship shooting", 
      id: myId, 
      health: ships[myId].health,
      points: ships[myId].points,
    })

    // 'Enemy target' status after shooting
    client.publish(channel, { 
      type: "Ship shooting", 
      id: enemyId, 
      health: ships[enemyId].health,
      points: ships[enemyId].points,
    })

    updateUserStatusInDOM()
  }

  stop() {
    clearInterval(this.timer)
  }

  static create(parent, imagePath, x = 0, y = 0, angle = 0, id, fakeBullet) {
    
    const bulletLifespan = setInterval(() => {      
      let bullet = document.getElementById(id)
      bullet.parentNode.removeChild(bullet)
      clearInterval(bulletLifespan)
    }, 2000);

    // Creation of the element 'bullet' in the DOM
    const img = document.createElement('img')
    img.className = `bullet`
    img.id = id
    img.src = imagePath
    parent.appendChild(img)
    
    return new Bullet(img, x, y, angle, id, fakeBullet)
  }
}