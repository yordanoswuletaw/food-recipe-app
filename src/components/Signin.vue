<script setup>
import { ref } from "@vue/reactivity";
import { useForm } from "vee-validate";
import axios from "../axios/axiosConfig";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { signinValidation } from '../validationschema/validationSchema'

const { validationSchema } = signinValidation()
const { handleSubmit, resetForm, setFieldValue} = useForm({ validationSchema: validationSchema });
const router = useRouter();
const store = useStore();
const errorMsg = ref(null);
const loading = ref(false);

function onInvalidSubmit({ values, errors, results }) {
}

const onSignin = handleSubmit(async (values) => {
    loading.value = true;
    try {
        const response = await axios.post("/signin", {
            email: values.email,
            password: values.password,
        });
        if (response.data.success) {
            errorMsg.value = null
            loading.value = false;
            store.dispatch("SET_USER", response.data.user);
            store.dispatch("SET_ACCESS_TOKEN", response.data.accessToken);
            resetForm();
            router.push("/");
        } else {
            loading.value = false;
            errorMsg.value = response.data.msg
            setFieldValue('password', "")
        }
    } catch (error) {
        errorMsg.value = "Something went wrong please try agin!";
        loading.value = false;
        setFieldValue('password', "")
    }
}, onInvalidSubmit);
</script>

<template>
    <form class="space-y-6  py-16" @submit="onSignin">
        <CustomInputField type="email" placeholder="email" name="email" />

        <div class="flex flex-col">
            <CustomInputField type="password" placeholder="password" name="password" />

            <button disabled type="button" class="p-3 -mr-3 w-full flex justify-end cursor-pointer">
                <p v-if="errorMsg && !loading" class="text-dark_red text-sm font-medium tracking-wide">{{ errorMsg }}</p>
                <!-- <span  class="flex-1 text-right text-sm font-medium tracking-wide text-dark_orange">Forgot password
                    ?</span> -->
            </button>
        </div>

        <div class="flex justify-between items-end">
        <button :disabled="loading" type="submit"
                class="text-white w-[12rem] font-bold bg-orange-400 hover:bg-dark_orange focus:ring-4 hover:ring-4 hover:ring-[#FF9119]/50 focus:outline-none focus:ring-[#FF9119]/50  rounded-lg text-sm  py-2.5 flex text-center justify-center items-center mr-2 mb-2">
                <IconLoading v-if="loading" class="w-5 h-5 mr-3"/>
                {{ loading ? `Signing in...` : `Sign in` }}
            </button>

         <RouterLink to="/" v-if="!loading"
                class=" hover:text-white border focus:ring-2 focus:outline-none focus:ring-orange-300 font-medium flex items-center rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 text-gray-900 hover:bg-orange-400 focus:bg-orange-500">
                <IconBackArrow class="w-4 h-4 mr-1"/>
                Back to Home</RouterLink>
        </div>
    </form>
</template>