<template>
<div>
  <b-row>
    <NavBar></NavBar>
  </b-row>
  <b-row class="align-left" >
  <div  v-for="item in articles" v-bind:key="item.link">
    <h3 ><b-link :href=item.link>{{ item.title }}</b-link></h3>
  </div>
  </b-row>
   </div>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from '../components/Navbar';
import { getAPI } from '../api/axios-base';

export default {
  components: {
    NavBar,
  },
  computed: mapState(['APIData']), // get APIData from store.state.
  data() {
    return {
      articles: [],
    };
  },
  created() {
    getAPI.get('api/articles', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
      .then((response) => {
        const data = response.data;
        this.articles = data;
      });
  },
};
</script>
