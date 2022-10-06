const butInstall = document.getElementById('buttonInstall');
let prompt;
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    prompt = e;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    prompt.prompt();
    prompt.userChoice.then(choice =>{
        if(choice.outcome == 'accepted'){
            console.log("User accepted install")
        }
        prompt = null;
    })
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log("App Installed");
});
