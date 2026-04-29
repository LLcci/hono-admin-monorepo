import { ref } from 'vue';
import { defineStore } from 'pinia';

import { authClient } from '@/hooks/auth';

type InitializeSessionOptions = {
  force?: boolean;
  showLoading?: boolean;
};

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const initialized = ref(false);
  const isInitializing = ref(true);
  const isNavigating = ref(false);

  let sessionRequest: Promise<boolean> | null = null;

  async function initializeSession(options: InitializeSessionOptions = {}) {
    const { force = false, showLoading = !initialized.value } = options;

    if (initialized.value && !force) {
      if (showLoading) {
        isInitializing.value = false;
      }
      return isAuthenticated.value;
    }

    if (sessionRequest) {
      return sessionRequest;
    }

    if (showLoading) {
      isInitializing.value = true;
    }

    sessionRequest = (async () => {
      try {
        const { data, error } = await authClient.getSession();
        isAuthenticated.value = Boolean(data?.session && !error);
        return isAuthenticated.value;
      } catch {
        // fail closed: unauthenticated
        isAuthenticated.value = false;
        return false;
      } finally {
        initialized.value = true;
        if (showLoading) {
          isInitializing.value = false;
        }
        sessionRequest = null;
      }
    })();

    return sessionRequest;
  }

  function setNavigating(value: boolean) {
    isNavigating.value = value;
  }

  return {
    isAuthenticated,
    initialized,
    isInitializing,
    isNavigating,
    initializeSession,
    setNavigating
  };
});
