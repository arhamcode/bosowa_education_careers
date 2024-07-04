<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-toolbar dense color="primary" dark @click="$router.push('/')">
        <v-img
          src="/careers/bosowa_no_text.png"
          max-width="35"
          class="mr-2"
          contain
          alt="App Logo"
        />
        <v-toolbar-title>Bosowa Job Vacancy</v-toolbar-title>
      </v-toolbar>
      <v-list nav dense>
        <v-list-item
          v-for="profileMenu in profileMenus"
          :key="profileMenu.title"
          link
          :to="profileMenu.to"
        >
          <v-list-item-icon>
            <v-icon color="grey">{{ profileMenu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ profileMenu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dense dark color="primary" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-items v-if="$auth.loggedIn">
        <v-btn text to="/">
          <v-icon class="mr-2">mdi-magnify</v-icon>
          Cari lowongan
        </v-btn>
        <v-btn text to="/vacancy/history" class="hidden-md-and-down">
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
      <v-container fluid>
        <transition name="slide-y-transition">
          <Nuxt />
        </transition>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Bosowa Job Vacancy',
      drawer: true,
      profileMenus: [
        {
          title: 'Informasi personal',
          icon: 'mdi-account-circle',
          to: '/profile/personal',
        },
        {
          title: 'Alamat',
          icon: 'mdi-map-marker',
          to: '/profile/address',
        },
        {
          title: 'Kontak darurat',
          icon: 'mdi-human-greeting-proximity',
          to: '/profile/emergencycontact',
        },
        {
          title: 'Keluarga & tanggungan',
          icon: 'mdi-human-male-female-child',
          to: '/profile/familydependant',
        },
        {
          title: 'Relasi',
          icon: 'mdi-relation-one-to-many',
          to: '/profile/relation',
        },
        {
          title: 'Keahlian & minat',
          icon: 'mdi-laser-pointer',
          to: '/profile/skillinterest',
        },
        {
          title: 'Pendidikan',
          icon: 'mdi-school',
          to: '/profile/education',
        },
        {
          title: 'Tes psikologi',
          icon: 'mdi-head-cog-outline',
          to: '/profile/psychology',
        },
        {
          title: 'Fisik & kesehatan',
          icon: 'mdi-medical-bag',
          to: '/profile/physicalmedical',
        },
        {
          title: 'Kursus',
          icon: 'mdi-book-open-page-variant-outline',
          to: '/profile/course',
        },
        {
          title: 'Sertifikasi',
          icon: 'mdi-certificate-outline',
          to: '/profile/certification',
        },
        {
          title: 'Pengalaman kerja',
          icon: 'mdi-account-hard-hat',
          to: '/profile/jobexperience',
        },
        {
          title: 'Pengalaman organisasi',
          icon: 'mdi-sitemap-outline',
          to: '/profile/organizationactivity',
        },
        {
          title: 'Dokumen personal',
          icon: 'mdi-text-box-multiple-outline',
          to: '/profile/document',
        },
      ],
    }
  },
}
</script>
