<template>
    <div>
        <el-container>
            <SideMenu />
            <el-container direction='vertical'>
                <TopHeader />
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        
    </div>
    
    
</template>

<script setup>
    import TopHeader from "@/components/mainBox/TopHeader";
    import SideMenu from "@/components/mainBox/SideMenu";
</script>

<style scoped>
.el-main {
    height: calc(100vh - 60px);
    overflow: auto;
}
</style>