import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { useAddParticipantMutation } from '../../../redux/rtk/participantsDataApi.js';
import './ParticipantManagement.css';

// eslint-disable-next-line react/prop-types
function ParticipantManagement({ tripId, onAlertTrigger, refetchParticipants }) {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('view');
    const [addParticipant] = useAddParticipantMutation();

    const handleChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const addParticipantHandler = async () => {
        if (!email) {
            onAlertTrigger('Please enter email to share', 'error');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            onAlertTrigger('Invalid email', 'error');
            return;
        }
        try {
            await addParticipant({ trip_id: tripId, email, role }).unwrap();
            onAlertTrigger('Added participant', 'success');
            setEmail('');
            refetchParticipants();
        } catch (error) {
            console.error('Failed to add participant:', error.data.error);
            onAlertTrigger(error.data.error, 'error');
        }
    };

    return (
        <>
            <h4 style={{ fontWeight: '600' }}>Add participants to the trip by email:</h4>
            <div className={'share-div'}>
                <TextField
                    style={{ width: '100%', minWidth: 150 }}
                    label={'email to share'}
                    value={email}
                    onChange={handleChange}
                    variant="outlined"
                    type={'email'}
                    margin={'none'}
                />
                <FormControl sx={{ minWidth: 150 }} size="medium" margin={'none'} variant={'outlined'}>
                    <InputLabel id="demo-select-small-label">Role</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        name="role"
                        value={role}
                        label="role"
                        onChange={handleRoleChange}>
                        <MenuItem value="view">View</MenuItem>
                        <MenuItem value="edit">Edit</MenuItem>
                    </Select>
                </FormControl>
                <IconButton onClick={addParticipantHandler} sx={{ color: 'black' }}>
                    <PersonAddAlt1OutlinedIcon />
                </IconButton>
            </div>
        </>
    );
}

export default ParticipantManagement;
