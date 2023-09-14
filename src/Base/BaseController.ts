import { Request, Response } from 'express'
import { Delete, Get, Patch, Post } from '../HttpCore'

export class BaseController {
    @Get('/')
    async getAll(req: Request, res: Response): Promise<any> {
        res.send({
            status: 'Fail',
            message: 'Method not implemented',
        })
    }

    @Get('/:id')
    async getById(req: Request, res: Response): Promise<any> {
        res.send({
            status: 'Fail',
            message: 'Method not implemented',
        })
    }

    @Post('/')
    async create(req: Request, res: Response): Promise<any> {
        res.send({
            status: 'Fail',
            message: 'Method not implemented',
        })
    }

    @Patch('/:id')
    async update(req: Request, res: Response): Promise<any> {
        res.send({
            status: 'Fail',
            message: 'Method not implemented',
        })
    }

    @Delete('/:id')
    async delete(req: Request, res: Response): Promise<any> {
        res.send({
            status: 'Fail',
            message: 'Method not implemented',
        })
    }
}
