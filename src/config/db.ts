
import pg from "pg";
import config from "./env";

const {Pool} = pg;
// console.log(
//     "Database URL loaded:",
//     Boolean(config.connection_string)
// );
export const pool = new Pool({
    connectionString:config.connection_string,



});

