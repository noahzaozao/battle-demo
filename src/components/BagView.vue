

<template>
    <div>
        <Card class="bag-card">
            <template #title>
                <Icon type="ios-film-outline"></Icon>
                背包
            </template>
            <template #extra>
                XXX
            </template>
            <p>
                <ButtonGroup size="small">
                    <Button class="bag-btn">物品 * 1</Button>
                    <Button class="bag-btn">物品 * 1</Button>
                    <Button class="bag-btn">物品 * 1</Button>
                    <Button class="bag-btn">物品 * 1</Button>
                    <Button class="bag-btn">物品 * 1</Button>
                    <Button class="bag-btn">物品 * 1</Button>
                    <Button class="bag-btn">物品 * 1</Button>
                    <Button class="bag-btn">物品 * 1</Button>
                    <Button class="bag-btn">物品 * 1</Button>
                    <Button class="bag-btn">物品 * 1</Button>
                    <Button class="bag-btn">物品 * 1</Button>
                    <Button class="bag-btn">物品 * 1</Button>
                    <Button class="bag-btn">物品 * 1</Button>
                </ButtonGroup>
            </p>
        </Card>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.bag-card {
    margin-bottom: 20px;
}
.bag-btn {
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>
