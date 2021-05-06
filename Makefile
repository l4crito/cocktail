m= 'Autogenerado'
port=4200
deploy:
	ng build --prod;
	firebase deploy;
	
commit:
	git add .;
	git commit -m '$(m)';
	git push
	ng build --prod;
	rm -rf /home/christian/Proyectos/cloudadmin/firebase/public/*;
	cp -r dist/cloudadmin/* /home/christian/Proyectos/cloudadmin/firebase/public/;
	cd /home/christian/Proyectos/cloudadmin/firebase/public/ && firebase deploy;

install:
	yarn install;

run:
	sudo ng serve --watch --poll 2000 --host 0.0.0.0;

pid:
	sudo lsof -i :$(port)

kill:
	sudo kill -9 $(pid)	

module:
	ng g m $(module) --route=$(module) -m=app 

scss:
	sass --watch src/assets/themes/:src/assets/themes/



