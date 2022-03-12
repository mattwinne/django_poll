FROM python:3.10
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE 1
WORKDIR /app
COPY conf/django/requirements.txt /app/
RUN pip install -r requirements.txt
COPY conf/django/docker-entrypoint.sh ..
EXPOSE 8000
ENTRYPOINT ["../docker-entrypoint.sh"]
