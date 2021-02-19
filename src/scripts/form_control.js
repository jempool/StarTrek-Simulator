/* 
const nicknameinput = document.getElementById("nickName")
const code = document.getElementById("code");
console.log(nicknameinput)  */


function createRoom(){
  if (!checkFormularie()) return
  console.log('Generating room code')
  ROOM = getLetterRandomCode()
  console.log("Room code: " + ROOM)
  let dataDict = getFormInfo();

  // console.log('Creating a player object')
  // const player = Player.create(roomCode, dataDict["nickName"], dataDict["gender"], dataDict["starship"], dataDict["team"], "captain")

  changeGameState("game", dataDict)
}

async function joinRoom(){
  document.getElementById('joinRoomButton').setAttribute("disabled","disabled");

  ROOM = document.getElementById('code').value
  let dataDict = getFormInfo();

  // console.log('Creating a player object')
  // const player = Player.create(roomCode, dataDict["nickName"], dataDict["gender"], dataDict["starship"], dataDict["team"], "soldier")

  let channel = 'teamName/topic'
  channel += ROOM

  if (!checkFormularie(true)){
    document.getElementById('joinRoomButton').removeAttribute("disabled");
    return
  } 

  const roomCheck = await checkRoom(rabbitmqSettings, channel)

  console.log(roomCheck);

  if( roomCheck ){
    console.log('Check Room OK!')
    changeGameState("game", dataDict)
  } else {
    console.log('Wrong code, no such room!')
    changeGameState("login", dataDict)
  }
}


async function checkRoom(options, channel) {
  try {
    let response = false
    const client = await RsupMQTT.connect(options)
    
    client.subscribe(channel).on(message => {
      const msj = JSON.parse(message.string)
      if(msj.type == "Notify"){
        console.log("shar")
        response = true
      }

    })
    client.publish(channel, { type: "roomCheck" })

    console.log("Checking room, please wait...")
    
    return new Promise(resolve => {
      setTimeout(() => {
        document.getElementById('joinRoomButton').removeAttribute("disabled");
        client.unsubscribe(channel)
        resolve(response);
      }, 400);
    });
    
  } catch (error) {
    console.log(error)
  }

}



function checkNickName(){
  const nicknameInput = document.getElementsByClassName("input")[0]
  if(nicknameInput.value.length === "" || nicknameInput.value === null){
    // messages.push("Nickname is required.")
    nicknameInput.style.border = "2px solid red"
    return false
  }else{
    if(nicknameInput.value.length < 4){
      // messages.push("Nickname must have at least 4 characters.")
      nicknameInput.style.border = "2px solid red"
      return false
    }else{
      nicknameInput.style.border = "2px solid rgba(1,125,87,255)"
      return true
    }
  }
}

function checkCode(){
  const codeInput = document.getElementById("code")
  if(codeInput.value.length !== 5 || codeInput.value === null){
    //messages.push("Provide a game code or create a new room.")
    codeInput.style.border = "2px solid red"
    return false
  }
  codeInput.style.border = "2px solid rgba(1,125,87,255)"
  return true
}

function checkFormularie(is_join){
  
  //let messages = []
  if (is_join) {
    const correctcode = checkCode()
    if(correctcode === false) return false
  }
  return checkNickName()

/* 
  if (messages.length === 0){
    return true
  }
  console.log(messages.join("\n")) */

}


function loadCreateRoom(){

    document.getElementsByClassName('join-box')[0].style.display = "none"
    document.getElementsByClassName('create-box')[0].style.display = "block"
    document.getElementById('code').style.display = "none"

    const create_btn = document.getElementsByClassName('create')[0]
    create_btn.style.background = "rgba(1,125,87,255)"
    create_btn.style.color = "white" 
  
    const join_btn = document.getElementsByClassName('join')[0]
    join_btn.style.background = "none"
    join_btn.style.color = "rgb(52, 52, 52)"

    
  }
  
function loadJoinRoom(){
  
    document.getElementsByClassName('join-box')[0].style.display = "block"
    document.getElementsByClassName('create-box')[0].style.display = "none"
    document.getElementById('code').style.display = "block"
    const join_btn = document.getElementsByClassName('join')[0]
    join_btn.style.background = "rgba(1,125,87,255)"
    join_btn.style.color = "white" 
  
    const create_btn = document.getElementsByClassName('create')[0]
    create_btn.style.background = "none"
    create_btn.style.color = "rgb(52, 52, 52)"
    
}