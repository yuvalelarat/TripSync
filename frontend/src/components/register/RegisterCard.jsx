import Button from '@mui/material/Button';
import { Box, TextField, CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CustomAlert } from '../common/CustomAlert.jsx';
import { useRegisterUserMutation } from '../../redux/rtk/userDataApi.js';
import { formFields } from './constants.js';
import './RegisterCard.css';

function RegisterCard() {
    const [fields, setFields] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    });

    const [alert, setAlert] = useState({
        alertOpen: false,
        alertType: 'error',
        alertMessage: 'All fields are required.',
    });

    const navigate = useNavigate();
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const handleChange = (field) => (e) => {
        setFields((prevFields) => ({
            ...prevFields,
            [field]: e.target.value,
        }));

        if (errors[field] && e.target.value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: false,
            }));
        }
    };

    const validateField = (fieldName, value) => {
        const field = formFields.find((field) => field.name === fieldName);
        return field?.validate(value);
    };

    const handleSubmit = async () => {
        let isValid = true;
        const newErrors = {};

        Object.keys(fields).forEach((field) => {
            const hasError = validateField(field, fields[field]);
            if (hasError) {
                isValid = false;
                newErrors[field] = true;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            try {
                const response = await registerUser({
                    first_name: fields.firstName,
                    last_name: fields.lastName,
                    email: fields.email,
                    password: fields.password,
                }).unwrap();
                setAlert({
                    alertOpen: true,
                    alertType: 'success',
                    alertMessage: 'Registration successful, please confirm your email.',
                });
                setFields({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                });
            } catch (err) {
                setAlert({
                    alertOpen: true,
                    alertType: 'error',
                    alertMessage: err.message || 'Registration failed. Please try again.',
                });
            }
        } else {
            setAlert({
                ...alert,
                alertOpen: true,
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
                    {formFields.map((field) => (
                        <TextField
                            key={field.name}
                            label={field.label}
                            variant="outlined"
                            type={field.type}
                            value={fields[field.name]}
                            onChange={handleChange(field.name)}
                            error={errors[field.name]}
                            helperText={errors[field.name] ? field.helperText : ''}
                        />
                    ))}
                </CardContent>
                <CardActions sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    {isLoading ? (
                        <CircularProgress size="30px" />
                    ) : (
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={handleSubmit}
                            className={'login-button'}>
                            Register
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Box>
    );
}

export default RegisterCard;
