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
  const parent = document.getElementById("leaderboard")
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