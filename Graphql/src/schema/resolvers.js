const { User, Post } = require("../../models");
const { Sequelize } = require('sequelize');

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.findAll({ include: Post });
    },
    getUser: async (_, { id }) => {
      return await User.findByPk(id, { include: Post });
    },
    getPosts: async () => {
      return await Post.findAll({ include: User });
    },
    getPost: async (_, { id }) => {
      return await Post.findByPk(id, { include: User });
    },
    searchPosts: async (_, { query }) => {
      return await Post.findAll({
        where: {
          title: { [Sequelize.Op.iLike]: `%${query}%` },
        },
      });
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      return await User.create({ name, email });
    },
    createPost: async (_, { title, content, userId }) => {
      return await Post.create({ title, content, userId });
    },
  },
  User: {
    posts: async (user) => {
      return await Post.findAll({ where: { userId: user.id } });
    },
  },
  Post: {
    user: async (post) => {
      return await User.findByPk(post.userId);
    },
  },
};

module.exports = resolvers;
