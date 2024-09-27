<template>
  <div class="page-background container bg-color mt-5">
    <div class="mb-3">
  </div>
    <RouterLink
      class="list text-decoration-none text-white me-5 fw-bold"
      to="/ajout-recette"
    >
      <button
        class="clr btn text-white mt-5 mb-4 fw-bold"
        v-if="affichebtn"
        @click="maskBtn"
      >
        Ajouter une recette
      </button>
    </RouterLink>
    <div class="table-responsive">
      <table class="table table-striped table-bordered border-black">
        <thead class="table-success">
          <tr>
            <th>Id</th>
            <th>Titre</th>
            <th>Ingredients</th>
            <th>Type de recette</th>
            <th>Catégorie</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recette in store.getFilteredRecettes()" :key="recette.id">
            <td>{{ recette.id }}</td>
            <td>{{ recette.title }}</td>
            <td>{{ recette.ingredients }}</td>
            <td>{{ recette.type }}</td>
            <td>{{ recette.category}}</td>
            <td class="text-center">
              <button class="btn btn-sm" @click="openModal(recette)">
                <i
                  class="fa-solid fa-eye"
                  style="color: #4596d3; font-size: 25px"
                ></i>
              </button>
              <RouterLink :to="{ path: `/modifierecette/${recette.id}` }">
                <button class="btn btn-sm">
                  <i
                    class="fa-solid fa-pen-to-square"
                    style="color: #1ac163; font-size: 25px"
                  ></i>
                </button>
              </RouterLink>
              <button class="btn btn-sm" @click="destroyRecette(recette.id)">
                <i
                  class="fa-solid fa-trash"
                  style="color: #e30d0d; font-size: 25px"
                ></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-body">
        <h3>Détails du Recette</h3>
            <p><strong>Titre :</strong> {{ selectedRecette.title }}</p>
            <p>
              <strong>Ingredients :</strong> {{ selectedRecette.ingredients }}
            </p>
            <p><strong>Type :</strong> {{ selectedRecette.type }}</p>
            <p><strong>Category :</strong> {{ selectedRecette.category }}</p>
      </div>
      <button class="btn btn-danger" @click="closeModal">Fermer</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useGestionStore } from "@/stores/gestion";

const store = useGestionStore();
let affichebtn = true;
const maskBtn = () => {
  affichebtn = false;
};
const isModalVisible = ref(false);
const selectedRecette = ref(null);

const openModal = (recete) => {
  selectedRecette.value = recete;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(() => {
  store.loadDataFromCategorieApi();
  store.loadDataFromApi();
});
const destroyRecette = (id) => {
  store.deleteRecette(id);
};
</script>
   
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: fit-content;
  position: relative;
}

.modal-body {
  padding: 20px;
}
.clr {
  background-color: #343a40; 
}
.clr:hover {
  background-color: #24272a; 
}
.page-background {
  background-color: #f0f0f0;
  min-height: 90vh;
  height: fit-content;
  color: #333;
  padding: 20px;
}
</style>
