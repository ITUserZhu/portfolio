import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getProfile, getSkills, getProjects } from '../api';

export const usePortfolioStore = defineStore('portfolio', () => {
  const profile = ref(null);
  const skills = ref([]);
  const projects = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const [profileRes, skillsRes, projectsRes] = await Promise.all([
        getProfile(),
        getSkills(),
        getProjects(),
      ]);
      profile.value = profileRes.data;
      skills.value = skillsRes.data;
      projects.value = projectsRes.data;
    } catch (e) {
      error.value = e.message || '数据加载失败';
      console.error('Failed to fetch portfolio data:', e);
    } finally {
      loading.value = false;
    }
  }

  return { profile, skills, projects, loading, error, fetchAll };
});
