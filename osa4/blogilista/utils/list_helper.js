const logger = require("../utils/logger");
const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach((element) => {
    likes += element.likes;
  });
  return likes;
};

const totalRatings = (blogs) => {
  return blogs.length;
};

const favouriteBlog = (blogs) => {
  let likesArray = [];
  blogs.forEach((element) => {
    likesArray.push(element.likes);
  });
  let biggestLikeAmount = Math.max(...likesArray);
  logger.info("most likes", biggestLikeAmount);
  let mostLiked = blogs.filter((element) => {
    return element.likes === biggestLikeAmount;
  });
  logger.info("mostLiked", mostLiked);
  return {
    title: mostLiked[0].title,
    author: mostLiked[0].author,
    likes: mostLiked[0].likes,
  };
};

const mostBlogs = (blogs) => {
  let authorArray = _.map(blogs, "author");
  let mostCommonAuthor = _.chain(authorArray)
    .countBy()
    .toPairs()
    .max(_.last)
    .head()
    .value();
  logger.info("Most occuring author", mostCommonAuthor);
  let amountOfBlogs = _.countBy(blogs, (item) => {
    return item.author === mostCommonAuthor;
  });
  logger.info("amount of blogs", amountOfBlogs);
  return {
    author: mostCommonAuthor,
    blogs: amountOfBlogs.true,
  };
};

const mostLikes = (blogs) => {
  let testArr = [];
  _(blogs)
    .groupBy("author")
    .map((item, author) => {
      logger.info("item", item);
      logger.info("author", author);
      let likes = _.sumBy(item, "likes");
      logger.info("LIKES", likes);
      let obj = {
        author: author,
        likes: likes,
      };
      testArr.push(obj);
    })
    .value();
  let mostLikedAuthor = _.maxBy(testArr, "likes");
  logger.info("most likes test", mostLikedAuthor);
  return mostLikedAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  totalRatings,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
