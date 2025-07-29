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
            <h2 class="text-3xl font-bold text-gray-900">Create New Blog</h2>
            <p class="text-gray-600 mt-1">Share your thoughts with the world</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Form Header -->
        <div class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-1"></div>
        
        <!-- Form Content -->
        <div class="p-8">
          <form @submit.prevent="createBlog" class="space-y-8">
            <!-- Title Field -->
            <div class="space-y-2">
              <label for="title" class="block text-sm font-semibold text-gray-700 items-center space-x-2">
                <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                </svg>
                <span>Blog Title</span>
                <span class="text-red-500">*</span>
              </label>
              <input 
                id="title"
                v-model="title" 
                type="text"
                placeholder="Enter an engaging title for your blog post" 
                required 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white hover:border-gray-400"
              />
            </div>

            <!-- Slug Field -->
            <div class="space-y-2">
              <label for="slug" class="block text-sm font-semibold text-gray-700 items-center space-x-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"></path>
                </svg>
                <span>URL Slug</span>
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input 
                  id="slug"
                  v-model="slug" 
                  type="text"
                  placeholder="url-friendly-slug" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white hover:border-gray-400 pl-12"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 text-sm">/</span>
                </div>
              </div>
              <p class="text-xs text-gray-500 flex items-center space-x-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
                <span>This will be your blog's URL. Use lowercase letters, numbers, and hyphens only.</span>
              </p>
            </div>

            <!-- Description Field -->
            <div class="space-y-2">
              <label for="description" class="block text-sm font-semibold text-gray-700 items-center space-x-2">
                <svg class="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                <span>Content</span>
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <textarea
                  id="description"
                  v-model="description"
                  placeholder="Write your blog content here... Share your thoughts, experiences, and insights with your readers."
                  required
                  rows="12"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white hover:border-gray-400 resize-vertical"
                ></textarea>
                <!-- Character counter -->
                <div class="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                  {{ description.length }} characters
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <!-- Cancel Button -->
              <router-link 
                to="/"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group order-2 sm:order-1"
              >
                <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span>Cancel</span>
              </router-link>

              <!-- Submit Button -->
              <button 
                type="submit"
                class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 order-1 sm:order-2"
              >
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                <span>Publish Blog</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const title = ref("");
const slug = ref("");
const description = ref("");
const router = useRouter();

const createBlog = async () => {
  try {
    console.log('Sending data:', {
      title: title.value,
      slug: slug.value,
      description: description.value
    });
    
    const response = await axios.post("https://blogapp-55ku.onrender.com/api/blogs", {
      title: title.value,
      slug: slug.value,
      description: description.value, // Make sure this matches your backend field
    });
    
    console.log('Blog created:', response.data);
    router.push("/");
  } catch (error) {
    console.error('Error creating blog:', error);
    const err = error as any;
    alert('Error creating blog: ' + (err.response?.data?.message || err.message));
  }
};
watch(title, (newTitle) => {
  if (newTitle) {
    slug.value = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
});

</script>

<style scoped>
/* Custom focus styles for better accessibility */
input:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions for all interactive elements */
input,
textarea,
button,
a {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive button text */
@media (max-width: 640px) {
  .order-1 {
    order: 1;
  }
  .order-2 {
    order: 2;
  }
}
</style>
