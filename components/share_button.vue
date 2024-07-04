<template>
  <v-btn
    :class="`inputTextCopy${reqcode}`"
    :data-clipboard-text="urlLink"
    color="success"
  >
    <v-icon class="mr-2">mdi-share</v-icon>
    Bagikan
    <arham-dialog ref="dialog"></arham-dialog>
  </v-btn>
</template>

<script>
import ClipboardJS from 'clipboard'

export default {
  props: {
    reqcode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      clipboard: null,
    }
  },
  computed: {
    urlLink() {
      return (
        'https://hris.bosowa.co.id/careers/singleflow?request_code=' +
        this.reqcode
      )
    },
  },
  mounted() {
    if (!this.clipboard) {
      this.clipboard = new ClipboardJS(`.inputTextCopy${this.reqcode}`)
      this.clipboard.on('success', (e) => {
        this.$refs.dialog.open({
          title: 'Sukses',
          message: 'Link berhasil disalin ke clipboard.',
          closeButton: false,
        })
      })
      this.clipboard.on('error', (e) => {
        alert(e)
      })
    }
  },
  async destroyed() {
    await this.clipboard.destroy()
  },
}
</script>
