<template>
    <textarea :placeholder="placeholder" v-model="value"
        class="w-full px-2 py-1 bg-transparent drop-shadow-sm ring-1 ring-gray-800 hover:ring-orange-400 focus:ring-orange-400 text-gray-900 rounded-md placeholder-gray-500 placeholder:text-sm transition-colors ease-in-out duration-100 resize-none focus:outline-none"
        rows="4"></textarea>

        <p v-if="errorMessage" class="text-xs text-dark_red">{{errorMessage}}</p>
</template>

<script setup>
import { useField } from "vee-validate"

const props = defineProps({
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