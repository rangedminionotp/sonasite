import { pool } from "@/db";

import { GuidesRolesType } from "./schema";

export class GuideRolesService {
    public async getGuidesRoles(): Promise<GuidesRolesType[]>{
        const select = `SELECT * FROM GuidesRoles`;
        const query = {
            text: select,
            values: [],
        };
        const { rows } = await pool.query(query);
        let roles: GuidesRolesType[] = [];
        for (const row of rows) {
            roles.push({
                id: row.id,
                role: row.role,
            });
        }
        return roles;
    };
}