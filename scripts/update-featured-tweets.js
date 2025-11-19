#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { execSync } from 'child_process';

const OUTPUT_PATH = 'src/lib/featured-tweets';

const tweetIds = [
  '1723011519942648318',
  '1593874509320183808',
  '1629902268618141697',
  '1504630655581233155',
  '1633083631861133313',
  '1641908734845755392',
  '1351325727975645184',
  '1362492653783445505',
  '1411509202435022852',
  '1495949891503366148',
  '1411533232617627649',
  '1394808101145038849',
];

function replaceEntitiesWithLinks(body, entities) {
  const { hashtags, mentionedUsers, urls } = entities;

  const uniqueHashtags = [...new Set(hashtags)];
  const uniqueMentionedUsers = [...new Set(mentionedUsers)];
  const uniqueUrls = [...new Set(urls)];

  let updatedBody = body.replace(/\s+https?:\/\/\S+$/, '');

  uniqueHashtags.forEach(tag => {
    const regex = new RegExp(`#${tag}\\b`, 'g');
    updatedBody = updatedBody.replace(regex, `<a href="https://x.com/hashtag/${tag}" target="_blank">#${tag}</a>`);
  });

  uniqueMentionedUsers.forEach(user => {
    const regex = new RegExp(`@${user}\\b`, 'g');
    updatedBody = updatedBody.replace(regex, `<a href="https://x.com/${user}" target="_blank">@${user}</a>`);
  });

  uniqueUrls.forEach(url => {
    const regex = new RegExp(`\\b${url}\\b`, 'g');
    updatedBody = updatedBody.replace(regex, `<a href="${url}" target="_blank">${url}</a>`);
  });

  return updatedBody;
}

function formatDate(inputDateString) {
  const date = new Date(inputDateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  const formatter = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  let formattedDate = formatter.format(date).replace('.', '');

  return formattedDate;
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
}

const fetchTweetDetails = (id) => {
  try {
    const output = execSync(`bunx rettiwt-api tweet details ${id}`).toString();
    if (!output) {
      throw new Error('Could not fetch tweet details', id);
    }
    const details = JSON.parse(output);
    return {
      id: details.id,
      timestamp: formatDate(details.createdAt),
      author: details.tweetBy.userName,
      body: replaceEntitiesWithLinks(details.fullText, details.entities),
      imageUrl: details.tweetBy.profileImage,
    };
  } catch (error) {
    console.error(`Error fetching tweet ${id}:`, error);
    return null;
  }
};

const main = () => {
  try {
    console.log('Updating featured tweets from list in `get-featured-tweets.js`');
    const tweets = tweetIds.map(id => {
      const tweet = fetchTweetDetails(id);
      if (tweet !== null) {
        downloadImage(tweet.imageUrl, path.join(OUTPUT_PATH, `${tweet.id}.jpg`));
      }
      delete tweet.imageUrl;
      return tweet;
    })
    fs.writeFileSync(`${OUTPUT_PATH}/tweets.json`, JSON.stringify(tweets, null, 2));
    console.log(`Posts and images have been downloaded to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
