FROM python:3.8
WORKDIR /carga_batch
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "carga_batch.py"]