<template>
  <v-dialog v-model="dialog" max-width="300">
    <v-card>
      <v-card-title class="text-h5" :class="type === 'warning' ? 'red--text' : 'green--text'" v-text="title" />
      <v-card-text v-text="message" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="closeButton"
          color="red darken-1"
          text
          @click="cancel"
          v-text="closeTextButton"
        />
        <v-btn
          v-if="agreeButton"
          color="green darken-1"
          text
          @click="agree"
          v-text="agreeTextButton"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      title: '',
      type: 'success',
      message: '',
      closeTextButton: 'Tutup',
      agreeTextButton: 'Ok',
      closeButton: true,
      agreeButton: true,
      resolve: null,
      reject: null,
    }
  },
  methods: {
    open(options) {
      /**
       * Available options :
       * title
       * message
       * type success/warning
       * closeTextButton
       * agreeTextButton
       * closeButton true/false
       * agreeButton true/false
       */
      this.dialog = true
      if (options) {
        this.title = options.title
        this.message = options.message
        if (options.closeTextButton) {
          this.closeTextButton = options.closeTextButton
        }
        if (options.agreeTextButton) {
          this.agreeTextButton = options.agreeTextButton
        }
        if (Object.prototype.hasOwnProperty.call(options, 'closeButton')) {
          this.closeButton = options.closeButton
        }
        if (Object.prototype.hasOwnProperty.call(options, 'agreeButton')) {
          this.agreeButton = options.agreeButton
        }
        if (Object.prototype.hasOwnProperty.call(options, 'type')) {
          this.type = options.type
        }
      }
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(true)
      this.dialog = false
    },
    cancel() {
      this.resolve(false)
      this.dialog = false
    },
  },
}
</script>
