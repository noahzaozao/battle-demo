

<template>
    <div>
        <Scroll height="410">
            <Card class="map-card" v-for="i in 5">
                <template #title>
                    新手区域
                </template>
                <template #extra>
                    Lv.1
                </template>
                <p>
                    <Button class="map-btn">新手村</Button>
                    <Button class="map-btn">新手村</Button>
                    <Button class="map-btn">新手村</Button>
                    <Button class="map-btn">新手村</Button>
                    <Button class="map-btn">新手村</Button>
                </p>
            </Card>
        </Scroll>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.map-card {
    float: left;
    width: 450px;
    margin: 0 0 5px 5px;
}
.map-btn {
    margin-right: 5px;
}
</style>
