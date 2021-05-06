<template>
<div>
  <NavBar></NavBar>
    <b-table
      striped
      hover
      :items="topics"
      :fields="fields"
      >
      <template v-slot:cell(checkbox)="data">
          <b-row align-h="start">
            <b-col>
              <b-form-checkbox
                v-bind:checked="data.item.checked"
                @change="changeCheckbox($event, data.item)"
                />
            </b-col>
          </b-row>
        </template>
    </b-table>
    <b-button @click="saveSettings">
      Save settings
      </b-button>
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
      topics: [],
      fields: [
        {
          key: 'name',
          label: 'Тема',
        },
        {
          key: 'checkbox',
          label: 'Показывать',
        },
      ],
    };
  },
  methods: {
    saveSettings() {
      getAPI.post('api/settings', this.topics, { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } });
    },
    changeCheckbox(event, data) {
      // eslint-disable-next-line
      data.checked = event;
    },
  },
  created() {
    getAPI.get('api/settings', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
      .then((response) => {
        const data = response.data;
        this.topics = data;
      });
  },
};
</script>
