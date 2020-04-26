module.exports = {
  transform: {
    '\\.ts$': ['ts-jest'],
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
