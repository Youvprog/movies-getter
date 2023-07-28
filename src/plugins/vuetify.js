import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { VSkeletonLoader } from 'vuetify/labs/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  components: {
    VSkeletonLoader,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
