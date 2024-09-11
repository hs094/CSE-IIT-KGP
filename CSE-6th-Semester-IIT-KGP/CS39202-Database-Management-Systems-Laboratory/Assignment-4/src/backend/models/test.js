export function TestModel(sequelize, DataTypes) {
  return sequelize.define(
    "TEST",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      file_url: DataTypes.STRING,
      appointment_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "appointment",
          key: "id",
        },
      },
      report_status: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      date: DataTypes.DATE,
    },
    {
      tableName: "test",
      timestamps: false,
    }
  );
}
