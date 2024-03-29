BE:=./Backend
FE:=./Frontend

include .env
export $(shell sed 's/=.*//' .env)

.PHONY: check

check:
	node --version
	dotnet --version
	docker --version
	docker-compose --version
	git --version

certs:
	dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p ${ASPNETCORE_Kestrel__Certificates__Default__Password}

#Docker main
build:
	docker-compose up --build --remove-orphans

up:
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down --remove-orphans

rebuild:
	docker-compose up -d --force-recreate --build

build-be:
	docker-compose up -d --no-deps --build backend

build-fe:
	docker-compose up -d --no-deps --build frontend

watch-be:
	cd ./Backend; dotnet watch build ./Virta.csproj

watch-fe:
	cd ./Frontend; ng build --watch


