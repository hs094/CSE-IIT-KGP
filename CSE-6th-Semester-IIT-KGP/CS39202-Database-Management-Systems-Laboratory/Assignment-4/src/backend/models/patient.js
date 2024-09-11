export function PatientModel(sequelize, DataTypes) {
  return sequelize.define(
    "PATIENT",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.STRING,
      age: DataTypes.INTEGER,
      phone: DataTypes.STRING,
    },
    {
      tableName: "patient",
      timestamps: false,
    }
  );
}
