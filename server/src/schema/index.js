const { gql } = require("apollo-server");

const typeDefs = gql`
    enum PatchSize {
        SMALL
        LARGE
    }

    type Mission {
        name: String
        missionPatch(patchSize: PatchSize): String
    }

    type Rocket {
        id: ID!
        name: String
        size: String
    }

    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type User {
        id: ID!
        email: String
        trips: [Launch]!
    }

    type Query {
        launch(id: ID!): Launch
        launches: [Launch]!
        me: User
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }

    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String): String
    }
`;

module.exports = typeDefs;
