<script setup>
defineProps({
    fill: {
        type: Boolean,
    }
})
</script>
<template>

    <svg  class="focus:border-none focus:outline-none" focusable="false" aria-hidden="true" stroke="currentColor"
        stroke-width="2" viewBox="0 0 24 24" data-testid="LocalDiningIcon" tabindex="-1" :fill="fill ? 'currentColor' : 'transparent'"
        title="StarBorder">
        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">
        </path>

    </svg>
</template>