<script setup>
import { ref } from "@vue/reactivity";

    const emit = defineEmits(['onSearch', 'onSelect'])

    const search = ref("");
    const searchType = ref("title")
    const handleSearch = (e) => {
        emit('onSearch', search.value)
    }

    const handleSearchType = (e) => {
        emit('onSelect', searchType.value)
    } 
</script>

<template>
    <div class="w-3/4 md:w-[75%] lg:w-4/6 xl:w-[55%]  mx-2">
        <div
            class="flex flex-row items-center ring-1 ring-white_soft bg-transparent w-full bg-opacity-80  backdrop-blur-md relative h-11 m-0 rounded hover:ring-gray-900 hover:ring-opacity-70 hover:drop-shadow-lg pl-2 py-2.5 font-medium leading-tight shadow-md  hover:shadow transition duration-150 ease-in-out">
            <label for="search" class="ml-3 text-dark_orange">
                <IconSearch />
            </label>
            <input type="search" v-model="search" @keyup="handleSearch"
                class="form-control flex-auto min-w-0 bg-transparent block w-full px-3 py-1.5 text-base text-white_soft font-semibold bg-clip-padding border-none placeholder:text-white_soft transition ease-in-out m-0 focus:text-white_soft focus:outline-none rounded-full"
                placeholder="Search" aria-label="Search" aria-describedby="button-addon2" name="search">

            <select @change="handleSearchType"
                class="h-8 mr-1 text-sm px-1 ring-1 tracking-wider font-bold ring-black drop-shadow-2xl hover:ring-white_soft rounded bg-transparent  text-gray-900 pl-2 border-none focus:border-none focus:outline-none leading-tight shadow-md hover:shadow-lg focus:shadow-lg  focus:ring-1 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                v-model="searchType">
                <option value="title">Title</option>
                <option value="time">Duration</option>
                <option value="ingredient">Ingredient</option>
            </select>
        </div>
    </div>
</template>