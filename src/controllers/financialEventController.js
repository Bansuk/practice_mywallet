import * as financialEventRepository from '../repositories/financialEventRepository.js';
import * as financialEventService from '../services/financialEventService.js';

async function getFinancialEvents(req, res) {
  try {
    const user = req.user;

    const events = financialEventRepository.getEvents(user);

    res.send(events);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function getFinancialEventsSum(req, res) {
  try {
    const user = req.user;

    const sum = financialEventService.sumEvents(user);

    res.send(sum);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function postFinancialEventsSum(req, res) {
  try {
    const user = req.user;

    const { value, type } = req.body;

    if (!value || !type) {
      return res.sendStatus(400);
    }

    const events = financialEventService.postEvents(value, type, user);

    if (!events) {
      return res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export { getFinancialEvents, getFinancialEventsSum, postFinancialEventsSum };
