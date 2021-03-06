function authStore(state, emitter) {
  // state.authenticated = false;
  // set the initial state

  state.currentUser ="Not Logged In"

  // get authenticated
  chrome.storage.local.get(['authenticated'], (status) => {
    console.log("from authStore", status.authenticated)
    state.authenticated = status.authenticated;

    if(state.authenticated == true){
      emitter.emit("pushState", "selectImage")
    } else{
      emitter.emit("pushState", "*")
    }

  })

  // get user name
  chrome.storage.local.get(['ghUsername'], (user) => {
    state.currentUser = user.ghUsername;
  })



  emitter.on('DOMContentLoaded', function() {

    emitter.on('auth:isAuthenticated', function() {
      // check the chrome storage to find if user is auth'd
      chrome.storage.local.get(['authenticated'], (status) => {
        console.log("from authStore", status.authenticated)
        state.authenticated = status.authenticated;
        emitter.emit(state.events.RENDER)
      })
    })

  });
}

module.exports = authStore;
