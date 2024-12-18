import express from 'express';
import * as tripController from '../controllers/tripController.js';

const router = express.Router();

router.post('/new-trip', tripController.createTrip);
router.delete('/delete-trip/:trip_id', tripController.deleteTrip);
router.get('/get-trip/:trip_id', tripController.getTrip);
router.get('/shared-trips', tripController.getSharedTrips);
router.patch('/edit-trip/:trip_id', tripController.editTrip);
router.get('/my-trips', tripController.getMyTrips);


export default router;
