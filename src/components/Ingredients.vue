<template>
    <div class="py-3 mx-2">
        <h2 class="font-bold text-xl px-12">Ingredients</h2>
        <div v-for="(ing, i) in ingredients[0]?.ingredient" :key="i" class=" flex items-center justify-start min-h-24 bg-white opacity-90 shadow-sm bg-opacity-50 my-2 py-4 px-2 rounded-md">
         <div
            class="bg-gray-900  text-white_soft h-8 min-w-[2rem] flex items-center justify-center rounded-full font-semibold">
            #{{i+1}}
            </div>
          <h4 class="font-semibold ml-3 break-all w-[calc(96% - 2.5rem)]"> {{ing}}
          </h4>
        </div>
      </div>
</template>

<script setup>

defineProps({
    ingredients: {
        required: true
    }
})
</script>