class Player {
  constructor(nickname, team, id) {
    this.setNickname(nickname)
    this.setTeam(team)
    this.setId(id)
  }

  setNickname(nickname) {
    this.nickName = nickname
  }
  
  setTeam(team) {
    this.team = team
  }

  setId(id) {
    this.id = id
  }

  getNickname(){
    return this.nickname;
  }

  getTeam(){
    return this.team;
  }

  static create(nickname, team, id) {
    return new Player(nickname, team, id)
  }
}