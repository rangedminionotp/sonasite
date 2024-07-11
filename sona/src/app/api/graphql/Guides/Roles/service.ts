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
            let data = {
                imgurl: row.data.imgurl,
            }
            roles.push({
                id: row.id,
                role: row.role,
                data: data,
            });
        }
        return roles;
    };
}