
build-dev: copy-files-dev webpack-dev

dev-folder:
	mkdir -p ./dev
	rm -fr ./dev/*

copy-files-dev: dev-folder
	cp chrome/* dev

webpack-dev: dev-folder
	node_modules/webpack/bin/webpack.js

build-prod: copy-files-prod webpack-prod

prod-folder:
	mkdir -p ./prod
	rm -fr ./prod/*

copy-files-prod: prod-folder
	cp chrome/* prod

webpack-prod: prod-folder
	node_modules/webpack/bin/webpack.js --config webpack.config.prod.js --progress --profile --colors

clean:
	rm -fr ./{prod,dev}
