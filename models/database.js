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
  rating: {
    type: Sequelize.INTEGER,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, Infinity]
  },
  },
});

db.category = db.conn.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, Infinity]
    },
  },

  img: {
    type: Sequelize.STRING
  }
});

db.user.hasMany(db.recipe)
db.recipe.belongsTo(db.user)
db.recipe.hasMany(db.category)
db.category.belongsTo(db.recipe)

db.conn.sync({force: true
}).then(function() {
  console.log('sync done');
}).then(function(){
  Promise.all([
    db.user.create({
      name: 'kip',
      email: 'kip',
      password: 'kip'
    }),
    db.category.create({
      name: 'Breakfast',
      img: 'images/breakfast.png'
    }),
      db.category.create({
      name: 'Lunch',
      img: 'images/lunch.png'
    }),    
      db.category.create({
      name: 'Appetizers',
      img: 'images/appetizer.png'
    }),
      db.category.create({
      name: 'Soups',
      img: 'images/soup.png'
    }),
      db.category.create({
      name: 'Salads',
      img: 'images/salad.png'
    }),
      db.category.create({
      name: 'Meat',
      img: 'images/meat.png'
    }),
      db.category.create({
      name: 'Fish',
      img: 'images/fish.png'
    }),
      db.category.create({
      name: 'Vegetarian',
      img: 'images/veggi.png'
    }),    
      db.category.create({
      name: 'Desserts',
      img: 'images/dessert.png'
    }),
      db.category.create({
      name: 'Show-off',
      img: 'images/show-off.png'
    }),
      db.category.create({
      name: 'Under 20 mins',
      img: 'images/fast.png'
    }),
      db.category.create({
      name: 'Healthy',
      img: 'images/healthy.png'
    }),

  ])});


module.exports = db








