function getRandomCode(){
  // Creates a 9 character string of numbers and letters
  return Math.random().toString(36).substr(2, 9);
}

function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function getLetterRandomCode(){
  let index = 0
  let code = ""
  const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
  for (let i = 0; i < 5; i++) {
    index = getRandomInt(alphabetArray.length)
    code = code + alphabetArray[index]
  }
  return code
}

function getRandomPosition(minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
}

function updateTeamScore(){
  const parent = document.getElementById("team-score-board")
  let klingon_points = 0
  let federation_points = 0
  for (let [key, ship] of Object.entries(ships)) {
    const team = players[key].team
    if (team == "Klingon"){
      klingon_points += ship.points
    }else{
      federation_points += ship.points
    }
   }

  //Include points in DOM
  console.log(klingon_points, federation_points)
  const klingon_element = document.getElementById(`Klingon-score`).getElementsByClassName("team-score")[0]
  klingon_element.innerHTML = `Score: <strong> ${klingon_points} </strong>`
  const federation_element = document.getElementById(`Federation-score`).getElementsByClassName("team-score")[0]
  federation_element.innerHTML = `Score: <strong> ${federation_points} </strong>`

  //Order Teams Score
  if (klingon_points >= federation_points){
    parent.appendChild(document.getElementById(`Federation-score`))
  }else{
    parent.appendChild(document.getElementById(`Klingon-score`))
  }
  
}

function AddTeamPointsBoard(){
  let parent
  for (let [key, ship] of Object.entries(ships)) {
    const team = players[ship.id].team
    if (!document.getElementById(`p+${key}`)) {
      let element = document.createElement("div")
      element.id =  `p+${key}`
      parent = (team === "Klingon") ? document.getElementById("Klingon-score") : document.getElementById("Federation-score")
      parent.appendChild(element)
      const team_color = (team === "Klingon") ? "rgba(25,255,255,255)" : "rgba(245,97,30,255)"
      element.style = `border: 2px solid ${team_color}; height: 20px`

      const textelement =  document.createElement("p")
      textelement.id =  `text+${key}`
      textelement.style = "float: left;"
      const nick = players[ship.id].nickName
      let node = document.createTextNode( `${nick}`)
      textelement.appendChild(node)
      element.appendChild(textelement)
      
      paintLives(key,element,team)
      }else{
        let element = document.getElementById(`p+${key}`)
        paintLives(key, element, team)
      }
  }
}


function paintLives(idStarShip,element, team){
  const parent = element
  const lives = ships[idStarShip].lives
  const color = (team === "Klingon") ? "rgba(25,255,255,255)" : "rgba(245,97,30,255)"
  for (let i = 0; i < lives; i++) {
    if (!document.getElementById(`live${idStarShip}${i+1}`) && lives === 3) {
      const element = document.createElement("div")
      element.id = `live${idStarShip}${i+1}`
      element.style = `width:5px;height:10px;border:1px solid ${color}; background:${color};float: left; margin-left: 3px; margin-top: 2px`
      parent.appendChild(element)
    } else{
      if (lives < 3 /* Change by global*/) {
        const element = document.getElementById(`live${idStarShip}${lives+1}`)
        if(element){
          removeLives(element, idStarShip)
        }
      }
    }
  }
}

function removeLives(element, idStarShip){
  const parent = document.getElementById(`p+${idStarShip}`)
  parent.removeChild(element)
}