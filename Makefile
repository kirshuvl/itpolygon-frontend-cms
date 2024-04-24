DC = docker-compose -p itpolygon-frontend-cms
SOLIDJS_FILE = docker/solidjs.yaml
SOLIDJS_CONTAINER = cms

EXEC = docker exec -it
LOGS = docker logs
ENV = --env-file .env

.PHONY: app
app: 
	${DC} -f ${SOLIDJS_FILE} up --build -d

.PHONY: app-logs
app-logs: 
	${LOGS} ${SOLIDJS_CONTAINER} -f

.PHONY: app-down
app-down: 
	${DC} -f ${SOLIDJS_FILE} down
