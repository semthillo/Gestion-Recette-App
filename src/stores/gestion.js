import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useGestionStore = defineStore("gestion", {
  state: () => ({
    recettes: [],
    nextId: 2,
    categories: [],
    nextIdCate: 2,
    searchQuery: "",
  }),

  actions: {
    getFilteredRecettes() {
      return this.recettes.filter(recette =>
        recette.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category.name;
      // return category ? category.name : 'Aucune catégorie';
    },

    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/recipes");
        const recettes = resp.data;

        this.recettes = recettes.map(recette => ({
          id: recette.id,
          title: recette.title,
          ingredients: recette.ingredients,
          type: recette.type,
          category: this.getCategoryName(recette.category_id),
        }));
      } catch (error) {
        console.error('Erreur lors du chargement des recettes:', error);
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
      } catch (error) {
        throw error
      }
    },
    async deleteCategory(id) {
      try {
        await axios.delete(`http://localhost:3005/api/categories/${id}`);
        await this.loadDataFromCategorieApi();
      } catch (error) {
        alert("Cannot delete this category because it's used in recipes!");
      }
    },
    async updateCategory(updatedCategory) {
      try {
        const index = this.categories.findIndex((p) => p.id === updatedCategory.id);
        if (index !== -1) {
          await axios.put(`http://localhost:3005/api/categories/${updatedCategory.id}`, updatedCategory);
          await this.loadDataFromCategorieApi();
        }
      } catch (error) {
        throw error
      }
    },
    async updateRecette(updatedRecette) {
      try {
        const index = this.recettes.findIndex((p) => p.id === updatedRecette.id);

        if (index !== -1) {
          await axios.put(`http://localhost:3005/api/recipes/${updatedRecette.id}`, updatedRecette);
          await this.loadDataFromApi();
        }
        
      } catch (error) {
        throw error
      }
    },
  },
  
  
});
