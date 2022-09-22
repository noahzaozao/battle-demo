

export default class BattleEntityInfo {
    
    public level: number = 0
    public exp: number = 0
    public hp: number = 0
    public maxHp: number = 0
    public mp: number = 0
    public maxMp: number = 0
    public atk: number = 0
    public money: number = 0

    constructor() {

    }

    public attack(target: BattleEntityInfo): number {
        const atk = this.atk
        target.hp -= this.atk
        if (target.hp <= 0) {
            target.hp = 0
            target.dead()
        }
        return atk
    }

    public dead() {

    }

    public getNextExp() {
        return Math.pow(this.level + 1, 4)
    }

    public checkLevelUp() {
        if (this.exp >= this.getNextExp()) {
            this.level += 1
        }
    }
}