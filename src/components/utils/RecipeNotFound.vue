<template>
    <div 
    class="w-full h-full flex items-center mt-[5rem] flex-col">
    <div class="flex items-center justify-center">
      <img src="/logo-icon.png" class="w-6 h-6" alt="food recipe app logo">
      <div class="text-dark_violet font-medium text-lg pl-2">food<span class="text-dark_orange">recipe._ </span>
      </div>
    </div>
    <h2 class="text-gray-900 text-3xl font-bold">{{message}}</h2>
    <slot></slot>
  </div>
</template>

<script setup>
   defineProps({
       message: {
           type: String,
           required: true,
       }
   })
</script>