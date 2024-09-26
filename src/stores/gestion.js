import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useGestionStore = defineStore("gestion", {
  state: () => ({
    recettes: [],
    nextId: 2,
    categories: [],
    nextIdCate: 2,
  }),

  actions: {
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/recipes");
        this.recettes = resp.data;
      } catch (error) {
        this.recettes = [];
      }
    },
    async loadDataFromCategorieApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/categories");
        this.categories = resp.data;
      } catch (error) {
        this.categories = [];
      }
    },

    async addRecete(recette) {
      return await axios.post("http://localhost:3005/api/recipes", recette);
    },
    async addCategory(name) {
      return await axios.post("http://localhost:3005/api/categories",  {name} );

    },
    async deleteRecette(id) {
      try {
        await axios.delete(`http://localhost:3005/api/recipes/${id}`);
        await this.loadDataFromApi();
      } catch (error) {}
    },
    async deleteCategory(id) {
      try {
        await axios.delete(`http://localhost:3005/api/categories/${id}`);
        await this.loadDataFromCategorieApi();
      } catch (error) {}
    },
    async updateCategory(updatedCategory) {
      try {
        const index = this.categories.findIndex((p) => p.id === updatedCategory.id);
        if (index !== -1) {
          await axios.put(`http://localhost:3005/api/categories/${updatedCategory.id}`, updatedCategory);
          await this.loadDataFromCategorieApi();
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
      }
    }
  },
});
