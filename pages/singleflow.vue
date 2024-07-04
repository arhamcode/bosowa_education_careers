<template>
  <v-container fluid>
    <loading-progress v-if="$fetchState.pending" />
    <div v-else>
      <v-card>
        <v-card-title>
          <!-- <v-btn
            v-if="$auth.loggedIn"
            class="mr-2"
            color="success"
            @click="$router.back()"
          >
            <v-icon>mdi-arrow-left-circle</v-icon>
          </v-btn> -->
          {{ vacancy.position_name }} [{{ vacancy.request_code }}]
        </v-card-title>
        <v-card-subtitle>
          {{ vacancy.company_name }} | Tanggal posting :
          {{ $dayjs(vacancy.required_date).format('dddd, D MMMM YYYY') }}
        </v-card-subtitle>
      </v-card>

      <v-row dense>
        <v-col>
          <v-card class="mt-2">
            <v-card-title>Spesifikasi lowongan</v-card-title>
            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon small color="success">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  Jenis kelamin
                  {{
                    $store.getters['masterType/genderSpec'][vacancy.gender_id]
                  }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="vacancy.married_id < 2">
                <v-list-item-icon>
                  <v-icon small color="success">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{
                  $store.getters['masterType/marriedSpec'][vacancy.married_id]
                }}</v-list-item-title>
              </v-list-item>

              <v-list-item v-if="vacancy.age || vacancy.ageto">
                <v-list-item-icon>
                  <v-icon small color="success">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  Umur
                  <span v-if="vacancy.age && vacancy.ageto">
                    {{ vacancy.age }} - {{ vacancy.ageto }} tahun.
                  </span>
                  <span v-else-if="vacancy.age && !vacancy.ageto">
                    minimal {{ vacancy.age }} tahun.
                  </span>
                  <span v-else-if="!vacancy.age && vacancy.ageto">
                    maksimal {{ vacancy.ageto }} tahun.
                  </span>
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="vacancy.gpa > 0">
                <v-list-item-icon>
                  <v-icon small color="success">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  IPK minimal {{ vacancy.gpa }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon small color="success">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ vacancy.worktype }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card v-if="vacancy.jobDesc" class="mt-2">
            <v-card-title>Deskripsi pekerjaan</v-card-title>
            <v-container>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-html="vacancy.jobDesc"></div>
            </v-container>
            <!--
            <template v-for="(jobS, index) in vacancy.jobSpec">
              <v-subheader :key="index">{{ index }}</v-subheader>
              <v-list :key="`${index}xxx`" dense>
                <v-list-item v-for="desc in jobS" :key="desc">
                  <v-list-item-icon>
                    <v-icon small color="success">mdi-circle</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ desc }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </template>
            -->
          </v-card>
        </v-col>
        <v-col>
          <v-card class="mt-2">
            <v-card-text>
              <v-btn
                color="primary"
                block
                :to="`/login?request_code=${$route.query.request_code}`"
              >
                <v-icon class="mr-2"> mdi-login-variant </v-icon>
                Login
              </v-btn>
              <p class="mt-4 text-center">atau</p>
              <v-btn
                color="success"
                block
                :to="`/register?request_code=${$route.query.request_code}`"
              >
                <v-icon class="mr-2">mdi-account-plus-outline</v-icon>
                Daftar
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- <v-card>
      <v-card-title>
        <v-btn
          v-if="$auth.loggedIn"
          class="mr-2"
          color="success"
          @click="$router.back()"
        >
          <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>
        {{ vacancy.position_name }} [{{ vacancy.request_code }}]
      </v-card-title>
      <v-card-subtitle>
        {{ vacancy.company_name }} | Tanggal posting :
        {{ $dayjs(vacancy.required_date).format('dddd, D MMMM YYYY') }}
      </v-card-subtitle>

      <v-container fluid>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Spesifikasi lowongan</v-card-title>
              <v-list dense>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon small color="success">mdi-circle</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    Jenis kelamin
                    {{
                      $store.getters['masterType/genderSpec'][vacancy.gender_id]
                    }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item v-if="vacancy.married_id < 2">
                  <v-list-item-icon>
                    <v-icon small color="success">mdi-circle</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{
                    $store.getters['masterType/marriedSpec'][vacancy.married_id]
                  }}</v-list-item-title>
                </v-list-item>

                <v-list-item v-if="vacancy.age || vacancy.ageto">
                  <v-list-item-icon>
                    <v-icon small color="success">mdi-circle</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    Umur
                    <span v-if="vacancy.age">minimal {{ vacancy.age }}</span>
                    <span v-if="vacancy.age && vacancy.ageto">atau</span>
                    <span v-if="vacancy.ageto">
                      maksimal {{ vacancy.ageto }}
                    </span>
                    tahun
                  </v-list-item-title>
                </v-list-item>
                <v-list-item v-if="vacancy.gpa > 0">
                  <v-list-item-icon>
                    <v-icon small color="success">mdi-circle</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    IPK minimal {{ vacancy.gpa }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon small color="success">mdi-circle</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ vacancy.worktype }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
            <v-card class="mt-6">
              <v-card-title>Spesifikasi pekerjaan</v-card-title>
              <template v-for="(jobS, index) in vacancy.jobSpec">
                <v-subheader :key="index">{{ index }}</v-subheader>
                <v-list :key="`${index}xxx`" dense>
                  <v-list-item v-for="desc in jobS" :key="desc">
                    <v-list-item-icon>
                      <v-icon small color="success">mdi-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ desc }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </template>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-text>
                <v-btn
                  color="primary"
                  block
                  :to="`/login?request_code=${$route.query.request_code}`"
                >
                  <v-icon class="mr-2"> mdi-login-variant </v-icon>
                  Login
                </v-btn>
                <p class="mt-4 text-center">atau</p>
                <v-btn
                  color="success"
                  block
                  :to="`/register?request_code=${$route.query.request_code}`"
                >
                  <v-icon class="mr-2">mdi-account-plus-outline</v-icon>
                  Daftar
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card> -->
  </v-container>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      vacancy: null,
    }
  },
  async fetch() {
    if (this.$auth.loggedIn) {
      this.$router.replace(`/vacancy?id=${this.$route.query.request_code}`)
    } else {
      try {
        const response = await this.$axios.get(
          `/singleflow?request_code=${this.$route.query.request_code}`
        )

        if (!Array.isArray(response.data)) {
          this.vacancy = response.data
        } else {
          this.$nuxt.error({
            statusCode: 404,
            message: 'Halaman tidak ditemukan (CODE:23).',
          })
        }
      } catch (error) {
        this.$nuxt.error({
          statusCode: 404,
          message: 'Halaman tidak ditemukan (CODE: 55).',
        })
      }
    }
  },
}
</script>
