FROM python:3.10-slim
 
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE 1
 
COPY conf/django/requirements.txt /tmp/requirements.txt
 
RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential \
  && rm -rf /var/lib/apt/lists/* \
  && pip install --no-cache-dir -r /tmp/requirements.txt \
  && rm -rf /tmp/requirements.txt \
  && apt-get remove -y build-essential && apt-get -y autoremove

WORKDIR /app
 
COPY conf/django/docker-entrypoint.sh ..
COPY ./back /app/
 
EXPOSE 8000
ENTRYPOINT ["../docker-entrypoint.sh"]