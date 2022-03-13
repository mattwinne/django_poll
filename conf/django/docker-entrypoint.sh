#!/usr/bin/env bash

echo "Sleeping for 2s to make sure DB is up and running..."
sleep 2s

echo "Migrating the db..."
python manage.py makemigrations
python manage.py migrate

if [ ${DEBUG:=0} -ne 1 ]
then
  echo "Collecting static files into STATIC_ROOT..."
  python manage.py collectstatic --noinput
  if [ ${APP_SERVER} == "uwsgi" ]
  then
    echo "Launching uWSGI"
    echo ${APP_SERVER}
    uwsgi --http 0.0.0.0:8000 --module=mysite3.wsgi:application --pythonpath .. --env DJANGO_SETTINGS_MODULE=mysite3.settings

  elif [ ${APP_SERVER} == "gunicorn" ]
  then
    echo "Launching gunicorn"
    echo ${APP_SERVER}
    gunicorn --workers=3 --threads=3 mysite3.wsgi -b 0.0.0.0:8000
  else
    echo "No app_server env variable launching uwsgi"
    echo ${APP_SERVER}
    uwsgi --http 0.0.0.0:8000 --module=mysite3.wsgi:application --pythonpath .. --env DJANGO_SETTINGS_MODULE=mysite3.settings
  fi
fi
echo "Running any commands passed to this script from CMD of command..."
exec "$@"
