const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');
const cities = require('./cities');
const { response } = require('express');
const axios = require('axios');


mongoose.connect('mongodb://localhost:27017/yelp-camp')
  .then(() => {
    console.log('Connection Open!!!')
  })
  .catch(() => {
    console.log('Error!!!')
  })


const sample = (array) => array[Math.floor(Math.random() * array.length)];

async function seedImg() {
  try {
    const resp = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: 'mfFceUSaMCUrKmNvCUg9geMpi-d4FLgeUWmedb6lt7Y',
        collections: 1114848,
      },
    })
    return resp.data.urls.small
  } catch (err) {
    console.error(err)
  }
}
//await seedImg(),

const seedDB = async () => {
  await Campground.deleteMany({});


  for (let i = 0; i < 25; i++) {

    const random1000 = Math.floor(Math.random() * 1000)
    const camp = new Campground({
      author: '622020fc6dd450b4d95829cd',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Ipsam proident. Quisquam id perspiciatis totam for vel and explicabo for consequuntur. Eos ad for eu esse, tempor. Voluptatem unde aute fugiat. Laboriosam veritatis, magnam perspiciatis but deserunt but quis. Veniam nisi. Accusantium dolore so eaque but aliquam for amet yet velitesse ea. Omnis fugit. ',
      price: Number.parseFloat((Math.random() * 50) + 1).toFixed(2),
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: await seedImg(),

        },
        {
          url: await seedImg(),

        }
      ]

    })
    await camp.save();
  }


}

seedDB().then(() => {
  mongoose.connection.close()
})