export function AdminModel(sequelize, DataTypes) {
  return sequelize.define(
    "ADMIN",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      tableName: "admin",
      timestamps: false,
    }
  );
}
