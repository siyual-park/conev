import importer = require('../lib');
const { ConfigBuilder, JsonSource } = importer;

const dev = {
  a: {
    b: {
      c: {
        value: 'c dev',
      },
    },
    value: 'a dev',
  },
};

const prd = {
  a: {
    b: {
      c: {
      },
    },
    value: 'a prd',
  },
};

const basic = {
  a: {
    b: {
      c: {
        value: 'c basic',
      },
      value: 'b basic',
    },
  },
};

async function main() {
  const jsonSource = new JsonSource();

  jsonSource
    .setEnv('basic', basic)
    .setEnv('dev', dev)
    .setEnv('prd', prd);

  const builder = new ConfigBuilder();

  const config = await builder
    .setEnv({ basic: 'basic', current: 'dev' })
    .addSource(jsonSource)
    .build();

  console.log(config.get());
}

main();