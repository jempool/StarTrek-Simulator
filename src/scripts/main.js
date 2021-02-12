let ROOM = ''
let ID = ''
let NICKNAME = "SHA"
const GENDER = "M"
const SPRITEPATH = './assets/spaceship/batship.png'
let TEAM = "1"
let channel = 'teamName/topic'

let galaxy = {}
let ships = {}
let players = {}

const rabbitmqSettings = {
  username: 'admin',
  password: 'admin',
  host: 'frontend.ascuy.me',
  port: 15675,
  keepalive: 20,
  path: 'ws'
}

async function connect(options) {
  try {
    // let channel = 'teamName/topic'
    channel += ROOM

    const client = await RsupMQTT.connect(options)
    client.subscribe(channel).on(message => {
      const msj = JSON.parse(message.string)
      
      resolveMessage(msj, ID, ships, client, channel, players)

    })
    client.publish(channel, { type: "arrival", id: ID, sprite: SPRITEPATH, team: TEAM, nickname: NICKNAME})
    return client
  } catch (error) {
    console.log(error)
  }

}


function addKeyEvent(batship) {
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
    if (up.indexOf(e.key) >= 0) batship.setState(1, batship.state.direction)
    if (down.indexOf(e.key) >= 0) batship.setState(-1, batship.state.direction)
    if (left.indexOf(e.key) >= 0) batship.setState(batship.state.go, -1)
    if (right.indexOf(e.key) >= 0) batship.setState(batship.state.go, 1)

    if (stop.indexOf(e.key) >= 0) batship.setState(0, 0)

    if (space.indexOf(e.key) >= 0) {

      if(!lockedShot){
        const bulletId = Date.now()
        const bullet = Bullet.create(galaxy, './assets/spaceship/bullet.png', 
        batship.getX(), batship.getY(), batship.getAngle(), bulletId, false)
        bullet.play()
        bullet.setState(1, 0)
        lockedShot = true
        setTimeout(() => {
          lockedShot = false
        }, 200);

      // broadcast the bullet movement to the other players
      client.publish(channel, { 
        type: "Bullets movement", 
        id: ID, 
        bulletId: bulletId + ID, 
        x: ships[ID].x,
        y: ships[ID].y,
        angle: ships[ID].angle,
        team: TEAM
      })
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
  document.getElementById('id').innerHTML = `<strong>Id </strong>${ID}`
  document.getElementById('health').innerHTML = `<strong>Health </strong>${ships[ID].health}`
  document.getElementById('points').innerHTML = `<strong>Points </strong>${ships[ID].points}`
  document.getElementById('team_name').innerHTML = `<strong>Team </strong>${players[ID].team}`
  document.getElementById('nick').innerHTML = `<strong>Nick </strong>${players[ID].nickName}`
}

async function loadLogin(){
  document.getElementById('galaxy').style.display = "none"
  document.getElementById('formularies').style.display = "block"
  document.getElementsByClassName('create-box')[0].style.display = "none"

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
  starShipDropDown.addEventListener('click', function(event) {
    if (event.target.nodeName == "SPAN"){
      let name = document.getElementById('starship-name')
      name.innerHTML = event.target.getAttribute("data-value")
    }
  })
}


async function loadGame(dataDict){
  document.getElementById('galaxy').style.display = "block"
  document.getElementById('formularies').style.display = "none"
  
  console.log('Starting Star Trek Simulator')
  galaxy = document.getElementById('galaxy')
  document.getElementById('room_code').innerHTML = "Room code: " + ROOM

  

  console.log('Connecting to RabbitMQ/MQTT over WebSocket')
  client = await connect(rabbitmqSettings)

  let channel = 'teamName/topic'
  channel += ROOM

  const batship = StarShip.create(galaxy, SPRITEPATH, 'small batship', 200, 200, 45, ID)
  batship.play(channel)
  addKeyEvent(batship)

  const player = Player.create(NICKNAME, TEAM, ID)
  console.log('Creating player object...' + player.team + player.id + player.nickName)

  ships[ID] = batship
  players[ID] = player
  this.updateUserStatusInDOM()
}

function changeGameState(state, dataDict){
  switch(state) {
    case "login":
      console.log("Changing to login configuration")
      loadLogin()
      break;
    case "game":
      console.log("Changing to game configuration")
      loadGame(dataDict)
    }
}

function getFormInfo(){
  dataDict = {}
  const nickName = document.getElementById('nickName').value
  const genderIndex = document.getElementById('gender')
  const gender = genderIndex.options[genderIndex.selectedIndex].text
  const starship = document.getElementById('starship-name').innerHTML
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




async function main() {
  console.log('Welcome to our Star Trek Simulator!')
  document.getElementById('formularies').style.display = "none"
  document.getElementById('galaxy').style.display = "none"
  changeGameState("login")
}
