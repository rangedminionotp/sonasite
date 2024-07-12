import { pool } from "@/db";

import { GuidesLabelsType, GuidesCustomLabelsType } from "./schema";

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
    public async getGuidesCustomLabels(userId: string): Promise<GuidesCustomLabelsType[]>{
        const select = `SELECT * FROM GuidesCustomLabels WHERE owner_id = $1`;
        const query = {
            text: select,
            values: [userId],
        };
        const { rows } = await pool.query(query);
        let labels: GuidesCustomLabelsType[] = [];
        for (const row of rows) {
            labels.push({
                id: row.id, 
                label: row.label,
                owner_id: row.owner_id,
            });
        }
        return labels;
    };

    public async addCustomGuideLabel(label: string, userId: string): Promise<GuidesCustomLabelsType>{
        const insert = `INSERT INTO GuidesCustomLabels (label, owner_id) VALUES ($1, $2) RETURNING *`;
        const query = {
            text: insert,
            values: [label, userId],
        };
        const { rows } = await pool.query(query);
        const customLabel = {
            id: rows[0].id,
            label: rows[0].label,
            owner_id: rows[0].owner_id,
        };
        return customLabel;
    }
    public async deleteCustomGuideLabel(labelId: string): Promise<GuidesCustomLabelsType>{
        const deleteQuery = `DELETE FROM GuidesCustomLabels WHERE id = $1 RETURNING *`;
        const query = {
            text: deleteQuery,
            values: [labelId],
        };
        const { rows } = await pool.query(query);
        const customLabel = {
            id: rows[0].id,
            label: rows[0].label,
            owner_id: rows[0].owner_id,
        };
        return customLabel;
    }
    public async updateCustomGuideLabel(labelId: string, label: string): Promise<GuidesCustomLabelsType>{
        const updateQuery = `UPDATE GuidesCustomLabels SET label = $1 WHERE id = $2 RETURNING *`;
        const query = {
            text: updateQuery,
            values: [label, labelId],
        };
        const { rows } = await pool.query(query);
        const customLabel = {
            id: rows[0].id,
            label: rows[0].label,
            owner_id: rows[0].owner_id,
        };
        return customLabel;
    }
    public async checkHowManyCustomsByUser(userId: string): Promise<number>{
        const select = `SELECT COUNT(*) FROM GuidesCustomLabels WHERE owner_id = $1`;
        const query = {
            text: select,
            values: [userId],
        };
        const { rows } = await pool.query(query);
        return rows[0].count;
    }
}