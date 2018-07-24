// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-require
const { message, danger } = require('danger');

const modifiedMD = danger.git.modified_files.join('- ');
message(`Changed Files in this PR: \n - ${modifiedMD}`);
