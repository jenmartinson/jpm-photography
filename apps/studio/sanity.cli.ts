import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '651sxvb1',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    appId: 'lqnvyr054q1jt1g2s5on3moi',
    autoUpdates: true,
  },

})
