import BattleEntityInfo from "./BattleEntityInfo"


export default class PlayerInfo extends BattleEntityInfo {

    constructor() {
        super()
    }

    public cleanData() {
        localStorage.setItem('playerData', '')
    }

    public loadData() {
        let playerData = localStorage.getItem('playerData')
        if (!playerData) {
            this.level = 1
            this.exp = 0
            this.hp = 100
            this.maxHp = 100
            this.mp = 100
            this.maxMp = 100
            this.atk = 30
            this.money = 0
        } else {
            const playerInfoData = JSON.parse(playerData)
            this.level = playerInfoData.level
            this.exp = playerInfoData.exp
            this.hp = playerInfoData.hp
            this.maxHp = playerInfoData.maxHp
            this.mp = playerInfoData.mp
            this.maxMp = playerInfoData.maxMp
            this.atk = playerInfoData.atk
            this.money = playerInfoData.money
        }
    }

    public saveData() {
        const playerInfoData = JSON.stringify({
            level: this.level,
            exp:  this.exp,
            hp:  this.hp,
            maxHp:  this.maxHp,
            mp: this.mp,
            maxMp:  this.maxMp,
            atk: this.atk,
            money: this.money
        })
        localStorage.setItem('playerData', playerInfoData)
    }
}