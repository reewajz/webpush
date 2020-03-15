
if (window.requestIdleCallback) {
    requestIdleCallback(function () {
        fingerprint()
    })
  } else {
    setTimeout(function () {
        fingerprint()
    }, 500)
  }

  var client;
  var fingerprint;
  var details;
  function fingerprint() {
    client = new ClientJS();
    fingerprint = client.getFingerprint();
    details = {
      browser: client.getBrowser(),
      os: client.getOS(),
      osVersion: client.getOSVersion(),
      device: client.getDevice(),
      deviceType: client.getDeviceType(),
      deviceVendor: client.getDeviceVendor(),
      cpu: client.getCPU()
    };
    /*
    var options = {
      preprocessor: null,
      audio: {
        timeout: 1000,
        // On iOS 11, audio context can only be used in response to user interaction.
        // We require users to explicitly enable audio fingerprinting on iOS 11.
        // See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
        excludeIOS11: true
      },
      fonts: {
        swfContainerId: 'fingerprintjs2',
        swfPath: 'flash/compiled/FontList.swf',
        userDefinedFonts: [],
        extendedJsFonts: false
      },
      screen: {
        // To ensure consistent fingerprints when users rotate their mobile devices
        detectScreenOrientation: true
      },
      plugins: {
        sortPluginsFor: [/palemoon/i],
        excludeIE: false
      },
      extraComponents: [],
      excludes: {
        // Unreliable on Windows, see https://github.com/Valve/fingerprintjs2/issues/375
        'enumerateDevices': true,
        // devicePixelRatio depends on browser zoom, and it's impossible to detect browser zoom
        'pixelRatio': true,
        // DNT depends on incognito mode for some browsers (Chrome) and it's impossible to detect incognito mode
        'doNotTrack': true,
        // uses js fonts already
        'fontsFlash': true
      },
      NOT_AVAILABLE: 'not available',
      ERROR: 'error',
      EXCLUDED: 'excluded'
    }
    Fingerprint2.get(options,function (components) {
      var values = components.map(function (component) { return component.value })
      console.log(values,'all values')
      var murmur = Fingerprint2.x64hash128(values.join(''), 31)
      console.log(murmur,"hash") 
    })  
    */
  }


firebase.initializeApp({
  messagingSenderId: "244208985229"
});
const messaging = firebase.messaging();
function initFirebaseMessagingRegistration() {
  messaging
    .requestPermission()
    .then(function() {
      messageElement.innerHTML = "Got notification permission";
      console.log("Got notification permission");
      return messaging.getToken();
    })
    .then(function(token) {
      // print the token on the HTML page
      tokenElement.innerHTML = "Token is " + token;
      sendSubscriptionToServer(token,fingerprint,details)

    })
    .catch(function(err) {
      errorElement.innerHTML = "Error: " + err;
      console.log("Didn't get notification permission", err);
    });
}
messaging.onMessage(function(payload) {
  console.log("Message received. ", JSON.stringify(payload));
  notificationElement.innerHTML =
    notificationElement.innerHTML + " " + payload.data.notification;
});
messaging.onTokenRefresh(function() {
  messaging
    .getToken()
    .then(function(refreshedToken) {
      console.log("Token refreshed.");
      tokenElement.innerHTML = "Token is " + refreshedToken;
      sendSubscriptionToServer(refreshedToken,fingerprint,details)
    })
    .catch(function(err) {
      errorElement.innerHTML = "Error: " + err;
      console.log("Unable to retrieve refreshed token ", err);
    });
});

function sendSubscriptionToServer(token , fingerprint , details) {
  console.log(token,fingerprint,details)
  let formData = new FormData();
  formData.append('token' , token);
  formData.append('fingerprint' , fingerprint);
  formData.append('details' , JSON.stringify(details));
  $.ajax({
    url: '/subscription',
    type: "POST",
    data: {'token':token,'fingerprint':fingerprint,'details':JSON.stringify(details)},
    // dataType: 'json',
    // contentType: 'application/json',
    // processData: false,
    cache: false
  });
}