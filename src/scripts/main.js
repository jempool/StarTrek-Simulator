let ROOM = ''
let ID = ''
let NICKNAME = ""
const GENDER = ""
let TEAM = ""
let channel = Connection.rabbitmqDefaultChannel

let galaxy = {}
let ships = {}
let players = {}
// const points ={"Klingon":0,"Federation":0}

const rabbitmqSettings = {
  username: Connection.rabbitmqUsername,
  password: Connection.rabbitmqPassword,
  host: Connection.rabbitmqHost,
  port: Connection.rabbitmqPort,
  ssl: Connection.rabbitmqSSL,
  keepalive: Connection.rabbitmqKeepalive,
  path: Connection.rabbitmqPath
 }

const spritePaths = {
  "USS Entreprise": './assets/spaceship/ussenterprise.png',
  "Miranda": './assets/spaceship/battleship.png',
  "Bird of Prey": './assets/spaceship/spaceship.png',
  "IKS Devisor": './assets/spaceship/batship.png',
  "Starship": './assets/spaceship/batship.png'
}

async function connect(options, spritePath, battleshipXPos, battleshipYPos, teamStyle) {
  try {
    // let channel = 'teamName/topic'
    channel += ROOM

    const client = await RsupMQTT.connect(options)
    client.subscribe(channel).on(message => {
      const msj = JSON.parse(message.string)
      
      if(msj != undefined)
      resolveMessage(msj, ID, ships, client, channel, players, spritePath, teamStyle)

    })
    client.publish(channel, { type: "arrival", id: ID, sprite: spritePath, team: TEAM, nickname: NICKNAME, xPos: battleshipXPos, yPos: battleshipYPos, teamStyle})
    return client
  } catch (error) {
    console.log(error)
  }

}


function addKeyEvent(batship, bulletImgPath) {
  const up = ['w', 'ArrowUp']
  const down = ['s', 'ArrowDown']
  const left = ['a', 'ArrowLeft']
  const right = ['d', 'ArrowRight']
  const go = [...up, ...down]
  const direction = [...left, ...right]
  const stop = ['c', 'x']
  const space = [' ']

  // variable to block repetitive shooting
  let lockedShot = false

  document.body.addEventListener('keydown', (e) => {
    if(ships[ID] != undefined) {
      if (up.indexOf(e.key) >= 0) batship.setState(1, batship.state.direction)
      if (down.indexOf(e.key) >= 0) batship.setState(-1, batship.state.direction)
      if (left.indexOf(e.key) >= 0) batship.setState(batship.state.go, -1)
      if (right.indexOf(e.key) >= 0) batship.setState(batship.state.go, 1)
  
      if (stop.indexOf(e.key) >= 0) batship.setState(0, 0)
  
      if (space.indexOf(e.key) >= 0) {
  
        if(!lockedShot){
          const bulletId = Date.now()
          const bullet = Bullet.create(galaxy, bulletImgPath, 
          batship.getX(), batship.getY(), batship.getAngle(), bulletId, false)
          bullet.play()
          bullet.setState(1, 0)
          lockedShot = true
          setTimeout(() => {
            lockedShot = false
          }, Settings.waitBetweenShoots );
  
        // broadcast the bullet movement to the other players
        client.publish(channel, { 
          type: "Bullets movement", 
          id: ID, 
          bulletId: bulletId + ID, 
          x: ships[ID].x,
          y: ships[ID].y,  
          angle: ships[ID].angle,
          team: TEAM,
          bulletImgPath: bulletImgPath
        })
        } 
    }      
  }
})


  document.body.addEventListener('keyup', (e) => {
    if (go.indexOf(e.key) >= 0) batship.setState(0, batship.state.direction)
    if (direction.indexOf(e.key) >= 0) batship.setState(batship.state.go, 0)
  })

}

// This function updates the user's information in the DOM.
function updateUserStatusInDOM() {
  document.getElementById('id').innerHTML = `<strong>Id: </strong>${ID}`
  document.getElementById('lives').innerHTML = `<strong>Lives: </strong>${ships[ID].lives}`
  document.getElementById('health').innerHTML = `<strong>Health: </strong>${ships[ID].health}`
  document.getElementById('points').innerHTML = `<strong>Points: </strong>${ships[ID].points}`
  document.getElementById('team_name').innerHTML = `<strong>Team </strong>${players[ID].team}`
  document.getElementById('nick').innerHTML = `<strong>Nick </strong>${players[ID].nickName}`

  updateTeamScore()
  AddTeamPointsBoard()

  const shipsWithZeroLives = []
  
  for (const [key, value] of Object.entries(ships)) {
    if(ships[key].lives === 0) {
      removeLives(document.getElementById(`live${key}${ships[key].lives+1}`),key) 
      shipsWithZeroLives.push(ships[key]) 
    }     
  }

  shipsWithZeroLives.map( ship => {
    delete ships[ship.id]
  })

  // uncomment when corrected
  
}

async function loadLogin(){
  const create_btn = document.getElementsByClassName('create')[0]
  create_btn.style.background = "none"
  create_btn.style.color = "rgb(52, 52, 52)"

  addStarshipEventListeners()
  // Close all dropdowns when selected element is outside
  window.addEventListener('click', function(e) {
    for (const select of document.querySelectorAll('.custom-select')) {
      if (!select.contains(e.target)) {
          select.classList.remove('open');
      }
    }
  });
}

function addStarshipEventListeners(){
  // Get the starship dropdown wrapper
  const starShipDropDown = document.getElementById('starship-dropdown')
  starShipDropDown.addEventListener('click', function(event) {
    this.querySelector('.custom-select').classList.toggle('open');
  })

  // Get the starship dropdown options
  const starShipDropDownOptions = document.getElementById('starship-dropdown-options')
  starShipDropDownOptions.addEventListener('click', function(event) {
    if (event.target.nodeName == "SPAN"){
      let name = document.getElementById('starship-name')
      name.innerHTML = event.target.getAttribute("data-value")
    }
  })
}


async function loadGame(dataDict){  
  console.log('Starting Star Trek Simulator')
  galaxy = document.getElementById('galaxy')
  document.getElementById('room_code').innerHTML = "Room code: " + ROOM

  let galaxyWidth = galaxy.offsetWidth
  let galaxyHeight = galaxy.offsetHeight
  let y = getRandomPosition(0, galaxyHeight)
  let x = getRandomPosition(0, galaxyWidth)

  let teamStyle = ''
  let bulletImgPath = ''
  if (dataDict["team"] == "Klingon") {
    teamStyle = 'klingonStarship'
    bulletImgPath = './assets/spaceship/blueBullet.png'
  } else {
    teamStyle = 'federationStarship'
    bulletImgPath = './assets/spaceship/redBullet.png'
  }

  console.log('Connecting to RabbitMQ/MQTT over WebSocket')
  client = await connect(rabbitmqSettings, dataDict["starship"], x, y, teamStyle)

  let channel = 'teamName/topic'
  channel += ROOM

  const batship = StarShip.create(galaxy, dataDict["starship"], 'small batship', x, y, 45, ID, teamStyle)
  batship.add
  batship.play(channel)
  addKeyEvent(batship, bulletImgPath)

  const player = Player.create(NICKNAME, TEAM, ID)
  console.log('Creating player object...' + player.team + player.id + player.nickName)

  ships[ID] = batship
  players[ID] = player
  this.updateUserStatusInDOM()
}

function changeGameState(state, dataDict){
  switch(state) {
    case 'login':
      console.log('Changing to login configuration')
      setUiLoginDisplay()
      loadLogin()
      break
    case 'game':
      console.log('Changing to game configuration')
      setUiGameDisplay()
      loadGame(dataDict)
      break
    case 'win':
      console.log('Changing to win configuration')
      setUiWinDisplay()
      break
    case 'lose':
      console.log('Changing to lose configuration')
      setUiLoseDisplay()
      break
    }
}

function getFormInfo(){
  dataDict = {}
  const nickName = document.getElementById('nickName').value
  const genderIndex = document.getElementById('gender')
  const gender = genderIndex.options[genderIndex.selectedIndex].text
  const starship = spritePaths[document.getElementById('starship-name').textContent]
  const teamIndex = document.getElementById('team')
  const team = teamIndex.options[teamIndex.selectedIndex].text
  dataDict["ID"] = getRandomCode()
  dataDict["nickName"] = nickName
  dataDict["gender"] = gender
  dataDict["starship"] = starship
  dataDict["team"] = team
  ID = dataDict["ID"]
  TEAM = dataDict["team"]
  NICKNAME = dataDict["nickName"]
  return dataDict
}




/* }else{
  document.getElementById(`p+${key}`).innerHTML = `${players[ship.id].nickName}`
  orderLeaderBoard()
} */

async function main() {
  changeGameState('login')
}
