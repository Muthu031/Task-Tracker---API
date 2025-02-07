import { sequelize } from "../database/config/seq_config";
import { QueryTypes } from "sequelize";
import { Request, Response, NextFunction } from "express";
import { ResponseFormat } from "../interfaces";



export async function getTaskData(req: Request, res: Response, next: NextFunction) {
    try {
        const user_key = req.query.userKey;
        if (!user_key) {
            return res.status(400).json(new ResponseFormat('userKey is required', 400, false));
        }
        const query = `
SELECT
  DATE_FORMAT(created_at, '%Y-%m') AS month,
  status,
  COUNT(*) AS task_count
FROM
  task
WHERE
  user_key = :userKey
GROUP BY
  DATE_FORMAT(created_at, '%Y-%m'),
  status
ORDER BY
  month,
  status;
`;


        const results = await sequelize.query(query, {
            replacements: { userKey: user_key },
            type: QueryTypes.SELECT
        });

        return res.status(200).json(new ResponseFormat(results, 200, true));

    } catch (error) {
        console.log("------------getTaskData------------", error);
        next(error);
        return res.status(500).json({message: 'Internal Server Error'});
    }

}