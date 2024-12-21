import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import {
    useLazyGetParticipantsQuery,
    useRemoveParticipantMutation,
    useEditParticipantRoleMutation,
} from '../../../redux/rtk/participantsDataApi.js';
import './ParticipantList.css';

// eslint-disable-next-line react/prop-types
function ParticipantList({ tripId, onAlertTrigger }) {
    const currentUserEmail = useSelector((state) => state.userData.email);
    const [getParticipants, { data: ParticipantsData }] = useLazyGetParticipantsQuery();
    const [removeParticipant] = useRemoveParticipantMutation();
    const [editParticipantRole] = useEditParticipantRoleMutation();

    useEffect(() => {
        if (tripId) {
            getParticipants(tripId);
        }
    }, [tripId, getParticipants]);

    const noParticipants = ParticipantsData?.participants.length - 1 === 0;

    const removeParticipantHandler = async (trip_id, email) => {
        try {
            await removeParticipant({ trip_id, email }).unwrap();
            getParticipants(trip_id);
            onAlertTrigger('Removed participant', 'success');
        } catch (error) {
            console.error('Failed to remove participant:', error);
            onAlertTrigger('Failed to remove participant', 'error');
        }
    };

    const editRoleHandler = async (trip_id, email, new_role) => {
        try {
            await editParticipantRole({ trip_id, email, new_role }).unwrap();
            getParticipants(trip_id);
            onAlertTrigger('Updated participant role', 'success');
        } catch (error) {
            console.error('Failed to update participant role:', error);
            onAlertTrigger(`Failed to update participant role: ${error.message}`, 'error');
        }
    };

    return (
        <>
            <h4 style={{ fontWeight: '600' }}>Participants:</h4>
            {noParticipants && <p>No participants have been shared yet</p>}
            {ParticipantsData?.participants
                .filter((participant) => participant.email !== currentUserEmail)
                .sort((a, b) => a.first_name.localeCompare(b.first_name))
                .map((participant, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid black',
                            paddingBottom: '8px',
                            marginBottom: '8px',
                        }}>
                        <p className={'participant-list'}>
                            {`${participant.first_name} ${participant.last_name}`}
                        </p>
                        <FormControl sx={{ minWidth: 85 }} size="small" margin={'none'} variant={'outlined'}>
                            <InputLabel id="demo-select-small-label">Role</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                name={participant.role}
                                value={participant.role}
                                label="role"
                                onChange={(e) => editRoleHandler(tripId, participant.email, e.target.value)}>
                                <MenuItem value="view">View</MenuItem>
                                <MenuItem value="edit">Edit</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton
                            sx={{
                                color: 'black',
                                transition: 'color 0.3s ease, background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                                    color: 'red',
                                },
                            }}
                            onClick={() => removeParticipantHandler(tripId, participant.email)}>
                            <PersonRemoveOutlinedIcon />
                        </IconButton>
                    </div>
                ))}
        </>
    );
}

export default ParticipantList;
