REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--ui bdd \
		--reporter $(REPORTER) \

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha \
  	--ui bdd \
		--reporter $(REPORTER) \
		--growl \
		--watch

.PHONY: test test-w