import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/seq_config';



// Define the interface for the model's attributes
interface UserAttributes {
  user_key: number;
  user_name?: string;
  email_id?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  updated_by?: string;
  mobile_number?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_key'> {}

// Define the Sequelize model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public user_key!: number;
  public user_name?: string;
  public email_id?: string;
  public password?: string;
  public created_at?: Date;
  public updated_at?: Date;
  public created_by?: string;
  public updated_by?: string;
  public mobile_number?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
User.init(
  {
    user_key: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    mobile_number: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    sequelize, // Pass the Sequelize instance here
    modelName: 'User',
    tableName: 'USER',
    timestamps: true, // Will automatically manage `created_at` and `updated_at` if needed
    underscored: true, // This will convert snake_case columns to camelCase
    paranoid: false, // Use `paranoid: true` if you need soft deletion (i.e., `deleted_at` column)
  }
);

export default User;
