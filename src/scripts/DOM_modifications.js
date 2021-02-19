function AddTeamPointsBoard(){
    let parent
    for (let [key, ship] of Object.entries(ships)) {
        const team = players[ship.id].team
        if (!document.getElementById(`p+${key}`)) {
            // Create a div for each player, which has nickname and lives rectangles
            let element = document.createElement("div")
            element.id =  `p+${key}`
            parent = (team === "Klingon") ? document.getElementById("Klingon-score") : document.getElementById("Federation-score")
            parent.appendChild(element)
            const team_color = (team === "Klingon") ? "rgba(25,255,255,255)" : "rgba(245,97,30,255)"
            element.style = `border: 2px solid ${team_color}; height: 20px`
            // Add p element with the nickname
            const textelement =  document.createElement("p")
            textelement.id =  `text+${key}`
            textelement.style = "float: left;"
            const nick = players[ship.id].nickName
            let node = document.createTextNode( `${nick}`)
            textelement.appendChild(node)
            element.appendChild(textelement)
            // Add lives rectangles
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
      if (!document.getElementById(`live${idStarShip}${i+1}`) && lives === Settings.initialLives ) {
        const element = document.createElement("div")
        element.id = `live${idStarShip}${i+1}`
        element.style = `width:5px;height:10px;border:1px solid ${color}; background:${color};float: left; margin-left: 3px; margin-top: 2px`
        parent.appendChild(element)
      } else{
        if (lives < Settings.initialLives) {
          const element = document.getElementById(`live${idStarShip}${lives+1}`)
          if(element){
            removeLives(element, idStarShip)
          }
        }
      }
    }
  }
  

  function includePointsDOM(klingon_points,federation_points){
    const klingon_element = document.getElementById(`Klingon-score`).getElementsByClassName("team-score")[0]
    klingon_element.innerHTML = `Score: <strong> ${klingon_points} </strong>`
    const federation_element = document.getElementById(`Federation-score`).getElementsByClassName("team-score")[0]
    federation_element.innerHTML = `Score: <strong> ${federation_points} </strong>`
  }

  function removeLives(element, idStarShip){
    const parent = document.getElementById(`p+${idStarShip}`)
    parent.removeChild(element)
  }