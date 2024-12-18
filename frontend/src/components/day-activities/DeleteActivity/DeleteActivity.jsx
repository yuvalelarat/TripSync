import DeleteDialog from '../../common/DeleteDialog.jsx';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

// eslint-disable-next-line react/prop-types
function DeleteDay({ handleDelete }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                <DeleteForeverTwoToneIcon fontSize={'large'} />
            </IconButton>
            <DeleteDialog
                open={open}
                close={handleClose}
                handleDelete={handleDelete}
                dialogTitle={'Delete activity'}
                dialogContentText={
                    'Are you sure you want to delete this activity? This action will also delete the activity and cannot be undone.'
                }
            />
        </>
    );
}

export default DeleteDay;
