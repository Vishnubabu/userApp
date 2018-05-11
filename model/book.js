module.exports = ({selfLink: link, volumeInfo: {title, authors = [], publisher} = {}}) => ({
    link,
    title,
    author: authors.join(', '),
    publisher
});
