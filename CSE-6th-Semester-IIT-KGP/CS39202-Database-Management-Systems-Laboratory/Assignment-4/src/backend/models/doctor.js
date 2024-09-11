export function DoctorModel(sequelize, DataTypes) {
  return sequelize.define(
    "DOCTOR",
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
      license: DataTypes.STRING,
      position: DataTypes.STRING,
      specialization: DataTypes.STRING,
      status: DataTypes.BOOLEAN // To be added for doctor delete
    },
    {
      tableName: "doctor",
      timestamps: false,
    }
  );
}
