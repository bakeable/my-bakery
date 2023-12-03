# Use the official Golang image as a parent image
FROM golang:1.21.4

# Set the working directory inside the container
WORKDIR /app

# Copy the local module files to the container's workspace.
COPY go.mod ./
COPY go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source code into the container
COPY . .

# Copy static assets from Next.js build
COPY client/out /app/client/out

# Build the application
RUN go build -o my-bakery ./cmd 

# Expose port 4040 to the outside world
EXPOSE 4040

# Command to run the executable
CMD ["/app/my-bakery"]
