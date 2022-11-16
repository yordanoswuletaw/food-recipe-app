<script setup>
defineProps({
    fill: {
        type: Boolean,
    }
})
</script>
<template>
    <svg :fill="fill ? 'currentColor' : 'transparent'" viewBox="0 0 20 20" stroke="currentColor" stroke-width="2" class="w-5 h-5">
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
    </svg>
</template>