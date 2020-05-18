const test = require('ava');

const { TagBuilder } = require('..');

const tagBuilder = new TagBuilder();

test.beforeEach((t) => {
  t.context = { ...t };
});

test.serial('TagBuilder - instance is intialized', (t) => {
  if (tagBuilder !== 'undefined') {
    t.pass();
  } else {
    t.fail();
  }
});

test.serial('TagBuilder - can set TagBuilder namespace', (t) => {
  tagBuilder.setNamespace('Channel1.Device1');
  t.pass();
});

test.serial('TagBuilder - can add read tags to TagBuilder', (t) => {
  tagBuilder.clean();
  tagBuilder.read('Global.R.example');
  t.true(
    tagBuilder._readTags.length == 1,
    'Expected single read tag in tagBuilder'
  );
});

test.serial('TagBuilder - can add write tags to TagBuilder', (t) => {
  tagBuilder.clean();
  tagBuilder.write('Global.R.example', 100);
  t.true(
    tagBuilder._writeTags.length == 1,
    'Expected single write tag in tagBuilder'
  );
});

test.serial('TagBuilder - Throws when adding write tag after read tag', (t) => {
  tagBuilder.clean();

  try {
    tagBuilder.read('Global.R.example');
    tagBuilder.write('Global.R.example', 1);
    t.fail();
  } catch (err) {
    t.pass();
  }
});

test.serial(
  'TagBuilder - Throws when adding read tags after write tag',
  (t) => {
    tagBuilder.clean();

    try {
      tagBuilder.write('Global.R.example', 1);
      tagBuilder.read('Global.R.example');
      t.fail();
    } catch (err) {
      t.pass();
    }
  }
);

test.serial('TagBuilder - can remove read tag that was added', (t) => {
  tagBuilder.clean();
  tagBuilder.read('Global.R.example');
  tagBuilder.removeRead('Global.R.example');

  t.true(
    tagBuilder._readTags.length == 0,
    'Expected zero read tags in tagBuilder'
  );
});

test.serial('TagBuilder - can remove write tag that was added', (t) => {
  tagBuilder.clean();
  tagBuilder.write('Global.R.example', 1);
  tagBuilder.removeWrite('Global.R.example');

  t.true(
    tagBuilder._readTags.length == 0,
    'Expected zero read tags in tagBuilder'
  );
});

test.serial(
  'TagBuilder - expect arrray of tags when calling get after read tag have been added',
  (t) => {
    const tags = tagBuilder
      .clean()
      .read('Global.R.example1')
      .read('Global.R.example2')
      .get();

    t.true(
      tagBuilder._readTags.length == 2,
      'Expected two read tags in tagBuilder'
    );

    t.true(
      tags.includes('Channel1.Device1.Global.R.example1'),
      "Expected 'Channel1.Device1.Global.R.example1' in read tags array"
    );

    t.true(
      tags.includes('Channel1.Device1.Global.R.example1'),
      "Expected 'Channel1.Device1.Global.R.example2' in read tags array"
    );
  }
);

test.serial(
  'TagBuilder - expect arrray of object tags when calling get after write tag have been added',
  (t) => {
    const tags = tagBuilder
      .clean()
      .write('Global.R.example1', 1)
      .write('Global.R.example2', 2)
      .get();

    t.true(
      tagBuilder._writeTags.length == 2,
      'Expected two read tags in tagBuilder'
    );

    t.true(
      tags.findIndex((tg) => {
        return tg.id == 'Channel1.Device1.Global.R.example1' && tg.v == 1;
      }) > -1,
      "Expected 'Channel1.Device1.Global.R.example1' in read tags array"
    );

    t.true(
      tags.findIndex((tg) => {
        return tg.id == 'Channel1.Device1.Global.R.example2' && tg.v == 2;
      }) > -1,
      "Expected 'Channel1.Device1.Global.R.example2' in read tags array"
    );
  }
);
