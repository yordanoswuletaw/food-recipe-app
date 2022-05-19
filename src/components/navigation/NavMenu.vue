<script setup>
    const props = defineProps(['name'])
</script>

<template>
    <div class="relative flex gap-3 justify-center items-center cursor-pointer flex-row text-base transition-all duration-300 ease-in-out ">
        <slot></slot>
         <h3 class="font-semibold">
           {{name}}
         </h3>
      </div>
</template>
