<template>
  <v-card>
    <v-card-title>Tambah keahlian berbahasa</v-card-title>
    <v-divider />
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Bahasa"
            vid="language_id"
            rules="required"
          >
            <v-select
              v-model="languageSkill.language_id"
              :items="$store.getters['masterType/languageList']"
              :error-messages="errors"
              item-text="name"
              item-value="id"
              label="Bahasa"
              outlined
              dense
            />
          </validation-provider>
          <v-row>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="tingkat keahlian membaca untuk bahasa terkait"
                vid="reading"
                rules="required"
              >
                <v-select
                  v-model="languageSkill.reading"
                  :error-messages="errors"
                  :items="$store.getters['masterType/languageRatingLevel']"
                  item-text="name"
                  item-value="id"
                  outlined
                  dense
                >
                  <template #label>
                    Membaca <span class="red--text">*</span>
                  </template>
                </v-select>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="tingkat keahlian menulis untuk bahasa terkait"
                vid="writing"
                rules="required"
              >
                <v-select
                  v-model="languageSkill.writing"
                  :items="$store.getters['masterType/languageRatingLevel']"
                  :error-messages="errors"
                  item-text="name"
                  item-value="id"
                  outlined
                  dense
                >
                  <template #label>
                    Menulis <span class="red--text">*</span>
                  </template>
                </v-select>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="tingkat keahlian berbicara untuk bahasa terkait"
                vid="speaking"
                rules="required"
              >
                <v-select
                  v-model="languageSkill.speaking"
                  :items="$store.getters['masterType/languageRatingLevel']"
                  item-text="name"
                  :error-messages="errors"
                  item-value="id"
                  outlined
                  dense
                >
                  <template #label>
                    Berbicara <span class="red--text">*</span>
                  </template>
                </v-select>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="tingkat keahlian mendengarkan untuk bahasa terkait"
                vid="listening"
                rules="required"
              >
                <v-select
                  v-model="languageSkill.listening"
                  :items="$store.getters['masterType/languageRatingLevel']"
                  item-text="name"
                  :error-messages="errors"
                  item-value="id"
                  outlined
                  dense
                >
                  <template #label>
                    Mendengarkan <span class="red--text">*</span>
                  </template>
                </v-select>
              </validation-provider>
            </v-col>
          </v-row>
          <v-textarea
            v-model="languageSkill.remark"
            label="Deskripsi"
            outlined
            rows="2"
            dense
          ></v-textarea>
          <v-btn :loading="loading" color="primary" type="submit">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
          <v-btn color="success" dark @click="$router.back()">Kembali</v-btn>
        </form>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script>
import { required } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'Mohon isi {_field_}.',
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'profile_layout',
  data() {
    return {
      loading: false,
      languageSkill: {
        language_id: 2,
        reading: null,
        writing: null,
        speaking: null,
        listening: null,
        remark: '',
      },
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchLanguageList')
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          await this.$axios.post('/skillinterest/language', this.languageSkill)
          this.$router.back()
        } catch (error) {
          alert(error)
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>
