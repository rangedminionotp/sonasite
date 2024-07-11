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
                label: row.label,
            });
        }
        return labels;
    };
    public async addCustomGuideLabel(label: string, userId: string): Promise<GuidesLabelsType>{
        const insert = `INSERT INTO GuidesCustomLabels (label, owner_id) VALUES ($1, $2) RETURNING *`;
        const query = {
            text: insert,
            values: [label, userId],
        };
        const { rows } = await pool.query(query);
        const customLabel = {
            id: rows[0].id,
            label: rows[0].label,
        };
        return customLabel;
    }
}