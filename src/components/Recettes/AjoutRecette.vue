<template>
  <div class="container">
    <!-- <div class="mb-4 d-flex justify-content-end">
      <button @click="changelocaleuage('en')" class="btn btn-primary me-2">English</button>
      <button @click="changelocaleuage('fr')" class="btn btn-primary">Français</button>
    </div> -->
    <form
      @submit.prevent="handleAddRecipe"
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
        <label for="type" class="form-label">{{ $t('type') }} :</label>
        <select class="input form-select" v-model="type" id="type" required>

          <option value="" disabled selected>Sélectionnez un type de recette</option>
          <option value="entry">entry</option>
          <option value="plat">plat</option>
          <option value="desert">desert</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">{{ $t('category') }}</label>
        <select
          class="form-select"
          v-model="selectedCategory"
          id="category"
          required
        >
          <option value="" disabled selected>-- {{ $t('categorySelect') }} --</option>
          <option
            v-for="category in store.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <button class="clr btn text-white mt-3 mb-4 me-3">{{ $t('add') }}</button>
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
import { useRouter } from "vue-router";
import { ref, getCurrentInstance } from "vue";
const router = useRouter();
import { onMounted } from "vue";
const store = useGestionStore();
const title = ref("");
const ingredients = ref("");
const type = ref("");
const selectedCategory = ref("");


onMounted(() => {
  store.loadDataFromCategorieApi();
});

const handleAddRecipe = async () => {
  try {
    const newRecipe = {
    title: title.value,
    ingredients: ingredients.value,
    type: type.value,
    category_id: selectedCategory.value, 
  };
  await store.addRecete(newRecipe);
  router.push("/listrecette"); 
  } catch (error) {
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
const { proxy } = getCurrentInstance();


const changelocaleuage = (locale) => {
  proxy.$i18n.locale = locale;
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
