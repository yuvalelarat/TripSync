import DeleteDialog from '../../common/DeleteDialog.jsx';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// eslint-disable-next-line react/prop-types
function DeleteDay({ handleDelete, tripId }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const confirmDelete = () => {
        handleDelete(tripId);
        handleClose();
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    color: 'var(--color-light-black)',
                    transition: 'color 0.3s ease, background-color 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        color: 'red',
                    },
                }}>
                <DeleteOutlineOutlinedIcon />
            </IconButton>
            <DeleteDialog
                open={open}
                close={handleClose}
                handleDelete={confirmDelete}
                dialogTitle={'Delete trip'}
                dialogContentText={
                    'Are you sure you want to delete this trip? This action will also delete all the data associated with this trip and cannot be undone.'
                }
            />
        </>
    );
}

export default DeleteDay;
