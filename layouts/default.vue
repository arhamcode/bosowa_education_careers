<template>
  <v-app dark>
    <v-app-bar dense dark color="primary" fixed app>
      <v-toolbar-title style="cursor: default" @click="refreshApp">
        <img
          style="vertical-align: middle"
          src="/careers/bosowa_no_text.png"
          width="35"
          class="mr-2"
          alt="App Logo"
        />
        {{ title }}
      </v-toolbar-title>
      <v-toolbar-items v-if="$auth.loggedIn" class="ml-2 hidden-md-and-down">
        <v-btn text to="/">
          <v-icon class="mr-2">mdi-magnify</v-icon>
          Cari lowongan
        </v-btn>
        <v-btn text to="/vacancy/history">
          <v-icon class="mr-2">mdi-clipboard-text-clock-outline</v-icon>
          Riwayat lamaran
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items v-if="$auth.loggedIn">
        <AccountMenu />
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <transition name="slide-y-transition">
        <Nuxt />
      </transition>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Bosowa Job Vacancy',
    }
  },
  methods: {
    refreshApp() {
      window.location = '/careers'
    },
  },
}
</script>
