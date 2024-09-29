<template>
  <div class="container mt-5">
    <!-- <div class="mb-4 d-flex justify-content-end">
      <button @click="changeLanguage('en')" class="btn btn-info me-2">{{ $t('buttons.english') }}</button>
      <button @click="changeLanguage('fr')" class="btn btn-info">{{ $t('buttons.french') }}</button>
    </div> -->
    <form
      @submit.prevent="handleUpdateCategory"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
      <div class="mb-3">
        <label for="name" class="form-label">{{ $t('form.name') }}  :</label>
        <input
          type="text"
          class="form-control"
          v-model="name"
          id="name"
          required
        />
      </div>
      <button class="clr btn mt-3 mb-4 me-3 text-white">{{ $t('save') }}</button>
      <RouterLink
        class="list text-decoration-none text-white me-5 fw-bold"
        to="/list-category"
      >
        <button class="btn btn-danger mt-3 mb-4">{{ $t('cancel') }}</button>
      </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { useGestionStore } from "@/stores/gestion";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const changeLanguage = (locale) => {
  proxy.$i18n.locale = locale;
};

const store = useGestionStore();
const router = useRouter();
const route = useRoute();

const name = ref("");
const originalName = ref("");
const id = Number(route.params.id);

onMounted(() => {
  const category = store.categories.find((category) => category.id === id);
  if (category) {
    name.value = category.name;
    originalName.value = category.name;
  }
});

const handleUpdateCategory = async() => {
  try{
    const updatedCategory = {
      id,
      name: name.value,
      originalName: originalName.value,
    };

    await store.updateCategory(updatedCategory);
    router.push("/list-category");
  }catch (error) {
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;
      
      errors.forEach((err) => {
        alert(err.msg); 
      });
    } else {
      alert("Une erreur inattendue est survenue.");
    }

  }  
};
</script>

<style scoped>
.clr {
  background-color: #343a40;
}
.clr:hover {
  background-color: #24272a;
}
.formulaire {
  width: 50%;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  margin-top: 16vh;
}
textarea {
  resize: none;
}
</style>
