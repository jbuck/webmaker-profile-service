var MakeAPI = require("makeapi-client");

module.exports.createClient = function createClient(url) {
  var makeapi = new MakeAPI({
    apiURL: url,
    hawk: {
      id: "dummy",
      key: "dummy",
      algorithm: "sha256"
    }
  });

  return {
    generate: function(user, callback) {
      makeapi
      .user(user)
      .then(function(err, makes, total) {
        if (err) {
          return callback(err);
        }

        callback(null, {
          "username": user,
          "realName": user,
          "avatarSrc": "https://secure.gravatar.com/avatar/" + makes[0].emailHash + "?s=40d=https%3A%2F%2Fstuff.webmaker.org%2Favatars%2Fwebmaker-avatar-44x44.png",
          "makes": makes.map(function(make) {
            return {
              "url": make.url,
              "contentType": make.contentType,
              "locale": make.locale,
              "title": make.title,
              "description": make.description,
              "author": make.author,
              "published": make.published,
              "tags": make.tags,
              "thumbnail": make.thumbnail,
              "username": make.username,
              "remixedFrom": make.remixedFrom,
              "emailHash": make.emailHash,
              "createdAt": make.createdAt,
              "updatedAt": make.updatedAt,
              "likes": make.likes,
              "id": make.id,
              "type": make.contentType.substring(14)
            };
          }),
          "tileOrder": makes.map(function(make) {
            return make.id;
          })
        });
      });
    }
  }
};
