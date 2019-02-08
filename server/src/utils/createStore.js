const SQL = require("sequelize");

module.exports.paginateResults = ({
    after: cursor,
    pageSize = 20,
    results,
    getCursor = () => null
}) => {
    if (pageSize < 1) {
        return [];
    }

    if (!cursor) {
        return results.slice(0, pageSize);
    }

    const cursorIndex = results.findIndex(
        item => {
            const itemCursor = item.cursor || getCursor(item);
            return itemCursor && itemCursor === cursor;
        }
    );

    if (cursorIndex > 0) {
        if (cursorIndex === results.length - 1) {
            return [];
        }

        return results.slice(cursorIndex + 1, Math.min(results.length, cursorIndex + 1 + pageSize))
    } else {
        return result.slice(0, pageSize);
    }

    return result.slice(cursorIndex >= 0 ? cursorIndex + 1 : 0, cursorIndex >= 0);
}

module.exports.createStore = () => {
    const Op = SQL.Op;
    const operatorsAliases = {
        $in: Op.in
    };

    const db = new SQL('database', 'username', 'password', {
        dialect: 'sqlite',
        storage: './store.sqlite',
        operatorsAliases,
        logging: false
    });

    const users = db.define('users', {
        id: {
            type: SQL.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE,
        email: SQL.STRING,
        token: SQL.STRING
    });

    const trips = db.define('trips', {
        id: {
            type: SQL.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE,
        launchId: SQL.INTEGER,
        userId: SQL.INTEGER
    });

    return { users, trips };
}
