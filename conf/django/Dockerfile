FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY conf/django/requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/
