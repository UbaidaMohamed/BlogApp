<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center space-x-4">
          <!-- Back Button -->
          <router-link 
            to="/"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
            title="Back to blogs"
          >
            <svg class="w-5 h-5 text-gray-600 group-hover:text-gray-800 transform group-hover:-translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </router-link>
          
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Edit Blog</h2>
            <p class="text-gray-600 mt-1">Update your blog post</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-600 text-lg">{{ error }}</p>
      <router-link to="/" class="text-blue-600 hover:text-blue-800 mt-4 inline-block">← Back to blogs</router-link>
    </div>

    <!-- Edit Form -->
    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Form Header -->
        <div class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-1"></div>
        
        <!-- Form Content -->
        <div class="p-8">
          <form @submit.prevent="updateBlog" class="space-y-8">
            <!-- Title Field -->
            <div class="space-y-2">
              <label for="title" class="block text-sm font-semibold text-gray-700">
                Blog Title *
              </label>
              <input 
                id="title"
                v-model="title" 
                type="text"
                placeholder="Enter blog title" 
                required 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <!-- Description Field -->
            <div class="space-y-2">
              <label for="description" class="block text-sm font-semibold text-gray-700">
                Content *
              </label>
              <textarea
                id="description"
                v-model="description"
                placeholder="Write your blog content..."
                required
                rows="12"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-vertical"
              ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <!-- Cancel Button -->
              <router-link 
                to="/"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Cancel</span>
              </router-link>

              <!-- Submit Button -->
              <button 
                type="submit"
                :disabled="submitting"
                class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{{ submitting ? 'Updating...' : 'Update Blog' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const title = ref("");
const description = ref("");
const loading = ref(true);
const submitting = ref(false);
const error = ref("");

onMounted(async () => {
  try {
    // Use ID from route params to fetch blog data
    const response = await axios.get(`https://blogapp-55ku.onrender.com/api/blogs/${route.params.id}`);
    title.value = response.data.title;
    description.value = response.data.description;
  } catch (err: any) {
    error.value = 'Failed to load blog for editing';
    console.error('Error fetching blog:', err);
  } finally {
    loading.value = false;
  }
});

const updateBlog = async () => {
  submitting.value = true;
  try {
    await axios.put(`https://blogapp-55ku.onrender.com/api/blogs/${route.params.id}`, {
      title: title.value,
      description: description.value,
    });
    router.push("/");
  } catch (err: any) {
    error.value = 'Failed to update blog';
    console.error('Error updating blog:', err);
  } finally {
    submitting.value = false;
  }
};
</script>
