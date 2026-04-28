import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      primary: '#409eff',
      success: '#67c23a',
      warning: '#e6a23c',
      danger: '#f56c6c',
      error: '#f56c6c',
      info: '#909399'
    }
  },
  presets: [presetWind3(), presetAttributify(), presetIcons(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
