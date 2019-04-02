const goodSearch = Vue.component("search", {
    data() {
        return {
            searchLine: ""
        };
    },
    template: `
    <div class="search">
    <form @submit.prevent="$emit('search', searchLine)">
      <input type="text" class="search-goods" v-model="searchLine" />
      <button class="search-btn" type="submit">Искать</button>
    </form>
    </div>
  `
});

export default {
    goodSearch
}