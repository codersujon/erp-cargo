import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(null)
    const token = ref(localStorage.getItem("token") || null)

    const isLoggedIn = computed(()=> !!token.value)

    //** Set Auth */
    const setAuth = (data) => {
        user.value = data.user
        token.value =  data.token

        localStorage.setItem("token", data.token)
    }

    //** Logout */
    const logout = () => {
        user.value = null
        token.value =  null
        localStorage.removeItem("token")
    }

    return {
        user,
        token,
        isLoggedIn,
        setAuth,
        logout
    }
})