function resolveMessage(msj, ownID, ships, client, channel, players, ownSpritePath, ownTeamStyle) {
  switch(msj.type) {
      case "arrival":
        console.log("A new contender has just arrived!!!!")
        console.log(msj.id)
        

        if(msj.id != ownID) {
          console.log("New ship, id:")
          console.log(msj.id)
          const batship = StarShip.create(galaxy, msj.sprite, 'small batship', msj.xPos, msj.yPos, 45, msj.id, msj.teamStyle)
          const player = Player.create(msj.nickname, msj.team, msj.id)
          ships[msj.id] = batship
          players[msj.id] = player
          console.log(msj.id)
          client.publish(channel, { type: "Existence notification", id: ID, x: ships[ID].x, y: ships[ID].y, angle: ships[ID].angle, sprite: ownSpritePath, health: ships[ID].health, points: ships[ID].points, nickname: NICKNAME, team: TEAM, teamStyle: ownTeamStyle })
          AddTeamPointsBoard()
        }
        break;
      case "Existence notification":
        if(msj.id != ownID && !(msj.id in ships)) {
          const batship = StarShip.create(galaxy, msj.sprite, 'small batship', msj.x, msj.y, msj.angle, msj.id, msj.teamStyle)
          const player = Player.create(msj.nickname, msj.team, msj.id)
          ships[msj.id] = batship
          ships[msj.id].setPosition(msj.x, msj.y)
          ships[msj.id].setAngle(msj.angle)
          console.log(msj.id)
          console.log(ships[msj.id])
          ships[msj.id].setHealth(msj.health)
          ships[msj.id].setPoints(msj.points)
          players[msj.id] = player
          AddTeamPointsBoard()

        }
        break;
      case "Ship movement":
        if(msj.id != ownID) {
          ships[msj.id].setPosition(msj.x, msj.y)
          ships[msj.id].setAngle(msj.angle)
        }
        break;
      case "Ship shooting":          
          ships[msj.id].setHealth(msj.health)
          ships[msj.id].setPoints(msj.points) 
          updateUserStatusInDOM()
        break;
      case "roomCheck":
          console.log("Room check")
          client.publish(channel, { type: "Notify" })
        break;
      case "Bullets movement":
        if(msj.id != ownID) {
          const bullet = Bullet.create(galaxy, msj.bulletImgPath, 
          msj.x, msj.y, msj.angle, msj.bulletId, true)
          bullet.play()
          bullet.setState(1, 0)          
        }
      default:
        console.log("A default test")
  }
}