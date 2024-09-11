export function MedicationModel(sequelize, DataTypes) {
  return sequelize.define(
    "MEDICATION",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      brand: DataTypes.STRING,
      description: DataTypes.STRING,
      cost: DataTypes.INTEGER,
    },
    {
      tableName: "medication",
      timestamps: false,
    }
  );
}
