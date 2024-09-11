export function ProcedureModel(sequelize, DataTypes) {
  return sequelize.define(
    "PROCEDURE",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      cost: DataTypes.INTEGER,
    },
    {
      tableName: "procedure",
      timestamps: false,
    }
  );
}
