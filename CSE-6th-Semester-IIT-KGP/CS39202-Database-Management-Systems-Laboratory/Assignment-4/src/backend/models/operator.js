export function OperatorModel(sequelize, DataTypes) {
  return sequelize.define(
    "OPERATOR",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM,
        values: ["data_entry", "front_desk"],
      },
    },
    {
      tableName: "operator",
      timestamps: false,
    }
  );
}
