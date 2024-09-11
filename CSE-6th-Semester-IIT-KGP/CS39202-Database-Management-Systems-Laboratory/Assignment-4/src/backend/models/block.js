export function BlockModel(sequelize, DataTypes) {
  return sequelize.define(
    "BLOCK",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      floor: {
        type: DataTypes.INTEGER,
        // primaryKey: true,
      },
      code: {
        type: DataTypes.INTEGER,
        // primaryKey: true
      },
    },
    {
      tableName: "block",
      timestamps: false,
    }
  );
}
