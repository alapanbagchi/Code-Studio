import { Request, Response } from "express"

export const me = async (req: Request, res: Response) => {
    try {
        if (!req.isAuthenticated()) return res.status(400).json({ message: 'NOT_LOGGED_IN' })
        return res.status(200).json({ message: 'SUCCESS', data: req.user })
    } catch (err) {
        return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', error: err.message })
    }
}