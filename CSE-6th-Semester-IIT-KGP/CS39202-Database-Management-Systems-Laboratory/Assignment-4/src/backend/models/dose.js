export function DoseModel(sequelize, DataTypes) {
  return sequelize.define(
    "DOSE",
    {
      medication_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "medication",
          key: "id",
        },
      },
      dose_amount: DataTypes.INTEGER,
      treatment_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "treatment",
          key: "id",
        },
      },
    },
    {
      tableName: "dose",
      timestamps: false,
    }
  );
}
