import express from 'express';
import Twitter from 'twitter';
import { UserDataResponse } from '@/api-common';
import { Tweet, User } from './twitter-api-timeline-response';
import APIError from './api-error';
import analyzeData from './data-analyzer';

const twitterClient = new Twitter({
  consumer_key: 'NjRBDfyAIBs2yrPsuaSmzt4xA',
  consumer_secret: '2Tpob5RvziUosZUGR30UTRW61UgHfGcPC7RvrZtgl6FvPStf4q',
  access_token_key: '1147698208518430721-xKsIL1n8zoiASiur9OaAIFACCQa1Bc',
  access_token_secret: 'eYUyWym0WFVnJRuYySNscmlVfkDT45DAjYeULipbrKEub',
});

const server = express();

interface TwitterAPIResponseError {
  0: {
    code: number;
    message: string;
  };
}

function isTwitterAPIResponseError(x: any): x is TwitterAPIResponseError {
  return x && x[0] && x[0].code && x[0].message;
}

function handleIsValid(handle: string) {
  return handle.length <= 15 && /^\w+$/.test(handle);
}

server.get('/api/user-info', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  try {
    if (!handleIsValid(req.query.handle)) {
      throw new APIError('Sorry, that page does not exist.');
    }
    const tweets: Tweet[] = (await twitterClient.get('statuses/user_timeline', {
      screen_name: req.query.handle,
      include_rts: 1,
      count: 1,
    })) as Tweet[];
    console.log('tweets:', tweets);
    res.send(analyzeData(tweets as Tweet[]));
  } catch (err) {
    console.error(err);
    if (isTwitterAPIResponseError(err)) {
      res.status(500).send(err[0].message);
    } else if (err instanceof Error && err.message.includes('401')) {
      res.status(500).send('This account\'s tweets are private or their profile has been suspended.');
    } else if (err instanceof APIError) {
      res.status(500).send(err.message);
    } else {
      // console.error(err);
      res.status(500).send('Something went wrong on our end.');
    }
  }
});

server.listen(81);
