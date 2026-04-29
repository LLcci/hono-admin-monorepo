<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';

import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { signIn } from '@/hooks/auth';

const route = useRoute();
const router = useRouter();

const formRef = ref<FormInstance>();
const form = reactive({
  email: '',
  password: ''
});
const error = ref('');
const loading = ref(false);

const rules: FormRules<typeof form> = {
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入有效的邮箱地址' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码长度不能少于 6 位' }
  ]
};

async function handleSignIn() {
  const isValid = await formRef.value?.validate().catch(() => false);
  if (!isValid) {
    return;
  }

  error.value = '';
  loading.value = true;
  try {
    const result = await signIn.email({
      email: form.email,
      password: form.password
    });
    if (result?.error) {
      error.value = result.error.message || '登录失败，请检查账号信息';
      return;
    }

    const redirect = (route.query.redirect as string) || '/';
    await router.push(redirect);
  } catch {
    error.value = '登录失败，请稍后重试';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div
    class="min-h-dvh overflow-hidden bg-slate-100 text-slate-900 flex items-center justify-center"
  >
    <div
      class="grid max-w-8xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:grid-cols-[1.05fr_0.95fr]"
    >
      <aside
        class="hidden bg-[linear-gradient(160deg,#0f172a_0%,#1e293b_65%,#334155_100%)] text-white md:flex"
      >
        <div class="flex w-full flex-col justify-center gap-7 p-8 lg:p-10">
          <div>
            <div
              class="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
            >
              <span class="i-mdi-shield-lock-outline text-3xl text-white"></span>
            </div>
            <p class="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-slate-300">
              Hono Admin
            </p>
            <h1 class="max-w-sm text-4xl font-semibold leading-tight tracking-tight text-white">
              统一、安全、清晰的后台访问入口
            </h1>
            <p class="mt-4 max-w-md text-sm leading-6 text-slate-300">
              为现代团队提供轻量而可靠的管理后台认证体验，界面克制，流程直接，帮助你更快进入工作状态。
            </p>
          </div>

          <ul class="grid gap-3 text-sm text-slate-200">
            <li
              class="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3.5"
            >
              <span
                class="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-emerald-400/15 text-emerald-300 i-mdi-check-bold"
              ></span>
              <div>
                <p class="font-medium text-white">安全认证接入</p>
                <p class="mt-1 leading-6 text-slate-300">
                  支持稳定的邮箱密码登录流程与明确的状态反馈。
                </p>
              </div>
            </li>
            <li
              class="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3.5"
            >
              <span
                class="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-emerald-400/15 text-emerald-300 i-mdi-check-bold"
              ></span>
              <div>
                <p class="font-medium text-white">统一管理入口</p>
                <p class="mt-1 leading-6 text-slate-300">
                  以极简布局承载企业后台常见的身份入口场景。
                </p>
              </div>
            </li>
            <li
              class="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3.5"
            >
              <span
                class="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-emerald-400/15 text-emerald-300 i-mdi-check-bold"
              ></span>
              <div>
                <p class="font-medium text-white">快速会话恢复</p>
                <p class="mt-1 leading-6 text-slate-300">
                  自动检查会话状态，减少重复登录带来的打断。
                </p>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <main
        class="flex items-center justify-center bg-[radial-gradient(circle_at_top,#f8fafc,white_55%)] px-5 py-5 sm:px-8 lg:px-10 lg:py-6"
      >
        <section
          class="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-6"
        >
          <div class="mb-5">
            <div
              class="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm md:hidden"
            >
              <span class="i-mdi-view-dashboard-outline text-2xl"></span>
            </div>
            <p class="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              Hono Admin
            </p>
            <h2 class="text-3xl font-semibold tracking-tight text-slate-900">欢迎回来</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              请使用账号密码登录系统，继续访问你的管理后台。
            </p>
          </div>

          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            class="space-y-1"
            @keyup.enter="handleSignIn"
          >
            <el-form-item prop="email">
              <el-input
                v-model="form.email"
                type="email"
                size="large"
                clearable
                placeholder="name@company.com"
              >
                <template #prefix>
                  <span class="i-mdi-email-outline text-slate-400"></span>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                type="password"
                size="large"
                placeholder="请输入密码"
                clearable
                show-password
              >
                <template #prefix>
                  <span class="i-mdi-lock-outline text-slate-400"></span>
                </template>
              </el-input>
            </el-form-item>
            <el-alert
              v-if="error"
              :title="error"
              type="error"
              :closable="false"
              class="!mt-4"
              show-icon
            />

            <el-button
              type="primary"
              size="large"
              :loading="loading"
              class="!mt-4 w-full"
              @click="handleSignIn"
            >
              登录
            </el-button>
          </el-form>
        </section>
      </main>
    </div>
  </div>
</template>

