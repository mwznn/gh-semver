build:
	rm dist -rdf
	npm run build
test:
	make build
	npm run test