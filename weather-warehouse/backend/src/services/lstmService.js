const tf = require('@tensorflow/tfjs');

/**
 * Prepares the data for LSTM by normalizing and creating sequences.
 * @param {number[]} data - Historical data.
 * @param {number} lookBack - Number of previous steps to consider.
 * @returns {Object} - { X, y } tensors for training.
 */
function prepareData(data, lookBack = 7) {
  const X = [];
  const y = [];

  for (let i = 0; i < data.length - lookBack; i++) {
    X.push(data.slice(i, i + lookBack));
    y.push(data[i + lookBack]);
  }

  const XTensor = tf.tensor2d(X).reshape([X.length, lookBack, 1]);
  const yTensor = tf.tensor2d(y, [y.length, 1]);

  return { X: XTensor, y: yTensor };
}

/**
 * Builds and trains an LSTM model.
 * @param {tf.Tensor} X - Input tensor.
 * @param {tf.Tensor} y - Output tensor.
 * @returns {tf.LayersModel} - Trained LSTM model.
 */
async function trainLSTM(X, y) {
  const model = tf.sequential();

  model.add(tf.layers.lstm({
    units: 50,
    returnSequences: false,
    inputShape: [X.shape[1], X.shape[2]],
  }));

  model.add(tf.layers.dense({ units: 1 }));

  model.compile({
    optimizer: 'adam',
    loss: 'meanSquaredError',
  });

  await model.fit(X, y, {
    epochs: 50,
    batchSize: 16,
    verbose: 0,
  });

  return model;
}

/**
 * Generates a forecast using the trained LSTM model.
 * @param {tf.LayersModel} model - Trained LSTM model.
 * @param {number[]} data - Historical data.
 * @param {number} lookBack - Number of previous steps to consider.
 * @returns {number[]} - Forecasted values.
 */
function generateForecast(model, data, lookBack = 7) {
  const input = tf.tensor2d(data.slice(-lookBack)).reshape([1, lookBack, 1]);
  const prediction = model.predict(input);
  return prediction.dataSync();
}

async function lstmForecast(data) {
  const lookBack = 7;

  // Prepare data
  const { X, y } = prepareData(data, lookBack);

  // Train model
  const model = await trainLSTM(X, y);

  // Generate forecast
  const forecast = generateForecast(model, data, lookBack);

  return forecast;
}

module.exports = { lstmForecast };