<template>
  <div>
    <v-card>
      <v-card-title>
        <v-icon class="mr-2">mdi-laser-pointer</v-icon>
        Keahlian &amp; minat
      </v-card-title>
      <v-divider />
    </v-card>

    <v-card class="mt-5">
      <v-data-table :headers="languageTableHeader" :items="languageSkills">
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>Bahasa</v-toolbar-title>
            <v-spacer />
            <v-btn
              class="primary"
              to="/profile/skillinterest/form/language/add"
            >
              <v-icon class="mr-2">mdi-plus</v-icon>
              Tambah
            </v-btn>
          </v-toolbar>
        </template>
        <template #[`item.language_name`]="{ item }">
          <nuxt-link
            :to="`/profile/skillinterest/form/language/${item.applanguage_id}`"
            >{{ item.language_name }}</nuxt-link
          >
        </template>
        <template #[`item.reading`]="{ item }">
          {{
            $store.getters['masterType/languageRatingLevel'].find(
              (e) => e.id == item.reading
            ).name
          }}
        </template>
        <template #[`item.speaking`]="{ item }">
          {{
            $store.getters['masterType/languageRatingLevel'].find(
              (e) => e.id == item.speaking
            ).name
          }}
        </template>
        <template #[`item.writing`]="{ item }">
          {{
            $store.getters['masterType/languageRatingLevel'].find(
              (e) => e.id == item.writing
            ).name
          }}
        </template>
        <template #[`item.listening`]="{ item }">
          {{
            $store.getters['masterType/languageRatingLevel'].find(
              (e) => e.id == item.listening
            ).name
          }}
        </template>
      </v-data-table>
    </v-card>

    <v-card class="mt-5">
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6">
            <v-data-table :headers="skillTableHeader" :items="skills.items">
              <template #top>
                <v-toolbar flat>
                  <v-toolbar-title>Keahlian</v-toolbar-title>
                  <v-spacer />
                  <v-btn
                    class="primary"
                    to="/profile/skillinterest/form/skill/add"
                  >
                    <v-icon class="mr-2">mdi-plus</v-icon>
                    Tambah
                  </v-btn>
                </v-toolbar>
              </template>
              <template #[`item.skill_name`]="{ item }">
                <nuxt-link
                  :to="`/profile/skillinterest/form/skill/${item.skill_code}`"
                >
                  {{ item.skill_name }}
                </nuxt-link>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="skills.description"
              label="Deskripsi keahlian"
              dense
              outlined
            ></v-textarea>
            <v-btn color="primary" @click="updateSkillDescription">
              <v-icon>mdi-content-save</v-icon>
              Simpan
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="mt-5">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-data-table
              :headers="interestTableHeader"
              :items="interest.items"
            >
              <template #top>
                <v-toolbar flat>
                  <v-toolbar-title>Minat</v-toolbar-title>
                  <v-spacer />
                  <v-btn
                    class="primary"
                    to="/profile/skillinterest/form/interest/add"
                  >
                    <v-icon class="mr-2">mdi-plus</v-icon>
                    Tambah
                  </v-btn>
                </v-toolbar>
              </template>
              <template #[`item.interest_name`]="{ item }">
                <nuxt-link
                  :to="`/profile/skillinterest/form/interest/${item.interest_code}`"
                  >{{ item.interest_name }}</nuxt-link
                >
              </template>
            </v-data-table>
          </v-col>
          <v-col>
            <v-textarea
              v-model="interest.description"
              label="Deskripsi minat"
              dense
              outlined
            ></v-textarea>
            <v-btn color="primary" @click="updateInterestDescription">
              <v-icon>mdi-content-save</v-icon>
              Simpan
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="mt-5">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-data-table
              :headers="jobInterestTableHeader"
              :items="jobInterest.items"
            >
              <template #top>
                <v-toolbar flat>
                  <v-toolbar-title>Pekerjaan yang diminati</v-toolbar-title>
                  <v-spacer />
                  <v-btn
                    class="primary"
                    to="/profile/skillinterest/form/jobinterest/add"
                  >
                    <v-icon class="mr-2">mdi-plus</v-icon>
                    Tambah
                  </v-btn>
                </v-toolbar>
              </template>
              <template #[`item.jobinterest_name`]="{ item }">
                <nuxt-link
                  :to="`/profile/skillinterest/form/jobinterest/${item.jobinterest_code}`"
                  >{{ item.jobinterest_name }}</nuxt-link
                >
              </template>
            </v-data-table>
          </v-col>
          <v-col>
            <v-textarea
              v-model="jobInterest.description"
              label="Deskripsi keahlian"
              dense
              outlined
            ></v-textarea>
            <v-btn color="primary" @click="updateJobInterestDescription">
              <v-icon>mdi-content-save</v-icon>
              Simpan
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'profile_layout',
  data() {
    return {
      languageTableHeader: [
        {
          text: 'Bahasa',
          value: 'language_name',
        },
        {
          text: 'Baca',
          value: 'reading',
        },
        {
          text: 'Tulis',
          value: 'writing',
        },
        {
          text: 'Berbicara',
          value: 'speaking',
        },
        {
          text: 'Mendengar',
          value: 'listening',
        },
        {
          text: 'Deskripsi',
          value: 'remark',
        },
      ],
      skillTableHeader: [
        {
          text: 'Keahlian',
          value: 'skill_name',
        },
        {
          text: 'Rating',
          value: 'type_name',
        },
      ],
      interestTableHeader: [
        {
          text: 'Minat',
          value: 'interest_name',
        },
        {
          text: 'Rating',
          value: 'type_name',
        },
      ],
      jobInterestTableHeader: [
        {
          text: 'Pekerjaan yang diminati',
          value: 'jobinterest_name',
        },
        {
          text: 'Rating',
          value: 'type_name',
        },
      ],
      languageSkills: [],
      skills: {
        description: '',
        items: [],
      },
      interest: {
        description: '',
        items: [],
      },
      jobInterest: {
        description: '',
        items: [],
      },
    }
  },
  async fetch() {
    await this.getLanguageSkills()
    await this.getSkills()
    await this.getInterest()
    await this.getJobInterest()
  },
  head: {
    title: 'Keahlian & minat'
  },
  methods: {
    async getLanguageSkills() {
      const response = await this.$axios.get('/skillinterest/language')
      this.languageSkills = response.data
    },
    async getSkills() {
      const response = await this.$axios.get('/skillinterest/skill')
      this.skills = response.data
    },
    async getInterest() {
      const response = await this.$axios.get('/skillinterest/interest')
      this.interest = response.data
    },
    async getJobInterest() {
      const response = await this.$axios.get('/skillinterest/jobinterest')
      this.jobInterest = response.data
    },
    async updateSkillDescription() {
      await this.$axios.put('/skillinterest/skilldescription', {
        description: this.skills.description,
      })
    },
    async updateInterestDescription() {
      await this.$axios.put('/skillinterest/interestdescription', {
        description: this.interest.description,
      })
    },
    async updateJobInterestDescription() {
      await this.$axios.put('/skillinterest/jobinterestdescription', {
        description: this.jobInterest.description,
      })
    },
  },
}
</script>
