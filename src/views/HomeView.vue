<template>
    <div class="main-block">
        <div class="header-info fl">
            金钱: {{playerInfo.money}}
        </div>
        <div class="battle-area fl">
            <div class="battle-block fl">
                <Avatar shape="square" icon="ios-person" size="large" />
                <Progress :percent="(playerInfo.hp / playerInfo.maxHp) * 100" :stroke-width="5" :stroke-color="['#FF0000', '#FF0000']" hide-info />
                <Progress :percent="(playerInfo.mp / playerInfo.maxMp) * 100" :stroke-width="5" :stroke-color="['#0000FF', '#0000FF']" hide-info />
            </div>
            <div class="battle-block fr">
                <ul class="battle-status">
                    <li>等级: {{playerInfo.level}} 经验值: {{playerInfo.exp}}/{{playerInfo.getNextExp()}}</li>
                    <li>生命: {{playerInfo.hp}}/{{playerInfo.maxHp}}</li>
                    <li>魔力: {{playerInfo.mp}}/{{playerInfo.maxMp}}</li>
                    <li>攻击力: {{playerInfo.atk}}</li>
                </ul>
            </div>
        </div>
        <div class="battle-area fl">
            <div class="battle-block fl">
                <ul class="battle-status">
                    <li>等级: {{monsterInfo.level}}</li>
                    <li>生命: {{monsterInfo.hp}}/{{monsterInfo.maxHp}}</li>
                    <li>魔力: {{monsterInfo.mp}}/{{monsterInfo.maxMp}}</li>
                    <li>攻击力: {{monsterInfo.atk}}</li>
                </ul>
            </div>
            <div class="battle-block fr">
                <Avatar shape="square" icon="ios-person" size="large" />
                <Progress :percent="(monsterInfo.hp / monsterInfo.maxHp) * 100" :stroke-width="5" :stroke-color="['#FF0000', '#FF0000']" hide-info />
                <Progress :percent="(monsterInfo.mp / monsterInfo.maxMp) * 100" :stroke-width="5" :stroke-color="['#0000FF', '#0000FF']" hide-info />
            </div>
        </div>
        <div class="battle-info fl">
            <Scroll ref="container">
                <Timeline>
                    <template v-for="(item, index) in battleInfos" :key="index">
                        <TimelineItem class="battle-info-item" color="red">
                            <div>
                                {{item}}
                            </div>
                            <div>
                            </div>
                        </TimelineItem>
                    </template>
                </Timeline>
                <!-- <div v-if="battleResult.length > 0">
                    <Card dis-hover>
                        战斗结算
                    </Card>
                    <Card dis-hover v-for="(item, index) in battleResult" :key="index">
                        {{ item }}
                    </Card>
                </div> -->
            </Scroll>
        </div>
    </div>
</template>

<script setup lang="ts">

import {ref, getCurrentInstance, nextTick} from "vue"
import PlayerInfo from "@/libs/battle/PlayerInfo"
import MonsterInfo from "@/libs/battle/MonsterInfo"

const wrongText = ref("wrong")

let playerInfo = ref(new PlayerInfo())
// playerInfo.value.cleanData()
playerInfo.value.loadData()

let monsterInfo = ref(new MonsterInfo())

let isBattle = false
let lastBattleTimestamp = 0
let battleInterval = 0
let battleInfos = ref([])
// let battleResult = ref([])

const {proxy}  = getCurrentInstance()

setInterval(function() {
    nextBattleTick()
}, 1000)


function battleTick() {
    if (playerInfo.value.hp == 0 || monsterInfo.value.hp == 0) {
        playerInfo.value.exp += 1
        playerInfo.value.money += 1
        clearInterval(battleInterval)
        battleInfos.value.push("战斗结束")
        let battleResultText = "获得: 经验值 + 1, 金钱 + 1, 治疗药剂 x 1"
        battleInfos.value.push(battleResultText)

        lastBattleTimestamp = Date.now()
        isBattle = false

        playerInfo.value.checkLevelUp()
        playerInfo.value.saveData()

    } else {
        let infoText = ""
        if (battleInfos.value.length % 2 == 0) {
            const atk = playerInfo.value.attack(monsterInfo.value)
            infoText += "你" + "对" + "怪物" + "造成" + atk + "点" + "伤害"
        } else {
            const atk = monsterInfo.value.attack(playerInfo.value)
            infoText += "怪物" + "对" + "你" + "造成" + atk + "点" + "伤害"
        }
        battleInfos.value.push(infoText)
    }

    nextTick(() => {
        proxy.$el.querySelector(".ivu-scroll-content").scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    })
}

function nextBattleTick() {
    if (isBattle) {
        return
    }

    // lastBattleTimestamp
    if (Date.now() - lastBattleTimestamp > 3000) {
        lastBattleTimestamp = Date.now()
        isBattle = true
        monsterInfo.value.level = 1
        monsterInfo.value.hp = 100
        monsterInfo.value.maxHp = 100
        monsterInfo.value.mp = 100
        monsterInfo.value.maxMp = 100
        monsterInfo.value.atk = 1
        battleInfos.value.push("战斗开始")
        battleInterval = setInterval(function() {
            battleTick()
        }, 400)
    }
}
</script>

<style scoped>
    .main-block {
        width: 1200px;
    }
    .header-info {
        border: 1px solid #CCCCCC;
        width: 1010px;
        height: 50px;
        padding: 10px;
    }
    .battle-area {
        border: 1px solid #CCCCCC;
        width: 500px;
        height: 120px;
        margin-top: 10px;
        margin-right: 10px;
        padding: 10px;
    }
    .battle-block {
        border: 1px solid #CCCCCC;
        width: 230px;
        height: 100px;
        padding: 10px;
    }

    .battle-block .battle-status {
        list-style: none;
    }
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    .battle-info {
        border: 1px solid #CCCCCC;
        width: 1010px;
        height: 350px;
        margin-top: 10px;
        padding: 10px;
    }
    .battle-info-item {
        padding: 0 0 1px 0;
    }
</style>
