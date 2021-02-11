
const nicknameinput = document.getElementById("nickName")
const code = document.getElementById("code");
console.log(nicknameinput) 




function joinRoom(){
  const roomCode = document.getElementById('code').value
  let dataDict = getFormInfo();

  // console.log('Creating a player object')
  // const player = Player.create(roomCode, dataDict["nickName"], dataDict["gender"], dataDict["starship"], dataDict["team"], "soldier")
  if(checkFormularie(dataDict)) changeGameState("game")
}



function loadCreateRoom(){

    document.getElementsByClassName('join-box')[0].style.display = "none"
    document.getElementsByClassName('create-box')[0].style.display = "block"

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
    const join_btn = document.getElementsByClassName('join')[0]
    join_btn.style.background = "rgba(1,125,87,255)"
    join_btn.style.color = "white" 
  
    const create_btn = document.getElementsByClassName('create')[0]
    create_btn.style.background = "none"
    create_btn.style.color = "rgb(52, 52, 52)"
    
}

function checkFormularie(){
  const nicknameInput = document.getElementsByClassName("input")[0]
  const codeInput = document.getElementById("code");
  let messages = []
  console.log(nicknameInput.value)
  if(nicknameInput.value === "" || nicknameInput.value === null){
    messages.push("Nickname is required.")
    nicknameInput.style.border = "2px solid rgba(245,97,30,255)"
  }else{
    if(nicknameInput.value.length < 5){
      messages.push("Nickname must have at least 5 characters.")
      nicknameInput.style.border = "2px solid rgba(245,97,30,255)"
    }else{
      nicknameInput.style.border = "2px solid rgba(1,125,87,255)"
    }
  }

  if(codeInput.value === "" || codeInput.value === null){
    messages.push("Provide a game code or create a new room.")
  }

  if (messages.length === 0){
    return true
  }

  console.log(messages.join("\n"))
  return false
}