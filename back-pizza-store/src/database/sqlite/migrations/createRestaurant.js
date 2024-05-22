const createRestaurant = `
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    adress_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (adress_id) REFERENCES Adress(id),
    FOREIGN KEY (user_id) REFERENCES User(id) CONSTRAINT fk_restaurant_user_admin CHECK (user.cargo = 'admin')
`

module.exports = createRestaurant