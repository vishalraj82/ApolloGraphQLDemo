module.exports = {
    Query: {
        launch: (_, { id }, { dataSources}) => dataSources.launchAPI.getLaunchById({ launchId: id }),
        launches: async (_, __, { dataSources}) => dataSources.launchAPI.getAllLaunches(),
        me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    }
}