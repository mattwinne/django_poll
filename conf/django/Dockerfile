FROM python:3.8-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY conf/django/requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/
COPY conf/django/docker-entrypoint.sh ..
ENTRYPOINT ["../docker-entrypoint.sh"]