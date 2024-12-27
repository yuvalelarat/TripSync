import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

// eslint-disable-next-line react/prop-types
export function CustomAlert({ type, message, open, handleClose }) {
    const backgroundColor = type === 'error' ? 'rgba(255, 0, 0, 0.80)' : 'rgba(0, 255, 0, 0.80)';
    const color = type === 'error' ? 'white' : 'black';

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{
                position: 'absolute',
                top: '80px',
            }}>
            <MuiAlert
                onClose={handleClose}
                severity={type}
                sx={{ width: '100%', backgroundColor: backgroundColor, color: color }}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
}
