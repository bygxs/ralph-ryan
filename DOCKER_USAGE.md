# 🐳 Docker Usage Guide for Login Form App

Your login form app is now fully containerized and ready to run with Docker! Here's how to use it.

## 🚀 Quick Start

### Option 1: Production Container (Recommended)
```bash
# Build the production image
docker build -t login-form-app .

# Run the container
docker run -d -p 8090:80 --name login-form-container login-form-app

# Check if it's running
./health-check.sh
```

**Access your app at:** http://localhost:8090

### Option 2: Using NPM Scripts
```bash
# Build and run production
pnpm docker:build
pnpm docker:run

# Or use the convenience script
pnpm docker:build && pnpm docker:run
```

## 🛠️ Development with Docker

### Development Container with Hot Reload
```bash
# Build development image
docker build -f Dockerfile.dev -t login-form-dev .

# Run development server
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules login-form-dev
```

### Using Docker Compose (Easiest)
```bash
# Development with hot reload
docker-compose up dev

# Production
docker-compose up prod

# Run tests
docker-compose run test

# Type checking
docker-compose run typecheck
```

## 📋 Available Commands

### Docker Commands
```bash
# Build images
docker build -t login-form-app .                    # Production
docker build -f Dockerfile.dev -t login-form-dev .  # Development

# Run containers
docker run -d -p 8090:80 login-form-app            # Production
docker run -p 3000:3000 login-form-dev             # Development

# View logs
docker logs login-form-container
docker logs -f login-form-container                 # Follow logs

# Stop and remove
docker stop login-form-container
docker rm login-form-container

# Clean up images
docker rmi login-form-app login-form-dev
```

### NPM Scripts (Convenience)
```bash
pnpm docker:build          # Build production image
pnpm docker:run            # Run production container
pnpm docker:dev            # Start development environment
pnpm docker:prod           # Start production environment
pnpm docker:test           # Run tests in Docker
pnpm docker:typecheck      # Run type checking in Docker
```

## 🔧 Customization

### Custom Ports
```bash
# Production on different port
docker run -d -p 8081:80 login-form-app

# Development on different port
docker run -p 3001:3000 login-form-dev
```

### Environment Variables
```bash
# Set environment variables
docker run -e NODE_ENV=production -p 8090:80 login-form-app

# With docker-compose, edit docker-compose.yml
```

### Volume Mounting (Development)
```bash
# Mount your local code for live editing
docker run -p 3000:3000 \
  -v $(pwd)/src:/app/src \
  -v $(pwd)/public:/app/public \
  -v /app/node_modules \
  login-form-dev
```

## 🧪 Testing in Docker

### Run Tests
```bash
# Using docker run
docker run --rm login-form-dev pnpm test

# Using docker-compose
docker-compose run test

# Run specific test
docker run --rm login-form-dev pnpm test -- --testNamePattern="validates email"
```

### Type Checking
```bash
# Using docker run
docker run --rm login-form-dev pnpm typecheck

# Using docker-compose
docker-compose run typecheck
```

## 📊 Container Management

### View Running Containers
```bash
docker ps
docker ps -a  # Include stopped containers
```

### Container Stats
```bash
docker stats login-form-container
```

### Enter Container Shell
```bash
# Production container
docker exec -it login-form-container sh

# Development container
docker exec -it login-form-dev sh
```

## 🚀 Production Deployment

### Basic Production Deploy
```bash
# 1. Build for production
docker build -t login-form-app .

# 2. Tag for registry (optional)
docker tag login-form-app your-registry/login-form-app:latest

# 3. Push to registry (optional)
docker push your-registry/login-form-app:latest

# 4. Run on server
docker run -d -p 80:80 --restart unless-stopped login-form-app
```

### With Docker Compose
```bash
# Production deployment
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🛡️ Security Considerations

### Non-root User
The production image runs nginx as a non-root user for security.

### Security Headers
The nginx configuration includes security headers:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection

### Network Isolation
```bash
# Create custom network
docker network create login-form-network

# Run on custom network
docker run -d --network login-form-network -p 8090:80 login-form-app
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Build and Deploy
on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Build Docker image
      run: docker build -t login-form-app .
    - name: Run tests
      run: docker run --rm login-form-app pnpm test
    - name: Deploy
      run: |
        docker tag login-form-app your-registry/login-form-app:latest
        docker push your-registry/login-form-app:latest
```

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find what's using the port
lsof -ti:8090

# Use different port
docker run -d -p 8091:80 login-form-app
```

**Container Won't Start**
```bash
# Check logs
docker logs login-form-container

# Run in foreground to see errors
docker run -it --rm login-form-app
```

**Build Failures**
```bash
# Clean build cache
docker system prune -a

# Build with no cache
docker build --no-cache -t login-form-app .
```

### Health Check
```bash
# Run health check script
./health-check.sh

# Manual check
curl -I http://localhost:8090
```

## 📁 File Structure
```
├── Dockerfile              # Production image
├── Dockerfile.dev          # Development image
├── docker-compose.yml      # Multi-service setup
├── nginx.conf             # Nginx configuration
├── .dockerignore          # Docker ignore patterns
├── health-check.sh        # Health check script
├── DOCKER.md             # This documentation
└── src/                   # Your app source code
```

## 🎯 Next Steps

1. **Test the app**: Visit http://localhost:8090
2. **Try different configurations**: Custom ports, environment variables
3. **Set up CI/CD**: Automate building and deployment
4. **Scale horizontally**: Run multiple containers with load balancing
5. **Add monitoring**: Container health and application metrics

Your login form is now ready to run anywhere Docker is supported! 🎉