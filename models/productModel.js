const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  swiperImages: {
    swiperImage1: {
      type: String,
    },
    swiperImage2: {
      type: String,
    },
    swiperImage3: {
      type: String,
    },
    swiperImage4: {
      type: String,
    },
    swiperImage5: {
      type: String,
    },
    swiperImage6: {
      type: String,
    },
  },
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  properties1: {
    propertiesArticle1: {
      type: String,
    },
    propertiesSummary1: {
      type: String,
    },
  },
  properties2: {
    propertiesArticle2: {
      type: String,
    },
    propertiesSummary2: {
      type: String,
    },
  },
  properties3: {
    propertiesArticle3: {
      type: String,
    },
    propertiesSummary3: {
      type: String,
    },
  },
  properties4: {
    propertiesArticle4: {
      type: String,
    },
    propertiesSummary4: {
      type: String,
    },
  },
  properties5: {
    propertiesArticle5: {
      type: String,
    },
    propertiesSummary5: {
      type: String,
    },
  },
  properties6: {
    propertiesArticle6: {
      type: String,
    },
    propertiesSummary6: {
      type: String,
    },
  },
  contentImages: {
    contentImage1: {
      type: String,
    },
    contentImage2: {
      type: String,
    },
  },
  specs: {
    weight: {
      type: String,
    },
    dimensions: {
      type: String,
    },
    power: {
      type: String,
    },
    operating_temperature: {
      type: String,
    },
    relative_humidity: {
      type: String,
    },
    negative_ions: {
      type: String,
    },
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
