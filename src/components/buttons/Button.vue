<template>
    <button :type="type"
        class="text-white w-[12rem] drop-shadow-lg font-bold bg-orange-400 hover:ring-4 hover:ring-[#FF9119]/50 hover:bg-dark_orange focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50  rounded-lg text-sm  py-2.5 flex text-center justify-center items-center mr-2 mb-2">
        <slot></slot>
        {{ btnName }}
    </button>
</template>

<script setup>
defineProps({
    btnName: {
        type: String,
        required: true
    },
    type: {
        type: String,
    }
})
</script>