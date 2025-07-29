<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!--! Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">{{ error }}</h1>
        <router-link to="/" class="text-blue-600 hover:text-blue-800">← Back to blogs</router-link>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Navigation Header -->
      <nav class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between">
            <!-- Back Button -->
            <router-link 
              to="/"
              class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
            >
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200">
                <svg class="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </div>
              <span class="font-medium">Back to Blogs</span>
            </router-link>

            <!--! Action Buttons -->
            <div class="flex items-center space-x-3">
             <button 
                  @click="deleteBlog(blog._id)"
                  class="flex items-centre space-x-2 px-3 py-2 text-sm font-medium bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <svg class="w-4 h-4 group-hover/delete:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Delete</span>
                </button>
              <router-link 
                :to="`/edit/${blog._id}`"
                class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <span>Edit</span>
              </router-link>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Article Content -->
      <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Article Header -->
        <header class="mb-12">
          <!-- Title -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {{ blog.title }}
          </h1>

          <!-- Metadata Bar -->
          <div class="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
            <!-- Publication Date -->
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
              </svg>
              <span>Published on {{ formatDate(blog.createdAt) }}</span>
            </div>

            <!-- Status Badge -->
            <div class="flex items-center space-x-2">
              <div class="flex items-center space-x-1">
                <div :class="statusDotClass" class="w-2 h-2 rounded-full"></div>
                <span :class="statusTextClass" class="font-medium capitalize px-2 py-1 rounded-full text-xs">
                  {{ blog.status || 'Active' }}
                </span>
              </div>
            </div>

            <!--! Last Updated -->
            <div v-if="wasUpdated" class="flex items-center space-x-2 text-xs">
              <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>Updated {{ formatDate(blog.updatedAt) }}</span>
            </div>
          </div>

          <!--! Article Separator -->
          <div class="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-8"></div>
        </header>

        <!--! Article Body -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-8 md:p-12">
            <!--! Content -->
            <div class="prose prose-lg max-w-none">
              <div class="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
                {{ blog.description || blog.content }}
              </div>
            </div>
          </div>
        </div>
      </article>

      <!--! Related Posts Section (placeholder) -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h3 class="text-2xl font-bold text-gray-900 mb-8">Continue Reading</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <router-link 
            to="/"
            class="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <h4 class="font-semibold text-gray-900 mb-2">Browse All Posts</h4>
            <p class="text-gray-600 text-sm">Discover more interesting articles and insights</p>
          </router-link>
          
          <router-link 
            to="/create"
            class="block p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:from-blue-100 hover:to-purple-100 transition-all duration-200"
          >
            <h4 class="font-semibold text-blue-900 mb-2">Write Your Own</h4>
            <p class="text-blue-700 text-sm">Share your thoughts and create a new blog post</p>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();

//! Blog data interface
interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

//! Blog data
const blog = ref<Blog>({
  _id: '',
  title: '',
  description: '',
  content: '',
  status: '',
  createdAt: '',
  updatedAt: '',
  slug: ''
});

const loading = ref(true);
const error = ref('');

async function deleteBlog(id: string): Promise<void> {
  if (confirm('Are you sure you want to delete this blog post?')) {
    await axios.delete(`https://blogapp-55ku.onrender.com/api/blogs/${id}`);
    const response = await axios.get(`https://blogapp-55ku.onrender.com/api/blogs/slug/${route.params.slug}`);
    blog.value = response.data;
  }
}

//! Fetch blog data on mount
onMounted(async () => {
  try {
    const response = await axios.get(`https://blogapp-55ku.onrender.com/api/blogs/slug/${route.params.slug}`);
    blog.value = response.data;
  } catch (err) {
    error.value = 'Blog not found';
    console.error('Error fetching blog:', err);
  } finally {
    loading.value = false;
  }
});

const wasUpdated = computed(() => {
  if (!blog.value.createdAt || !blog.value.updatedAt) return false;
  const created = new Date(blog.value.createdAt);
  const updated = new Date(blog.value.updatedAt);
  return updated.getTime() - created.getTime() > 60000; // More than 1 minute difference
});

const statusDotClass = computed(() => {
  const status = blog.value.status?.toLowerCase() || 'active';
  return {
    'bg-green-400 animate-pulse': status === 'active',
    'bg-red-400': status === 'deleted',
    'bg-yellow-400': status === 'draft',
    'bg-gray-400': !['active', 'deleted', 'draft'].includes(status)
  };
});

const statusTextClass = computed(() => {
  const status = blog.value.status?.toLowerCase() || 'active';
  return {
    'bg-green-100 text-green-800': status === 'active',
    'bg-red-100 text-red-800': status === 'deleted',
    'bg-yellow-100 text-yellow-800': status === 'draft',
    'bg-gray-100 text-gray-800': !['active', 'deleted', 'draft'].includes(status)
  };
});

//! Helper functions
function formatDate(dateString: string): string {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
</script>

<style scoped>
/*! Typography enhancements */
.prose {
  line-height: 1.8;
}

.prose p {
  margin-bottom: 1.5rem;
}

/*! Smooth animations */
* {
  transition: all 0.2s ease-in-out;
}

/*! Custom focus styles */
button:focus,
a:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/*! Sticky navigation */
.sticky {
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.9);
}

/*! Reading progress indicator (optional enhancement) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

article {
  animation: fadeInUp 0.6s ease-out;
}
</style>
