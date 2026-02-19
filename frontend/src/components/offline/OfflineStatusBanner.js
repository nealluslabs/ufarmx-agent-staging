import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Chip, Stack } from '@mui/material';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import SyncIcon from '@mui/icons-material/Sync';
import { getOutboxCount } from '../../offline/outboxDb';
import { syncOutboxNow } from '../../offline/outboxSync';
import { useLocation } from 'react-router-dom';

export default function OfflineStatusBanner() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [pendingCount, setPendingCount] = useState(0);

  const refreshCount = useCallback(async () => {
    try {
      const count = await getOutboxCount();
      setPendingCount(count);
    } catch (error) {
      // IndexedDB may be unavailable in some private contexts.
      setPendingCount(0);
    }
  }, []);

  useEffect(() => {
    refreshCount();

    const handleOnline = async () => {
      setIsOnline(true);
      await syncOutboxNow();
      await refreshCount();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const timer = window.setInterval(refreshCount, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.clearInterval(timer);
    };
  }, [refreshCount]);

  const banner = useMemo(() => {
    if (!isOnline) {
      return (
        <Alert severity="warning" icon={<CloudOffIcon fontSize="inherit" />}>
          You are offline. Form submissions are saved locally and will sync when you are back online.
        </Alert>
      );
    }

    if (pendingCount > 0) {
      return (
        <Alert severity="info" icon={<SyncIcon fontSize="inherit" />}>
          {pendingCount} pending offline submission(s) waiting to sync.
        </Alert>
      );
    }

    return null;
  }, [isOnline, pendingCount]);

  const { pathname } = useLocation();
  const isDashboardRoute = pathname.startsWith('/dashboard');
  return (
    <Stack spacing={1} sx={{ px: 2, pt: 1 }}>
      {banner}
      {isOnline && pendingCount === 0 ? (
        <Chip
          size="small"
          icon={<CloudDoneIcon />}
          label="Online"
          sx={{
            width: 'fit-content',
            bgcolor: '#E8F5E9',
            color: '#1B5E20',
            '& .MuiChip-icon': { color: '#2E7D32' },
          }}
        />
      ) : null}
      {!isOnline ? (
        <Chip
          size="small"
          icon={<CloudOffIcon />}
          label="Offline"
          sx={{
            width: 'fit-content',
            position: isDashboardRoute? 'fixed': 'none',
            bottom: {xs:0, lg:26},
            left: { xs: 185, lg: isDashboardRoute ? 870 : 16 },
            right: {xs: 15, lg:16,},
            zIndex: 1301,
          }}
        />
      ) : null}
    </Stack>
  );
}
