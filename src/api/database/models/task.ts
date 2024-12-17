import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/seq_config';

class Task extends Model {
    public task_id!: number;
    public user_key!: number;
    public description!: string;
    public status!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

Task.init(
  {
    task_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_key: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'task',
    timestamps: true, // Sequelize will manage `created_at` and `updated_at`
    underscored: true, // Converts camelCase to snake_case in the DB
    paranoid: false, // Soft delete will not be used, set to true if you need it
  }
);

export default Task;
