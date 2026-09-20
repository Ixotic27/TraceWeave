FROM python:3.12-slim
WORKDIR /app
COPY traceweave /app/traceweave
COPY web /app/web
COPY docs /app/docs
COPY scripts /app/scripts
COPY models /app/models
RUN mkdir -p /app/data
# The local server binds loopback. On Linux, use --network host to access port 8765.
# Prefer the native Python launcher on Windows. Container build is not verified.
CMD ["python", "-m", "traceweave.server"]
