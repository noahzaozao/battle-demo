import BattleEntityInfo from "./BattleEntityInfo"


export default class MonsterInfo extends BattleEntityInfo {
    
    constructor() {
        super()
    }
    
    public cleanData() {
        localStorage.setItem('monsterData', '')
    }

    public loadData() {
        let monsterData = localStorage.getItem('monsterData')
        if (!monsterData) {
            this.level = 1
            this.hp = 100
            this.maxHp = 100
            this.mp = 100
            this.maxMp = 100
            this.atk = 10
        } else {
            const monsterInfoData = JSON.parse(monsterData)
            this.level = monsterInfoData.level
            this.hp = monsterInfoData.hp
            this.maxHp = monsterInfoData.maxHp
            this.mp = monsterInfoData.mp
            this.maxMp = monsterInfoData.maxMp
            this.atk = monsterInfoData.atk
        }
    }
}