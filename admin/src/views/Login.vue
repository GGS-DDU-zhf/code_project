<template>
    <div>
        <button class="login" @click='handleLogin'>login</button>
    </div>
</template>

<script setup>
    const handleLogin = () => {
        localStorage.setItem("token", '123456')
    }
</script>

<style scoped>

</style>