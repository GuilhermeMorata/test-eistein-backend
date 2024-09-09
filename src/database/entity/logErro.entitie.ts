import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ILogErrorTable } from '../interface/logError.interface'


@Table({ tableName: 'logError', paranoid: true })
export class LogErrorTable extends Model<ILogErrorTable> {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    error_id: number;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    error_route: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    error_method: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    error_message: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    error_name: string;

    @Column({
        allowNull: true,
        type: DataType.STRING
    })
    error_params: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    createdAt: Date = new Date();

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date = new Date();

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    deletedAt: Date;
}
