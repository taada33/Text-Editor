const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
//code help from LA
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

//code help from LA
butInstall.addEventListener('click', () => {
    const promptEvent = window.deferredPrompt;
  
    if (!promptEvent) {
      return;
    }
  
    promptEvent.prompt();
  
    window.deferredPrompt = null;
  
 
    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed!';
});    

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
});
