var db = {
	mod:{}
}

var pg = require('pg')
var Sequelize = require('sequelize')

db.conn = new Sequelize('finalproject', process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    define: {
      timestamps: false
    }
  });

//Models:
db.user = db.conn.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 55]
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, Infinity]
    },
  }
});


db.recipe = db.conn.define('recipe', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, Infinity]
    },
  },

  body: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, Infinity]
    },
  },
  ingredients: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, Infinity]
    },
  },
  category: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.INTEGER,
  },
  user_id: Sequelize.INTEGER
});

db.user.hasMany(db.recipe)
db.recipe.belongsTo(db.user)

db.conn.sync({force: false
}).then(function() {
  console.log('sync done');
}).then(function(){
  Promise.all([
    db.user.create({
      name: 'kip',
      email: 'kip',
      password: 'kip'
    }),
  ])});


module.exports = db








