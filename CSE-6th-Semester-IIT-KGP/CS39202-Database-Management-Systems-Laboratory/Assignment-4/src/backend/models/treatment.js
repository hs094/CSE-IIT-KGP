export function TreatmentModel(sequelize, DataTypes) {
  return sequelize.define(
    "TREATMENT",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      patient_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "patient",
          key: "id",
        },
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "doctor",
          key: "id",
        },
      },
      file_url: DataTypes.STRING,
      illness_details: DataTypes.STRING,
      test_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "test",
          key: "id",
        },
      },
      procedure_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "procedure",
          key: "id",
        },
      },
      stay_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "stay",
          key: "id",
        },
      },
      date: DataTypes.DATE,
    },
    {
      tableName: "treatment",
      timestamps: false,
    }
  );
}
