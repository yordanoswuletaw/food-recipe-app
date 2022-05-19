<script setup>
    defineProps({
        elivated: {
            type: Boolean,
        }
    })
</script>
<template>
    <p :class="{_elivated: elivated, _not_elivated: !elivated}">
        <slot></slot>
    </p>
</template>

<style>
  ._elivated{
      @apply flex w-fit items-center hover:drop-shadow-xl transition-transform ease-in-out duration-300 cursor-pointer justify-center font-semibold drop-shadow-lg px-4 py-1.5 bg-white rounded-full;
  }
  ._not_elivated{
      @apply flex w-fit items-center transition-transform ease-in-out duration-300 cursor-pointer justify-center font-semibold px-1 py-1.5 rounded-full;
  }
</style>