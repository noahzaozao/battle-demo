<template>
    <div class="main-block">
        <!-- <Drawer
            title="MapView"
            v-model="isShowMap"
            width="640"
            :styles="styles"
        >
            <MapView/>
        </Drawer>
        <Drawer
            title="BagView"
            v-model="isShowBag"
            width="640"
            :styles="styles"
        >
            <BagView/>
        </Drawer> -->
        <div class="header-info fl">
            <div class="fl">金钱 {{playerInfo.money}}</div>
        </div>
        <div class="battle-area fl">
            <div class="battle-block fl">
                <Avatar class="fl" shape="square" icon="ios-person" />
                <Progress class="progress fr" :percent="(playerInfo.hp / playerInfo.maxHp) * 100" :stroke-width="5" :stroke-color="['#FF0000', '#FF0000']" hide-info />
                <Progress class="progress fr" :percent="(playerInfo.mp / playerInfo.maxMp) * 100" :stroke-width="5" :stroke-color="['#0000FF', '#0000FF']" hide-info />
                <div class="battle-block-info fl">Lv. {{playerInfo.level}} (Exp. {{playerInfo.exp}}/{{playerInfo.getNextExp()}})</div>
                <div class="battle-block-info fl">Atk. {{playerInfo.atk}}</div>
            </div>
            <div class="battle-block fr">
                <ul class="battle-status">
                    <li>HP. {{playerInfo.hp}}/{{playerInfo.maxHp}}</li>
                    <li>MP: {{playerInfo.mp}}/{{playerInfo.maxMp}}</li>
                </ul>
            </div>
        </div>
        <div class="battle-area fl">
            <div class="battle-block fl">
                <Avatar class="fl" shape="square" icon="ios-person" />
                <Progress class="progress fr" :percent="(monsterInfo.hp / monsterInfo.maxHp) * 100" :stroke-width="5" :stroke-color="['#FF0000', '#FF0000']" hide-info />
                <Progress class="progress fr" :percent="(monsterInfo.mp / monsterInfo.maxMp) * 100" :stroke-width="5" :stroke-color="['#0000FF', '#0000FF']" hide-info />
                <div class="battle-block-info fl">Lv. {{monsterInfo.level}}</div>
                <div class="battle-block-info fl">Atk. {{monsterInfo.atk}}</div>
            </div>
            <div class="battle-block fr">
                <ul class="battle-status">
                    <li>HP. {{monsterInfo.hp}}/{{monsterInfo.maxHp}}</li>
                    <li>MP. {{monsterInfo.mp}}/{{monsterInfo.maxMp}}</li>
                </ul>
            </div>
        </div>
        <div class="map-path fl">
            <Breadcrumb>
                <BreadcrumbItem to="/">
                    <Icon type="logo-buffer"></Icon> 世界
                </BreadcrumbItem>
                <BreadcrumbItem to="/">
                    <Icon type="logo-buffer"></Icon> 新手区域
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Icon type="ios-cafe"></Icon> 新手村
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="side-bar fl">
            <Button class="action-btn" @click="handleMap">地图</Button>
            <Button class="action-btn" @click="handleChar">角色</Button>
        </div>
        <div class="map-area fl">
            <div v-if="isShowMap">
                <MapView/>
            </div>
            <div v-if="isShowChar">
                <CharacterView/>
            </div>
        </div>
        <div class="battle-info fr">
            <Scroll ref="container" height="410">
                <Timeline class="battle-info-timeline">
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
        <!-- <div class="fl">
            <GlobalFooter :links="links" :copyright="copyright" />
        </div> -->
    </div>
</template>

<script setup lang="ts">

import {ref, getCurrentInstance, nextTick} from "vue"
import PlayerInfo from "@/libs/battle/PlayerInfo"
import MonsterInfo from "@/libs/battle/MonsterInfo"
import MapInfo from "@/libs/map/MapInfo"
import MapView from "../components/MapView.vue"
import CharacterView from "../components/CharacterView.vue"

let playerInfo = ref(new PlayerInfo())
// playerInfo.value.cleanData()
playerInfo.value.loadData()
let monsterInfo = ref(new MonsterInfo())
let mapInfo = ref(new MapInfo())

let isBattle = false
let lastBattleTimestamp = 0
let battleInterval = 0
let battleInfos = ref([])
// let battleResult = ref([])

const {proxy}  = getCurrentInstance()

const isShowMap = ref(true)
const isShowChar = ref(false)

const styles = {
    height: 'calc(100% - 55px)',
    overflow: 'auto',
    paddingBottom: '53px',
    position: 'static'
}

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
        proxy.$el.querySelector(".battle-info-timeline").scrollIntoView({
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

function hideAll() {
    isShowMap.value = false
    isShowChar.value = false
}

function handleMap () {
    hideAll()
    isShowMap.value = true
}

function handleChar() {
    hideAll()
    isShowChar.value = true
}

const links = [
    {
    key: '帮助',
    title: '帮助',
    href: 'https://www.iviewui.com',
    blankTarget: true
    },
    {
    key: 'github',
    icon: 'logo-github',
    href: 'https://github.com/view-design/ViewUIPlus',
    blankTarget: true
    },
    {
    key: '条款',
    title: '条款',
    href: '',
    blankTarget: true
    }
]
const copyright = 'Copyright © 2022 View Design All Rights Reserved'

</script>

<style scoped>
    .main-block {
        border: 1px solid #CCCCCC;
        width: 1024px;
        height: 640px;
    }
    .header-info {
        width: 1024px;
        height: 30px;
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
        width: 200px;
    }
    .battle-block .progress {
        width: 150px;
        height: 12px;
    }
    .battle-block-info {
        width: 200px;
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
    .map-path {
        width: 1000px;
        padding: 10px;
    }
    .side-bar {
        width: 70px;
    }
    .map-area {
        border: 1px solid #CCCCCC;
        width: 550px;
        height: 420px;
    }
    .battle-info {
        border: 1px solid #CCCCCC;
        width: 400px;
        height: 420px;
        padding-left: 5px;
    }
    .battle-info-item {
        padding: 0 0 1px 0;
    }
    .footer-info {
        border: 1px solid #CCCCCC;
        width: 1022px;
        height: 40px;
        padding: 10px;
    }
    .footer-action {
        width: 490px;
        margin: 10px;
    }
    .action-btn {
        margin: 5px;
    }
</style>
