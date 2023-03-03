const config = {
  api: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost:3000',
    nodeEnv: process.env.NODE_ENV || 'development'
  },
  db: {
    development: {
      //? Configuraciones para la coneccion con sequelice
      dialect: 'postgres',
      host: 'localhost',
      port: '5432',
      username: 'postgres',
      password: 'An+onio98',
      database: 'wasa-db',
      define: {
        timestamps: true, //? esto nos obliga a que todas las tablas en pstgres tengan createdAt y updatedAt
        underscored: true,
        underscoredAll:true
        }
      },
    production: {
       //? qui deberan estar las configuraxiones del sequelize
       dialect: 'postgres',
       host: 'localhost',
       port: '5432',
       username: 'postgres',
       password: 'An+onio98',
       database: 'wasa-db',
       define: {
         timestamps: true, //? esto nos obliga a que todas las tablas en pstgres tengan createdAt y updatedAt
         underscored: true,
         underscoredAll:true
         },
         dialectOptions:{
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
         }
    },
    testing: {}
  }
}

module.exports = config