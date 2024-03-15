import { Sequelize } from "sequelize";

let db = process.env.DB_NAME || "paycifik_db";
let user = process.env.DB_USER || "root";
let pass = process.env.DB_PASSWORD || "";
let host = process.env.DB_HOST || "localhost";

if (process.env.NODE_ENV === "production") {
	db = process.env.DB_NAME || "paycifik_db";
	user = process.env.DB_USER || "paycifik";
	pass = process.env.DB_PASSWORD || "@Asdf1234T";
	host = process.env.DB_HOST || "mysql-paycifik.alwaysdata.net";
}
 
let sequelize: Sequelize = new Sequelize(db, user, pass, {
	host: host,
	dialect: "mysql",
	// To add logger later
	logging: false,
	define: {
		underscored: true,
	},
});

// console.log(process.env.NODE_ENV);

// if (process.env.NODE_ENV === "test") {
// 	sequelize = new Sequelize({
// 		dialect: "sqlite",
// 		storage: "./testdatabase.db",
// 	});
// } else {
// 	sequelize = new Sequelize(db, user, pass, {
// 		host: host,
// 		dialect: "mysql",
// 		// To add logger later
// 		logging: false,
// 		define: {
// 			underscored: true,
// 		},
// 	});
// }

async () => {
	await sequelize.authenticate();
};

export default sequelize;
