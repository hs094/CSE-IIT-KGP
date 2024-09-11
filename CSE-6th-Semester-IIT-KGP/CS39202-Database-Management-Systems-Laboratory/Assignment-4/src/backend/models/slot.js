export function SlotModel(sequelize, DataTypes) {
  return sequelize.define(
    "SLOT",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "doctor",
          key: "id",
        },
      },
      starttime: DataTypes.DATE,
      endtime: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
    },
    {
      tableName: "slot",
      timestamps: false,
    }
  );
}
