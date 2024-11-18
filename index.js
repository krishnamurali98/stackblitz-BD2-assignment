const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(cors());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send('BD2 Assignment');
});

//**********************************************************************
let hotels = [
  {
    id: 1,
    name: 'Romantic Getaway',
    category: 'Resort',
    rating: 2.2,
    reviews: 4572,
    amenity: 'Spa',
    price: 10464,
    country: 'South Africa',
  },
  {
    id: 2,
    name: 'Wellness Retreat',
    category: 'Family',
    rating: 2.8,
    reviews: 2114,
    amenity: 'Pool',
    price: 13243,
    country: 'Australia',
  },
  {
    id: 3,
    name: 'Romantic Getaway',
    category: 'Luxury',
    rating: 3.1,
    reviews: 4359,
    amenity: 'Restaurant',
    price: 3299,
    country: 'Germany',
  },
  {
    id: 4,
    name: 'Luxury Suites',
    category: 'Family',
    rating: 4.9,
    reviews: 3651,
    amenity: 'Bar',
    price: 16359,
    country: 'United Kingdom',
  },
  {
    id: 5,
    name: 'Luxury Suites',
    category: 'Budget',
    rating: 4.6,
    reviews: 688,
    amenity: 'Gym',
    price: 15570,
    country: 'France',
  },
  {
    id: 6,
    name: 'Cultural Heritage Hotel',
    category: 'Boutique',
    rating: 2.0,
    reviews: 219,
    amenity: 'Pet Friendly',
    price: 2321,
    country: 'USA',
  },
  {
    id: 7,
    name: 'Business Hotel',
    category: 'Mid-Range',
    rating: 3.7,
    reviews: 1040,
    amenity: 'Free WiFi',
    price: 4523,
    country: 'India',
  },
  {
    id: 8,
    name: 'Historic Plaza Hotel',
    category: 'Mid-Range',
    rating: 3.5,
    reviews: 300,
    amenity: 'Parking',
    price: 8543,
    country: 'Australia',
  },
  {
    id: 9,
    name: 'Adventure Resort',
    category: 'Boutique',
    rating: 4.2,
    reviews: 1222,
    amenity: 'Gym',
    price: 11894,
    country: 'South Africa',
  },
  {
    id: 10,
    name: 'Mountain Retreat',
    category: 'Resort',
    rating: 4.8,
    reviews: 4015,
    amenity: 'Spa',
    price: 17560,
    country: 'India',
  },
  {
    id: 11,
    name: 'Eco Friendly Lodge',
    category: 'Family',
    rating: 2.4,
    reviews: 528,
    amenity: 'Restaurant',
    price: 3124,
    country: 'Germany',
  },
  {
    id: 12,
    name: 'Urban Boutique Hotel',
    category: 'Mid-Range',
    rating: 3.9,
    reviews: 1401,
    amenity: 'Free WiFi',
    price: 9245,
    country: 'France',
  },
  {
    id: 13,
    name: 'Beachfront Hotel',
    category: 'Luxury',
    rating: 4.5,
    reviews: 489,
    amenity: 'Pool',
    price: 14567,
    country: 'USA',
  },
  {
    id: 14,
    name: 'Ocean View Resort',
    category: 'Budget',
    rating: 3.3,
    reviews: 783,
    amenity: 'Spa',
    price: 7432,
    country: 'United Kingdom',
  },
  {
    id: 15,
    name: 'City Central Hotel',
    category: 'Boutique',
    rating: 4.1,
    reviews: 2133,
    amenity: 'Bar',
    price: 9823,
    country: 'Australia',
  },
  {
    id: 16,
    name: 'Casino Resort',
    category: 'Luxury',
    rating: 4.9,
    reviews: 5000,
    amenity: 'Bar',
    price: 18900,
    country: 'South Africa',
  },
  {
    id: 17,
    name: 'Golf Resort',
    category: 'Mid-Range',
    rating: 4.7,
    reviews: 789,
    amenity: 'Gym',
    price: 16340,
    country: 'France',
  },
  {
    id: 18,
    name: 'Family Fun Hotel',
    category: 'Family',
    rating: 3.2,
    reviews: 1322,
    amenity: 'Pool',
    price: 7500,
    country: 'Germany',
  },
  {
    id: 19,
    name: 'Spa and Relaxation Hotel',
    category: 'Luxury',
    rating: 4.4,
    reviews: 2314,
    amenity: 'Spa',
    price: 14900,
    country: 'United Kingdom',
  },
  {
    id: 20,
    name: 'Country House Hotel',
    category: 'Budget',
    rating: 3.6,
    reviews: 1876,
    amenity: 'Parking',
    price: 6234,
    country: 'Australia',
  },
];

// Endpoint 1: Get the hotels sorted by pricing
function SortByPricing(cond) {
  return (p1, p2) => {
    if (cond === 'low-to-high') return p1.price - p2.price;
    else return p2.price - p1.price;
  };
}

app.get('/hotels/sort/pricing', (req, res) => {
  let pricing = req.query.pricing;
  let hotels_copy = hotels.slice();
  if (pricing === 'low-to-high' || pricing === 'high-to-low') {
    hotels_copy.sort(SortByPricing(pricing));
  }
  res.json({ hotels: hotels_copy });
});

// Endpoint 2: Get the hotels sorted based on their Ratings
function SortByRating(cond) {
  return (r1, r2) => {
    if (cond === 'low-to-high') return r1.rating - r2.rating;
    else return r2.rating - r1.rating;
  };
}

app.get('/hotels/sort/rating', (req, res) => {
  let rating = req.query.rating;
  let hotels_copy = hotels.slice();
  if (rating === 'low-to-high' || rating === 'high-to-low') {
    hotels_copy.sort(SortByRating(rating));
  }
  res.json({ hotels: hotels_copy });
});

// Endpoint 3: Get the Hotels sorted based on their Reviews
function SortByReviews(cond) {
  return (r1, r2) => {
    if (cond === 'least-to-most') return r1.reviews - r2.reviews;
    else return r2.reviews - r1.reviews;
  };
}

app.get('/hotels/sort/reviews', (req, res) => {
  let reviews = req.query.reviews;
  let hotels_copy = hotels.slice();
  if (reviews === 'least-to-most' || reviews === 'most-to-least') {
    hotels_copy.sort(SortByReviews(reviews));
  }
  res.json({ hotels: hotels_copy });
});

// Endpoint 4: Filter the hotels based on the Hotel Amenity
function filterByHotelAmenity(hotelObj, amenity) {
  return hotelObj.amenity.toLowerCase() === amenity.toLowerCase();
}

app.get('/hotels/filter/amenity', (req, res) => {
  let amenity = req.query.amenity;
  let results = hotels.filter((hotelObj) =>
    filterByHotelAmenity(hotelObj, amenity)
  );
  res.json({ hotels: results });
});

// Endpoint 5: Filter the hotels based on the selected Country
function filterByCountry(hotelObj, country) {
  return hotelObj.country.toLowerCase() === country.toLowerCase();
}

app.get('/hotels/filter/country', (req, res) => {
  let country = req.query.country;
  let results = hotels.filter((hotelObj) => filterByCountry(hotelObj, country));
  res.json({ hotels: results });
});

// Endpoint 6: Filter the hotels based on the selected Category
function filterByCategory(hotelObj, category) {
  return hotelObj.category.toLowerCase() === category.toLowerCase();
}

app.get('/hotels/filter/category', (req, res) => {
  let category = req.query.category;
  let results = hotels.filter((hotelObj) =>
    filterByCategory(hotelObj, category)
  );
  res.json({ hotels: results });
});

// Endpoint 7: Send all hotels

app.get('/hotels', (req, res) => {
  res.json({ hotels: hotels });
});

//**********************************************************************
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
