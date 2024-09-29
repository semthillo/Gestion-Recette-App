<template>
  <div class="page-background container bg-color mt-5">
    <!-- <div class="mb-4 d-flex justify-content-end">
      <button @click="changeLanguage('en')" class="btn btn-primary me-2">English</button>
      <button @click="changeLanguage('fr')" class="btn btn-primary">Français</button>
    </div> -->
    <RouterLink
      class="list text-decoration-none text-white me-5 fw-bold"
      to="/ajout-recette"
    >
      <button
        class="clr btn text-white mt-5 mb-4 fw-bold"
        v-if="affichebtn"
        @click="maskBtn"
      >
      {{ $t('add_recipe') }}
      </button>
    </RouterLink>
    <div class="table-responsive">
      <table class="table table-striped table-bordered border-black">
        <thead class="table-success">
          <tr>
            <th>{{ $t('id') }}</th>
            <th>{{ $t('title') }}</th>
            <th>{{ $t('ingredients') }}</th>
            <th>{{ $t('recipe_type') }}</th>
            <th>{{ $t('category') }}</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recette in store.getFilteredRecettes()" :key="recette.id">
            <td class="text-center">{{ recette.id }}</td>
            <td class="text-left">{{ recette.title }}</td>
            <td class="text-left">{{ recette.ingredients }}</td>
            <td class="text-left">{{ recette.type }}</td>
            <td class="text-left">{{ recette.category }}</td>
            <td class="text-center">
              <button class="btn btn-sm" @click="openModal(recette)">
                <i
                  class="fa-solid fa-eye"
                  style="color: #4596d3; font-size: 20px"
                ></i>
              </button>
              <RouterLink :to="{ path: `/modifierecette/${recette.id}` }">
                <button class="btn btn-sm">
                  <i
                    class="fa-solid fa-pen-to-square"
                    style="color: #1ac163; font-size: 20px"
                  ></i>
                </button>
              </RouterLink>
              <button class="btn btn-sm" @click="destroyRecette(recette.id)">
                <i
                  class="fa-solid fa-trash"
                  style="color: #e30d0d; font-size: 20px"
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
        <h3>{{ $t('recipe_details') }}</h3>
            <p><strong>{{ $t('title') }} :</strong> {{ selectedRecette.title }}</p>
            <p>
              <strong>{{ $t('ingredients') }} :</strong> {{ selectedRecette.ingredients }}
            </p>
            <p><strong>{{ $t('recipe_type') }} :</strong> {{ selectedRecette.type }}</p>
            <p><strong>{{ $t('category') }} :</strong> {{ selectedRecette.category }}</p>
      </div>
      <button class="btn btn-danger" @click="closeModal">{{ $t('close') }}</button>
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
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette recette ?");
  if (confirmation) {
    store.deleteRecette(id);
  }
};
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const changeLanguage = (locale) => {
  proxy.$i18n.locale = locale;
};
</script>

<style scoped>
@media (max-width: 576px) {
  .btn i {
    font-size: 16px !important;
  }
}


@media (max-width: 768px) {
  .table {
    font-size: 12px;
  }
  .table th, .table td {
    padding: 8px;
  }
}
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
