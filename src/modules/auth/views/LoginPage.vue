<script setup>
import { ref } from 'vue';
import { login } from '@/api/auth.api';
import { useAuthStore } from "@/s"
</script>
<template>
  <div>
    <h2>Login</h2>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="handleLogin">Login</button>
  </div>
</template>

<style lang="">
    
</style>