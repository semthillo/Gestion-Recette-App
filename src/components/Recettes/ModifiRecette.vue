<template>
  <div class="container mt-5">
    <form
      @submit.prevent="handleUpdateRecette"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
      <div class="mb-3">
        <label for="titre" class="form-label">Titre :</label>
        <input
          type="text"
          class="form-control"
          v-model="title"
          id="titre"
          required
        />
      </div>
      <div class="mb-3">
        <label for="ingredient" class="form-label">Ingredients :</label>
        <input
          type="text"
          class="form-control"
          v-model="ingredient"
          id="ingredient"
          required
        />
      </div>
      <div class="mb-3">
        <label for="type" class="form-label">Type :</label>
        <input
          type="text"
          class="form-control"
          v-model="type"
          id="type"
          required
        />
      </div>
      <button class="clr btn mt-3 mb-4 me-3 text-white">Enregistrer</button>
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
const ingredient = ref("");
const type = ref("");

const id = Number(route.params.id);

onMounted(() => {
  const recette = store.recettes.find((recette) => recette.id === id);
  if (recette) {
    title.value = recette.title;
    ingredient.value = recette.ingredient;
    type.value = recette.type;
  }
});

const handleUpdateRecette = () => {
  const updatedRecette = {
    id,
    title: title.value,
    ingredient: ingredient.value,
    type: type.value,
  };

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
</style>
