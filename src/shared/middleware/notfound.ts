import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
    return res.status(404).json({
        success: false,
        message: 'API Route Not Found!',
    });
};

export default notFound;