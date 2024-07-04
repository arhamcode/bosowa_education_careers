<template>
  <v-text-field
    v-model="modelValue"
    dense
    outlined
    :prepend-inner-icon="
      socialSites.find((element) => element.name === socialSite).icon
    "
    :label="socialSites.find((element) => element.name === socialSite).label"
  >
    <template #append>
      <v-btn small icon tabindex="-1" @click="openSocialLink">
        <v-icon>mdi-link</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default() {
        return ''
      },
    },
    socialSite: {
      type: String,
      default() {
        return 'linkedin'
      },
    },
  },
  data() {
    return {
      socialSites: [
        {
          label: 'LinkedIn',
          name: 'linkedin',
          url: 'https://linkedin.com/',
          icon: 'mdi-linkedin',
        },
        {
          label: 'Facebook',
          name: 'facebook',
          url: 'https://facebook.com/',
          icon: 'mdi-facebook',
        },
        {
          label: 'Instagram',
          name: 'instagram',
          url: 'https://instagram.com/',
          icon: 'mdi-instagram',
        },
        {
          label: 'Twitter',
          name: 'twitter',
          url: 'https://twitter.com/',
          icon: 'mdi-twitter',
        },
      ],
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
  methods: {
    openSocialLink() {
      const urlEntry = this.socialSites.find(
        (element) => element.name === this.socialSite
      ).url
      window.open(urlEntry + this.value, '_blank').focus()
    },
  },
}
</script>

<style>
</style>