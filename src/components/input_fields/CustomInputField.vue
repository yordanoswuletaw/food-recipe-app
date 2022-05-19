<template>
    <div class="relative">
        <input :type="type" :placeholder="placeholder" v-model="value"
            class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:outline-black ">

        <div v-if="errorMessage" class="absolute right-1 top-[50%] -translate-y-[50%] text-red-500">
            <IconWrong />
        </div>

        <div v-else-if="value" class="absolute right-1 top-[50%] -translate-y-[50%] text-green-500">
            <IconRight />
        </div> 
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