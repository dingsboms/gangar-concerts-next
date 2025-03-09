To generate types:

Make sure the backend is running on localhost:5070

openapi-generator-cli generate \
  -i http://localhost:5070/openapi/v1.json \
  -g typescript-fetch \
  -o ./generated-api \
  --additional-properties=supportsES6=true,withInterfaces=true