<template>
  <div class="container mt-5">
    <form
      @submit.prevent="handleUpdateRecette"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
    <div class="mb-3">
        <label for="title" class="form-label">Tilte :</label>
        <input
          type="text"
          class="form-control"
          v-model="title"
          id="title"
          required
        />
      </div>
      <div class="mb-3">
        <label for="ingredients" class="form-label">Ingrédients :</label>
        <textarea
          class="form-control"
          v-model="ingredients"
          id="ingredients"
          required
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="type" class="form-label">Type :</label>
        <select class="input form-select" v-model="type" id="type" required>
          <option value="entry">entry</option>
          <option value="plat">plat</option>
          <option value="desert">desert</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Catégorie :</label>
        <select
          class="form-select"
          v-model="selectedCategory"
          id="category"
          required
        >
          <option value="" disabled selected>-- Sélectionnez une catégorie --</option>
          <option
            v-for="category in store.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <button class="clr btn text-white mt-3 mb-4 me-3">Ajouter</button>
      <RouterLink
        class="list text-decoration-none text-white me-5 fw-bold"
        to="/listrecette"
      >
        <button class="btn btn-danger mt-3 mb-4">Annuler</button>
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

const id = Number(route.params.id);

// onMounted(() => {
//   const recette = store.recettes.find((recette) => recette.id === id);
//   if (recette) {
//     title.value = recette.title;
//     ingredients.value = recette.ingredients;
//     type.value = recette.type;
//     selectedCategory.value = recette.category_id;
//   }
// });
onMounted(() => {
  // Charger les catégories si elles ne sont pas déjà présentes
  // if (store.categories.length === 0) {
  //   store.loadDataFromCategorieApi();
  // }

  const recette = store.recettes.find((recette) => recette.id === id);
  if (recette) {
    title.value = recette.title;
    ingredients.value = recette.ingredients;
    type.value = recette.type;
    selectedCategory.value = recette.category_id;
  }
});


const handleUpdateRecette = () => {
  const updatedRecette = {
    id,
    title: title.value,
    ingredients: ingredients.value,
    type: type.value,
    category_id: selectedCategory.value,
  };
  console.log(updatedRecette); 
  console.log('ID à mettre à jour:', id);
  console.log('ID de la catégorie sélectionnée:', selectedCategory.value);
  store.updateRecette(updatedRecette);
  router.push("/listrecette");
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
