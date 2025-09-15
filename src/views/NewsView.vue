<template>
  <el-container>
    <el-main>
      <div v-if="articles && articles.length">
        <el-card v-for="article in articles" :key="article.ID" class="article-card">
          <h2>{{ article.Title }}</h2>
          <p>{{ article.Preview }}</p>
          <el-button text @click="viewDetail(article.ID)">阅读更多</el-button>
        </el-card>
      </div>
      <div v-else class="no-data">您必须登录/注册才可以查看文章</div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import axios from '../axios';
import { ref,onMounted } from 'vue';
import type { Article } from '../types/Article';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const articles = ref<Article[]>([])
const authStore = useAuthStore()
const router = useRouter()

const fetchArticles = async() =>{
    try{
        const res = await axios.get<Article[]>('/articles')
        articles.value = res.data
    }
    catch(error){
        console.error('Failed to load articles', error)
    }
}

const viewDetail = (id: string) =>{
  console.log('传递的id参数:', id);
  if(!authStore.isAuthenticated){
    ElMessage.error('请登录再查看')
    return
  }
  router.push({
    name: "NewsDetail", params:{id}
  })
}

onMounted(fetchArticles)

</script>

<style scoped>
.article-card {
  margin: 20px 0;
}

.no-data {
  text-align: center;
  font-size: 1.2em;
  color: #999;
}
</style>