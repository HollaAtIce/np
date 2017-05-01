var db = new Mongo().getDB('npfishermen')

var products = [
  {
    "name": "Ergonomic Soft Computer",
    "price": 404,
    "image": "http://lorempixel.com/640/480/city",
    "description": "Recusandae quasi illum."
  },
  {
    "name": "Handcrafted Granite Salad",
    "price": 506,
    "image": "http://lorempixel.com/640/480/food",
    "description": "Voluptas vitae nulla sequi aliquam nostrum sequi odio."
  },
  {"name": "Unbranded Wooden Mouse",
    "price": 58,
    "image": "http://lorempixel.com/640/480/animals",
    "description": "Nulla optio temporibus qui sit totam iure."
  },
  {"name": "Small Fresh Table",
    "price": 83,
    "image": "http://lorempixel.com/640/480/transport",
    "description": "Excepturi sit ut."
  },
  {"name": "Ergonomic Metal Towels",
    "price": 998,
    "image": "http://lorempixel.com/640/480/fashion",
    "description": "Libero eligendi laudantium vero voluptate eius inventore."
  },
  {"name": "Handcrafted Fresh Fish",
    "price": 935,
    "image": "http://lorempixel.com/640/480/fashion",
    "description": "Minima corporis exercitationem voluptas."
  },
  {"name": "Small Wooden Salad",
    "price": 67,
    "image": "http://lorempixel.com/640/480/abstract",
    "description": "Iusto nihil quos eum sapiente dolore consequatur vero."
  },
  {"name": "Intelligent Steel Mouse",
    "price": 105,
    "image": "http://lorempixel.com/640/480/sports",
    "description": "Quos voluptate nobis dicta laboriosam magnam id."
  },
  {"name": "Ergonomic Steel Hat",
    "price": 743,
    "image": "http://lorempixel.com/640/480/animals",
    "description": "Pariatur ut optio voluptas rem."
  },
  {
     
     
    "name": "Refined Wooden Chicken",
    "price": 247,
    "image": "http://lorempixel.com/640/480/city",
    "description": "Amet odit nisi."
  }
]

db.products.insertMany(products)

db.carts.insert({user: 1, products: []})