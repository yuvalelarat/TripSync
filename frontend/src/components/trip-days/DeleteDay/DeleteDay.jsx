import DeleteDialog from '../../common/DeleteDialog.jsx';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

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
                    color: 'black',
                    transition: 'color 0.3s ease, background-color 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        color: 'red',
                    },
                }}>
                <DeleteOutlineOutlinedIcon fontSize={'medium'} />
            </IconButton>
            <DeleteDialog
                open={open}
                close={handleClose}
                handleDelete={handleDelete}
                dialogTitle={'Delete day'}
                dialogContentText={
                    'Are you sure you want to delete this day? This action will also delete all activities associated with this day and cannot be undone.'
                }
            />
        </>
    );
}

export default DeleteDay;
