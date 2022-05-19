<script setup>
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { ingredientsValidation } from '../validationschema/validationSchema'

const store = useStore()

const { validationSchema } = ingredientsValidation();
const { handleSubmit, resetForm } = useForm({ validationSchema: validationSchema });
const recipe = computed(() => store.state.recipe)

const { value, errorMessage } = useField('ingredient')

const deleteIngredients = (id) => {
    recipe.value.ingredients = recipe.value.ingredients.filter((ing, indx) => id !== indx)
}

const editIngredients = (id) => {
    value.value = recipe.value.ingredients[id]
    recipe.value.ingredients = recipe.value.ingredients.filter((ing, indx) => id !== indx)
}

function onInvalidSubmit({ values, errors, results }) {

}
const onAddIngredient = handleSubmit((values) => {
    recipe.value.ingredients.push(values.ingredient);
    resetForm()
}, onInvalidSubmit);


</script>

<template>
    <form class="px-6 pt-3 pb-1" @submit="onAddIngredient">
        <h3 class="font-semibold pb-1">Ingredients:</h3>
        <div class="relative">
            <div class="w-full rounded-lg border bg-transparent">
                <input type="text" placeholder="Ingredient" v-model="value" name="ingredient"
                    class="w-[99%] py-2.5 px-4 m-1 backdrop-blur-xl bg-transparent placeholder:text-sm drop-shadow-sm text-gray-900 rounded-md placeholder-gray-400 border-2 border-gray-800 hover:border-orange-400 focus:border-orange-400 transition-colors ease-in-out duration-100 focus:outline-none">
                <div class="flex justify-end items-center py-1 px-2">
                    <p v-if="errorMessage" class="text-xs text-dark_red flex-1">{{ errorMessage }}</p>
                    <button
                        class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-dark_orange">
                        <IconAdd class="w-5 h-5 mr-4" /> Add
                    </button>
                </div>
            </div>
        </div>

        <div class="pt-2 flex items-top justify-end overflow-y-scroll">
            <div class="flex-1 ">
                <div class="flex w-full items-center justify-between" v-for="(ing, i) in recipe.ingredients" :key="i">
                    <div class="flex-1 flex items-center">
                        <p class="flex-auto font-semibold break-all">{{ `#${i + 1} ${ing}` }} </p>
                    </div>
                    <div @click="editIngredients(i)"
                        class="p-1.5 my-1 mx-3 bg-dark_violet text-white_soft rounded-full">
                        <IconEdit class="w-5 h-5 cursor-pointer" />
                    </div>
                    <div @click="deleteIngredients(i)" class="mx-3 p-1.5 my-1 bg-dark_red rounded-full text-white_soft">
                        <IconDelete class="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>