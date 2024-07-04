<template>
  <v-card>
    <v-card-title>Ubah keahlian</v-card-title>
    <v-divider />
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <v-text-field
            dense
            outlined
            label="Keahlian"
            readonly
            :value="skill.items.skill_name"
          ></v-text-field>
          <validation-provider
            v-slot="{ errors }"
            name="Rating"
            vid="rating_code"
            rules="required"
          >
            <v-select
              v-model="skill.items.rating_code"
              :error-messages="errors"
              label="Rating"
              item-text="name"
              item-value="id"
              dense
              outlined
              :items="$store.getters['masterType/skillLevel']"
            >
              <template #label>
                Rating <span class="red--text">*</span>
              </template>
            </v-select>
          </validation-provider>

          <v-btn :loading="loading" color="primary" type="submit">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
          <v-btn color="red" dark @click="deleteSkill">
            <v-icon class="mr-2">mdi-delete</v-icon>
            Hapus
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
      skill: {},
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchSkills')
    await this.fetchSkill()
  },
  methods: {
    async fetchSkill() {
      const response = await this.$axios.get(
        '/skillinterest/skill?skill_code=' + this.$route.params.edit
      )
      this.skill = response.data
    },
    async deleteSkill() {
      if (confirm('Hapus ' + this.skill.items.skill_name) === true) {
        try {
          await this.$axios.delete(
            '/skillinterest/skill?skill_code=' + this.skill.items.skill_code
          )
          this.$router.back()
        } catch (error) {
          alert(error)
        }
      }
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          await this.$axios.put('/skillinterest/skill', this.skill.items)
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
