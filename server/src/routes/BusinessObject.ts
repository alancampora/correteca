import express, { Request, Response } from 'express';
import BusinessObject from '../models/BusinessObject';
import { BusinessObject as IBusinessObject } from '@common/BusinessObject';

const router = express.Router();

router.get('/', async (req: Request, res: Response<IBusinessObject[] | object>) => {
    console.log('pasa por aca');
    try {
        const businessObjects = await BusinessObject.find();
        res.json(businessObjects);
    } catch (error) {
        res.status(500).json({ "message": 'Failed to fetch BusinessObjects', error });
    }
});

export default router;
