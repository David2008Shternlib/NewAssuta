import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ogu6ewxe',
    dataset: 'production'
  },
  deployment: {
    // Id уже выложенного редактора. Без него команда deploy каждый раз
    // спрашивает, какое приложение обновлять, и можно по ошибке создать второе.
    appId: 'sggaafuplihu0kvffoiq9wlq',

    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
