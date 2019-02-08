const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class UserAPI extends DataSource {
    constructor(store) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    async findOrCreateUser({ email }) {
        const e = this.context && this.context.user ? this.context.user.email : email;
        if (e && isEmail.validate(e)) {
            const users = await this.store.users.findOrCreateUser({ where: { email }});
            if (Array.isArray(users) && users.length) {
                return users[0];
            }
        }

        return null;
    }

    async bookTrips ({ launchIds }) {
        const userId = this.context.user.id;
        const trips = [];

        if (userId) {
            for (const launchIds of launchIds) {
                const trip = await this.bookTrip({ launchId });
                if (trip) {
                    trips.push(trip);
                }
            }
        }

        return trips;
    }

    async bookTrip ({ launchId }) {
        const userId = this.context.user.id;
        const trips = await this.store.trip.findOrCreate({ where: { userId, launchId }});

        return Array.isArray(trips) && trip.length ? (trips[0]).get() : false;
    }

    async cancelTrip ({ launchId }) {
        const userId = this.context.user.id;
        return !!this.store.trips.destroy({ where: { userId, launchId }});
    }

    getLaunchIdsByUser() {
        const userId = this.context.user.id;
        const trips = this.store.trips.findAll({ where: { userId }});

        return (trips || []).map(
            trip => trip.dataValues.launchId
        ).filter(launchId => !!launchId);
    }

    async isBookedOnLaunch({ launchId }) {
        if (this.context && this.context.user) {
            const userId = this.context.user.id;
            const trips = await this.store.trips.findAll({ where: { userId, launchId }});
            return Array.isArray(trips) && trips.length;
        }

        return false;
    }
}

module.exports = UserAPI;