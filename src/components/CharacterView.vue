

<template>
    <div>
        <div class="character-card">
            <div class="fl">
                <ul class="character-status">
                    <li>等级 1</li>
                    <li>力量 5 <Button type="text" size="small">+</Button></li>
                    <li>敏捷 5 <Button type="text" size="small">+</Button></li>
                    <li>体力 5 <Button type="text" size="small">+</Button></li>
                    <li>魔力 5 <Button type="text" size="small">+</Button></li>
                    <li>剩余点数 0</li>
                </ul>
            </div>

            <div class="fl">
                <ul class="character-status">
                    <li>经验 100/100</li>
                    <li>体力 100/100</li>
                    <li>魔力 100/100</li>
                    <li>攻击 30</li>
                </ul>
            </div>
            
            <div class="fl">
                <ul class="character-status">
                    <li>头 <Button size="small">头盔</Button></li>
                    <li>身 <Button size="small">皮甲</Button></li>
                    <li>手 <Button size="small">护手</Button></li>
                    <li>腿 <Button size="small">护腿</Button></li>
                    <li>脚 <Button size="small">运动鞋</Button></li>
                </ul>
            </div>
            
            <div class="fl">
                <ul class="character-status">
                    <li>主 <Button size="small">尼玛拳法</Button></li>
                    <li>辅 <Button size="small">尼玛身法</Button></li>
                    <li>被 <Button size="small">尼玛心法</Button></li>
                    <li>被 <Button size="small">防御强化</Button></li>
                    <li>被 <Button size="small">力量强化</Button></li>
                </ul>
            </div>
        </div>
        <Scroll class="bag-card" height="218">
            <Grid :col="4" hover="hover">
                <GridItem v-for="i in 20" @click="onItemClick">
                    物品物品物品
                </GridItem>
            </Grid>
        </Scroll>
    </div>
</template>

<script setup lang="ts">
function onItemClick() {
    console.log('item')
}
</script>

<style scoped>
.fl {
    float: left;
}
.character-card {
    height: 200px;
    padding: 10px;
}
.character-status {
    list-style: none;
    margin-right: 30px;
}
li {
    margin: 5px;
}
.bag-card {
    cursor: pointer;
}
</style>
