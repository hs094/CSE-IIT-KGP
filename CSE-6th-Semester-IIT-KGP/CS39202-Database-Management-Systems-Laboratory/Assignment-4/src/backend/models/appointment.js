export function AppointmentModel(sequelize, DataTypes) {
  return sequelize.define(
    "APPOINTMENT",
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
      fees: DataTypes.INTEGER,
      starttime: DataTypes.DATE,
      endtime: DataTypes.DATE,
    },
    {
      tableName: "appointment",
      timestamps: false,
    }
  );
}
