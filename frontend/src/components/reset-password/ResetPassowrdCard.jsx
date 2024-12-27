import Button from '@mui/material/Button';
import { Box, TextField, CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { boxStyle, cardContentStyle, cardStyle } from '../register/styles.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CustomAlert } from '../common/CustomAlert.jsx';
import { useRegisterUserMutation } from '../../redux/rtk/userDataApi.js';
import { formFields } from '../register/constants.js';
import '../register/RegisterCard.jsx';

function ResetPasswordCard() {
    const [email, setEmail] = useState('');

    const [error, setError] = useState(false);

    const [alert, setAlert] = useState({
        alertOpen: false,
        alertType: 'error',
        alertMessage: 'Email field required.',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value } = e.target;

        setEmail(value);

        if (value) {
            setError(false);
            setAlert((prevAlert) => ({
                ...prevAlert,
                alertOpen: false,
            }));
        } else {
            setError(true);
            setAlert((prevAlert) => ({
                ...prevAlert,
                alertOpen: true,
                alertType: 'error',
                alertMessage: 'Email field required.',
            }));
        }
    };

    const handleSubmit = async () => {
        if (!email) {
            setError(true);
            setAlert({
                alertOpen: true,
                alertType: 'error',
                alertMessage: 'Email field required.',
            });
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError(true);
            setAlert({
                alertOpen: true,
                alertType: 'error',
                alertMessage: 'Invalid email.',
            });
            return;
        }
        try {
            setAlert({
                alertOpen: true,
                alertType: 'success',
                alertMessage: 'Password reset link sent to your email!',
            });
        } catch (error) {
            setAlert({
                alertOpen: true,
                alertType: 'error',
                alertMessage: 'Something went wrong. Please try again later.',
            });
        }
    };

    const handleAlertClose = () => {
        setAlert({
            ...alert,
            alertOpen: false,
        });
    };

    return (
        <Box sx={boxStyle}>
            <CustomAlert
                type={alert.alertType}
                message={alert.alertMessage}
                open={alert.alertOpen}
                handleClose={handleAlertClose}
            />
            <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                    <TextField
                        label={'Email'}
                        variant="outlined"
                        type={'email'}
                        value={email}
                        onChange={handleChange}
                        error={error}
                    />
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                    {/*isLoading ? (
                        <CircularProgress size="30px" />
                    ) : (
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={handleSubmit}
                            className={'login-button'}>
                            Register
                        </Button>
                    )*/}
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={handleSubmit}
                        className={'login-button'}>
                        Continue
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default ResetPasswordCard;
