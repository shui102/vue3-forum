import { defineStore } from "pinia";
import {ref,computed} from 'vue';
import axios from "../axios";

export const useAuthStore = defineStore('auth', ()=>{
    const token = ref<string | null>(localStorage.getItem('token'));
    
    const isAuthenticated = computed(() => !!token.value);

    const login = async(username: string, password: string) =>{
    
        try{
            //发送登录请求
            const res = await axios.post('auth/login', {username, password})

            token.value = res.data.token
            localStorage.setItem('token', token.value || '')
        }catch(error){
            console.error('Login error', error)
        }
    }

    const register = async(username: string, password: string) =>{

        try{
            //发送注册请求
            const res = await axios.post('auth/register', {username, password})

            token.value = res.data.token
            localStorage.setItem('token', token.value || '')
        }catch(error){
            console.error('Register error', error)
        }

    }

    const logout = () =>{
        token.value = null;
        localStorage.removeItem('token');
    }
    return{
        token,
        register,
        login,
        logout,
        isAuthenticated
    }
})

