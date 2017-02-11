const offlinePluginRuntime = require('offline-plugin/runtime')

const domRoot = document
.getElementById('app')

const domStatus = document
.getElementById('status')


if (navigator.onLine) {

  domStatus.innerHTML = 'ONLINE'

  fetch('http://date.jsontest.com/')
  .then(r => r.json())
  .then(data => {

    domRoot.innerHTML = localStorage['cache']
    localStorage['cache'] = `Time: ${data.time}`

  })

}
else {

  domStatus.innerHTML = 'OFFLINE'

  domRoot.innerHTML = localStorage['cache'] || 'No Time Cached'

}

window.enableOffline = function enableOffline() {
  offlinePluginRuntime.install()
}

window.disableOffline = function disableOffline() {

  const {serviceWorker} = navigator

  if (!serviceWorker) return

  serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) registration.unregister()
  })

  caches.keys().then(keys =>
    Promise.all(keys.map(key => caches.delete(key)))
  )

}