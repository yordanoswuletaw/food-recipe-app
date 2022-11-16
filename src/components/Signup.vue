<script setup>
import { ref } from "@vue/reactivity";
import axios from "../axios/axiosConfig";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { signupValidation } from '../validationschema/validationSchema'

const { validationSchema } = signupValidation()
const { handleSubmit, resetForm, setFieldValue } = useForm({ validationSchema: validationSchema });
const router = useRouter();
const store = useStore();
const errorMsg = ref(null);
const loading = ref(false);
function onInvalidSubmit({ values, errors, results }) {
}

const onSignup = handleSubmit(async (values) => {
    loading.value = true;
    try {
        const response = await axios.post("/signup", {
            username: values.username,
            email: values.email,
            password: values.confirmPassword
        })
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
            setFieldValue('confirmPassword', "")
        }
    } catch (error) {
        errorMsg.value = "Something went wrong please try agin!";
        loading.value = false;
        setFieldValue('password', "")
        setFieldValue('confirmPassword', "")
    }
}, onInvalidSubmit);

</script>

<template>
    <form class="space-y-6  py-16" @submit="onSignup">
        <CustomInputField type="text" placeholder="username" name="username" />
        <CustomInputField type="email" placeholder="email" name="email" />

        <div class="flex flex-col">
            <CustomInputField type="password" placeholder="password" name="password" />

            <CustomInputField type="password" placeholder="confirm password" name="confirmPassword" class="my-4 " />
            <p v-if="errorMsg && !loading" class="text-dark_red text-sm font-medium tracking-wide">{{ errorMsg }}</p>
        </div>

        <div class="flex items-end justify-between px-2 w-full">
            <button :disabled="loading" type="submit"
                class="text-white w-[12rem] font-bold bg-orange-400 hover:ring-4 hover:ring-[#FF9119]/50 hover:bg-dark_orange focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50  rounded-lg text-sm  py-2.5 flex text-center justify-center items-center mr-2 mb-2">
                 <IconLoading v-if="loading" class="w-5 h-5 mr-3"/>
                {{ loading ? `Signing up...` : `Sign up` }}
            </button>

            <RouterLink to="/" v-if="!loading"
                class=" hover:text-white border focus:ring-2 focus:outline-none focus:ring-orange-300 font-medium flex items-center rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 text-gray-900 hover:bg-orange-400 focus:bg-orange-500">
                <IconBackArrow class="w-4 h-4 mr-1"/>
                Back to Home</RouterLink>
        </div>
    </form>
</template>