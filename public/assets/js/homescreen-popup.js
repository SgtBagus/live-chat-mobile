/*==========================
    Add To Home Screen Popup js
==========================*/
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Prevent automatic prompt
    deferredPrompt = e;
    showInstallButton();
});

const installApp = document.getElementById('installApp');
installApp.addEventListener('click', async () => {
    if (deferredPrompt) {
        try {
            await deferredPrompt.prompt(); // Show installation prompt
            const {
                outcome
            } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the installation prompt.');
            } else {
                console.log('User dismissed the installation prompt.');
            }
            deferredPrompt = null; // Reset deferredPrompt
            hideInstallButton();
        } catch (error) {
            console.error('Failed to prompt the installation:', error);
        }
    }
});

function showInstallButton() {
    installApp.style.display = 'block';
}

function hideInstallButton() {
    installApp.style.display = 'none';
}