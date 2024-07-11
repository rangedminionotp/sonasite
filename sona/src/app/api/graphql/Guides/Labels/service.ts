import { pool } from "@/db";

import { GuidesLabelsType } from "./schema";

export class GuideLabelsService {
    public async getGuidesLabels(): Promise<GuidesLabelsType[]>{
        const select = `SELECT * FROM GuidesLabels`;
        const query = {
            text: select,
            values: [],
        };
        const { rows } = await pool.query(query);
        let labels: GuidesLabelsType[] = [];
        for (const row of rows) {
            labels.push({
                id: row.id,
                role_id: row.role_id,
                label: row.label,
            });
        }
        return labels;
    };
}