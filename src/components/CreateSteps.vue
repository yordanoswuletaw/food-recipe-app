<script setup>
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { stepsValidation } from '../validationschema/validationSchema'

const store = useStore()

const { validationSchema } = stepsValidation();
const { handleSubmit, resetForm } = useForm({ validationSchema: validationSchema });
const recipe = computed(() => store.state.recipe)

const { value, errorMessage } = useField('description')

const deleteStep = (id) => {
    recipe.value.steps = recipe.value.steps.filter((ing, indx) => id !== indx)
}

let editKey = null;
const editStep = (id) => {
    value.value = recipe.value.steps[id];
    editKey = id;
    recipe.value.steps = recipe.value.steps.filter((ing, indx) => id !== indx)
}

function onInvalidSubmit({ values, errors, results }) {
}
const onAddStep = handleSubmit((values) => {
    if (editKey)
        recipe.value.steps.splice(editKey, 0, values.description);
    else recipe.value.steps.push(values.description);
    editKey = null;
    resetForm()
}, onInvalidSubmit);

</script>

<template>
    <form class="px-6" @submit="onAddStep">
        <h3 class="font-semibold py-0.5">Steps:</h3>

        <div class="mb-1 w-full rounded-lg border bg-transparent">
            <textarea placeholder="Step Description" v-model="value" name="description"
                class="w-[99%] py-3 px-4 m-1 backdrop-blur-xl bg-transparent ring-1 ring-gray-800 focus:ring-orange-400 hover:ring-orange-400 placeholder:text-sm text-gray-900 rounded-md placeholder-gray-700 drop-shadow-sm transition-colors duration-100 ease-in-out resize-none focus:outline-none"
                rows="4"></textarea>
            <div class="flex justify-end items-center py-1 px-2">
                <p v-if="errorMessage" class="text-xs text-dark_red flex-1">{{ errorMessage }}</p>
                <button
                    class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-dark_orange">
                    <IconAdd class="w-5 h-5 mr-4" /> Add
                </button>
            </div>
        </div>

        
        <div class="pt-2 flex items-top justify-end overflow-y-auto flex-col">
            <div class="flex-1 pt-3 flex items-center justify-between" v-for="(step, i) in recipe.steps" :key="i">
                <div class="flex flex-1 flex-wrap">
                    <p class="font-semibold break-all">{{ `#${i + 1} ${step}` }} </p>
                </div>

                <div @click="editStep(i)" class="p-1.5 my-1 mx-3 bg-dark_violet text-white_soft rounded-full">
                    <IconEdit class="w-5 h-5 cursor-pointer" />
                </div>
                <div @click="deleteStep(i)" class="mx-3 p-1.5 my-1 bg-dark_red rounded-full text-white_soft">
                    <IconDelete class="w-5 h-5 cursor-pointer" />
                </div>
            </div>
        </div>
    </form>
</template>