<template>
  <v-container v-if="$auth.loggedIn" fluid>
    <AlertConfirmEmail />
    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          dense
          filled
          rounded
          class="mt-3"
          placeholder="Pencarian"
          prepend-inner-icon="mdi-magnify"
          @keyup.enter="searchBar"
        ></v-text-field>
      </v-col>
    </v-row>
    <loading-progress v-if="$fetchState.pending" />
    <v-row v-else dense>
      <v-col
        v-for="vacancy in vacancies"
        :key="vacancy.request_code"
        cols="12"
        md="4"
      >
        <v-card>
          <nuxt-link
            class="text-decoration-none black--text"
            :to="`/vacancy?id=${vacancy.request_code}`"
          >
            <v-card-title style="cursor: pointer">{{
              vacancy.position_name
            }}</v-card-title>
          </nuxt-link>

          <v-card-subtitle>{{ vacancy.company_name }}</v-card-subtitle>
          <v-card-text>
            <span class="text-caption">
              {{ $dayjs(vacancy.required_date).format('dddd, D MMMM YYYY') }}
            </span>
          </v-card-text>
          <v-container>
            <v-btn color="primary" :to="`/vacancy?id=${vacancy.request_code}`">
              <v-icon>mdi-dots-vertical</v-icon>
              Detail
            </v-btn>
            <ShareButton :reqcode="vacancy.request_code" />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-pagination
          v-model="page"
          :length="totalPage"
          :total-visible="7"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      page: 1,
      totalPage: 0,
      vacancies: [],
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.get(`/vacancy?pageNumber=${this.page}&search=${this.search}&request_code=`)
      this.vacancies = response.data.data
      this.totalPage = response.data.totalPage
    } catch (error) {
      this.$nuxt.error({ statusCode: 400, message: 'Gagal memuat halaman.' })
    }
  },
  head: {
    title: 'Cari lowongan',
  },
  watch: {
    page(newValue) {
      this.$fetch()
    }
  },
  methods: {
    async searchBar() {
      this.page = 1
      await this.$fetch()
    },
  },
}
</script>
