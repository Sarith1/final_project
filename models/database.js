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
    db.recipe.create({
      title: 'Uitsmijter',
      body: 'Bak één of twee eieren. Smeer boter op de boterhammen en beleg deze daarna met ham en kaas. Leg hier als laatst je warme ei op.',
      ingredients: 'Twee boterhammen, kaas, ham, boter en eieren',
      rating: 3,
      category: 'Breakfast'
    }),
    db.recipe.create({
      title: 'Tosti',
      body: 'Beleg een boterham met ham en kaas en leg hier nog een boterham op. Smeer aan beide buitenste zijdes van de boterhammen een dun laagje boter. Leg nu je tosti op de gril tot deze aan beide kanten goudkleurig is.',
      ingredients: 'Twee boterhammen, kaas, ham, boter',
      rating: 3,
      category: 'Lunch'
    }),
    db.recipe.create({
      title: 'Kikkererwten uit de oven',
      body: 'Doe de kikkererwten in een kom. Doe hier de olijfolie, kruiden en peper bij en mix dit goed door elkaar. Spreid je mengsel over een met bakpapier bedekte bakplaat en plaats deze 20 minuten in de oven op 200 graden.',
      ingredients: 'Kikkererwten, paprikapoeder, chilipoeder, knoflookpoeder olijfolie en peper.',
      rating: 4,
      category: 'Appetizers'
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

 ])

});



module.exports = db








