<template>
    <div class="searchDiv">
        <n-icon size="30" class="open" color="#101014" @click="changeOpen" @wheel="handleWheel">
            <div v-if="isOpen">
                <ArrowBarDown />
            </div>
            <div v-else>
                <ArrowBarUp />
            </div>
        </n-icon>
        <div class="card">
            <n-input class="input" round placeholder="搜索位置" clearable @wheel="handleWheel"/>
            <div class="detail_wrap" :class="isOpen ? 'active' : ''">
                <n-space class="vSpace" vertical>
                    <div>
                        <n-icon size="20" class="arrowIcon">
                            <ArrowLeft></ArrowLeft>
                        </n-icon>
                        <n-space justify="end" :inline="true" class="endSpace">
                            <n-icon size="20" class="arrowIcon" color="#101014">
                                <ArrowRight></ArrowRight>
                            </n-icon>
                            <n-icon size="20" class="arrowIcon" color="#101014">
                                <AlignSpaceEvenlyHorizontal20Filled></AlignSpaceEvenlyHorizontal20Filled>
                            </n-icon>
                        </n-space>
                    </div>
                    <n-card class="planCard" :theme-overrides="cardThemeOverrides">
                        <n-input type="text" placeholder="输入标题" class="titleInput" />
                        <n-divider />
                        <div v-if="doubleLinkedList.isEmpty()">
                            请选择一个起点
                        </div>
                    </n-card>
                </n-space>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight } from '@vicons/fa'
import { AlignSpaceEvenlyHorizontal20Filled } from "@vicons/fluent"
import { ArrowBarUp, ArrowBarDown } from '@vicons/tabler'
import type { CardProps } from 'naive-ui'
import { DoubleLinkedList } from 'datastructure-ts/src/List/DoubleLinkedList'
import type { geographyNode } from '@/class/GeographyNode'
import { computed, ref } from 'vue'

const doubleLinkedList = new DoubleLinkedList<geographyNode>;
    

const isOpen = ref(true);

function changeOpen() {
    isOpen.value = !isOpen.value;
}

type CardThemeOverrides = NonNullable<CardProps['themeOverrides']>

const cardThemeOverrides: CardThemeOverrides = {
    borderRadius: "15px",
}

function handleWheel(event: any) {
  event.preventDefault();
}
</script>

<style scoped>

.searchDiv{
    display: flex;
    width: 100%;
}

.open {
    z-index: 3;
    margin: 0 14 0 14;
    top: 3px;
    cursor: pointer;
}

.card {
    width: 100%;
}

.input {
    border-width: 0;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
    margin-bottom: 10px;
}

.active {
    opacity: 0 !important;
    visibility: hidden !important;
    height: 0 !important;
}

.detail_wrap {
    transition: height 0.4s ease-out, opacity 0.2s ease-in, visibility 0.2s ease-in;
    visibility: 1;
    opacity: 1;
}

.arrowIcon {
    cursor: pointer;
}

.planCard {
    border-width: 0;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
    height: 70vh;
}

.titleInput {
    border: none;
    box-shadow: none;
    position: unset;
    border-radius: 0;
    font-size: larger;
}

.titleInput:deep(input) {
    background: linear-gradient(to right, black, black) no-repeat right bottom;
    background-size: 0 2px;
    transition: background-size 600ms;
}

.titleInput:deep(input:focus) {
    background-position-x: left;
    background-size: 100% 2px;
}

.titleInput:deep(input:hover) {
    background-position-x: left;
    background-size: 100% 2px;
}

.endSpace {
    width: 93%;
}
</style>