// Function to search for a customer by their name or ID
function searchCustomer(query) {
    return customers.find(
      customer => customer.name.toLowerCase() === query.toLowerCase() || customer.id === query
    ) || "Customer not found.";
  }
  
  // Function to retrieve all cars available for purchase
  function getAllCarsAvailableForPurchase() {
    return agencies.flatMap(agency =>
      agency.cars.flatMap(car =>
        car.models.filter(model => !model.ownerId)
      )
    );
  }
  
  //Function to sell a car to a customer
  function sellCar(customerId, carNumber) {
    const customer = customers.find(customer => customer.id === customerId);
    const carToSell = agencies.flatMap(agency =>
      agency.cars.flatMap(car =>
        car.models.find(model => model.carNumber === carNumber && !model.ownerId)
      )
    );
  
    if (customer) return "Customer not found.";
    if (carToSell.length === 0) return "Car not found or already sold.";
    if (customer.cash < carToSell[0].price) return "Customer does not have enough cash.";
  
    const agency = agencies.find(agency => agency.agencyId === carToSell[0].ownerId);
    const carIndex = agency.cars.flatMap(car => car.models)
    findIndex(model => model.carNumber === carNumber);
  
    if (carIndex === -1) return "Error in selling the car.";
  
    const soldCar = agency.cars.flatMap(car => car.models).splice(carIndex, 1)[0];
    soldCar.ownerId = customerId;
    customer.cash -= soldCar.price;
    agency.cash += soldCar.price;
  
    return "Car sold successfully.";
  }
  
  // Testing the functions
  console.log(searchCustomer("Lana Edge"));
  console.log(getAllCarsAvailableForPurchase());
  console.log(sellCar("2RprZ1dbL", "WIh0U"));
  