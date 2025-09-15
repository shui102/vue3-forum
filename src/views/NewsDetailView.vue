<template>
    <el-container>
        <el-main>
            <el-card  v-if="article" class="article-detail">
                <h1>{{ article.Title }}</h1>
                <p>{{ article.Content }}</p>
            </el-card>
            <div v-else class="no-data">文章不存在</div>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import axios from '../axios';
import { useRoute } from 'vue-router';
import type { Article } from '../types/Article';

const route = useRoute()
const article = ref<Article | null>(null)

const fetchArticle = async() =>{
    try{
        const {id} = route.params
        const res = await axios.get<Article>(`/articles/${id}`);
        article.value = res.data
    }catch(error){
        console.error('Failed to load article', error)
    }
}

onMounted(fetchArticle)

</script>

<style scoped>
.article-detail {
  margin: 20px 0;
}

.no-data {
  text-align: center;
  font-size: 1.2em;
  color: #999;
}
</style>