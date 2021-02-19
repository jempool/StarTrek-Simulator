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
  includePointsDOM(klingon_points,federation_points)

  //Order Teams Score
  klingon_points >= federation_points?
    parent.appendChild(document.getElementById(`Federation-score`)) :
    parent.appendChild(document.getElementById(`Klingon-score`))
  
}

