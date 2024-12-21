import Button from '@mui/material/Button';
import DeleteDialog from '../../common/DeleteDialog.jsx';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
// eslint-disable-next-line react/prop-types
function RemoveSharedTrip({ handleDelete, tripId, email }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const confirmDelete = () => {
        handleDelete(tripId, email);
        handleClose();
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    color: 'black',
                    transition: 'color 0.3s ease, background-color 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        color: 'red',
                    },
                }}>
                <RemoveOutlinedIcon />
            </IconButton>
            <DeleteDialog
                open={open}
                close={handleClose}
                handleDelete={confirmDelete}
                dialogTitle={'Remove trip'}
                dialogContentText={
                    'Are you sure you want to remove yourself from this trip? This action is irreversible and will remove you from the trip permanently.'
                }
                remove={true}
            />
        </>
    );
}

export default RemoveSharedTrip;
