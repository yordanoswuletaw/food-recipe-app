<template>
    <div>
        <h2 class="font-bold text-xl px-12 pt-4">Steps</h2>
        <div v-for="(stp, i) in steps[0]?.step" :key="i" class="flex items-start m-3 flex-col rounded">

          <div class="relative flex min-w-[108px]  pl-0.5 pr-1.5 py-0.5 rounded-full font-semibold m-2 text-dark_green">

            <IconRight class="mr-0.5 text-dark_green" /> Step #{{ i+1 }}

          </div>
          <p class="font-semibold pl-0.5 mx-2 mb-2 indent-0">{{stp}}</p>

        </div>
      </div>
</template>

<script setup>
defineProps({
    steps: {
        required: true
    }
})
</script>