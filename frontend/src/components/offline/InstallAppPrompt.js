import { useEffect, useState } from 'react';
import { Alert, Button } from '@mui/material';

export default function InstallAppPrompt({ sx = {} }) {
  const [installEvent, setInstallEvent] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
    }

    const syncInstallEvent = () => {
      if (window.__ufarmxInstallPromptEvent) {
        setInstallEvent(window.__ufarmxInstallPromptEvent);
      }
    };
    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallEvent(null);
      window.__ufarmxInstallPromptEvent = null;
    };

    syncInstallEvent();
    window.addEventListener('ufarmx-install-available', syncInstallEvent);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('ufarmx-install-available', syncInstallEvent);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  if (isInstalled || !installEvent) {
    return null;
  }

  const onInstallClick = async () => {
    if (!installEvent) {
      return;
    }

    installEvent.prompt();
    await installEvent.userChoice;
    window.__ufarmxInstallPromptEvent = null;
    setInstallEvent(null);
  };

  return (
    <Alert
      severity="success"
      sx={{
        width: '100%',
        mt: 1,
        alignItems: 'center',
        ...sx,
      }}
      action={
        <Button
          variant="contained"
          color="success"
          size="small"
          disableElevation
          onClick={onInstallClick}
          sx={{ minWidth: 88, fontWeight: 600 }}
        >
          Install
        </Button>
      }
    >
      Install UfarmX for faster access and offline use.
    </Alert>
  );
}
