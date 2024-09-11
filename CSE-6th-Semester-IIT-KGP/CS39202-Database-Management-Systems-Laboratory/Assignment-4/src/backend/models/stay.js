export function StayModel(sequelize, DataTypes) {
  return sequelize.define(
    "STAY",
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
      room: {
        type: DataTypes.INTEGER,
        references: {
          model: "room",
          key: "room_number",
        },
      },
      starttime: DataTypes.DATE,
      endtime: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      tableName: "stay",
      timestamps: false,
    }
  );
}
