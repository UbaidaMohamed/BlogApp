<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-2">All Blogs</h2>
          <p class="text-lg text-gray-600">Discover amazing stories and insights</p>
        </div>
      </div>
    </div>

    <!-- Main Content --> 
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Blog Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="blog in blogs" 
          :key="blog._id"
          class="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
        >
          <!-- Blog Card -->
          <div class="relative">
            <!-- Gradient Header -->
            <div class="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <!-- Card Content -->
            <div class="p-6">
              <!-- Blog Title -->
              <h3 class="mb-4">
                <router-link 
                  :to="`/blog/${blog.slug}`"
                  class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2 group-hover:text-blue-600"
                >
                  {{ blog.title }}
                </router-link>
              </h3>

              <!-- Blog Description -->
              <p class="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                {{ blog.description || blog.content?.substring(0, 120) + '...' }}
              </p>

              <!-- Metadata -->
              <div class="flex items-center justify-between text-xs text-gray-500 mb-6">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                  </svg>
                  <span>{{ formatDate(blog.createdAt) }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="text-green-600 font-medium">{{ blog.status || 'Active' }}</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex space-x-3">
                <button 
                  @click="editBlog(blog._id)"
                  class="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group/edit"
                >
                  <svg class="w-4 h-4 group-hover/edit:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                  <span>Edit</span>
                </button>
                
                <button 
                  @click="deleteBlog(blog._id)"
                  class="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group/delete"
                >
                  <svg class="w-4 h-4 group-hover/delete:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>

            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="blogs.length === 0" class="text-center py-16">
        <div class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No blogs yet</h3>
        <p class="text-gray-600 mb-6">Start creating amazing content for your readers</p>
        <router-link 
          to="/create" 
          class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Create Your First Blog
        </router-link>
      </div>
    </div>

    <!-- Floating Action Button (Optional) -->
    <div class="fixed bottom-8 right-8">
      <router-link 
        to="/create"
        class="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center group"
        title="Create New Blog"
      >
        <svg class="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// Define blog interface for proper typing
interface Blog {
  _id: string;
  title: string;
  description: string;
  content?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

// Properly type the blogs ref
const blogs = ref<Blog[]>([]);
const router = useRouter();

onMounted(async () => {
  const res = await axios.get("https://blogapp-55ku.onrender.com/api/blogs");
  blogs.value = res.data;
});

function editBlog(id: string): void {
  router.push(`/edit/${id}`);
}

async function deleteBlog(id: string): Promise<void> {
  if (confirm('Are you sure you want to delete this blog post?')) {
    await axios.delete(`https://blogapp-55ku.onrender.com/api/blogs/${id}`);
    blogs.value = blogs.value.filter((blog: Blog) => blog._id !== id);
  }
}

function formatDate(dateString: string): string {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}
</script>

<style scoped>
/* Line clamp utilities for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth animations */
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

.group {
  animation: fadeInUp 0.6s ease-out;
}

/* Custom scrollbar for the page */
::-webkit-scrollbar {
  width: 6px;
} 

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
