const { v4: uuidv4 } = require('uuid');

const createPattern = (data) => {
  const newPattern = {
    id: uuidv4(),
    ...data,
    createdAt: new Date().toISOString(),
  };

};
