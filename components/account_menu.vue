<template>
  <v-menu v-model="menu" offset-y>
    <template #activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        <v-avatar v-if="$auth.user.image" size="25" class="mr-0 mr-md-2">
          <img
            :src="`https://hris.bosowa.co.id/rest_api_jova/file/avatar?filename=${$auth.user.image}`"
            alt="Account Avatar"
          />
        </v-avatar>
        <v-icon v-else class="mr-sm-0 mr-md-2">mdi-account-circle</v-icon>
        <span class="hidden-md-and-down">{{ $auth.user.fullName }} </span>
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar v-if="$auth.user.image">
            <img
              :src="`https://hris.bosowa.co.id/rest_api_jova/file/avatar?filename=${$auth.user.image}`"
              alt="Account Avatar"
            />
          </v-list-item-avatar>
          <v-list-item-icon v-else>
            <v-icon size="48">mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $auth.user.fullName }}</v-list-item-title>
            <v-list-item-subtitle>{{
              $auth.user.registerNumber
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item to="/vacancy/history" class="hidden-md-and-up">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-text-clock-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Riwayat lamaran</v-list-item-title>
        </v-list-item>

        <v-list-item to="/profile/personal">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Profil</v-list-item-title>
        </v-list-item>

        <v-list-item to="/changepassword">
          <v-list-item-icon>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Ubah kata sandi</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <LogoutDialog />
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
    }
  },
}
</script>
