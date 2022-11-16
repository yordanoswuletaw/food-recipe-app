<template>
    <div class="relative">
        <input :type="type" :placeholder="placeholder" v-model="value"
            :class="{normal: name !== 'time', small: name === 'time'}">
         <p v-if="errorMessage" class="text-xs text-dark_red">{{errorMessage}}</p>
    </div>
</template>

<script setup>
import { useField } from "vee-validate"

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        required: true,
    },
})
const { value, errorMessage } = useField(props.name)

</script>

<style>
.normal{
  @apply w-full py-2.5 px-4 backdrop-blur-xl bg-transparent drop-shadow-sm placeholder:text-sm text-gray-900 rounded-md border-2 border-gray-800 focus:border-orange-400 hover:border-orange-400 placeholder-gray-400 transition-colors ease-in-out duration-100 focus:outline-none;
}

.small{
    @apply h-10 px-2 py-1 backdrop-blur-xl bg-transparent drop-shadow-sm placeholder:text-sm border-2 border-gray-800 hover:border-orange-400 focus:border-orange-400 text-gray-900 rounded-md placeholder-gray-600  transition-colors ease-in-out duration-75 focus:outline-none;
}
</style>