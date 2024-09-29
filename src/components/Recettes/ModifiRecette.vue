<template>
  <div class="container mt-5">
    <form
      @submit.prevent="handleUpdateRecette"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
    <div class="mb-3">
        <label for="title" class="form-label">{{ $t('title') }} :</label>
        <input
          type="text"
          class="form-control"
          v-model="title"
          id="title"
          required
        />
      </div>
      <div class="mb-3">
        <label for="ingredients" class="form-label">{{ $t('ingredients') }} :</label>
        <textarea
          class="form-control"
          v-model="ingredients"
          id="ingredients"
          required
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="type" class="form-label">{{ $t('type') }} </label>
        <select class="input form-select" v-model="type" id="type" required>
          <option value="entry">entry</option>
          <option value="plat">plat</option>
          <option value="desert">desert</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">{{ $t('category') }} :</label>
        <select
          class="form-select"
          v-model="selectedCategory"
          id="category"
          required
        >
          <option value="" disabled selected>-- {{ $t('categorySelect') }}--</option>
          <option
            v-for="category in store.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <button class="clr btn text-white mt-3 mb-4 me-3">{{ $t('save') }}</button>
      <RouterLink
        class="list text-decoration-none text-white me-5 fw-bold"
        to="/listrecette"
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

const store = useGestionStore();
const router = useRouter();
const route = useRoute();

const title = ref("");
const ingredients = ref("");
const type = ref("");
const selectedCategory = ref("");
const originalTitle = ref("");
const id = Number(route.params.id);
import { getCurrentInstance } from 'vue';


const { proxy } = getCurrentInstance();

const changeLanguage = (locale) => {
  proxy.$i18n.locale = locale;
};

onMounted(() => {
  const recette = store.recettes.find((recette) => recette.id === id);
  if (recette) {
    title.value = recette.title;
    ingredients.value = recette.ingredients;
    type.value = recette.type;
    const category = store.categories.find(cat => cat.name === recette.category);
    if (category) {
      selectedCategory.value = category.id; 
    }
    originalTitle.value = recette.title;
    console.log("Selected Category:", selectedCategory.value);
  }
});

const handleUpdateRecette = async() => {
  try{
  const updatedRecette = {
    id,
    title: title.value,
    originalTitle: originalTitle.value,
    ingredients: ingredients.value,
    type: type.value,
    category_id: selectedCategory.value,
  };
  await store.updateRecette(updatedRecette);
  router.push("/listrecette");
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
