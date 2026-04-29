<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const { isInitializing, isNavigating } = storeToRefs(authStore);

const progressKey = ref(0);

authStore.$subscribe(() => {
  if (isNavigating.value) {
    progressKey.value++;
  }
});
</script>

<template>
  <div class="min-h-dvh bg-slate-50 text-slate-900">
    <div
      class="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1 overflow-hidden transition-opacity duration-200"
      :class="isNavigating ? 'opacity-100' : 'opacity-0'"
    >
      <div
        :key="progressKey"
        class="route-progress h-full w-full origin-left bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400"
      ></div>
    </div>

    <RouterView />

    <Transition name="auth-loading-fade">
      <div
        v-if="isInitializing"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-white/88 px-6 backdrop-blur-sm"
      >
        <div
          class="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white px-8 py-7 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
        >
          <div
            class="h-14 w-14 flex items-center justify-center rounded-2xl bg-slate-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)]"
          >
            <span class="i-mdi-shield-lock-outline text-3xl animate-spin"></span>
          </div>
          <div class="space-y-2">
            <p class="text-base font-semibold text-slate-900">正在验证登录状态</p>
            <p class="text-sm leading-6 text-slate-500">
              请稍候，系统正在恢复你的会话并准备页面。
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.route-progress {
  animation: route-progress 1.25s ease-in-out infinite;
}

.auth-loading-fade-enter-active,
.auth-loading-fade-leave-active {
  transition: opacity 0.18s ease;
}

.auth-loading-fade-enter-from,
.auth-loading-fade-leave-to {
  opacity: 0;
}

@keyframes route-progress {
  0% {
    transform: scaleX(0.08);
  }

  60% {
    transform: scaleX(0.65);
  }

  80% {
    transform: scaleX(0.88);
  }

  100% {
    transform: scaleX(1);
  }
}
</style>
