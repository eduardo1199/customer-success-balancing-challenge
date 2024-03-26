/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */
function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  /**
   * ===============================================
   * =========== Write your solution here ==========
   * ===============================================
   */

  function isValidData(data, maxId, maxScore) {
    return data.some((item) => item.score > maxScore || item.score < 0 || item.id > maxId || item.id < 0)
  }

  const MAX_AMOUNT_CUSTOMER_SUCCESS = 1000;
  const MAX_AMOUNT_CLIENTS = 1000000;

  const MAX_ID_CUSTOMER_SUCCESS = 1000;
  const MAX_ID_CLIENTS = 1000000;

  const MAX_SCORE_CUSTOMER_SUCCESS = 10000
  const MAX_SCORE_CUSTOMER = 100000

  if(customerSuccess.length > MAX_AMOUNT_CUSTOMER_SUCCESS) {
    throw new Error('Exceeded maximum number of customers!')
  }

  if(customers.length > MAX_AMOUNT_CLIENTS) {
    throw new Error('Exceeded maximum number of clients!')
  }
 
  // verify ids and levels of customers success
  if(isValidData(customerSuccess, MAX_ID_CUSTOMER_SUCCESS, MAX_SCORE_CUSTOMER_SUCCESS )) {
    throw new Error('Exceeded maximum number of id or level of customers success!')
  }

  if(isValidData(customers, MAX_ID_CLIENTS, MAX_SCORE_CUSTOMER)) {
    throw new Error('Exceeded maximum number of id or level of customers success!')
  }

  // First: Remove customerSuccess away
  const idsAwayToRemove = new Set(customerSuccessAway)
  const filteredSuccessCustomerAvailable = customerSuccess.filter(successCostumer => !idsAwayToRemove.has(successCostumer.id))

  // order by customer success
  const orderFilteredSuccessCustomerAvailable = filteredSuccessCustomerAvailable.sort((firstSuccessCostumer, secondSuccessCostumer) => {
    const differenceBetweenScore = firstSuccessCostumer.score - secondSuccessCostumer.score

    if(differenceBetweenScore !== 0) {
      return differenceBetweenScore
    } else {
      throw new Error('Has customer with score similar!')
    }
  })

  // enumerate quantity of successful customer with clients
  let enumerateSuccessCostumers = []
  
  customers.forEach((costumer) => {
    let idEnumerateSuccessCostumer = null

    for(const filteredSuccessCostumer of orderFilteredSuccessCustomerAvailable) {
      if(costumer.score <= filteredSuccessCostumer.score) {
        idEnumerateSuccessCostumer = filteredSuccessCostumer.id

        break;
      } else {
        continue;
      }
    }

    if(idEnumerateSuccessCostumer) {
      const findIndexSuccessCostumer = enumerateSuccessCostumers.findIndex((assignmentSuccessCostumer) => assignmentSuccessCostumer.id === idEnumerateSuccessCostumer)

      if(findIndexSuccessCostumer >= 0) {
        enumerateSuccessCostumers[findIndexSuccessCostumer].amount = enumerateSuccessCostumers[findIndexSuccessCostumer].amount + 1;
      } else {
        const newEnumerateSuccessCostumer = {
          id: idEnumerateSuccessCostumer,
          amount: 1
        }

        enumerateSuccessCostumers.push(newEnumerateSuccessCostumer)
      }
    }
  })

  // bigger amount clients
  const maxAmountSuccessCostumer = Math.max(...enumerateSuccessCostumers.map((enumerateSuccessCostumer) => enumerateSuccessCostumer.amount))

  // filtered success costumer with bigger amount clients
  const filteredEnumerateSuccessCostumers = enumerateSuccessCostumers.filter((enumerateSuccessCostumer) => enumerateSuccessCostumer.amount === maxAmountSuccessCostumer)

  const MAX_AMOUNT_SUCCESS_COSTUMERS_WITH_CLIENTS = 1

  // check if you have more than one customer
  if(filteredEnumerateSuccessCostumers.length > MAX_AMOUNT_SUCCESS_COSTUMERS_WITH_CLIENTS) {
    return 0
  } else {
     const findEnumerateSuccessCostumers = enumerateSuccessCostumers.find((enumerateSuccessCostumer) => enumerateSuccessCostumer.amount === maxAmountSuccessCostumer)

    if(findEnumerateSuccessCostumers) {
      return findEnumerateSuccessCostumers.id
    } else {
      return 0
    }
  }
}

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt){
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

test("Scenario 8", () => {
  const css = mapEntities([60, 40, 95, 75]);
  const customers = mapEntities([90, 70, 20, 40, 60, 10]);
  const csAway = [2, 4];
  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});
